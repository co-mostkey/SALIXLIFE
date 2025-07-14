import React from 'react';
import Layout from '../components/layout/Layout';
import ContainerWrapper from '../components/ui/ContainerWrapper';
import { useCommonTranslation } from '../utils/i18n';

export default function Subscription() {
  const { t } = useCommonTranslation();
  
  return (
    <Layout>
      <ContainerWrapper className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              구독 서비스
            </h1>
            <p className="text-xl text-gray-600">
              샐릭스 O² 구독으로 언제나 신선한 산소를 경험하세요
            </p>
          </div>

          {/* 구독 플랜 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">베이직</h3>
              <div className="text-4xl font-bold text-primary mb-4">월 29,700원</div>
              <p className="text-gray-600 mb-6">{t('products.common.specs.oxygenCapacity')} 월 충전 서비스</p>
              <ul className="space-y-2 text-gray-600">
                <li>• 월 1회 충전</li>
                <li>• 기본 고객 지원</li>
                <li>• 모바일 앱 사용</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">프리미엄</h3>
              <div className="text-4xl font-bold text-secondary mb-4">월 49,700원</div>
              <p className="text-gray-600 mb-6">{t('products.common.specs.oxygenCapacity')} × 2회 월 충전</p>
              <ul className="space-y-2 text-gray-600">
                <li>• 월 2회 충전</li>
                <li>• 우선 고객 지원</li>
                <li>• 건강 분석 리포트</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">프로</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">월 79,700원</div>
              <p className="text-gray-600 mb-6">무제한 충전 서비스</p>
              <ul className="space-y-2 text-gray-600">
                <li>• 무제한 충전</li>
                <li>• 24/7 전담 지원</li>
                <li>• 맞춤형 건강 관리</li>
              </ul>
            </div>
          </div>

          {/* 서비스 특징 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">서비스 특징</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">편리한 충전</h3>
                <p className="text-gray-600">전국 충전소 또는 방문 서비스로 {t('products.common.specs.oxygenCapacity')} 산소 충전</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">고순도 산소</h3>
                <p className="text-gray-600">{t('products.common.specs.purity')} 의료용 순수 산소 제공</p>
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
}