import React from 'react';
import Icon from '../ui/Icon';
import { useProductsTranslation } from '../../utils/i18n';

export default function BenefitsShowcase() {
  const { t } = useProductsTranslation();
  
  const benefits = [
    {
      id: 'travel',
      title: '여행 & 출장',
      description: '장거리 비행 후 빠른 회복과 시차적응 개선',
      icon: 'portable',
      position: 'top-left'
    },
    {
      id: 'sports',
      title: '스포츠 & 운동',
      description: '운동 성능 향상, 지구력 증대 및 빠른 회복',
      icon: 'trending',
      position: 'top-right'
    },
    {
      id: 'pollution',
      title: '대기오염 대응',
      description: '미세먼지와 대기오염으로부터 깨끗한 산소 공급',
      icon: 'eco',
      position: 'bottom-left'
    },
    {
      id: 'party',
      title: '숙취 해소',
      description: '알코올 섭취 후 빠른 회복과 컨디션 개선',
      icon: 'health',
      position: 'bottom-right'
    },
    {
      id: 'study',
      title: '학습 & 업무',
      description: '집중력 향상과 정신적 피로 완화',
      icon: 'smart',
      position: 'left'
    },
    {
      id: 'elevation',
      title: '고산지대',
      description: '고산병 예방 및 고도 적응 지원',
      icon: 'mountain',
      position: 'right'
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-8 left-8 md:top-16 md:left-16';
      case 'top-right':
        return 'absolute top-8 right-8 md:top-16 md:right-16';
      case 'bottom-left':
        return 'absolute bottom-8 left-8 md:bottom-16 md:left-16';
      case 'bottom-right':
        return 'absolute bottom-8 right-8 md:bottom-16 md:right-16';
      case 'left':
        return 'absolute top-1/2 left-8 md:left-16 -translate-y-1/2';
      case 'right':
        return 'absolute top-1/2 right-8 md:right-16 -translate-y-1/2';
      default:
        return '';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            SALIX O²의 <span className="text-primary">다양한 혜택</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            일상 속 다양한 상황에서 활용할 수 있는 혁신적인 산소 솔루션
          </p>
        </div>

        {/* 중앙 제품 이미지와 원형 배치 혜택 */}
        <div className="relative max-w-6xl mx-auto h-[600px] md:h-[800px]">
          {/* 배경 원형 그라데이션 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/25 opacity-60"></div>
          </div>

          {/* 중앙 제품 이미지 */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              {/* 3D 모델 컨테이너 대신 임시 제품 이미지 */}
              <div className="w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden border border-gray-200">
                {/* 제품 실루엣 */}
                <div className="w-32 h-48 md:w-40 md:h-60 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">SALIX</div>
                    <div className="text-lg md:text-xl">O²</div>
                    <div className="text-sm md:text-base mt-2 opacity-80">{t('common.specs.oxygenCapacity')} 대용량</div>
                  </div>
                </div>
                
                {/* 제품 하이라이트 */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
                  {t('common.specs.duration')}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
                  {t('common.specs.capacity_multiplier')}
                </div>
              </div>
            </div>
          </div>

          {/* 혜택 카드들 */}
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`${getPositionClasses(benefit.position)} w-48 md:w-56 group cursor-pointer`}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-primary/40">
                {/* 아이콘 */}
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={benefit.icon as any} className="w-6 h-6 text-primary" />
                </div>
                
                {/* 제목 */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                
                {/* 설명 */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>

                {/* 연결선 (중앙으로) */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg
                    className="absolute top-1/2 left-1/2 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      width: '200px',
                      height: '200px'
                    }}
                  >
                    <line
                      x1="50%"
                      y1="50%"
                      x2={benefit.position.includes('left') ? '100%' : benefit.position.includes('right') ? '0%' : '50%'}
                      y2={benefit.position.includes('top') ? '100%' : benefit.position.includes('bottom') ? '0%' : '50%'}
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      className="text-primary"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 핵심 메시지 */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/8 to-secondary/8 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              언제 어디서나 <span className="text-primary">깨끗한 산소</span>
            </h3>
            <p className="text-gray-700 mb-6">
              SALIX O²는 일상생활의 다양한 순간에 필요한 깨끗하고 순수한 산소를 제공합니다. 
              휴대가 간편하고 사용이 쉬워 누구나 언제든지 활용할 수 있습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm border border-gray-100">
                {t('common.specs.purity')} 순수 산소
              </div>
              <div className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm border border-gray-100">
                FDA 승인 시설 제조
              </div>
              <div className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm border border-gray-100">
                친환경 소재
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 