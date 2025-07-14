import React, { useState } from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import { useTechnologyTranslation, useProductsTranslation } from '../../utils/i18n';

export default function TechSpecs() {
  const { t: tTech } = useTechnologyTranslation();
  const { t: tProducts } = useProductsTranslation();
  const [activeTab, setActiveTab] = useState(0);

  // 번역 시스템을 사용한 기술 사양 - 중앙집중화된 데이터 활용
  const techSpecsCategories = [
    {
      id: 'basic',
      title: '기본 사양',
      specs: tTech('tech_specs.basic') || []
    },
    {
      id: 'technical', 
      title: '기술 사양',
      specs: tTech('tech_specs.technical') || []
    },
    {
      id: 'smart',
      title: '스마트 기능',
      specs: tTech('tech_specs.smart') || []
    },
    {
      id: 'safety',
      title: '안전 기능',
      specs: tTech('tech_specs.safety') || []
    },
    {
      id: 'rental',
      title: '사용 & 렌탈',
      specs: [
        { label: '즉시 효과', value: '5-10분 사용', highlight: true },
        { label: '고산병 완화', value: '두통/메스꺼움 완화' },
        { label: '렌탈 보증금', value: '$100 (네팔)' },
        { label: '사용료', value: '$50 (반납시)', highlight: true },
        { label: '휴대성', value: '압도적 경량성' }
      ]
    }
  ];

  // 번역 시스템을 사용한 혁신 기술
  const innovations = tProducts('innovations') || [];

  // 번역 시스템을 사용한 비교 데이터
  const comparisonData = tProducts('comparison.categories') || [];

  return (
    <section className="py-20 bg-gradient-to-br from-dark via-dark/95 to-slate-900">
      <ContainerWrapper>
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              기술 사양 <span className="text-primary">& 혁신</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              엄격한 기준과 최첨단 기술로 구현된 혁신적인 사양들을 확인하세요
            </p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {techSpecsCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-dark/50 text-white/70 hover:bg-dark/70 hover:text-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* 활성 탭 내용 */}
          <div className="bg-dark/30 backdrop-blur-lg rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {techSpecsCategories[activeTab].title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techSpecsCategories[activeTab].specs.map((spec: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    spec.highlight
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-dark/30 border-slate-700/50 text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium opacity-80">{spec.label}</span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 혁신 기술 섹션 */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              4대 핵심 <span className="text-primary">혁신 기술</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {innovations.map((innovation: any, index: number) => (
                <div
                  key={index}
                  className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{innovation.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {innovation.title}
                      </h4>
                      <p className="text-white/80 leading-relaxed">
                        {innovation.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 성능 비교 */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              경쟁사 대비 <span className="text-primary">성능 우위</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonData.map((data: any, index: number) => (
                <div
                  key={index}
                  className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-primary/20 text-center"
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {data.label}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">SALIX</span>
                      <span className="text-primary font-bold">{data.ourValue}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">경쟁사</span>
                      <span className="text-white/60">{data.theirValue}</span>
                    </div>
                    
                    {/* 진행바 */}
                    <div className="w-full bg-dark/50 rounded-full h-2 mt-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(data.ours, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
} 