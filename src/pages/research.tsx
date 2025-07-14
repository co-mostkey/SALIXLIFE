import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import FullScreenSection from '../components/ui/FullScreenSection';
import AnimatedSection from '../components/ui/AnimatedSection';
import Icon from '../components/ui/Icon';
import Link from 'next/link';
import { researchPosts, ResearchPost, AttachedFile } from '../data/researchPosts';
import { useLanguage, useResearchTranslation } from '../utils/i18n';

export default function Research() {
  const { locale } = useLanguage();
  const { t } = useResearchTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  // 카테고리 목록
  const categories = [
    { id: 'all', name: t('research.board.category.all'), value: '전체' },
    { id: 'product', name: t('research.board.category.product'), value: '제품연구' },
    { id: 'technology', name: t('research.board.category.technology'), value: '기술개발' },
    { id: 'iot', name: t('research.board.category.iot'), value: 'IoT연구' },
    { id: 'material', name: t('research.board.category.material'), value: '소재연구' },
    { id: 'ai', name: t('research.board.category.ai'), value: 'AI연구' },
    { id: 'medical', name: t('research.board.category.medical'), value: '의료연구' },
    { id: 'clinical', name: t('research.board.category.clinical'), value: '임상연구' }
  ];

  // 카테고리별 필터링
  const filteredPosts = selectedCategory === 'all' 
    ? researchPosts 
    : researchPosts.filter(post => post.category === categories.find(cat => cat.id === selectedCategory)?.value);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // 카테고리 변경 시 첫 페이지로 이동
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // 카테고리 이름 번역
  const getCategoryName = (categoryValue: string): string => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.name : categoryValue;
  };

  // 첨부파일 개수 표시
  const getAttachmentCount = (count: number): string => {
    if (locale === 'ko') return `${count}개`;
    if (locale === 'ja') return `${count}個`;
    return count.toString();
  };

  return (
    <>
      <Head>
        <title>{t('research.board.title')} | SALIX Life</title>
        <meta name="description" content={t('research.board.subtitle')} />
      </Head>

      <FullScreenSection contentPadding={false}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          {/* 헤더 섹션 */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('research.board.title')}
                </h1>
                <p className="text-lg text-gray-600">
                  {t('research.board.subtitle')}
                </p>
              </div>

              {/* 카테고리 필터 */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* 메인 콘텐츠 - 목록형 게시판 */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {/* 테이블 헤더 */}
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
                    <div className="col-span-1 text-center">{t('research.board.table.no')}</div>
                    <div className="col-span-1 text-center">{t('research.board.table.category')}</div>
                    <div className="col-span-4">{t('research.board.table.title')}</div>
                    <div className="col-span-2 text-center">{t('research.board.table.author')}</div>
                    <div className="col-span-1 text-center">{t('research.board.table.date')}</div>
                    <div className="col-span-2 text-center">{t('research.files.title')}</div>
                    <div className="col-span-1 text-center">{t('research.board.table.downloads')}</div>
                  </div>
                </div>

                {/* 게시글 목록 */}
                <div className="divide-y divide-gray-200">
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* 번호 */}
                      <div className="col-span-1 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          post.featured 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {post.id}
                        </span>
                      </div>

                      {/* 카테고리 */}
                      <div className="col-span-1 text-center">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {getCategoryName(post.category)}
                        </span>
                      </div>

                      {/* 제목 */}
                      <div className="col-span-4">
                        <Link 
                          href={`/research/${post.id}`}
                          className="text-gray-900 hover:text-primary font-medium transition-colors duration-200"
                        >
                          {post.title}
                          {post.featured && (
                            <span className="ml-2 text-xs text-primary font-bold">★</span>
                          )}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {post.summary}
                        </p>
                      </div>

                      {/* 작성자 */}
                      <div className="col-span-2 text-center text-sm text-gray-700">
                        {post.author}
                      </div>

                      {/* 작성일 */}
                      <div className="col-span-1 text-center text-sm text-gray-600">
                        {post.date}
                      </div>

                      {/* 첨부파일 */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm text-gray-400">
                          {getAttachmentCount(0)}
                        </span>
                      </div>

                      {/* 다운로드 수 */}
                      <div className="col-span-1 text-center text-sm text-gray-600">
                        {post.downloadCount}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* 검색 결과 없음 */}
                {currentPosts.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('research.board.noResults')}</h3>
                    <p className="text-gray-500">{t('research.board.noResults')}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('research.board.pagination.previous')}
                </motion.button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('research.board.pagination.next')}
                </motion.button>
              </div>
            )}

            {/* 하단 정보 및 작성 버튼 */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm text-gray-500">
                  {t('research.board.info.totalCount', { count: filteredPosts.length })} | {t('research.board.info.pageInfo', { current: currentPage, total: totalPages })}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {t('research.files.download.requireAuth')}
                </p>
              </div>
              
              {/* 게시글 작성 버튼 */}
              <Link 
                href="/research/write"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                <Icon name="technology" className="w-4 h-4" />
                {t('research.board.writeButton')}
              </Link>
            </div>
          </div>
          
          {/* 푸터 공간 확보 */}
          <div className="h-20"></div>
        </div>
      </FullScreenSection>
    </>
  );
} 