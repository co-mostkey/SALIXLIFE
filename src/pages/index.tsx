import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/home/Hero';
import HeroClean from '../components/home/HeroClean';
import BenefitsShowcase from '../components/home/BenefitsShowcase';
import FullScreenSection from '../components/ui/FullScreenSection';
import TabNavigation from '../components/ui/TabNavigation';
import DashboardSection from '../components/ui/DashboardSection';
import Icon from '../components/ui/Icon';
import { useViewport } from '../contexts/ViewportContext';
import { useCommonTranslation } from '../utils/i18n';

// 동적 임포트로 코드 스플리팅
const ProductShowcase = dynamic(() => import('../components/home/ProductShowcase'), {
  loading: () => <div className="h-full flex items-center justify-center"><div className="text-white">로딩중...</div></div>,
});
const Certifications = dynamic(() => import('../components/home/Certifications'));
const TechSpecs = dynamic(() => import('../components/home/TechSpecs'));
const Mission = dynamic(() => import('../components/home/Mission'));
const Features = dynamic(() => import('../components/home/Features'));
const MediaSection = dynamic(() => import('../components/home/MediaSection'));
const CTASection = dynamic(() => import('../components/home/CTASection'));
const GlobalStrategy = dynamic(() => import('../components/home/GlobalStrategy'));
const Partnership = dynamic(() => import('../components/home/Partnership'));
const MarketAnalysis = dynamic(() => import('../components/home/MarketAnalysis'));

export default function Home() {
  const [currentView, setCurrentView] = useState<'hero' | 'dashboard'>('hero');
  const { isMobile } = useViewport();
  const { t } = useCommonTranslation();

  // 대시보드 탭 구성
  const dashboardTabs = [
    {
      id: 'product',
      label: t('home.dashboard.product'),
      icon: <Icon name="portable" className="w-5 h-5" />,
      content: (
                 <DashboardSection 
           title={t('home.sections.productLine')} 
           subtitle={t('home.sections.productSubtitle')}
         >
           <BenefitsShowcase />
           <ProductShowcase />
           <TechSpecs />
         </DashboardSection>
      ),
    },
    {
      id: 'market',
      label: t('home.dashboard.market'),
      icon: <Icon name="trending" className="w-5 h-5" />,
      content: (
        <DashboardSection 
          title={t('home.sections.globalStrategy')} 
          subtitle={t('home.sections.marketSubtitle')}
        >
          <MarketAnalysis />
          <GlobalStrategy />
        </DashboardSection>
      ),
    },
    {
      id: 'company',
      label: t('home.dashboard.company'),
      icon: <Icon name="global" className="w-5 h-5" />,
      content: (
        <DashboardSection 
          title={t('home.sections.companyInfo')} 
          subtitle={t('home.sections.companySubtitle')}
        >
          <Mission />
          <Partnership />
          <Certifications />
        </DashboardSection>
      ),
    },
    {
      id: 'features',
      label: t('home.dashboard.features'),
      icon: <Icon name="rocket" className="w-5 h-5" />,
      content: (
        <DashboardSection 
          title={t('home.sections.innovativeFeatures')} 
          subtitle={t('home.sections.featuresSubtitle')}
        >
          <Features />
        </DashboardSection>
      ),
    },
    {
      id: 'media',
      label: t('home.dashboard.media'),
      icon: <Icon name="star" className="w-5 h-5" />,
      content: (
        <DashboardSection 
          title={t('home.sections.mediaCenter')} 
          subtitle={t('home.sections.mediaSubtitle')}
        >
          <MediaSection />
          <CTASection />
        </DashboardSection>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>SALIX O² | 50배 대용량, 1/30 가격 혁신 휴대용 산소공급기 - 샐릭스 라이프</title>
        <meta name="description" content="SALIX O² - 50배 대용량(40L), 2시간 연속 공급, 1/30 가격 혁신의 휴대용 산소공급기. 레브론 제임스, 호날두, BTS가 활용하는 산소 테라피를 일상에서. WHO 호흡기 질환 경고에 대응하는 웰니스 솔루션." />
        <meta name="keywords" content="SALIX O2, 샐릭스 라이프, 휴대용 산소, 50배 대용량, 2시간 연속공급, 1/30 가격, 산소 테라피, WHO 호흡기 질환, 웰니스, 레브론 제임스, 호날두, BTS, aespa, 고산병, 피로회복, 집중력, 특허 디자인, DUNE 모티프" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://salixlife.com/" />
        <meta property="og:title" content="SALIX O² | 생명을 지키는 휴대용 산소공급기" />
        <meta property="og:description" content="초소형 휴대용 산소공급기로 언제 어디서나 안전한 호흡을 보장합니다." />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://salixlife.com/" />
        <meta property="twitter:title" content="SALIX O² | 생명을 지키는 휴대용 산소공급기" />
        <meta property="twitter:description" content="초소형 휴대용 산소공급기로 언제 어디서나 안전한 호흡을 보장합니다." />
        <meta property="twitter:image" content="/images/og-image.jpg" />
      </Head>

      <AnimatePresence mode="wait">
        {currentView === 'hero' ? (
          <FullScreenSection 
            key="hero"
                         backgroundPattern={false}
             contentPadding={false}
           >
              <HeroClean />
            
            {/* 대시보드로 전환하는 버튼 */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              onClick={() => setCurrentView('dashboard')}
              className={`hero-cta-button absolute z-40 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/20 flex items-center gap-3 shadow-lg hover:shadow-xl ${
                isMobile 
                  ? 'bottom-8 left-1/2 -translate-x-1/2' 
                  : 'bottom-12 left-1/2 -translate-x-1/2'
              }`}
            >
              {t('home.hero.cta.learnMore')}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </FullScreenSection>
        ) : (
          <FullScreenSection 
            key="dashboard"
            contentPadding={true}
          >
            <div className="h-full pt-16">
              <TabNavigation
                tabs={dashboardTabs}
                position={isMobile ? 'bottom' : 'top'}
                variant="pills"
                className="h-full"
              />
              
              {/* 홈으로 돌아가는 버튼 */}
              <button
                onClick={() => setCurrentView('hero')}
                className="absolute top-20 left-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                aria-label={t('home.dashboard.backToHome')}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </FullScreenSection>
        )}
      </AnimatePresence>
    </>
  );
} 