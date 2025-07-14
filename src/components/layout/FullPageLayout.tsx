import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullPageLayoutProps {
  children: ReactNode;
  currentSection: number;
  onSectionChange: (section: number) => void;
  totalSections: number;
}

export default function FullPageLayout({
  children,
  currentSection,
  onSectionChange,
  totalSections
}: FullPageLayoutProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        // 아래로 스크롤
        setIsTransitioning(true);
        onSectionChange(currentSection + 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // 위로 스크롤
        setIsTransitioning(true);
        onSectionChange(currentSection - 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' && currentSection < totalSections - 1) {
        setIsTransitioning(true);
        onSectionChange(currentSection + 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        setIsTransitioning(true);
        onSectionChange(currentSection - 1);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, totalSections, onSectionChange, isTransitioning]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="absolute inset-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* 네비게이션 도트 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSection) {
                setIsTransitioning(true);
                onSectionChange(index);
                setTimeout(() => setIsTransitioning(false), 1000);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection
                ? 'bg-primary scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`섹션 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
} 