import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeVariants, scaleVariants, slideVariants } from '../../utils/animations';

type AnimationType = 'fade' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'custom';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  customVariants?: Variants;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade',
  customVariants,
  className = '',
  delay = 0,
  threshold = 0.2,
  once = true,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const getAnimationVariants = (): Variants => {
    if (customVariants) return customVariants;

    switch (animation) {
      case 'fade':
        return fadeVariants;
      case 'scale':
        return scaleVariants;
      case 'slideUp':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, delay }
          }
        };
      case 'slideDown':
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, delay }
          }
        };
      case 'slideLeft':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.5, delay }
          }
        };
      case 'slideRight':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.5, delay }
          }
        };
      default:
        return fadeVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={getAnimationVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 