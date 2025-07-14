import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Icon from '../../components/ui/Icon';
import Link from 'next/link';
import RichTextEditor from '../../components/ui/RichTextEditor';
import EmailAuthModal from '../../components/research/EmailAuthModal';
import { useEmailAuth } from '../../hooks/useEmailAuth';
import { isAdminEmail } from '../../utils/adminEmails';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  file: File;
}

export default function ResearchWrite() {
  const router = useRouter();
  const { authState, logout } = useEmailAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    category: '제품연구',
    author: '',
    summary: '',
    content: '',
    tags: '',
    featured: false
  });
  
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 인증 상태 확인
  useEffect(() => {
    if (!authState.loading && !authState.isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [authState]);

  // 인증된 이메일로 작성자 자동 설정
  useEffect(() => {
    if (authState.isAuthenticated && authState.email) {
      setFormData(prev => ({ ...prev, author: authState.email! }));
    }
  }, [authState]);

  const categories = [
    { id: '제품연구', name: '제품연구' },
    { id: '기술개발', name: '기술개발' },
    { id: 'IoT연구', name: 'IoT연구' },
    { id: '소재연구', name: '소재연구' },
    { id: 'AI연구', name: 'AI연구' },
    { id: '의료연구', name: '의료연구' },
    { id: '임상연구', name: '임상연구' }
  ];

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const newFile: AttachedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || 'application/octet-stream',
        file: file
      };
      
      setAttachedFiles(prev => [...prev, newFile]);
    });
    
    // 파일 입력 초기화
    e.target.value = '';
  };

  // 파일 삭제 핸들러
  const handleFileRemove = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = '작성자를 입력해주세요.';
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = '요약을 입력해주세요.';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 인증 확인
    if (!authState.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: API 연동 구현 예정
      console.log('게시글 데이터:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        files: attachedFiles,
        authorEmail: authState.email
      });
      
      // 임시: 2초 후 목록으로 이동
      setTimeout(() => {
        alert('게시글이 성공적으로 작성되었습니다.');
        router.push('/research');
      }, 2000);
      
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  // 인증 성공 핸들러
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // 인증 모달 닫기 핸들러
  const handleAuthModalClose = () => {
    if (!authState.isAuthenticated) {
      // 인증하지 않고 모달을 닫으면 목록으로 이동
      router.push('/research');
    } else {
      setShowAuthModal(false);
    }
  };

  return (
    <>
      <Head>
        <title>연구게시글 작성 | SALIX Life</title>
        <meta name="description" content="새로운 연구 자료를 게시판에 작성하세요." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* 메인 콘텐츠 - 헤더 바로 아래서 시작 */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col scrollbar-custom"
            style={{ 
              height: 'calc(100vh - 120px)', 
              marginBottom: '60px'
            }}
          >
            <div className="px-8 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    새 게시글
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {authState.isAuthenticated && (
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="users" className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{authState.email}</span>
                      {isAdminEmail(authState.email!) && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          관리자
                        </span>
                      )}
                      <button
                        onClick={logout}
                        className="text-gray-500 hover:text-red-600 ml-2"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    * 필수 입력 항목
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 scrollbar-custom">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 기본 정보 섹션 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="trending" className="w-5 h-5 text-blue-600" />
                    기본 정보
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 제목 */}
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                        제목 *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-lg font-medium text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        placeholder="연구게시글 제목을 입력하세요"
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <Icon name="trending" className="w-4 h-4 rotate-45" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* 카테고리 */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                        카테고리 *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 bg-white rounded-lg text-lg font-medium text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
                        style={{ color: '#000000' }}
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id} className="text-black bg-white">
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 작성자 */}
                    <div>
                      <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-3">
                        작성자 *
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-lg font-medium text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.author ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        placeholder="작성자명을 입력하세요"
                        readOnly={authState.isAuthenticated}
                      />
                      {errors.author && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <Icon name="trending" className="w-4 h-4 rotate-45" />
                          {errors.author}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 내용 섹션 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="technology" className="w-5 h-5 text-green-600" />
                    연구 내용
                  </h3>
                  
                  {/* 요약 */}
                  <div className="mb-6">
                    <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-3">
                      요약 *
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-4 border-2 rounded-lg text-lg font-medium text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none ${
                        errors.summary ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      placeholder="연구 내용의 간단한 요약을 입력하세요 (2-3줄 정도)"
                    />
                    {errors.summary && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <Icon name="trending" className="w-4 h-4 rotate-45" />
                        {errors.summary}
                      </p>
                    )}
                  </div>

                  {/* 내용 */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-3">
                      내용 *
                    </label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      placeholder="연구 내용을 상세히 작성하세요

예시:
1. 연구 목적
2. 연구 방법  
3. 주요 결과
4. 결론 및 향후 계획

툴바를 사용하여 텍스트를 꾸미고, 이미지나 링크를 추가할 수 있습니다."
                      error={errors.content}
                    />
                  </div>
                </div>

                {/* 추가 정보 섹션 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="users" className="w-5 h-5 text-purple-600" />
                    추가 정보
                  </h3>
                  
                  {/* 태그 */}
                  <div className="mb-6">
                    <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-3">
                      태그
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 bg-white rounded-lg text-lg font-medium text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
                      placeholder="태그를 쉼표로 구분하여 입력하세요 (예: 산소공급, 의료기기, 연구개발)"
                    />
                    <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                      <Icon name="technology" className="w-4 h-4" />
                      쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다.
                    </p>
                  </div>

                  {/* 주요 연구 표시 */}
                  {isAdminEmail(authState.email || '') && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor="featured" className="flex-1">
                        <span className="block text-sm font-semibold text-gray-900">
                          주요 연구로 표시
                        </span>
                        <span className="block text-xs text-gray-600 mt-1">
                          이 옵션을 선택하면 게시글이 주요 연구로 표시됩니다. (관리자만 설정 가능)
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* 첨부파일 섹션 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="technology" className="w-5 h-5 text-indigo-600" />
                    첨부파일
                  </h3>
                  
                  {/* 파일 업로드 영역 */}
                  <div className="mb-4">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Icon name="technology" className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">클릭하여 파일 선택</span> 또는 드래그 앤 드롭
                        </p>
                        <p className="text-xs text-gray-500">PDF, Word, Excel, 이미지 파일 등</p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>

                  {/* 첨부파일 목록 */}
                  {attachedFiles.length > 0 && (
                    <div className="space-y-2">
                      {attachedFiles.map(file => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <Icon name="technology" className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleFileRemove(file.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Icon name="technology" className="w-5 h-5 rotate-45" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/research"
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    목록으로 돌아가기
                  </Link>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => router.push('/research')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          작성 중...
                        </span>
                      ) : (
                        '게시글 작성'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 이메일 인증 모달 */}
      <EmailAuthModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        onSuccess={handleAuthSuccess}
        purpose="post"
        title="게시글 작성 인증"
      />
    </>
  );
} 