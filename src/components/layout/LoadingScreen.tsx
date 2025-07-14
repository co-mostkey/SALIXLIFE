import React, { useEffect, useState } from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';

interface LoadingScreenProps {
  minDuration?: number; // 최소 표시 시간(ms)
}

export default function LoadingScreen({ minDuration = 2000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 최소 표시 시간 후 페이드 아웃 시작
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      // 페이드 아웃 애니메이션 후 컴포넌트 제거
      setTimeout(() => {
        setIsVisible(false);
      }, 800); // 페이드 아웃 시간
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <ContainerWrapper>
        <div className="max-w-lg mx-auto text-center">
          {/* 로고 및 로딩 애니메이션 */}
          <div className="mb-8">
            <div className="inline-block w-24 h-24 relative">
              <div className="absolute inset-0 border-4 border-secondary rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 flex items-center justify-center">
                <span className="text-secondary font-bold text-xl">SALIX</span>
              </div>
            </div>
          </div>
          
          {/* 인사이트 글 */}
          <div className="max-w-md mx-auto text-white opacity-90">
            <p className="text-lg mb-4 leading-relaxed">
              현대인에게 &quot;제약&quot;은 넘을 수 없는 벽이 아니라, 각자의 방식과 페이스로 도전할 수 있는 가능성이 되었습니다.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              가장 작은 꿈이 가장 큰 꿈이 될 때, 그 성취는 더욱 빛납니다.
            </p>
            <p className="text-lg leading-relaxed">
              주식회사 샐릭스라이프에서 고객에게 전하려는 이야기는 우리에게 자신의 한계를 인정하면서도 그것을 넘어서기 위해 끊임없이 도전하는 용기와 자신만의 방식을 찾는 지혜의 중요성을 강조합니다.
            </p>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
} 