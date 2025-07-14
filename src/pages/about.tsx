import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import FullScreenSection from '../components/ui/FullScreenSection';
import SlideNavigation from '../components/ui/SlideNavigation';
import AnimatedSection from '../components/ui/AnimatedSection';
import Icon from '../components/ui/Icon';
import Link from 'next/link';
import Image from 'next/image';
import { useAboutTranslation } from '../utils/i18n';

export default function About() {
  const { t } = useAboutTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 이미지 팝업 열기
  const openImagePopup = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // 이미지 팝업 닫기
  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  // 2페이지로 압축된 슬라이드 콘텐츠
  const slides = [
    {
      id: 'company-intro',
      title: '회사 소개',
      content: (
        <div className="h-full flex flex-col p-4 pt-2">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
            {/* 상단 회사 소개 - 더 위로 */}
            <div className="text-center mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                <span className="text-primary">SALIX Life</span> {t('slides.companyIntro.title')}
              </h1>
              
              <p className="text-base text-gray-600 mb-3">
                {t('slides.companyIntro.subtitle')}
              </p>
            </div>
            
            {/* 메인 콘텐츠 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* 좌측: 사명/비전 */}
              <div className="space-y-3">
              <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 p-4 rounded-xl shadow-lg"
              >
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Icon name="health" className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{t('slides.companyIntro.mission.title')}</h3>
                </div>
                  <p className="text-sm text-gray-600">{t('slides.companyIntro.mission.description')}</p>
              </motion.div>
              
              <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 p-4 rounded-xl shadow-lg"
              >
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Icon name="global" className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{t('slides.companyIntro.vision.title')}</h3>
                </div>
                  <p className="text-sm text-gray-600">{t('slides.companyIntro.vision.description')}</p>
              </motion.div>
            </div>

              {/* 우측: 회사 개요 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{t('slides.companyIntro.overview.title')}</h2>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                  {t('slides.companyIntro.overview.description')}
              </p>
              
                <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                    <h4 className="text-xl font-bold text-primary mb-1">{t('slides.companyIntro.overview.stats.founded')}</h4>
                    <p className="text-xs text-gray-600">{t('slides.companyIntro.overview.stats.foundedLabel')}</p>
                </div>
                <div className="text-center">
                    <h4 className="text-xl font-bold text-primary mb-1">{t('slides.companyIntro.overview.stats.launch')}</h4>
                    <p className="text-xs text-gray-600">{t('slides.companyIntro.overview.stats.launchLabel')}</p>
                </div>
                <div className="text-center">
                    <h4 className="text-xl font-bold text-primary mb-1">{t('slides.companyIntro.overview.stats.markets')}</h4>
                    <p className="text-xs text-gray-600">{t('slides.companyIntro.overview.stats.marketsLabel')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 하단 이미지 갤러리 - 카드 섹션 바로 아래 */}
            <div className="mb-3">
              <div className="grid grid-cols-3 gap-3">
                {/* 01.jpg - SALIX 바로가기 */}
                <motion.a
                  href="https://www.salix.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className="aspect-video rounded-lg shadow-md overflow-hidden border border-gray-200 relative group cursor-pointer"
                  title={t('slides.companyIntro.gallery.salix')}
                >
                  <Image
                    src="/images/01.jpg"
                    alt="SALIX 바로가기"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded backdrop-blur-sm">
                      {t('slides.companyIntro.gallery.salix')}
                    </p>
                  </div>
                </motion.a>
                
                {/* 02.jpg - 네팔 고산 트레킹 파트너십 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-video rounded-lg shadow-md overflow-hidden border border-gray-200 relative group cursor-pointer"
                  title={t('slides.companyIntro.gallery.nepal')}
                  onClick={() => openImagePopup('/images/02.jpg')}
                >
                  <Image
                    src="/images/02.jpg"
                    alt="네팔 고산 트레킹 파트너십"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded backdrop-blur-sm">
                      {t('slides.companyIntro.gallery.nepal')}
                    </p>
                  </div>
                </motion.div>
                
                {/* 03.jpg - 일본 엔터테인먼트 파트너십 */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-video rounded-lg shadow-md overflow-hidden border border-gray-200 relative group cursor-pointer"
                  title={t('slides.companyIntro.gallery.japan')}
                  onClick={() => openImagePopup('/images/03.jpg')}
                >
                  <Image
                    src="/images/03.jpg"
                    alt="일본 엔터테인먼트 파트너십"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded backdrop-blur-sm">
                      {t('slides.companyIntro.gallery.japan')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 인용구 - 갤러리 바로 아래 */}
            <div className="text-center mt-3 mb-4">
              <p className="text-gray-600 italic text-base font-medium">
                &ldquo;{t('slides.companyIntro.quote')}&rdquo;
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'business-strategy',
      title: '사업 전략 및 미래 계획',
      content: (
        <div className="h-full flex flex-col p-4 pt-2">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
            {/* 상단 제목 - 더 축소 */}
            <div className="text-center mb-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {t('slides.businessStrategy.title')}
              </h1>
              <p className="text-sm text-gray-600">{t('slides.businessStrategy.subtitle')}</p>
            </div>

            {/* 메인 콘텐츠 - flex-1으로 남은 공간 활용 */}
            <div className="flex-1 flex flex-col space-y-3">
              {/* 혁신 제품 섹션 - 더 축소 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">{t('slides.businessStrategy.innovation.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gray-50 border border-gray-100 p-3 rounded-lg"
              >
                    <div className="bg-primary/10 p-2 rounded-full mb-2 inline-block">
                      <Icon name="portable" className="w-5 h-5 text-primary" />
                </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{t('slides.businessStrategy.innovation.products.compact.title')}</h3>
                    <p className="text-sm text-gray-600 leading-tight">{t('slides.businessStrategy.innovation.products.compact.description')}</p>
              </motion.div>
              
              <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gray-50 border border-gray-100 p-3 rounded-lg"
              >
                    <div className="bg-primary/10 p-2 rounded-full mb-2 inline-block">
                      <Icon name="affordable" className="w-5 h-5 text-primary" />
                </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{t('slides.businessStrategy.innovation.products.affordable.title')}</h3>
                    <p className="text-sm text-gray-600 leading-tight">{t('slides.businessStrategy.innovation.products.affordable.description')}</p>
              </motion.div>
              
              <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gray-50 border border-gray-100 p-3 rounded-lg"
              >
                    <div className="bg-primary/10 p-2 rounded-full mb-2 inline-block">
                      <Icon name="smart" className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{t('slides.businessStrategy.innovation.products.smart.title')}</h3>
                    <p className="text-sm text-gray-600 leading-tight">{t('slides.businessStrategy.innovation.products.smart.description')}</p>
                  </motion.div>
                </div>
        </div>

              {/* 글로벌 전략 & 미래 계획 - 더 축소 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* 글로벌 전략 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg h-64">
                  <h2 className="text-base font-bold text-gray-900 mb-2">{t('slides.businessStrategy.globalStrategy.title')}</h2>
                  <div className="space-y-3 h-52 overflow-hidden">
              <motion.div 
                      whileHover={{ x: 5 }}
                      className="bg-gray-50 border-l-4 border-primary rounded-r-lg p-2"
              >
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        <span className="text-primary mr-2">01</span>
                        {t('slides.businessStrategy.globalStrategy.markets.nepal.title')}
                </h3>
                      <p className="text-xs text-gray-700 leading-tight">
                        {t('slides.businessStrategy.globalStrategy.markets.nepal.description')}
                </p>
              </motion.div>
              
              <motion.div 
                      whileHover={{ x: 5 }}
                      className="bg-gray-50 border-l-4 border-primary rounded-r-lg p-2"
              >
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        <span className="text-primary mr-2">02</span>
                        {t('slides.businessStrategy.globalStrategy.markets.japan.title')}
                </h3>
                      <p className="text-xs text-gray-700 leading-tight">
                        {t('slides.businessStrategy.globalStrategy.markets.japan.description')}
                </p>
              </motion.div>
            </div>
        </div>

                {/* 미래 계획 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg h-64">
                  <h2 className="text-base font-bold text-gray-900 mb-2">{t('slides.businessStrategy.futurePlans.title')}</h2>
                  <div className="space-y-3 h-52 overflow-hidden">
              <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 border border-gray-100 p-3 rounded-lg"
              >
                      <div className="flex items-center mb-1">
                        <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                          <Icon name="technology" className="w-4 h-4 text-primary" />
                  </div>
                        <h3 className="text-sm font-semibold text-gray-900">{t('slides.businessStrategy.futurePlans.plans.ai.title')}</h3>
                </div>
                      <p className="text-xs text-gray-700 leading-tight">
                        {t('slides.businessStrategy.futurePlans.plans.ai.description')}
                </p>
              </motion.div>
              
              <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 border border-gray-100 p-3 rounded-lg"
              >
                      <div className="flex items-center mb-1">
                        <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                          <Icon name="eco" className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">{t('slides.businessStrategy.futurePlans.plans.eco.title')}</h3>
                      </div>
                      <p className="text-xs text-gray-700 leading-tight">
                        {t('slides.businessStrategy.futurePlans.plans.eco.description')}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* 하단 CTA - 더 축소 */}
              <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 mt-4">
                <p className="text-gray-700 text-sm mb-3 leading-tight">
                  {t('slides.businessStrategy.cta.description')}
                </p>
                <Link href="/contact" className="btn-primary text-sm px-4 py-2">
                  {t('slides.businessStrategy.cta.button')}
                </Link>
              </div>
            </div>
            </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{t('title')} | SALIX Life</title>
        <meta name="description" content={t('slides.companyIntro.subtitle')} />
      </Head>

      <FullScreenSection 
        contentPadding={false}
        backgroundPattern={false}
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        <div className="h-full flex flex-col">
          {/* 헤더 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
          
          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 min-h-0">
            <div className="h-full pt-4">
              <SlideNavigation 
                slides={slides}
                showIndicators={true}
                showNavButtons={true}
                className="h-full"
              />
            </div>
          </div>
          
          {/* 푸터 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
        </div>
      </FullScreenSection>

      {/* 이미지 팝업 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeImagePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="확대 이미지"
                fill
                className="object-contain rounded-lg"
              />
              
              {/* 닫기 버튼 */}
              <button
                onClick={closeImagePopup}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 