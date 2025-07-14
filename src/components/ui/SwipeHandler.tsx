import React, { ReactNode } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useViewport } from '../../contexts/ViewportContext';

interface SwipeHandlerProps {
  children: ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

const SwipeHandler: React.FC<SwipeHandlerProps> = ({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = '',
}) => {
  const { isMobile, isTablet } = useViewport();
  
  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // 스와이프 감지 (속도와 거리 고려)
    if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
      // 수평 스와이프
      if (offset.x > threshold && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft();
      }
    } else {
      // 수직 스와이프
      if (offset.y > threshold && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < -threshold && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  // 데스크톱에서는 스와이프 비활성화
  if (!isMobile && !isTablet) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className={`touch-pan-y ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeHandler; 