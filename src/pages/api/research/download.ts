import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

// JWT 시크릿
const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: '허용되지 않는 메서드입니다.' });
  }

  const { fileId } = req.query;

  if (!fileId) {
    return res.status(400).json({ success: false, message: '파일 ID가 필요합니다.' });
  }

  try {
    // JWT 토큰 확인
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: '인증이 필요합니다. 이메일 인증 후 다시 시도해주세요.' 
      });
    }

    const token = authHeader.substring(7);

    // JWT 토큰 검증
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      
      if (decoded.purpose !== 'research-board' || !decoded.verified) {
        throw new Error('Invalid token');
      }
    } catch (jwtError) {
      return res.status(401).json({ 
        success: false, 
        message: '인증이 만료되었거나 유효하지 않습니다.' 
      });
    }

    // 파일 메타데이터 확인
    const uploadDir = path.join(process.cwd(), 'public/uploads/research');
    const metadataPath = path.join(uploadDir, 'metadata.json');
    
    if (!fs.existsSync(metadataPath)) {
      return res.status(404).json({ success: false, message: '파일을 찾을 수 없습니다.' });
    }

    const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataContent);
    
    const fileInfo = metadata.find((file: any) => file.id === fileId);
    
    if (!fileInfo) {
      return res.status(404).json({ success: false, message: '파일을 찾을 수 없습니다.' });
    }

    // 파일 존재 확인
    if (!fs.existsSync(fileInfo.filePath)) {
      return res.status(404).json({ success: false, message: '파일이 존재하지 않습니다.' });
    }

    // 다운로드 횟수 증가
    fileInfo.downloadCount = (fileInfo.downloadCount || 0) + 1;
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // 다운로드 로그 기록
    const downloadLog = {
      fileId: fileInfo.id,
      fileName: fileInfo.name,
      userEmail: decoded.email,
      downloadedAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };
    
    const logPath = path.join(process.cwd(), 'data', 'download-logs.json');
    let logs = [];
    
    if (fs.existsSync(logPath)) {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
    }
    
    logs.push(downloadLog);
    
    // 데이터 디렉토리 생성
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

    // 파일 다운로드 응답
    const stat = fs.statSync(fileInfo.filePath);
    const fileStream = fs.createReadStream(fileInfo.filePath);
    
    res.setHeader('Content-Type', fileInfo.type || 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileInfo.name)}"`);
    
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
} 