import React, { useEffect, useState } from 'react';
import ModelContainer from '../3d/ModelContainer';
import Icon from '../ui/Icon';
import { useCommonTranslation } from '../../utils/i18n';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HeroClean() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const { t } = useCommonTranslation();
  
  // 마우스 위치 추적
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 부드러운 스프링 애니메이션
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // 패럴랙스 효과를 위한 변환값들
  const backgroundX = useTransform(x, [0, windowSize.width], [-20, 20]);
  const backgroundY = useTransform(y, [0, windowSize.height], [-10, 10]);
  const modelX = useTransform(x, [0, windowSize.width], [-5, 5]);
  const modelY = useTransform(y, [0, windowSize.height], [-3, 3]);
  
  // 마우스 움직임 핸들러
  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };
  
  // 윈도우 크기 업데이트
  useEffect(() => {
    const updateWindowSize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateWindowSize();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWindowSize);
      return () => window.removeEventListener('resize', updateWindowSize);
    }
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
    >
      {/* 히어로 배경 영상 - 최하단 레이어 */}
      <div className="absolute inset-0 z-[0]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/media/hero01.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      {/* 깔끔한 기하학적 배경 - 최하단 레이어 */}
      <div className="absolute inset-0 opacity-20 z-[1]">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/20 rounded-full blur-xl"></div>
      </div>

      {/* 불규칙한 원형 배경 요소들 - 중간 레이어 */}
      <motion.div 
        className="absolute inset-0 opacity-20 z-[2]"
        style={{ x: backgroundX, y: backgroundY }}
      >
        {/* 좌측 상단 덩어리 */}
        <motion.div 
          className="absolute top-12 left-16 md:top-16 md:left-20 lg:top-20 lg:left-24"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.01, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div 
            className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full bg-white/45 shadow-xl border border-gray-200/30"
            whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute -top-6 -left-8 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white/60 shadow-lg border border-gray-100/40"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-8 left-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/75 shadow-md border border-gray-50/50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
        
        {/* 우측 상단 덩어리 */}
        <motion.div 
          className="absolute top-8 right-12 md:top-12 md:right-16 lg:top-16 lg:right-20"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.01, 1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div 
            className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full bg-white/40 shadow-xl border border-gray-200/25"
            whileHover={{ scale: 1.08, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute -top-4 -right-6 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/55 shadow-lg border border-gray-100/35"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div 
            className="absolute top-6 right-8 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/70 shadow-sm border border-gray-50/45"
            animate={{ x: [0, -4, 0], y: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.div>
        
        {/* 좌측 중앙 덩어리 */}
        <motion.div 
          className="absolute top-1/2 left-8 transform -translate-y-1/2 md:left-12 lg:left-16"
          animate={{ 
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 15, repeat: Infinity, ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/30 shadow-2xl border border-gray-200/15"
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="absolute -bottom-4 -left-6 w-22 h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 rounded-full bg-white/45 shadow-lg border border-gray-100/25"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.div 
            className="absolute top-4 left-8 w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-white/60 shadow-md border border-gray-50/35"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* 우측 하단 덩어리 */}
        <motion.div 
          className="absolute bottom-16 right-8 md:bottom-20 md:right-12 lg:bottom-24 lg:right-16"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.005, 1]
          }}
          transition={{ 
            rotate: { duration: 80, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div 
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-white/25 shadow-2xl border border-gray-200/12"
            whileHover={{ scale: 1.06, boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-8 w-26 h-26 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white/40 shadow-xl border border-gray-100/22"
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          />
          <motion.div 
            className="absolute top-6 right-10 w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 rounded-full bg-white/55 shadow-lg border border-gray-50/32"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.div 
            className="absolute top-12 right-2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/70 shadow-md border border-gray-50/42"
            animate={{ rotate: [0, -180, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* 중앙 하단 덩어리 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:bottom-12 lg:bottom-16"
          animate={{ 
            y: [0, -6, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        >
          <motion.div 
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/35 shadow-xl border border-gray-200/18"
            whileHover={{ scale: 1.12, rotate: 90 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute -bottom-2 -left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/50 shadow-lg border border-gray-100/28"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
          <motion.div 
            className="absolute top-2 left-4 w-10 h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full bg-white/65 shadow-sm border border-gray-50/38"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* 그리드 패턴 - 좀 더 선명한 그레이 */}
      <div className="absolute inset-0 opacity-[0.15] z-[5]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
              {/* 메인 컨텐츠 - 최상단 레이어 */}
        <div className="relative z-[20] h-full">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full -translate-y-4 md:-translate-y-6 lg:-translate-y-8">
            {/* 좌측 텍스트 영역 */}
            <div className={`space-y-8 transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              {/* 제품 배지 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 -mb-2"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">SALIX O²</span>
              </motion.div>
              
              {/* 메인 타이틀 */}
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
                >
                  {t('home.hero.title')}
                </motion.h1>
                
                {/* 강화된 서브타이틀 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  {/* 메인 서브타이틀 텍스트 */}
                  <div className="relative">
                    <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-relaxed">
                      {t('home.hero.subtitle')}
                    </p>
                    
                    {/* 언더라인 애니메이션 */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                      className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-3 shadow-lg"
                    />
                    
                    {/* 플로팅 파티클 효과 */}
                    <div className="absolute -top-2 -right-2">
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="w-2 h-2 bg-secondary rounded-full shadow-lg"
                      />
                    </div>
                    <div className="absolute -bottom-1 left-1/3">
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0.5
                        }}
                        className="w-1.5 h-1.5 bg-primary rounded-full shadow-md"
                      />
                    </div>
                    <div className="absolute top-1/2 -left-3">
                      <motion.div
                        animate={{ 
                          y: [0, -6, 0],
                          opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{ 
                          duration: 1.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1
                        }}
                        className="w-1 h-1 bg-secondary rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                  
                  {/* 추가 강조 텍스트 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-4 flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                      />
                      <span className="font-medium">{t('home.features.status.innovation')}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <span className="text-primary font-semibold">{t('home.features.status.launch')}</span>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* 설명 텍스트 */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg text-gray-700 leading-relaxed max-w-lg"
              >
                {t('home.hero.description')}
              </motion.p>
              
              {/* 주요 특징 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium text-gray-800">{t('home.features.badges.capacity')}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm font-medium text-gray-800">{t('home.features.badges.duration')}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm font-medium text-gray-800">{t('home.features.badges.price')}</span>
                </motion.div>
              </motion.div>
              
              {/* CTA 버튼 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('home.hero.cta.products')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, borderColor: "#0D4F3C", backgroundColor: "rgba(13, 79, 60, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-gray-400 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  {t('home.hero.cta.about')}
                </motion.button>
              </motion.div>
            </div>
            
            {/* 우측 제품 이미지 영역 */}
            <motion.div 
              className={`relative transition-all duration-1000 delay-300 z-[15] ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
              style={{ x: modelX, y: modelY }}
            >
              {/* 확대된 원형 배경 패턴 - 3D 모델 뒤 */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center -translate-x-8 md:-translate-x-12 lg:-translate-x-16 -translate-y-10 md:-translate-y-14 lg:-translate-y-18 z-[1]"
                animate={{ 
                  rotate: [0, 360] 
                }}
                transition={{ 
                  duration: 120, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.01 }}
              >
                {/* 메인 원형 배경 - 깔끔한 스타일 */}
                <motion.div 
                  className="w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-white/35 shadow-2xl border border-gray-200/25"
                  animate={{ 
                    scale: [1, 1.01, 1],
                    opacity: [0.35, 0.45, 0.35]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 40px 80px rgba(0,0,0,0.15)" 
                  }}
                />
                {/* 내부 원형 */}
                <motion.div 
                  className="absolute w-64 h-64 md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full bg-white/50 shadow-lg border border-gray-100/35"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    rotate: [0, -360]
                  }}
                  transition={{ 
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    rotate: { duration: 90, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.05 }}
                />
                {/* 중앙 원형 */}
                <motion.div 
                  className="absolute w-48 h-48 md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full bg-white/65 shadow-md border border-gray-50/45"
                  animate={{ 
                    scale: [1, 1.03, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    rotate: { duration: 70, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
              
              {/* 불규칙한 원형 배경 요소들 - 3D 모델 뒤 */}
              {/* 첫 번째 덩어리 - 우측 상단 */}
              <motion.div 
                className="absolute top-12 right-6 md:top-16 md:right-10 lg:top-20 lg:right-14 z-[2]"
                                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 80, repeat: Infinity, ease: "easeInOut" }
                  }}
                whileHover={{ scale: 1.05, y: -12 }}
              >
                <motion.div 
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/25 shadow-xl border border-gray-200/15"
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: "0 25px 50px rgba(0,0,0,0.12)" 
                  }}
                />
                <motion.div 
                  className="absolute -top-4 -right-6 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/35 shadow-lg border border-gray-100/25"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.div 
                  className="absolute top-8 right-8 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/50 shadow-md border border-gray-50/30"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -360]
                  }}
                  transition={{ 
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                                          rotate: { duration: 25, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </motion.div>
              
              {/* 두 번째 덩어리 - 중앙 하단 */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:bottom-12 lg:bottom-16 z-[2]"
                                  animate={{ 
                    x: [0, 4, 0],
                    y: [0, -3, 0],
                    scale: [1, 1.005, 1]
                  }}
                  transition={{ 
                    x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full bg-white/20 shadow-2xl border border-gray-200/10"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 45,
                    boxShadow: "0 35px 70px rgba(0,0,0,0.15)" 
                  }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute -bottom-3 -left-8 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white/40 shadow-lg border border-gray-100/20"
                  animate={{ rotate: [0, 360] }}
                                      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-2 left-6 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/55 shadow-sm border border-gray-50/35"
                  animate={{ 
                    y: [0, -4, 0],
                    opacity: [0.55, 0.75, 0.55]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                />
                <motion.div 
                  className="absolute -top-6 right-4 w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 rounded-full bg-white/30 shadow-md border border-gray-100/15"
                  animate={{ 
                    x: [0, -3, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    x: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                                          rotate: { duration: 35, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </motion.div>
              
              {/* 메인 3D 모델 컨테이너 - 최상단 레이어 */}
              <motion.div 
                className="relative h-[580px] md:h-[680px] lg:h-[780px] z-[10] -translate-y-6 md:-translate-y-8 lg:-translate-y-10"
              >
                <ModelContainer 
                  modelPath="/SALIXLIFEHERO3D.glb"
                  className="w-full h-full"
                  selectedColor="#C0C0C0"
                  selectedMaterial="metal"
                  isProductPage={false}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 