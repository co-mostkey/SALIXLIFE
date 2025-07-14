import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// JWT 시크릿 (실제 환경에서는 환경 변수 사용)
const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // GET 메서드만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: '허용되지 않는 메서드입니다.'
    });
  }

  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 없습니다.'
      });
    }

    const token = authHeader.substring(7); // 'Bearer ' 제거

    // JWT 토큰 검증
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // 토큰이 연구게시판용인지 확인
      if (decoded.purpose !== 'research-board') {
        return res.status(401).json({
          success: false,
          message: '유효하지 않은 토큰입니다.'
        });
      }

      // 인증 성공
      return res.status(200).json({
        success: true,
        message: '인증된 사용자입니다.',
        data: {
          email: decoded.email,
          verified: decoded.verified,
          expiresAt: new Date(decoded.exp * 1000).toISOString()
        }
      });

    } catch (jwtError) {
      // JWT 검증 실패 (만료, 변조 등)
      return res.status(401).json({
        success: false,
        message: '토큰이 만료되었거나 유효하지 않습니다.'
      });
    }

  } catch (error) {
    console.error('인증 상태 확인 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 