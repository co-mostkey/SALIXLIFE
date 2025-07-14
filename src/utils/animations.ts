import { Variants } from 'framer-motion';

// 애니메이션 타이밍 상수
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

export const ANIMATION_EASE = {
  smooth: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  anticipate: [0.4, 0, 0.2, 1] as const,
};

// 페이지 전환 애니메이션
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(20px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: ANIMATION_DURATION.slow,
      ease: ANIMATION_EASE.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(20px)',
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.smooth,
    },
  },
};

// 슬라이드 애니메이션
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.smooth,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.smooth,
    },
  }),
};

// 페이드 애니메이션
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.smooth,
    },
  },
};

// 스케일 애니메이션
export const scaleVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.bounce,
    },
  },
};

// 스태거 애니메이션 (자식 요소들이 순차적으로 나타남)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.normal,
      ease: ANIMATION_EASE.smooth,
    },
  },
};

// 플로팅 애니메이션
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 글로우 애니메이션
export const glowAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(96, 191, 176, 0.3)',
      '0 0 40px rgba(96, 191, 176, 0.6)',
      '0 0 20px rgba(96, 191, 176, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 로테이션 애니메이션
export const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}; 