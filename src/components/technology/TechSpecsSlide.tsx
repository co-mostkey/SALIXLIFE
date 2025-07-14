import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { useTechnologyTranslation } from '../../utils/i18n';

export default function TechSpecsSlide() {
  const { t: tTech } = useTechnologyTranslation();
  const [activeTab, setActiveTab] = useState(0);

  // 새로운 분산 구조에서 데이터 가져오기
  const slideData = tTech('slides.techSpecs') || {};
  const techSpecsData = slideData.techSpecsData || {};
  const specs = techSpecsData.specs || {};
  const categories = techSpecsData.categories || {};

  const techSpecsCategories = [
    {
      id: 'basic',
      title: categories.basic?.title || '기본 사양',
      icon: categories.basic?.icon || '🔧',
      specs: specs.basic || []
    },
    {
      id: 'technical',
      title: categories.technical?.title || '기술 사양',
      icon: categories.technical?.icon || '⚙️',
      specs: specs.technical || []
    },
    {
      id: 'smart',
      title: categories.smart?.title || '스마트 기능',
      icon: categories.smart?.icon || '📱',
      specs: specs.smart || []
    },
    {
      id: 'safety',
      title: categories.safety?.title || '안전 기능',
      icon: categories.safety?.icon || '🛡️',
      specs: specs.safety || []
    }
  ];

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
          
          {/* 헤더 */}
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
                {techSpecsData.subtitle || 'Tech Specifications'}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 mb-1.5 leading-tight"
            >
              <span className="font-extralight text-gray-600">{techSpecsData.titleParts?.prefix || '기술'}</span>{' '}
              <span className="font-medium bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                {techSpecsData.titleParts?.main || '사양'}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {techSpecsData.description || '엄격한 기준과 최첨단 기술로 구현된 혁신적인 사양들을 확인하세요'}
            </motion.p>
          </motion.div>

          {/* 탭 네비게이션 */}
          <div className="flex justify-center mb-8">
            <div className="bg-transparent backdrop-blur-md border border-white/40 rounded-2xl p-2 shadow-lg">
              <div className="flex gap-2">
                {techSpecsCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(index)}
                                          className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-transparent text-gray-900 shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-transparent'
                      }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 사양 그리드 */}
          <div className="flex-1 content-start">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {techSpecsCategories[activeTab].specs.map((spec: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* 메인 글래스 카드 */}
                  <div className="relative bg-transparent backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[160px] flex flex-col">
                    
                    {/* 메탈릭 하이라이트 */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-2xl"></div>
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-l-2xl"></div>
                    
                    {/* 상단 메트릭과 하이라이트 표시 */}
                    <div className="flex items-center justify-between mb-3">
                      <motion.div 
                        className="text-xl font-light text-gray-900"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      >
                        {spec.value}
                      </motion.div>
                      <div className="px-2 py-0.5 bg-transparent backdrop-blur-sm border border-white/60 rounded-full shadow-sm">
                        <span className="text-xs font-medium text-gray-700">
                          {spec.highlight ? (techSpecsData.common?.highlight || '핵심 기술') : (techSpecsData.common?.standard || '표준 사양')}
                        </span>
                      </div>
                    </div>
                    
                    {/* 제목 및 설명 */}
                    <div className="mb-3 flex-1">
                      <h3 className="text-base font-medium text-gray-900 mb-1 leading-tight">
                        {spec.label}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {spec.highlight ? (techSpecsData.common?.majorSpec || '주요 사양') : (techSpecsData.common?.basicSpec || '기본 사양')}
                      </p>
                    </div>
                    
                    {/* 하단 인디케이터 */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600 font-medium">{techSpecsData.common?.verified || '검증 완료'}</span>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 