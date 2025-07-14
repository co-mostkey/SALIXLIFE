import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { useTechnologyTranslation } from '../../utils/i18n';

export default function CoreInnovationsSlide() {
  const { t } = useTechnologyTranslation();

  // 새로운 분산 구조에서 데이터 가져오기
  const slideData = t('slides.coreInnovations') || {};
  const coreInnovationsData = slideData.coreInnovationsData || {};
  const innovations = coreInnovationsData.innovations || [];

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
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          
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
                {coreInnovationsData.subtitle || 'Core Innovations'}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-1.5 leading-tight"
            >
              <span className="font-extralight text-gray-600">{coreInnovationsData.titleParts?.prefix || '핵심'}</span>{' '}
              <span className="font-medium bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                {coreInnovationsData.titleParts?.main || '혁신 기술'}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {coreInnovationsData.description || '독창적인 엔지니어링과 첨단 소재 기술로 구현한 차세대 호흡 솔루션의 핵심 혁신'}
            </motion.p>
          </motion.div>

          {/* 혁신 기술 그리드 - flex-1으로 남은 공간 활용 */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-start">
            {innovations.map((innovation: any, index: number) => (
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
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* 메인 글래스 카드 */}
                <div className="relative bg-transparent backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[200px]">
                  
                  {/* 메탈릭 하이라이트 */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-2xl"></div>
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-l-2xl"></div>
                  
                  {/* 상단 메트릭 */}
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      className="text-xl font-light text-gray-900"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    >
                      {innovation.metric}
                    </motion.div>
                    <div className="px-2 py-0.5 bg-transparent backdrop-blur-sm border border-white/60 rounded-full shadow-sm">
                      <span className="text-xs font-medium text-gray-700">
                        {innovation.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* 제목 및 부제목 */}
                  <div className="mb-2">
                    <h3 className="text-base font-medium text-gray-900 mb-1 leading-tight">
                      {innovation.title}
                    </h3>
                    <p className="text-xs font-light text-gray-500 uppercase tracking-wider">
                      {innovation.subtitle}
                    </p>
                  </div>
                  
                  {/* 설명 */}
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-3 flex-1 line-clamp-2">
                    {innovation.description}
                  </p>
                  
                  {/* 하단 인디케이터 */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-600 font-medium">{coreInnovationsData.common?.verified || '검증 완료'}</span>
                    </div>
                    <div className="w-8 h-8 bg-transparent backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:rotate-90">
                      <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* 호버 효과 */}
                  <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-500 rounded-2xl"></div>
                </div>
                
                {/* 그림자 효과 */}
                <div className="absolute inset-0 bg-gray-900/5 rounded-2xl transform translate-y-1 translate-x-1 -z-10 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 