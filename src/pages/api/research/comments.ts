import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { isAdminEmail } from '../../../utils/adminEmails';

const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';
const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  isVerified: boolean;
  isApproved: boolean;
}

interface CommentResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 데이터 디렉토리 생성
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 댓글 파일 초기화
const ensureCommentsFile = () => {
  ensureDataDirectory();
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify([], null, 2));
  }
};

// JWT 토큰 검증 (선택적)
const verifyToken = (authHeader: string | undefined): any | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  try {
    const token = authHeader.substring(7);
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentResponse>
) {
  ensureCommentsFile();
  
  try {
    if (req.method === 'GET') {
      // 댓글 목록 조회
      const { postId } = req.query;
      
      if (!postId) {
        return res.status(400).json({
          success: false,
          message: '게시글 ID가 필요합니다.'
        });
      }

      const allComments: Comment[] = JSON.parse(
        fs.readFileSync(COMMENTS_FILE, 'utf-8')
      );
      
      // 해당 게시글의 승인된 댓글만 반환
      const postComments = allComments.filter(
        comment => comment.postId === postId && comment.isApproved
      );

      return res.status(200).json({
        success: true,
        message: '댓글 목록을 불러왔습니다.',
        data: postComments
      });

    } else if (req.method === 'POST') {
      // 댓글 작성
      const decoded = verifyToken(req.headers.authorization);
      const { postId, author, email, content } = req.body;

      if (!postId || !content) {
        return res.status(400).json({ 
          success: false, 
          message: '필수 필드를 입력해주세요.' 
        });
      }

      // 인증된 사용자의 경우 이메일과 작성자 정보 사용
      const commentAuthor = decoded ? decoded.email : (author || '익명');
      const commentEmail = decoded ? decoded.email : (email || '');

      // 이메일 형식 검증 (비인증 사용자)
      if (!decoded && commentEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(commentEmail)) {
          return res.status(400).json({ 
            success: false, 
            message: '올바른 이메일 형식이 아닙니다.' 
          });
        }
      }

      // 스팸 필터링 (간단한 예시)
      const spamKeywords = ['스팸', '광고', '홍보', 'http://', 'https://'];
      const hasSpam = spamKeywords.some(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      );

      const allComments: Comment[] = JSON.parse(
        fs.readFileSync(COMMENTS_FILE, 'utf-8')
      );

      const newComment: Comment = {
        id: `c_${Date.now()}`,
        postId: postId as string,
        author: commentAuthor,
        email: commentEmail.toLowerCase(),
        content: content.trim(),
        date: new Date().toISOString().split('T')[0],
        isVerified: !!decoded,
        isApproved: !hasSpam || isAdminEmail(commentEmail)
      };

      allComments.push(newComment);
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(allComments, null, 2));

      return res.status(201).json({
        success: true,
        message: newComment.isApproved 
          ? '댓글이 등록되었습니다.' 
          : '댓글이 등록되었습니다. 관리자 승인 후 표시됩니다.',
        data: newComment.isApproved ? newComment : null
      });

    } else if (req.method === 'DELETE') {
      // 댓글 삭제 (작성자 본인 또는 관리자)
      const decoded = verifyToken(req.headers.authorization);
      
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: '인증이 필요합니다.'
        });
      }

      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: '댓글 ID가 필요합니다.'
        });
      }

      const allComments: Comment[] = JSON.parse(
        fs.readFileSync(COMMENTS_FILE, 'utf-8')
      );
      
      const commentIndex = allComments.findIndex(c => c.id === id);
      
      if (commentIndex === -1) {
        return res.status(404).json({
          success: false,
          message: '댓글을 찾을 수 없습니다.'
        });
      }

      const comment = allComments[commentIndex];
      const isAuthor = comment.email === decoded.email;
      const isAdmin = isAdminEmail(decoded.email);

      if (!isAuthor && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: '삭제 권한이 없습니다.'
        });
      }

      allComments.splice(commentIndex, 1);
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(allComments, null, 2));

      return res.status(200).json({
        success: true,
        message: '댓글이 삭제되었습니다.'
      });

    } else {
      return res.status(405).json({
        success: false,
        message: '허용되지 않는 메서드입니다.'
      });
    }
  } catch (error) {
    console.error('댓글 API 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 