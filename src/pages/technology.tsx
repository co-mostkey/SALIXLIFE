import React, { useState } from 'react';
import Head from 'next/head';
import FullScreenSection from '../components/ui/FullScreenSection';
import SlideNavigation from '../components/ui/SlideNavigation';
import { useTechnologyTranslation } from '../utils/i18n';

// 분리된 슬라이드 컴포넌트들 임포트
import TechIntroSlide from '../components/technology/TechIntroSlide';
import CoreInnovationsSlide from '../components/technology/CoreInnovationsSlide';
import TechSpecsSlide from '../components/technology/TechSpecsSlide';
import CompetitiveAdvantageSlide from '../components/technology/CompetitiveAdvantageSlide';
import FutureVisionSlide from '../components/technology/FutureVisionSlide';

export default function Technology() {
  const { t } = useTechnologyTranslation();

  // 새로운 분산 구조를 활용한 슬라이드 구성
  const slides = [
    {
      id: 'intro',
      title: t('slides.intro.title') || '기술 소개',
      content: <TechIntroSlide />
    },
    {
      id: 'core-innovations',
      title: t('slides.coreInnovations.title') || '핵심 혁신',
      content: <CoreInnovationsSlide />
    },
    {
      id: 'tech-specs',
      title: t('slides.techSpecs.title') || '기술 사양',
      content: <TechSpecsSlide />
    },
    {
      id: 'competitive-advantage',
      title: t('slides.competitiveAdvantage.title') || '경쟁 우위',
      content: <CompetitiveAdvantageSlide />
    },
    {
      id: 'future-vision',
      title: t('slides.futureVision.title') || '미래 비전',
      content: <FutureVisionSlide />
    }
  ];

  return (
    <>
      <Head>
        <title>{t('title') || '기술혁신'} | 샐릭스 라이프</title>
        <meta name="description" content={t('description') || 'SALIX O²의 혁신적인 핵심 기술을 소개합니다.'} />
      </Head>

      <FullScreenSection 
        contentPadding={false}
        backgroundPattern={false}
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        {/* 히어로 배경 이미지 - 최하단 레이어 */}
        <div className="absolute inset-0 z-[0]">
          <img
            src="/images/technology_hero_01.jpg"
            alt="Technology Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* 그리드 패턴 */}
        <div className="absolute inset-0 opacity-[0.15] z-[5]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="h-full flex flex-col relative z-[10]">
          {/* 헤더 공간 확보 - 고정 높이 */}
          <div className="flex-shrink-0 h-16"></div>
          
          {/* 메인 콘텐츠 영역 - 남은 공간 모두 사용 */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <SlideNavigation 
              slides={slides}
              showIndicators={false}
              showNavButtons={true}
              className="h-full"
            />
          </div>
          
          {/* 푸터 공간 확보 - 고정 높이 */}
          <div className="flex-shrink-0 h-20"></div>
        </div>
      </FullScreenSection>
    </>
  );
} 