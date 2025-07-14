import React from 'react';
import Image from 'next/image';
import ContainerWrapper from '../ui/ContainerWrapper';

interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
  icon: string;
}

const certifications: Certification[] = [
  {
    id: 'kfda',
    name: '의료기기 제조 인증',
    organization: '식품의약품안전처',
    year: '2024',
    icon: '🏥'
  },
  {
    id: 'iso',
    name: 'ISO 13485:2016',
    organization: '국제표준화기구',
    year: '2024',
    icon: '🌐'
  },
  {
    id: 'ce',
    name: 'CE 마킹',
    organization: '유럽연합',
    year: '2024',
    icon: '🇪🇺'
  },
  {
    id: 'kc',
    name: 'KC 안전인증',
    organization: '한국산업안전보건공단',
    year: '2024',
    icon: '🛡️'
  },
  {
    id: 'gmp',
    name: 'GMP 인증',
    organization: '우수제조관리기준',
    year: '2024',
    icon: '✅'
  },
  {
    id: 'patent',
    name: '특허 등록',
    organization: '대한민국 특허청',
    year: '2024',
    icon: '📋'
  }
];

const achievements = [
  { value: '99.9%', label: '의료용 산소 순도' },
  { value: '0.01%', label: '불량률' },
  { value: '100만+', label: '누적 판매량' },
  { value: '4.9/5.0', label: '고객 만족도' }
];

export default function Certifications() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cert-background.jpg"
          alt="인증 배경"
          fill
          className="object-cover opacity-10"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
      </div>

      <ContainerWrapper className="relative z-10">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">품질 인증</span>
          </div>
          <h2 className="font-bold text-white mb-6">
            글로벌 <span className="gradient-text">안전 기준</span>을 충족합니다
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            엄격한 국제 인증과 품질 관리로 안전성을 보장합니다
          </p>
        </div>

        {/* 인증 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="glass-card p-6 hover-lift text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {cert.icon}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">
                {cert.name}
              </h4>
              <p className="text-white/50 text-xs">
                {cert.organization}
              </p>
              <p className="text-secondary text-xs mt-2">
                {cert.year}
              </p>
            </div>
          ))}
        </div>

        {/* 성과 지표 */}
        <div className="glass-effect rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            숫자로 보는 <span className="gradient-text">SALIX O²</span>
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="mb-4">
                  <p className="text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300 inline-block">
                    {achievement.value}
                  </p>
                </div>
                <p className="text-white/70 font-medium">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 품질 보증 섹션 */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              의료 기기 수준의 <span className="gradient-text">엄격한 품질 관리</span>
            </h3>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              샐릭스 라이프는 국내외 최고 수준의 인증을 획득하며, 
              지속적인 품질 개선과 안전성 향상을 위해 노력하고 있습니다.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">100% 품질 검수</h4>
                  <p className="text-white/60 text-sm">모든 제품은 출고 전 3단계 품질 검사를 거칩니다</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">실시간 모니터링</h4>
                  <p className="text-white/60 text-sm">IoT 기술로 제품 상태를 24시간 모니터링합니다</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">지속적인 개선</h4>
                  <p className="text-white/60 text-sm">고객 피드백을 바탕으로 제품을 계속 발전시킵니다</p>
                </div>
              </div>
            </div>
          </div>

          {/* 인증서 이미지 그리드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 hover-lift">
              <div className="aspect-[3/4] relative bg-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏥</div>
                    <p className="text-white/70 text-sm">의료기기 인증서</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 hover-lift" style={{ marginTop: '2rem' }}>
              <div className="aspect-[3/4] relative bg-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌐</div>
                    <p className="text-white/70 text-sm">ISO 인증서</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 hover-lift">
              <div className="aspect-[3/4] relative bg-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🛡️</div>
                    <p className="text-white/70 text-sm">KC 안전인증서</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 hover-lift" style={{ marginTop: '2rem' }}>
              <div className="aspect-[3/4] relative bg-white/5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-white/70 text-sm">특허증</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
} 