import React from 'react';
import Link from 'next/link';
import ContainerWrapper from '../ui/ContainerWrapper';
import Icon from '../ui/Icon';
import { useProductsTranslation } from '../../utils/i18n';

export default function GlobalStrategy() {
  const { t } = useProductsTranslation();
  
  return (
    <section className="py-20 bg-gradient-to-b from-dark via-dark/95 to-dark">
      <ContainerWrapper>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">시장 전략</span>
          </div>
          <h2 className="font-bold text-white mb-6">
            글로벌 <span className="gradient-text">시장 진출</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            타겟 시장별 맞춤형 전략으로 세계 시장을 선도합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 네팔 시장 */}
          <div className="glass-card hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🏔️</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">네팔 트레킹 시장</h3>
                <p className="text-secondary font-medium">고산병 솔루션 전문</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">타겟 고객</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• 에베레스트 베이스캠프 트레커</li>
                  <li>• 안나푸르나 서킷 등반객</li>
                  <li>• 고산지대 여행자</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">제품 특징</h4>
                <p className="text-white/70 text-sm">{t('products.common.specs.cylinderVolume')} 부피, {t('products.common.specs.pressure')} 압력, {t('products.common.specs.weight')}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4 border border-secondary/30">
                <h4 className="text-white font-semibold mb-2">렌탈 모델</h4>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">보증금</span>
                  <span className="text-secondary font-bold">$100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">사용료</span>
                  <span className="text-secondary font-bold">$50</span>
                </div>
              </div>
            </div>
          </div>

          {/* 일본 시장 전략 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mr-4">
                <Icon name="star" className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">일본 엔터테인먼트 시장</h3>
                <p className="text-pink-400 font-medium">굿즈 & 팬덤 문화 활용</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">J-ROCK 파트너십</h4>
                  <p className="text-white/70 text-sm">연예기획사와 협약 완료, 엔터테인먼트 콜라보</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">요미우리 자이언츠</h4>
                  <p className="text-white/70 text-sm">스포츠 팬층 확대, 젊은 여성 & MZ세대 타겟</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">미니 굿즈</h4>
                  <p className="text-white/70 text-sm">작고 귀여운 휴대용 굿즈 모델 개발</p>
                </div>
              </div>
            </div>

            <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/20">
              <h4 className="text-pink-400 font-semibold mb-2">기대 효과</h4>
              <p className="text-white/80 text-sm">
                새로운 팬층 유입, 브랜드 이미지 젊고 트렌디하게 변화, 굿즈 매출 증대
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-secondary to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:from-secondary/80 hover:to-pink-600 transition-all duration-300"
          >
            글로벌 파트너십 문의하기
          </Link>
        </div>
      </ContainerWrapper>
    </section>
  );
} 