import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideVariants } from '../../utils/animations';
import SwipeHandler from './SwipeHandler';
import { useViewport } from '../../contexts/ViewportContext';

interface Slide {
  id: string;
  title: string;
  content: ReactNode;
}

interface SlideNavigationProps {
  slides: Slide[];
  className?: string;
  showIndicators?: boolean;
  showNavButtons?: boolean;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  slides,
  className = '',
  showIndicators = true,
  showNavButtons = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isMobile } = useViewport();

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleGoToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-transparent ${className}`}>
      <SwipeHandler
        onSwipeLeft={handleNext}
        onSwipeRight={handlePrev}
        className="w-full h-full"
      >
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-10"
              style={{ backgroundColor: 'transparent' }}
            >
              {slides[currentIndex].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </SwipeHandler>

      {/* 네비게이션 버튼 */}
      {showNavButtons && !isMobile && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-dark/50 backdrop-blur-md hover:bg-dark/70 border border-white/20 transition-all duration-300"
            aria-label="이전 슬라이드"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-dark/50 backdrop-blur-md hover:bg-dark/70 border border-white/20 transition-all duration-300"
            aria-label="다음 슬라이드"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-2 bg-secondary rounded-full shadow-lg'
                  : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SlideNavigation; 