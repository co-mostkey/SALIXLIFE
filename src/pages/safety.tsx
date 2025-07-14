import React from 'react';
import Layout from '../components/layout/Layout';
import ContainerWrapper from '../components/ui/ContainerWrapper';
import { useCommonTranslation } from '../utils/i18n';

export default function Safety() {
  const { t } = useCommonTranslation();
  
  return (
    <Layout>
      <ContainerWrapper className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              안전 정보
            </h1>
            <p className="text-xl text-gray-600">
              샐릭스 O² 제품의 안전한 사용을 위한 중요한 정보들
            </p>
          </div>

          {/* 안전 기준 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">안전 기준</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">압력 관리</h3>
                <p className="text-gray-600">{t('products.common.specs.pressure')} 고압 실린더의 안전한 압력 관리</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">중량 설계</h3>
                <p className="text-gray-600">{t('products.common.specs.weight')} 설계로 휴대 시 안전성 확보</p>
              </div>
            </div>
          </div>

          {/* 사용 주의사항 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">사용 주의사항</h2>
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  직사광선이나 고온 환경에 장시간 노출하지 마세요
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  {t('products.common.specs.pressure')} 고압이므로 충격을 가하지 마세요
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  {t('products.common.specs.purity')} 순도의 산소를 제공하므로 화기 근처에서 사용하지 마세요
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  어린이의 손이 닿지 않는 곳에 보관하세요
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
} 