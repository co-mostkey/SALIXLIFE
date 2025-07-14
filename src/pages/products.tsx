import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import FullScreenSection from '../components/ui/FullScreenSection';
import ContainerWrapper from '../components/ui/ContainerWrapper';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useViewport } from '../contexts/ViewportContext';
import { useProductsTranslation } from '../utils/i18n';

// 3D 모델 뷰어 동적 임포트
const ModelContainer = dynamic(() => import('../components/3d/ModelContainer'), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-900 flex items-center justify-center"><div className="text-white">3D 모델 로딩중...</div></div>
});

// 타입 정의
interface ProductSpec {
  label: string;
  value: string;
}

interface ProductInfo {
  id: 'device' | 'deviceear' | 'devicecontact';
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
}

type MaterialType = 'metal' | 'plastic' | 'glass' | 'ceramic' | 'anodizing';

export default function Products() {
  const { t } = useProductsTranslation();
  const [selectedProductId, setSelectedProductId] = useState<'device' | 'deviceear' | 'devicecontact'>('device');
  const [selectedColor, setSelectedColor] = useState('#C0C0C0');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('anodizing');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(75);
  const [lightness, setLightness] = useState(75);
  const [rgb, setRgb] = useState({ r: 192, g: 192, b: 192 });
  const { isMobile } = useViewport();

  // HSL을 RGB로 변환
  const hslToRgb = (h: number, s: number, l: number) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 1/6) {
      r = c; g = x; b = 0;
    } else if (1/6 <= h && h < 2/6) {
      r = x; g = c; b = 0;
    } else if (2/6 <= h && h < 3/6) {
      r = 0; g = c; b = x;
    } else if (3/6 <= h && h < 4/6) {
      r = 0; g = x; b = c;
    } else if (4/6 <= h && h < 5/6) {
      r = x; g = 0; b = c;
    } else if (5/6 <= h && h < 1) {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  };

  // RGB를 HSL로 변환
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // 색상 업데이트
  const updateColor = (newHue: number, newSat: number, newLight: number) => {
    setHue(newHue);
    setSaturation(newSat);
    setLightness(newLight);
    
    const newRgb = hslToRgb(newHue, newSat, newLight);
    setRgb(newRgb);
    setSelectedColor(`rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`);
  };

  // RGB 값 직접 변경
  const updateRgb = (newRgb: { r: number, g: number, b: number }) => {
    setRgb(newRgb);
    setSelectedColor(`rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`);
    
    const hsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  };

  // 동적으로 제품 데이터 생성
  const products: ProductInfo[] = [
    {
      id: 'device',
      name: t('device.name'),
      subtitle: t('device.subtitle'),
      description: t('device.description'),
      features: Array.isArray(t('device.features')) ? t('device.features') : [],
      specs: [
        { label: t('specLabels.weight'), value: t('device.specs.weight') },
        { label: t('specLabels.capacity'), value: t('device.specs.capacity') },
        { label: t('specLabels.duration'), value: t('device.specs.duration') },
        { label: t('specLabels.pressure'), value: t('device.specs.pressure') }
      ]
    },
    {
      id: 'deviceear',
      name: t('deviceear.name'),
      subtitle: t('deviceear.subtitle'),
      description: t('deviceear.description'),
      features: Array.isArray(t('deviceear.features')) ? t('deviceear.features') : [],
      specs: [
        { label: t('specLabels.weight'), value: t('deviceear.specs.weight') },
        { label: t('specLabels.battery'), value: t('deviceear.specs.battery') },
        { label: t('specLabels.connectivity'), value: t('deviceear.specs.connectivity') },
        { label: t('specLabels.waterproof'), value: t('deviceear.specs.waterproof') }
      ]
    },
    {
      id: 'devicecontact',
      name: t('devicecontact.name'),
      subtitle: t('devicecontact.subtitle'),
      description: t('devicecontact.description'),
      features: Array.isArray(t('devicecontact.features')) ? t('devicecontact.features') : [],
      specs: [
        { label: t('specLabels.material'), value: t('devicecontact.specs.material') },
        { label: t('specLabels.length'), value: t('devicecontact.specs.length') },
        { label: t('specLabels.connection'), value: t('devicecontact.specs.connection') },
        { label: t('specLabels.pressure'), value: t('devicecontact.specs.pressure') }
      ]
    }
  ];

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // 컬러 옵션
  const colorOptions = Object.entries(t('colors')).map(([key, name]) => ({
    name: name as string,
    value: getColorValue(key)
  }));

  // 재질 옵션
  const materialOptions = Object.entries(t('materials')).map(([key, material]: [string, any]) => ({
    id: key as MaterialType,
    name: material.name,
    description: material.description
  }));

  function getColorValue(colorKey: string): string {
    const colorMap: Record<string, string> = {
      silverMetal: '#C0C0C0',
      premiumGold: '#FFD700',
      deepBlack: '#2C2C2C',
      sapphireBlue: '#0F52BA',
      emerald: '#50C878',
      roseGold: '#E8B4B8',
      titanium: '#878681',
      purpleHaze: '#9370DB',
      crimsonRed: '#DC143C',
      oceanBlue: '#006994',
      sunsetOrange: '#FF8C00',
      forestGreen: '#228B22',
      lavender: '#E6E6FA',
      coralPink: '#F88379',
      midnightBlue: '#191970',
      mintGreen: '#98FB98'
    };
    return colorMap[colorKey] || '#C0C0C0';
  }

  return (
    <>
      <Head>
        <title>{t('title')} | SALIX LIFE</title>
        <meta name="description" content={t('description')} />
      </Head>

      <FullScreenSection>
        <div className="h-full bg-white">
          <div className="h-full px-4 sm:px-6 lg:px-8">
            <div className="h-full flex flex-col py-4" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              
              {/* 메인 콘텐츠: 좌우 분할 - 전체 화면 사용 */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
                
                {/* 좌측: 3D 모델 뷰어 - 전체 영역 사용 */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-xl">
                  <ModelContainer
                    modelPath={`/models/${selectedProductId}.glb`}
                    selectedColor={selectedColor}
                    selectedMaterial={selectedMaterial}
                    isProductPage={true}
                  />
                  
                  {/* 줌 힌트 */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    {t('ui.zoomHint')}
                  </div>
                </div>

                {/* 우측: 제품 정보 - 2열 레이아웃으로 모든 콘텐츠 표시 */}
                <div className="flex flex-col h-full">
                  {/* 제품 선택 탭 */}
                  <div className="flex-shrink-0 mb-4">
                    <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-xl">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProductId(product.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedProductId === product.id
                              ? 'bg-white text-primary shadow-md'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                          }`}
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-3">
                    
                    {/* 좌측 열 */}
                    <div className="flex flex-col space-y-3">
                      {/* 제품 기본 정보 */}
                      <div className="flex-shrink-0">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                          {selectedProduct.name}
                        </h1>
                        <p className="text-sm text-primary font-medium mb-1">
                          {selectedProduct.subtitle}
                        </p>
                        <p className="text-xs text-gray-600 leading-tight">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* 주요 특징 */}
                      <div className="flex-shrink-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {t('ui.mainFeatures')}
                        </h3>
                        <div className="space-y-0.5">
                          {selectedProduct.features.map((feature, index) => (
                            <div key={index} className="flex items-start text-sm text-gray-700">
                              <svg className="w-3 h-3 text-primary mr-1 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="flex-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 컬러 선택 */}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {t('ui.colorSelection')}
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-lg h-full flex flex-col">
                          {/* 메인 컬러 영역 */}
                          <div className="flex-1 mb-3 relative">
                            <div 
                              className="w-full h-full rounded cursor-crosshair relative overflow-hidden"
                              style={{ 
                                background: `linear-gradient(to right, white, hsl(${hue}, 100%, 50%)), linear-gradient(to bottom, transparent, black)`,
                                backgroundBlendMode: 'multiply',
                                minHeight: '80px'
                              }}
                              onMouseDown={(e) => {
                                const handleMouseMove = (e: MouseEvent) => {
                                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                                  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                  const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
                                  
                                  const newSat = Math.round(x * 100);
                                  const newLight = Math.round((1 - y) * 100);
                                  
                                  updateColor(hue, newSat, newLight);
                                };
                                
                                const handleMouseUp = () => {
                                  document.removeEventListener('mousemove', handleMouseMove);
                                  document.removeEventListener('mouseup', handleMouseUp);
                                };
                                
                                document.addEventListener('mousemove', handleMouseMove);
                                document.addEventListener('mouseup', handleMouseUp);
                                
                                // 초기 클릭 처리
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = (e.clientX - rect.left) / rect.width;
                                const y = (e.clientY - rect.top) / rect.height;
                                
                                const newSat = Math.round(x * 100);
                                const newLight = Math.round((1 - y) * 100);
                                
                                updateColor(hue, newSat, newLight);
                              }}
                            >
                              <div 
                                className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none"
                                style={{ 
                                  left: `${saturation}%`, 
                                  top: `${100 - lightness}%`, 
                                  transform: 'translate(-50%, -50%)' 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* 색상 스펙트럼 바 */}
                          <div className="mb-3">
                            <div 
                              className="w-full h-4 rounded cursor-pointer relative"
                              style={{ 
                                background: 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)'
                              }}
                              onMouseDown={(e) => {
                                const handleMouseMove = (e: MouseEvent) => {
                                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                                  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                  const newHue = Math.round(x * 360);
                                  
                                  updateColor(newHue, saturation, lightness);
                                };
                                
                                const handleMouseUp = () => {
                                  document.removeEventListener('mousemove', handleMouseMove);
                                  document.removeEventListener('mouseup', handleMouseUp);
                                };
                                
                                document.addEventListener('mousemove', handleMouseMove);
                                document.addEventListener('mouseup', handleMouseUp);
                                
                                // 초기 클릭 처리
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = (e.clientX - rect.left) / rect.width;
                                const newHue = Math.round(x * 360);
                                
                                updateColor(newHue, saturation, lightness);
                              }}
                            >
                              <div 
                                className="absolute w-2 h-6 bg-white border border-gray-400 rounded-sm shadow-sm pointer-events-none"
                                style={{ 
                                  left: `${(hue / 360) * 100}%`, 
                                  top: '-4px',
                                  transform: 'translateX(-50%)'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* RGB 값 표시 */}
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="text-center">
                              <input 
                                type="number" 
                                min="0" 
                                max="255" 
                                value={rgb.r}
                                onChange={(e) => updateRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                                className="w-full text-xs p-1 rounded text-center text-gray-900 bg-white"
                              />
                              <div className="text-xs text-gray-800 mt-1 font-medium">R</div>
                            </div>
                            <div className="text-center">
                              <input 
                                type="number" 
                                min="0" 
                                max="255" 
                                value={rgb.g}
                                onChange={(e) => updateRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                                className="w-full text-xs p-1 rounded text-center text-gray-900 bg-white"
                              />
                              <div className="text-xs text-gray-800 mt-1 font-medium">G</div>
                            </div>
                            <div className="text-center">
                              <input 
                                type="number" 
                                min="0" 
                                max="255" 
                                value={rgb.b}
                                onChange={(e) => updateRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                                className="w-full text-xs p-1 rounded text-center text-gray-900 bg-white"
                              />
                              <div className="text-xs text-gray-800 mt-1 font-medium">B</div>
                            </div>
                          </div>
                          
                          {/* 선택된 색상 표시 */}
                          <div className="text-center">
                            <div className="text-xs text-gray-600">
                              {selectedColor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 우측 열 */}
                    <div className="flex flex-col space-y-3">
                      {/* 기술 사양 */}
                      <div className="flex-shrink-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {t('ui.techSpecs')}
                        </h3>
                        <div className="space-y-1">
                          {selectedProduct.specs.map((spec, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded flex justify-between">
                              <div className="text-xs text-gray-600">{spec.label}</div>
                              <div className="font-medium text-xs text-gray-900">{spec.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 재질 선택 */}
                      <div className="flex-shrink-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {t('ui.materialSelection')}
                        </h3>
                        <div className="space-y-1">
                          {materialOptions.map((material) => (
                            <button
                              key={material.id}
                              onClick={() => setSelectedMaterial(material.id)}
                              className={`w-full p-2 rounded border transition-all duration-300 text-left ${
                                selectedMaterial === material.id
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                              }`}
                            >
                              <div className="font-medium text-xs">{material.name}</div>
                              <div className="text-xs opacity-75">{material.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 특별 혜택 */}
                      <div className="flex-shrink-0">
                        <h3 className="text-base font-semibold text-primary mb-1">
                          {t('ui.specialBenefits')}
                        </h3>
                        <div className="bg-primary/5 p-2 rounded-lg border border-primary/20">
                          <div className="space-y-0.5">
                            {(Array.isArray(t('ui.benefits')) ? t('ui.benefits') : []).map((benefit: string, index: number) => (
                              <div key={index} className="text-xs text-primary flex items-center">
                                <svg className="w-2.5 h-2.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullScreenSection>
    </>
  );
}