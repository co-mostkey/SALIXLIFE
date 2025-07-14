import React from 'react';
import Link from 'next/link';
import ContainerWrapper from '../ui/ContainerWrapper';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dark/20 rounded-full filter blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <ContainerWrapper className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 메인 헤드라인 */}
          <h2 className="font-bold text-white mb-6 text-shadow-lg">
            당신의 <span className="text-dark/80">안전한 호흡</span>을 위한<br />
            최고의 선택, SALIX O²
          </h2>
          
          {/* 서브 헤드라인 */}
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            지금 시작하면 첫 구독 <span className="font-bold text-dark/80">30% 할인</span> 혜택을 드립니다
          </p>

          {/* 혜택 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="glass-effect bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">🎁</div>
              <h4 className="text-white font-semibold mb-2">무료 배송</h4>
              <p className="text-white/80 text-sm">전국 어디든 무료로 배송해 드립니다</p>
            </div>
            <div className="glass-effect bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="text-white font-semibold mb-2">5년 보증</h4>
              <p className="text-white/80 text-sm">안심하고 사용할 수 있는 긴 보증 기간</p>
            </div>
            <div className="glass-effect bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-white font-semibold mb-2">30일 환불</h4>
              <p className="text-white/80 text-sm">만족하지 못하시면 전액 환불해 드립니다</p>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/subscription" className="group relative inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span>지금 구독하기</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="absolute -top-3 -right-3 bg-dark text-white text-xs px-3 py-1 rounded-full animate-pulse">
                30% OFF
              </span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>전문가 상담</span>
            </Link>
          </div>

          {/* 긴급성 메시지 */}
          <p className="text-white/90 text-sm">
            ⏰ 한정 수량! 이번 달 선착순 100명만 특별 할인가로 제공됩니다
          </p>
        </div>
      </ContainerWrapper>
    </section>
  );
} 