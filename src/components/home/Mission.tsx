import React from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import { useCommonTranslation } from '../../utils/i18n';

export default function Mission() {
  const { t } = useCommonTranslation();
  
  return (
    <section className="py-16 bg-dark">
      <ContainerWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            {t('home.mission.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto my-4 rounded-full opacity-70"></div>
          <p className="text-lg text-white/80 leading-relaxed">
            {t('home.mission.description')}
          </p>
          
          {/* 추가적인 미션 관련 내용 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-dark/60 border border-primary/20 p-6 rounded-lg text-left">
              <h3 className="text-xl font-semibold text-white mb-3">
                생명을 위한 혁신
              </h3>
              <p className="text-white/70">
                화재 현장, 밀폐 공간, 고산 지대, 의료 응급 상황 등에서 즉각적으로 활용 가능한 혁신적인 호흡기기를 개발합니다.
              </p>
            </div>
            <div className="bg-dark/60 border border-primary/20 p-6 rounded-lg text-left">
              <h3 className="text-xl font-semibold text-white mb-3">
                포괄적인 호흡 솔루션
              </h3>
              <p className="text-white/70">
                작업자, 소방관, 환자, 일반 소비자까지 포괄적인 호흡의 질을 보장하는 초소형 장치를 통해 안전한 호흡을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
} 