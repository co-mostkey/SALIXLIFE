import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';
import { getPostById, ResearchPost, AttachedFile } from '../../data/researchPosts';
import EmailAuthModal from '../../components/research/EmailAuthModal';
import { useEmailAuth } from '../../hooks/useEmailAuth';
import { isAdminEmail } from '../../utils/adminEmails';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  isVerified: boolean;
}

export default function ResearchPostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { authState } = useEmailAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPurpose, setAuthPurpose] = useState<'comment' | 'download'>('comment');
  const [pendingDownload, setPendingDownload] = useState<{ fileId: string; fileName: string } | null>(null);
  const [commentForm, setCommentForm] = useState({
    author: '',
    email: '',
    content: ''
  });

  const currentPost = getPostById(id as string);

  // 샘플 댓글 데이터
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c001',
      author: '김연구',
      email: 'researcher@example.com',
      content: '매우 흥미로운 연구 결과입니다. 특히 효율성 개선 부분이 인상적이네요.',
      date: '2024-12-16',
      isVerified: true
    },
    {
      id: 'c002',
      author: '박의사',
      email: 'doctor@hospital.com',
      content: '의료 현장에서 활용 가능성이 높아 보입니다. 추가 연구 결과가 궁금합니다.',
      date: '2024-12-17',
      isVerified: false
    }
  ]);

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <Icon name="trending" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">게시글을 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-6">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
            <Link 
              href="/research"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon name="arrow-right" className="w-4 h-4 mr-2 rotate-180" />
              연구게시판으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 댓글 작성 시작
  const handleStartComment = () => {
    if (!authState.isAuthenticated) {
      setAuthPurpose('comment');
      setShowAuthModal(true);
    } else {
      setShowCommentForm(true);
      setCommentForm(prev => ({
        ...prev,
        author: authState.email || '',
        email: authState.email || ''
      }));
    }
  };

  // 댓글 제출
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    // 새 댓글 추가
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: commentForm.author,
      email: commentForm.email,
      content: commentForm.content,
      date: new Date().toISOString().split('T')[0],
      isVerified: authState.isAuthenticated
    };

    setComments(prev => [...prev, newComment]);
    setCommentForm({ author: '', email: '', content: '' });
    setShowCommentForm(false);
    
    // TODO: API 연동
    console.log('댓글 제출:', newComment);
  };

  // 파일 다운로드
  const handleFileDownload = async (fileId: string, fileName: string) => {
    if (!authState.isAuthenticated) {
      setPendingDownload({ fileId, fileName });
      setAuthPurpose('download');
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch(`/api/research/download?fileId=${fileId}`, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });

      if (response.ok) {
        // 파일 다운로드 처리
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const error = await response.json();
        alert(error.message || '파일 다운로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('다운로드 오류:', error);
      alert('파일 다운로드 중 오류가 발생했습니다.');
    }
  };

  // 인증 성공 핸들러
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    
    if (authPurpose === 'comment') {
      handleStartComment();
    } else if (authPurpose === 'download' && pendingDownload) {
      handleFileDownload(pendingDownload.fileId, pendingDownload.fileName);
      setPendingDownload(null);
    }
  };

  return (
    <>
      <Head>
        <title>{currentPost.title} | 연구게시판 | SALIX Life</title>
        <meta name="description" content={currentPost.summary} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 메인 콘텐츠 */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 100px)', marginBottom: '60px' }}>
            {/* 게시글 헤더 */}
            <div className="px-8 py-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {currentPost.category}
                  </span>
                  {currentPost.featured && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      주요 연구
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{currentPost.date}</span>
                  <span>다운로드 {currentPost.downloadCount}회</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{currentPost.title}</h1>
              
              {/* 목록으로 돌아가기 버튼 - 타이틀 아래에 작게 배치 */}
              <div className="mb-4">
                <Link 
                  href="/research"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Icon name="arrow-right" className="w-3 h-3 mr-1 rotate-180" />
                  목록으로 돌아가기
                </Link>
              </div>
              
              <p className="text-lg text-gray-600 mb-4">{currentPost.summary}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="users" className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{currentPost.author}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 게시글 내용 - 스크롤 가능 영역 */}
            <div className="flex-1 overflow-y-auto scrollbar-custom px-8 py-6">
              <div 
                className="research-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />

              {/* 첨부파일 섹션 */}
              {currentPost.files.length > 0 && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="technology" className="w-5 h-5 text-blue-600" />
                    첨부파일 ({currentPost.files.length})
                  </h3>
                  <div className="space-y-3">
                    {currentPost.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <Icon name="technology" className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFileDownload(file.id, file.name)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Icon name="technology" className="w-4 h-4 rotate-90" />
                          다운로드
                        </button>
                      </div>
                    ))}
                  </div>
                  {!authState.isAuthenticated && (
                    <p className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                      <Icon name="trending" className="w-4 h-4" />
                      파일 다운로드는 이메일 인증 후 가능합니다.
                    </p>
                  )}
                </div>
              )}

              {/* 댓글 섹션 */}
              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="users" className="w-5 h-5 text-green-600" />
                    댓글 ({comments.length})
                  </span>
                  {!showCommentForm && (
                    <button
                      onClick={handleStartComment}
                      className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      댓글 작성
                    </button>
                  )}
                </h3>

                {/* 댓글 목록 */}
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          {comment.isVerified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              인증됨
                            </span>
                          )}
                          {isAdminEmail(comment.email) && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                              관리자
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </motion.div>
                  ))}
                </div>

                {/* 댓글 작성 폼 */}
                {showCommentForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-blue-50 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">댓글 작성</h4>
                    <form onSubmit={handleCommentSubmit}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            작성자
                          </label>
                          <input
                            id="author"
                            type="text"
                            value={commentForm.author}
                            readOnly={authState.isAuthenticated}
                            onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black bg-gray-100"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            이메일
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={commentForm.email}
                            readOnly={authState.isAuthenticated}
                            onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black bg-gray-100"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          내용
                        </label>
                        <textarea
                          id="content"
                          value={commentForm.content}
                          onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="댓글을 입력하세요..."
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowCommentForm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          댓글 등록
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이메일 인증 모달 */}
      <EmailAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        purpose={authPurpose === 'download' ? 'comment' : authPurpose}
        title={authPurpose === 'download' ? '파일 다운로드 인증' : '댓글 작성 인증'}
      />

      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        
        .scrollbar-custom::-webkit-scrollbar {
          width: 16px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 8px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6));
          border-radius: 8px;
          border: 2px solid rgba(243, 244, 246, 0.5);
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8));
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:active {
          background: linear-gradient(45deg, rgba(59, 130, 246, 1), rgba(147, 51, 234, 1));
        }
        
        .research-content h2 {
          color: #1f2937;
          font-size: 1.75rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.75rem;
        }
        
        .research-content h3 {
          color: #374151;
          font-size: 1.375rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .research-content p {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1.05rem;
        }
        
        .research-content ul {
          color: #4b5563;
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        
        .research-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        .research-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .research-content th {
          background: #f8fafc;
          color: #374151;
          font-weight: 600;
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.95rem;
        }
        
        .research-content td {
          color: #4b5563;
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.95rem;
        }
        
        .research-content strong {
          color: #1f2937;
          font-weight: 600;
        }
      `}</style>
    </>
  );
} 