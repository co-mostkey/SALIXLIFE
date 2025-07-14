import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';

export const config = {
  api: {
    bodyParser: false,
  },
};

// JWT 토큰 검증
const verifyToken = (authHeader: string | undefined): any => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.substring(7);
  return jwt.verify(token, JWT_SECRET);
};

// 파일 크기 포맷팅
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 파일 타입 검증
const isAllowedFileType = (filename: string): boolean => {
  const allowedExtensions = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', 
    '.ppt', '.pptx', '.txt', '.zip', '.rar',
    '.jpg', '.jpeg', '.png', '.gif', '.bmp',
    '.csv', '.rtf', '.hwp'
  ];
  
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: '허용되지 않는 메서드입니다.'
    });
  }

  try {
    // 인증 확인
    const decoded = verifyToken(req.headers.authorization);
    
    if (!decoded.verified) {
      return res.status(401).json({
        success: false,
        message: '인증되지 않은 사용자입니다.'
      });
    }

    // 업로드 디렉토리 생성
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'research');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // formidable 설정
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: ({ name, originalFilename, mimetype }) => {
        if (!originalFilename) return false;
        return isAllowedFileType(originalFilename);
      }
    });

    // 파일 파싱
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('파일 파싱 오류:', err);
        
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: '파일 크기는 10MB를 초과할 수 없습니다.'
          });
        }
        
        return res.status(400).json({
          success: false,
          message: '파일 업로드에 실패했습니다.'
        });
      }

      const uploadedFiles = [];
      const fileArray = Array.isArray(files.files) ? files.files : [files.files];

      for (const file of fileArray) {
        if (!file) continue;

        // 파일명 생성 (타임스탬프 + 원본 파일명)
        const timestamp = Date.now();
        const originalName = file.originalFilename || 'unnamed';
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        const newFilename = `${timestamp}_${baseName}${ext}`;
        const newPath = path.join(uploadDir, newFilename);

        // 파일 이동
        try {
          fs.renameSync(file.filepath, newPath);
          
          uploadedFiles.push({
            id: `file_${timestamp}`,
            name: originalName,
            size: formatFileSize(file.size),
            type: file.mimetype || 'application/octet-stream',
            url: `/uploads/research/${newFilename}`,
            uploadDate: new Date().toISOString().split('T')[0]
          });
        } catch (error) {
          console.error('파일 저장 오류:', error);
          
          // 임시 파일 정리
          if (fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath);
          }
        }
      }

      if (uploadedFiles.length === 0) {
        return res.status(400).json({
          success: false,
          message: '파일 업로드에 실패했습니다.'
        });
      }

      return res.status(200).json({
        success: true,
        message: `${uploadedFiles.length}개의 파일이 업로드되었습니다.`,
        data: uploadedFiles
      });
    });

  } catch (error) {
    console.error('업로드 API 오류:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 인증 토큰입니다.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 