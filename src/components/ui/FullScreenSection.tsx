import React from 'react';
import { motion } from 'framer-motion';

interface FullScreenSectionProps {
  children: React.ReactNode;
  backgroundPattern?: boolean;
  contentPadding?: boolean;
  className?: string;
}

export default function FullScreenSection({ 
  children, 
  backgroundPattern = false, 
  contentPadding = true,
  className = '' 
}: FullScreenSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-screen overflow-hidden relative ${className}`}
    >
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #60BFB0 1px, transparent 1px),
              linear-gradient(to bottom, #60BFB0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      )}
      
      <div className={contentPadding ? 'p-4 h-full' : 'h-full'}>
        {children}
      </div>
    </motion.div>
  );
} 