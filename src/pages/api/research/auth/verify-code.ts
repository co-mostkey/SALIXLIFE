import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface VerificationCode {
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

interface VerifiedEmail {
  email: string;
  verifiedAt: number;
  token: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 파일 경로
const VERIFICATION_CODES_PATH = path.join(process.cwd(), 'data', 'verification-codes.json');
const VERIFIED_EMAILS_PATH = path.join(process.cwd(), 'data', 'verified-emails.json');

// JWT 시크릿 (실제 환경에서는 환경 변수 사용)
const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';

// 데이터 디렉토리 생성
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 파일 초기화
const ensureFiles = () => {
  ensureDataDirectory();
  
  if (!fs.existsSync(VERIFICATION_CODES_PATH)) {
    fs.writeFileSync(VERIFICATION_CODES_PATH, JSON.stringify([], null, 2));
  }
  
  if (!fs.existsSync(VERIFIED_EMAILS_PATH)) {
    fs.writeFileSync(VERIFIED_EMAILS_PATH, JSON.stringify([], null, 2));
  }
};

// 인증 코드 확인
const verifyCode = (email: string, code: string): boolean => {
  ensureFiles();
  
  const codes: VerificationCode[] = JSON.parse(
    fs.readFileSync(VERIFICATION_CODES_PATH, 'utf-8')
  );
  
  const validCode = codes.find(
    c => c.email === email.toLowerCase() &&
    c.code === code &&
    !c.used &&
    c.expiresAt > Date.now()
  );
  
  if (!validCode) {
    return false;
  }
  
  // 코드를 사용됨으로 표시
  validCode.used = true;
  fs.writeFileSync(
    VERIFICATION_CODES_PATH,
    JSON.stringify(codes, null, 2)
  );
  
  return true;
};

// 인증된 이메일 저장
const saveVerifiedEmail = (email: string): string => {
  ensureFiles();
  
  const verifiedEmails: VerifiedEmail[] = JSON.parse(
    fs.readFileSync(VERIFIED_EMAILS_PATH, 'utf-8')
  );
  
  // JWT 토큰 생성 (24시간 유효)
  const token = jwt.sign(
    { 
      email: email.toLowerCase(),
      verified: true,
      purpose: 'research-board'
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  // 기존 인증 정보 업데이트 또는 새로 추가
  const existingIndex = verifiedEmails.findIndex(
    v => v.email === email.toLowerCase()
  );
  
  const verifiedEmail: VerifiedEmail = {
    email: email.toLowerCase(),
    verifiedAt: Date.now(),
    token
  };
  
  if (existingIndex >= 0) {
    verifiedEmails[existingIndex] = verifiedEmail;
  } else {
    verifiedEmails.push(verifiedEmail);
  }
  
  fs.writeFileSync(
    VERIFIED_EMAILS_PATH,
    JSON.stringify(verifiedEmails, null, 2)
  );
  
  return token;
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
    const { email, code } = req.body;

    // 입력값 검증
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: '이메일과 인증 코드를 모두 입력해주세요.'
      });
    }

    // 인증 코드 확인
    const isValid = verifyCode(email, code);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않거나 만료된 인증 코드입니다.'
      });
    }

    // 인증 성공 - 토큰 발급
    const token = saveVerifiedEmail(email);

    // 성공 응답
    return res.status(200).json({
      success: true,
      message: '이메일 인증이 완료되었습니다.',
      data: {
        email,
        token,
        expiresIn: 86400 // 24시간 (초 단위)
      }
    });

  } catch (error) {
    console.error('인증 코드 확인 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 