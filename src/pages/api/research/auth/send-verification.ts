import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface VerificationCode {
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 인증 코드 저장 경로
const VERIFICATION_CODES_PATH = path.join(process.cwd(), 'data', 'verification-codes.json');

// 데이터 디렉토리 생성
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 인증 코드 파일 초기화
const ensureVerificationFile = () => {
  ensureDataDirectory();
  if (!fs.existsSync(VERIFICATION_CODES_PATH)) {
    fs.writeFileSync(VERIFICATION_CODES_PATH, JSON.stringify([], null, 2));
  }
};

// 인증 코드 생성 (6자리 숫자)
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 인증 코드 저장
const saveVerificationCode = (email: string, code: string): void => {
  ensureVerificationFile();
  
  const codes: VerificationCode[] = JSON.parse(
    fs.readFileSync(VERIFICATION_CODES_PATH, 'utf-8')
  );
  
  // 기존 미사용 코드 제거 (같은 이메일)
  const filteredCodes = codes.filter(
    c => c.email !== email || c.used || c.expiresAt < Date.now()
  );
  
  // 새 코드 추가 (10분 유효)
  const newCode: VerificationCode = {
    email: email.toLowerCase(),
    code,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000, // 10분
    used: false
  };
  
  filteredCodes.push(newCode);
  
  fs.writeFileSync(
    VERIFICATION_CODES_PATH,
    JSON.stringify(filteredCodes, null, 2)
  );
};

// 이메일 발송 시뮬레이션 (실제 프로덕션에서는 이메일 서비스 사용)
const sendEmail = async (email: string, code: string): Promise<boolean> => {
  // 개발 환경에서는 콘솔에 출력
  console.log(`
    ====================================
    이메일 인증 코드 발송 (개발 모드)
    ------------------------------------
    수신자: ${email}
    인증 코드: ${code}
    유효 시간: 10분
    ====================================
  `);
  
  // 실제 환경에서는 SendGrid, AWS SES 등 사용
  // await sendgrid.send({
  //   to: email,
  //   from: 'noreply@salixlife.com',
  //   subject: 'SALIX Life 연구게시판 인증 코드',
  //   html: `인증 코드: <strong>${code}</strong>`
  // });
  
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: '허용되지 않는 메서드입니다.'
    });
  }

  try {
    const { email, purpose } = req.body;

    // 이메일 검증
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: '유효한 이메일 주소를 입력해주세요.'
      });
    }

    // 용도 검증 (게시글 작성, 댓글 작성)
    const validPurposes = ['post', 'comment'];
    if (!purpose || !validPurposes.includes(purpose)) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 인증 용도입니다.'
      });
    }

    // Rate limiting 체크 (같은 이메일로 1분에 1회만 가능)
    ensureVerificationFile();
    const existingCodes: VerificationCode[] = JSON.parse(
      fs.readFileSync(VERIFICATION_CODES_PATH, 'utf-8')
    );
    
    const recentCode = existingCodes.find(
      c => c.email === email.toLowerCase() && 
      c.createdAt > Date.now() - 60 * 1000 && // 1분 이내
      !c.used
    );
    
    if (recentCode) {
      return res.status(429).json({
        success: false,
        message: '잠시 후 다시 시도해주세요. (1분에 1회만 발송 가능)'
      });
    }

    // 인증 코드 생성 및 저장
    const verificationCode = generateVerificationCode();
    saveVerificationCode(email, verificationCode);

    // 이메일 발송
    const emailSent = await sendEmail(email, verificationCode);
    
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: '이메일 발송에 실패했습니다.'
      });
    }

    // 성공 응답
    return res.status(200).json({
      success: true,
      message: '인증 코드가 이메일로 발송되었습니다.',
      data: {
        email,
        purpose,
        expiresIn: 600 // 10분 (초 단위)
      }
    });

  } catch (error) {
    console.error('인증 코드 발송 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 