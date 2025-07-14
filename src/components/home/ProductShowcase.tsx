import React, { useState } from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import ModelContainer from '../3d/ModelContainer';
import { useProductsTranslation } from '../../utils/i18n';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  modelPath: string;
  highlight: string;
}

interface ColorOption {
  name: string;
  value: string;
  material: 'anodizing' | 'metal' | 'plastic' | 'glass' | 'ceramic';
}

// 컬러칩 옵션 정의 (컴포넌트 외부로 이동)
const COLOR_OPTIONS: ColorOption[] = [
  { name: '퓨어 화이트', value: '#FFFFFF', material: 'ceramic' },
  { name: '실버 메탈', value: '#C0C0C0', material: 'metal' },
  { name: '골드 메탈', value: '#FFD700', material: 'metal' },
  { name: '로즈 골드', value: '#E8B4B8', material: 'metal' },
  { name: '플래티넘', value: '#E5E4E2', material: 'metal' },
  { name: '티타늄', value: '#878681', material: 'metal' },
  { name: '매트 블랙', value: '#2C2C2C', material: 'plastic' },
  { name: '크리스탈', value: '#F0F8FF', material: 'glass' }
];

export default function ProductShowcase() {
  const { t } = useProductsTranslation();
  
  // 실제 제품 데이터 - 번역 시스템 사용
  const products: Product[] = [
    {
      id: 'device',
      name: t('device.name'),
      description: t('device.description'),
      features: t('device.features') || [],
      modelPath: '/models/device.glb',
      highlight: '베스트셀러'
    },
    {
      id: 'deviceear',
      name: t('deviceear.name'),
      description: t('deviceear.description'),
      features: t('deviceear.features') || [],
      modelPath: '/models/deviceear.glb',
      highlight: '초경량'
    },
    {
      id: 'devicecontact',
      name: t('devicecontact.name'),
      description: t('devicecontact.description'),
      features: t('devicecontact.features') || [],
      modelPath: '/models/devicecontact.glb',
      highlight: '프로페셔널'
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleProductChange = (product: Product) => {
    if (product.id === selectedProduct.id) return;
    
    setIsChanging(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(96, 191, 176, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(0, 127, 95, 0.4) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        {/* 섹션 헤더 - 컴팩트 */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect mb-4">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">제품 라인업</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            <span className="gradient-text">SALIX O²</span> 시리즈
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            당신의 라이프스타일에 맞는 최적의 산소 솔루션을 선택하세요
          </p>
        </div>

        {/* 제품 선택 탭 - 컴팩트 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductChange(product)}
              className={`relative px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                selectedProduct.id === product.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                  : 'glass-effect text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10 font-medium">{product.name}</span>
              {product.highlight && selectedProduct.id === product.id && (
                <span className="absolute -top-2 -right-2 bg-secondary text-dark text-xs px-2 py-1 rounded-full font-semibold">
                  {product.highlight}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 제품 디스플레이 - 플렉스 레이아웃 */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center pb-8">
          {/* 왼쪽: 3D 모델 */}
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px]">
              {/* 배경 글로우 효과 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse-scale"></div>
              </div>
              
              {/* 3D 모델 컨테이너 */}
              <div className={`relative h-full transition-all duration-300 ${
                isChanging ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
              }`}>
                <ModelContainer 
                  modelPath={selectedProduct.modelPath}
                  className="w-full h-full"
                  selectedColor={selectedColor.value}
                  selectedMaterial={selectedColor.material}
                  isProductPage={false}
                />
                
                {/* 컬러칩 선택기 - 간소화 */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="glass-card p-2 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-white/30 shadow-lg"
                          style={{ backgroundColor: selectedColor.value }}
                        />
                        <span className="text-white/90 text-xs font-medium hidden sm:block">
                          {selectedColor.name}
                        </span>
                      </div>
                    </button>
                    
                    {/* 컬러칩 팔레트 */}
                    {showColorPicker && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 glass-card p-3 rounded-xl min-w-[240px] animate-fade-in">
                        <div className="grid grid-cols-4 gap-2">
                          {COLOR_OPTIONS.map((color, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedColor(color);
                                setShowColorPicker(false);
                              }}
                              className={`group relative p-1.5 rounded-lg transition-all duration-200 hover:scale-105 ${
                                selectedColor.value === color.value 
                                  ? 'ring-2 ring-secondary ring-offset-2 ring-offset-transparent' 
                                  : 'hover:ring-1 hover:ring-white/30'
                              }`}
                            >
                              <div 
                                className="w-8 h-8 rounded-md shadow-md border border-white/20"
                                style={{ backgroundColor: color.value }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 3D 모델 안내 텍스트 */}
              <div className="absolute top-4 right-4 glass-card p-2 animate-fade-in">
                <p className="text-xs text-white/70">🖱️ 드래그하여 회전</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 제품 정보 - 컴팩트 */}
          <div className={`transition-all duration-500 ${
            isChanging ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              {selectedProduct.name}
            </h3>
            <p className="text-base text-white/70 mb-6">
              {selectedProduct.description}
            </p>

            {/* 주요 특징 - 간소화 */}
            <div className="space-y-3 mb-6">
              {selectedProduct.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{feature}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA 버튼 - 간소화 */}
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 group">
                <span>자세히 알아보기</span>
                <svg className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                <span>비교하기</span>
              </button>
            </div>

            {/* 추가 정보 - 간소화 */}
            <div className="mt-6 p-4 glass-card rounded-xl">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold gradient-text">5년</p>
                  <p className="text-xs text-white/60">무상 보증</p>
                </div>
                <div>
                  <p className="text-lg font-bold gradient-text">24시간</p>
                  <p className="text-xs text-white/60">고객 지원</p>
                </div>
                <div>
                  <p className="text-lg font-bold gradient-text">무료</p>
                  <p className="text-xs text-white/60">배송 및 설치</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 