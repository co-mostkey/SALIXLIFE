import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { isAdminEmail } from '../../../utils/adminEmails';

const JWT_SECRET = process.env.JWT_SECRET || 'salix-life-research-board-secret-2024';
const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json');

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  authorEmail: string;
  summary: string;
  content: string;
  tags: string[];
  featured: boolean;
  files: any[];
  date: string;
  downloadCount: number;
}

// 데이터 디렉토리 생성
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 게시글 파일 초기화
const ensurePostsFile = () => {
  ensureDataDirectory();
  if (!fs.existsSync(POSTS_FILE)) {
    // 기존 샘플 데이터를 파일로 저장
    const { researchPosts } = require('../../../data/researchPosts');
    fs.writeFileSync(POSTS_FILE, JSON.stringify(researchPosts, null, 2));
  }
};

// JWT 토큰 검증
const verifyToken = (authHeader: string | undefined): any => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.substring(7);
  return jwt.verify(token, JWT_SECRET);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ensurePostsFile();
  
  try {
    switch (req.method) {
      case 'GET':
        // 게시글 목록 조회
        const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
        return res.status(200).json({
          success: true,
          data: posts
        });

      case 'POST':
        // 게시글 작성 (인증 필요)
        try {
          const decoded = verifyToken(req.headers.authorization);
          
          if (!decoded.verified) {
            return res.status(401).json({
              success: false,
              message: '인증되지 않은 사용자입니다.'
            });
          }

          const {
            title,
            category,
            author,
            summary,
            content,
            tags,
            featured,
            files
          } = req.body;

          // 관리자가 아닌 경우 featured 설정 불가
          const canSetFeatured = isAdminEmail(decoded.email);
          
          const newPost: Post = {
            id: String(Date.now()).slice(-3).padStart(3, '0'),
            title,
            category,
            author,
            authorEmail: decoded.email,
            summary,
            content,
            tags: tags || [],
            featured: canSetFeatured && featured || false,
            files: files || [],
            date: new Date().toISOString().split('T')[0],
            downloadCount: 0
          };

          const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
          posts.push(newPost);
          fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

          return res.status(201).json({
            success: true,
            message: '게시글이 작성되었습니다.',
            data: newPost
          });

        } catch (error) {
          return res.status(401).json({
            success: false,
            message: '인증이 필요합니다.'
          });
        }

      case 'PUT':
        // 게시글 수정 (작성자 본인 또는 관리자)
        try {
          const decoded = verifyToken(req.headers.authorization);
          const { id } = req.query;
          
          if (!id) {
            return res.status(400).json({
              success: false,
              message: '게시글 ID가 필요합니다.'
            });
          }

          const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
          const postIndex = posts.findIndex((p: Post) => p.id === id);
          
          if (postIndex === -1) {
            return res.status(404).json({
              success: false,
              message: '게시글을 찾을 수 없습니다.'
            });
          }

          const post = posts[postIndex];
          const isAuthor = post.authorEmail === decoded.email;
          const isAdmin = isAdminEmail(decoded.email);

          if (!isAuthor && !isAdmin) {
            return res.status(403).json({
              success: false,
              message: '수정 권한이 없습니다.'
            });
          }

          // 수정 가능한 필드만 업데이트
          const updatedPost = {
            ...post,
            title: req.body.title || post.title,
            category: req.body.category || post.category,
            summary: req.body.summary || post.summary,
            content: req.body.content || post.content,
            tags: req.body.tags || post.tags,
            featured: isAdmin ? (req.body.featured ?? post.featured) : post.featured,
            files: req.body.files || post.files
          };

          posts[postIndex] = updatedPost;
          fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

          return res.status(200).json({
            success: true,
            message: '게시글이 수정되었습니다.',
            data: updatedPost
          });

        } catch (error) {
          return res.status(401).json({
            success: false,
            message: '인증이 필요합니다.'
          });
        }

      case 'DELETE':
        // 게시글 삭제 (작성자 본인 또는 관리자)
        try {
          const decoded = verifyToken(req.headers.authorization);
          const { id } = req.query;
          
          if (!id) {
            return res.status(400).json({
              success: false,
              message: '게시글 ID가 필요합니다.'
            });
          }

          const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
          const postIndex = posts.findIndex((p: Post) => p.id === id);
          
          if (postIndex === -1) {
            return res.status(404).json({
              success: false,
              message: '게시글을 찾을 수 없습니다.'
            });
          }

          const post = posts[postIndex];
          const isAuthor = post.authorEmail === decoded.email;
          const isAdmin = isAdminEmail(decoded.email);

          if (!isAuthor && !isAdmin) {
            return res.status(403).json({
              success: false,
              message: '삭제 권한이 없습니다.'
            });
          }

          posts.splice(postIndex, 1);
          fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

          return res.status(200).json({
            success: true,
            message: '게시글이 삭제되었습니다.'
          });

        } catch (error) {
          return res.status(401).json({
            success: false,
            message: '인증이 필요합니다.'
          });
        }

      default:
        return res.status(405).json({
          success: false,
          message: '허용되지 않는 메서드입니다.'
        });
    }
  } catch (error) {
    console.error('API 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
} 