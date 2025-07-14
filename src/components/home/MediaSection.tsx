import React, { useState } from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import { useCommonTranslation } from '../../utils/i18n';

export default function MediaSection() {
  const { t, locale } = useCommonTranslation();
  const [activeTab, setActiveTab] = useState<'video' | 'presentation'>('video');
  
  // 언어 설정에 따라 비디오 경로 결정
  const videoSource = locale === 'en' ? "/media/product-video-en.mp4" : "/media/product-video.mp4";
  
  return (
    <section className="py-20 bg-gradient-to-b from-dark to-dark/90">
      <ContainerWrapper>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="text-secondary">샐릭스 라이프</span> 미디어 자료
          </h2>
          <p className="text-xl text-white/80 mb-8">
            제품 소개 영상과 프레젠테이션 자료를 확인하세요.
          </p>
          
          {/* 탭 전환 버튼 */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-lg transition duration-300 ${
                activeTab === 'video' 
                  ? 'bg-primary text-white' 
                  : 'bg-dark/50 text-white/70 hover:bg-dark/70'
              }`}
            >
              영상 보기
            </button>
            <button 
              onClick={() => setActiveTab('presentation')}
              className={`px-6 py-3 rounded-lg transition duration-300 ${
                activeTab === 'presentation' 
                  ? 'bg-primary text-white' 
                  : 'bg-dark/50 text-white/70 hover:bg-dark/70'
              }`}
            >
              프레젠테이션 자료
            </button>
          </div>
        </div>
        
        {/* 콘텐츠 영역 */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'video' && (
            <div className="bg-dark/30 rounded-xl overflow-hidden shadow-xl border border-primary/10 p-1">
              <div className="aspect-video w-full">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/media/video-poster.jpg"
                >
                  <source src={videoSource} type="video/mp4" />
                  <p className="text-white/80 p-4">
                    브라우저가 비디오 태그를 지원하지 않습니다. 
                    <a href={videoSource} className="text-primary underline" download>여기에서 다운로드</a>하세요.
                  </p>
                </video>
              </div>
              <div className="p-4 bg-dark/50 text-white">
                <h3 className="text-xl font-bold mb-2">샐리의 이야기 (샐릭스 라이프 홍보영상)</h3>
                <p className="text-white/80">
                샐리의 이야기&apos;는 선천적 호흡기 질환을 가진 28세 여성 샐리가 자신의 가장 큰 꿈인 산 정상 오르기를 이루어가는 감동적인 여정을 그린 이야기입니다. 활동적인 성격의 샐리는 어릴 적부터 자신의 창문에서 보이는 산 정상에 오르는 꿈을 키워왔습니다. 그러나 선천적인 호흡기 질환으로 인해 일상적인 활동조차 그녀에게는 큰 도전이 됩니다. 회사 계단을 오르거나 무거운 짐을 들 때마다 숨이 가빠지지만, 샐리는 자신의 한계를 숨기며 늘 웃음으로 &quot;괜찮다&quot;고 말합니다.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'presentation' && (
            <div className="bg-dark/30 rounded-xl overflow-hidden shadow-xl border border-primary/10">
              <div className="aspect-[4/3] w-full bg-dark relative">
                <iframe 
                  src="/media/presentation.pdf" 
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="샐릭스 라이프 프레젠테이션"
                ></iframe>
                
                {/* PDF가 로드되지 않을 경우 대체 콘텐츠 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/80 opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white mb-4">PDF를 다운로드하시겠습니까?</p>
                  <a 
                    href="/media/presentation.pdf" 
                    download
                    className="btn-primary"
                  >
                    PDF 다운로드
                  </a>
                </div>
              </div>
              <div className="p-4 bg-dark/50 text-white">
                <h3 className="text-xl font-bold mb-2">샐릭스 라이프 제품 소개 자료</h3>
                <p className="text-white/80">
                  샐릭스 라이프 제품 라인업, 기술 스펙, 사용 사례 등이 담긴 프레젠테이션 자료입니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </ContainerWrapper>
    </section>
  );
} 