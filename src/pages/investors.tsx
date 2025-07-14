import React from 'react';
import Layout from '../components/layout/Layout';
import ContainerWrapper from '../components/ui/ContainerWrapper';
import { useLanguage } from '../utils/i18n';

export default function Investors() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <ContainerWrapper className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              투자자 정보
            </h1>
            <p className="text-xl text-gray-600">
              샐릭스 라이프의 투자 기회와 성장 잠재력을 확인하세요
            </p>
          </div>

          {/* 핵심 기술 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">핵심 기술 우위</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">특허 기술</h3>
                <p className="text-gray-600">{t('products.common.specs.pressure')} 고압 저장 특허 기술</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">시장 우위</h3>
                <p className="text-gray-600">경쟁사 대비 {t('products.common.specs.capacity_multiplier')} 용량</p>
              </div>
            </div>
          </div>

          {/* 시장 기회 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">시장 기회</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 className="text-4xl font-bold text-primary mb-2">{t('products.common.specs.cylinderVolume')}</h3>
                <p className="text-gray-600">압축 기술</p>
              </div>
              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 className="text-4xl font-bold text-secondary mb-2">{t('products.common.specs.weight')}</h3>
                <p className="text-gray-600">휴대성</p>
              </div>
              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 className="text-4xl font-bold text-primary mb-2">{t('products.common.specs.pressure')} 복합재 실린더</h3>
                <p className="text-gray-600">안전성</p>
              </div>
            </div>
          </div>

          {/* 비즈니스 모델 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">비즈니스 모델</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">제품 판매</h3>
                <p className="text-gray-600">하드웨어 판매 수익</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">구독 서비스</h3>
                <p className="text-gray-600">{t('products.common.specs.oxygenCapacity')} 산소 충전</p>
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
} 