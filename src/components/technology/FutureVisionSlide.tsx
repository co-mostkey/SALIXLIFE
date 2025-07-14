import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { useTechnologyTranslation } from '../../utils/i18n';

export default function FutureVisionSlide() {
  const { t: tTech } = useTechnologyTranslation();
  
  // 새로운 분산 구조에서 데이터 가져오기
  const slideData = tTech('slides.futureVision') || {};
  const futureVisionData = slideData.futureVisionData || {};
  const futureTech = futureVisionData.futureTech || [];
  const roadmap = futureVisionData.roadmap || [];

  return (
    <div className="h-full bg-transparent relative overflow-hidden">
      {/* 메탈릭 배경 요소들 - 투명 처리 */}
      <div className="absolute inset-0 opacity-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-white/20 to-gray-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-tr from-gray-300/15 to-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* 미세한 그리드 패턴 - 투명 처리 */}
      <div className="absolute inset-0 opacity-0">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col py-2 px-10">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col min-h-0">
          
          {/* 헤더 - 높이 축소 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-3"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-transparent backdrop-blur-md border border-white/40 rounded-full shadow-lg mb-3 -mt-6"
            >
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
              <span className="text-xs font-medium text-gray-800 tracking-wider uppercase">
                {futureVisionData.subtitle || 'Future Vision'}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl lg:text-3xl font-light text-gray-900 mb-1.5 leading-tight"
            >
              <span className="font-extralight text-gray-600">{futureVisionData.titleParts?.prefix || '미래'}</span>{' '}
              <span className="font-medium bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                {futureVisionData.titleParts?.main || '비전'}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {futureVisionData.description || '끊임없는 연구개발을 통해 호흡 기술 분야의 글로벌 리더로 도약합니다'}
            </motion.p>
          </motion.div>

          {/* 콘텐츠 영역 - 스크롤 가능 */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
            {/* 상단 미래 기술 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {futureTech.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.01,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* 메인 글래스 카드 */}
                  <div className="relative bg-transparent backdrop-blur-xl border border-white/50 rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[140px]">
                    
                    {/* 메탈릭 하이라이트 */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-xl"></div>
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-l-xl"></div>
                    
                    {/* 상태 태그 */}
                    <div className="flex items-center justify-between mb-2">
                                          <div className="px-2 py-1 bg-transparent backdrop-blur-sm border border-white/60 rounded-full shadow-sm">
                      <span className="text-xs font-medium text-gray-700">
                        {item.status || '미래 기술'}
                      </span>
                    </div>
                    </div>
                    
                    {/* 제목 및 설명 */}
                    <div className="mb-3">
                      <h3 className="text-base font-medium text-gray-900 mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* 하단 인디케이터 */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-600 font-medium">{futureVisionData.common?.inProgress || '진행 중'}</span>
                      </div>
                      <div className="w-6 h-6 bg-transparent backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:rotate-90">
                        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 호버 효과 */}
                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-500 rounded-xl"></div>
                  </div>
                  
                  {/* 그림자 효과 */}
                  <div className="absolute inset-0 bg-gray-900/5 rounded-xl transform translate-y-1 translate-x-1 -z-10 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-300"></div>
                </motion.div>
              ))}
            </div>

            {/* 하단 로드맵 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmap.map((milestone: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.01,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* 로드맵 카드 */}
                  <div className="relative bg-transparent backdrop-blur-xl border border-white/50 rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[140px]">
                    
                    {/* 메탈릭 하이라이트 */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-xl"></div>
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-l-xl"></div>
                    
                    {/* 연도 및 상태 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base font-medium text-gray-900">
                        {milestone.year}
                      </div>
                      <div className="px-2 py-1 bg-transparent backdrop-blur-sm border border-white/60 rounded-full shadow-sm">
                        <span className="text-xs font-medium text-gray-700">
                          {milestone.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* 제목 및 설명 */}
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-2">
                        {milestone.description}
                      </p>
                    </div>
                    
                    {/* 하단 인디케이터 */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600 font-medium">{futureVisionData.common?.roadmap || '로드맵'}</span>
                      </div>
                      <div className="w-6 h-6 bg-transparent backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:rotate-90">
                        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 호버 효과 */}
                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-500 rounded-xl"></div>
                  </div>
                  
                  {/* 그림자 효과 */}
                  <div className="absolute inset-0 bg-gray-900/5 rounded-xl transform translate-y-1 translate-x-1 -z-10 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 