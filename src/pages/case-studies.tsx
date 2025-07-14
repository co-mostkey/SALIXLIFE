import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ContainerWrapper from '../components/ui/ContainerWrapper';
import ModelContainer from '../components/3d/ModelContainer';
import { useLanguage } from '../utils/i18n';

export default function CaseStudies() {
  const { t } = useLanguage();
  
  // 실제 제품 데이터로 변경
  const products: Record<string, any> = {
    device: {
      name: t('products.device.name'),
      features: t('products.device.features') || [],
      modelPath: '/models/device.glb'
    },
    deviceear: {
      name: t('products.deviceear.name'),
      features: t('products.deviceear.features') || [],
      modelPath: '/models/deviceear.glb'
    },
    devicecontact: {
      name: t('products.devicecontact.name'),
      features: t('products.devicecontact.features') || [],
      modelPath: '/models/devicecontact.glb'
    }
  };

  const [selectedProduct, setSelectedProduct] = useState('device');
  const [activeTab, setActiveTab] = useState(0);

  const realCases = [
    {
      title: '네팔 히말라야 등반 성공',
      location: '에베레스트 베이스캠프',
      participant: '김산악 (28세, 등반가)',
      description: '5,364m 고도에서 고산병 증상 완전 해소. 24시간 교대 근무 중 피로 회복과 집중력 유지를 위해 SALIX O² 사용',
      before: '심한 두통, 메스꺼움, 현기증',
      after: '10분 사용 후 증상 완전 해소, 정상 활동 가능',
      usage: '고도 3,000m 이상에서 30분씩 3회 사용',
      author: '네팔 가이드 협회'
    },
    {
      title: '마라톤 선수 기록 단축',
      location: '국가대표 훈련원',
      participant: '박달리 (32세, 마라톤 선수)',
      description: '고강도 인터벌 훈련 후 회복 시간 50% 단축',
      before: '훈련 후 2시간 회복 시간 필요',
      after: '1시간 내 완전 회복, 다음 훈련 가능',
      usage: '훈련 직후 15분, 취침 전 10분 사용',
      author: '대한육상연맹'
    }
  ];

  const tabs = [
    { id: 'studies', label: '실제 사례 연구' },
    { id: 'products', label: '제품별 활용' },
    { id: 'scenarios', label: '상황별 솔루션' },
    { id: 'testimonials', label: '사용자 후기' }
  ];

  const scenarios = [
    {
      title: '응급 상황',
      icon: '🚨',
      situations: [
        { name: '화재 현장 대피', effect: '일산화탄소 중독 예방', time: '5-10분' },
        { name: '밀폐 공간 작업', effect: '산소 부족 해소', time: '지속 사용' },
        { name: '의료 응급상황', effect: '호흡 곤란 완화', time: '필요시' }
      ]
    }
  ];

  return (
    <Layout>
      <ContainerWrapper className="bg-gradient-to-br from-black via-slate-950 to-black overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              사용 사례 <span className="text-secondary">연구</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              다양한 분야에서 검증된 SALIX O²의 실제 사용 사례와 효과
            </p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-secondary text-white'
                    : 'text-white/70 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div key={activeTab} className="min-h-[600px]">
            {/* 제품별 활용 탭 */}
            {activeTab === 1 && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  {/* 좌측: 3D 모델 */}
                  <div className="relative h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
                    <ModelContainer 
                      modelPath={products[selectedProduct].modelPath}
                      className="w-full h-full relative z-10"
                      selectedColor="#FFFFFF"
                      selectedMaterial="anodizing"
                      isProductPage={false}
                    />
                  </div>

                  {/* 우측: 제품 정보 */}
                  <div>
                    {/* 제품 선택 */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {Object.keys(products).map((productId) => (
                        <button
                          key={productId}
                          onClick={() => setSelectedProduct(productId)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            selectedProduct === productId
                              ? 'bg-secondary text-white'
                              : 'text-white/70 hover:text-white hover:bg-slate-700/50'
                          }`}
                        >
                          {products[productId].name}
                        </button>
                      ))}
                    </div>

                    {/* 선택된 제품 정보 */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {products[selectedProduct].name}
                      </h3>
                      <div className="space-y-3">
                        {products[selectedProduct].features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-white/80">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
} 