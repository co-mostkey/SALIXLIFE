import React, { useEffect, useState } from 'react';
import ModelContainer from '../3d/ModelContainer';
import { useViewport } from '../../contexts/ViewportContext';

// 컬러칩 옵션 타입 정의
interface ColorOption {
  name: string;
  value: string;
  material: 'anodizing' | 'metal' | 'plastic' | 'glass' | 'ceramic';
}

// 심플한 컬러 옵션 (4개)
const COLOR_OPTIONS: ColorOption[] = [
  { name: '실버 메탈', value: '#C0C0C0', material: 'metal' },
  { name: '올로라 민트', value: '#E8FFF6', material: 'anodizing' },
  { name: '스페이스 그린', value: '#0D4F3C', material: 'metal' },
  { name: '퓨어 화이트', value: '#FFFFFF', material: 'ceramic' }
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const { isMobile } = useViewport();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      {/* 우주 배경 효과 - 별빛 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse shadow-sm shadow-white/50"></div>
        <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse shadow-sm shadow-blue-200/50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-1/4 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse shadow-sm shadow-purple-200/50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-pulse shadow-sm shadow-cyan-200/50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-10 w-0.5 h-0.5 bg-white rounded-full animate-pulse shadow-sm shadow-white/50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse shadow-sm shadow-indigo-200/50" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-violet-200 rounded-full animate-pulse shadow-sm shadow-violet-200/50" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* 전체화면 3D 모델 배경 */}
      <div className="absolute inset-0">
        <ModelContainer 
          modelPath="/SALIXLIFEHERO3D.glb"
          className="w-full h-full"
          selectedColor={selectedColor.value}
          selectedMaterial={selectedColor.material}
          isProductPage={false}
        />
        {/* 우주 느낌 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
      </div>
      
      {/* 중앙 텍스트 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className={`max-w-3xl mx-auto text-center px-6 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6">
            SALIX O²
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-8">
            생명을 지키는 가장 작은 혁신
          </p>
          
          {/* 컬러 선택 - 텍스트 하단으로 이동 */}
          <div className="flex justify-center gap-3 mb-4">
            {COLOR_OPTIONS.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`hero-color-button w-12 h-12 rounded-full border-2 ${
                  selectedColor.value === color.value 
                  ? 'border-white scale-110 shadow-lg shadow-white/30' 
                  : 'border-white/30 hover:border-white/60'
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>
          
          {/* 선택된 컬러 이름 표시 */}
          <p className="text-sm text-white/60 font-light">
            {selectedColor.name}
          </p>
        </div>
      </div>
      
      {/* 스크롤 힌트 - 위치 조정 */}
      <div className={`absolute z-10 text-white/60 ${
        isMobile ? 'bottom-6 right-6' : 'bottom-8 left-8'
      }`}>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-light">스크롤</span>
          <div className="scroll-hint">↓</div>
        </div>
      </div>
      
      {/* 추가 정보 힌트 - 우측 상단 */}
      <div className="absolute top-20 right-6 z-10 text-white/60 text-xs font-light">
        <div className="model-hint flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span>3D 모델 회전 가능</span>
        </div>
      </div>
    </section>
  );
} 