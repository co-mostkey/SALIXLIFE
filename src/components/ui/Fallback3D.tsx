import React from 'react';

interface Fallback3DProps {
  className?: string;
}

export default function Fallback3D({ className = '' }: Fallback3DProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-dark ${className}`}>
      <div className="text-center p-8">
        <div className="border-4 border-secondary/30 border-t-secondary rounded-full h-20 w-20 animate-spin mx-auto mb-6"></div>
        <h3 className="text-white text-lg font-medium mb-2">모델을 준비하고 있습니다</h3>
        <p className="text-white/70">잠시만 기다려 주세요...</p>
      </div>
    </div>
  );
}