import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ModelViewer from './ModelViewer';
import Fallback3D from '../ui/Fallback3D';

interface ModelContainerProps {
  modelPath: string;
  className?: string;
  backgroundOpacity?: number;
  isProductPage?: boolean;
  selectedColor?: string;
  selectedMaterial?: 'anodizing' | 'metal' | 'plastic' | 'glass' | 'ceramic';
}

// Error Boundary 컴포넌트
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function ModelContainer({ 
  modelPath, 
  className = '', 
  backgroundOpacity = 0,
  isProductPage = false,
  selectedColor = '#60BFB0',
  selectedMaterial = 'anodizing'
}: ModelContainerProps) {
  const [modelError, setModelError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false); // Ctrl 키 상태 추적 활성화

  // 모든 훅을 조건부 반환 이전에 호출
  
  // 모델 타입 판단
  const isMainDevice = useMemo(() => modelPath.includes('device.') && !modelPath.includes('deviceear.') && !modelPath.includes('devicecontact.'), [modelPath]);
  const isEarDevice = useMemo(() => modelPath.includes('deviceear.'), [modelPath]);
  const isContactDevice = useMemo(() => modelPath.includes('devicecontact.'), [modelPath]);
  const isHeroModel = useMemo(() => modelPath.includes('SALIXLIFEHERO3D.glb'), [modelPath]);

  // 재질 속성 설정
  const materialProps = useMemo(() => {
    switch (selectedMaterial) {
      case 'metal':
        return { 
          metalness: 0.95, 
          roughness: 0.05,
          transmission: 0,
          transparent: false
        };
      case 'plastic':
        return { 
          metalness: 0.1, 
          roughness: 0.7,
          transmission: 0,
          transparent: false
        };
      case 'glass':
        return { 
          metalness: 0.2, 
          roughness: 0.1, 
          transmission: 0.9, 
          transparent: true
        };
      case 'ceramic':
        return { 
          metalness: 0.3, 
          roughness: 0.4,
          transmission: 0,
          transparent: false
        };
      case 'anodizing':
        return { 
          metalness: 0.98, 
          roughness: 0.02,
          transmission: 0,
          transparent: false
        };
      default:
        return { 
          metalness: 0.8, 
          roughness: 0.2,
          transmission: 0,
          transparent: false
        };
    }
  }, [selectedMaterial]);

  // 제품에 따른 적절한 위치 및 스케일 설정
  const modelConfig = useMemo(() => {
    // 메인페이지 기본 카메라 설정 - 아래에서 위로 올려다보는 뷰
    let cameraPosition: [number, number, number] = [2, -1.5, 3]; // 카메라를 아래쪽으로 이동
    let modelPosition: [number, number, number] = [0, 0.5, 0]; // 모델을 약간 위쪽으로 이동
    let modelRotation: [number, number, number] = [0, -Math.PI / 6, 0];
    let modelScale = 12; // 기본 4에서 3배로 증가 (4 × 3 = 12)
    let targetPosition: [number, number, number] = [0, 1, 0]; // 카메라가 위쪽을 바라보도록
    let autoRotateSpeed = 0.2;
    
    // 히어로 모델 설정 - 아래에서 위로 올려다보는 뷰
    if (isHeroModel) {
      cameraPosition = [6, -2, 10]; // 카메라를 아래쪽으로 이동
      modelPosition = [2, -3, 0]; // 모델 위치를 약간 올림
      modelRotation = [0, 0, 0];
      modelScale = 32; // 기본 16에서 3배로 증가 (16 × 3 = 48)
      targetPosition = [2, 0, 0]; // 카메라가 모델 중앙~위쪽을 바라보도록
      autoRotateSpeed = 0.1;
    }
    // 제품 페이지에서는 제품별로 다르게 설정 (좌측 뷰어 중앙 배치, 상단 탭 고려)
    else if (isProductPage) {
      // 제품 페이지 전용 통합 설정 - 안정적인 위치/스케일 관리
      const productPageConfig = {
        device: {
          // 메인 디바이스 (실린더) - 좌측 중앙 최적화
          cameraPosition: [0, 0, 8] as [number, number, number], // 카메라를 더 뒤로
          modelPosition: [0, -3, 0] as [number, number, number], // 실린더 더 아래로
          modelRotation: [0, Math.PI, 0] as [number, number, number], // 백 포지션이 먼저 나오도록 180도 회전
          modelScale: 18, // 사이즈 늘림
          targetPosition: [0, -2, 0] as [number, number, number], // 타겟도 더 아래로
          autoRotateSpeed: 0.2,
          enableZoom: true, // 제품 페이지에서 줌 활성화
          minDistance: 4,
          maxDistance: 12
        },
        deviceear: {
          // 인이어형 디바이스 - 좌측 중앙 최적화
          cameraPosition: [0, 0, 7] as [number, number, number],
          modelPosition: [0, 0, 0] as [number, number, number], // 중앙 정렬
          modelRotation: [0, 0, 0] as [number, number, number],
          modelScale: 22,
          targetPosition: [0, 0, 0] as [number, number, number], // 중앙 타겟
          autoRotateSpeed: 0.3,
          enableZoom: true,
          minDistance: 5,
          maxDistance: 15
        },
        devicecontact: {
          // 연결 호스 - 좌측 중앙 최적화
          cameraPosition: [0, 0, 8] as [number, number, number],
          modelPosition: [0, 0, 0] as [number, number, number], // 중앙 정렬
          modelRotation: [0, 0, 0] as [number, number, number],
          modelScale: 22,
          targetPosition: [0, 0, 0] as [number, number, number], // 중앙 타겟
          autoRotateSpeed: 0.3,
          enableZoom: true,
          minDistance: 6,
          maxDistance: 18
        }
      };

      // 현재 제품에 맞는 설정 적용
      let currentProductConfig = productPageConfig.device; // 기본값
      if (isMainDevice) {
        currentProductConfig = productPageConfig.device;
      } else if (isEarDevice) {
        currentProductConfig = productPageConfig.deviceear;
      } else if (isContactDevice) {
        currentProductConfig = productPageConfig.devicecontact;
      }

      return {
        cameraPosition: currentProductConfig.cameraPosition,
        modelPosition: currentProductConfig.modelPosition,
        modelRotation: currentProductConfig.modelRotation,
        modelScale: currentProductConfig.modelScale,
        targetPosition: currentProductConfig.targetPosition,
        autoRotateSpeed: currentProductConfig.autoRotateSpeed,
        enableZoom: currentProductConfig.enableZoom,
        minDistance: currentProductConfig.minDistance,
        maxDistance: currentProductConfig.maxDistance
      };
    }
    
    return { cameraPosition, modelPosition, modelRotation, modelScale, targetPosition, autoRotateSpeed };
  }, [isHeroModel, isProductPage, isMainDevice, isEarDevice, isContactDevice]);

  // 모델 로드 에러 처리 함수
  const handleModelError = useMemo(() => () => {
    setModelError(true);
  }, []);

  // 서버 사이드 렌더링 처리
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ctrl 키 상태 추적 제거 - 줌 기능 비활성화로 불필요
  useEffect(() => {
    if (!isProductPage) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressed(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        setIsCtrlPressed(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isProductPage]);

  // 조건부 반환을 모든 훅 호출 이후로 이동
  if (!isClient) {
    return <Fallback3D className={className} />;
  }
  
  if (modelError) {
    return <Fallback3D className={className} />;
  }

  return (
    <div className={`w-full h-full ${className} relative`}>
      {/* 제품 페이지 줌 안내 UI 제거 - 줌 기능 비활성화 */}
      {/* {isProductPage && (
        <div className="absolute top-4 right-4 z-10 text-xs text-white/60 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
          Ctrl + Wheel: Zoom
        </div>
      )} */}
      <ModelErrorBoundary fallback={<Fallback3D className="w-full h-full" />}>
        <Canvas 
          camera={{ position: modelConfig.cameraPosition, fov: isHeroModel ? 45 : (isProductPage ? 50 : 30) }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
          shadows
        >
          {/* 배경색 제거 - 투명 배경 사용 */}
          
          {/* 고품질 조명 설정 */}
          <ambientLight intensity={isHeroModel ? 0.8 : 0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={isHeroModel ? 1.5 : 1.2} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={isHeroModel ? 1.0 : 0.8} 
          />
          <pointLight 
            position={[0, 2, 5]} 
            intensity={isHeroModel ? 0.7 : 0.5} 
          />
          <spotLight 
            position={[5, 10, 5]} 
            angle={0.3} 
            penumbra={0.8} 
            intensity={isHeroModel ? 0.8 : 0.6} 
            castShadow
            shadow-bias={-0.0001}
          />
          
          {/* 히어로 모델용 추가 조명 - 메탈 표현에 최적화 */}
          {isHeroModel && (
            <>
              <pointLight position={[-3, 1, 3]} intensity={0.6} color="#ffffff" />
              <pointLight position={[3, -1, 2]} intensity={0.5} color="#f8f8f8" />
              <directionalLight position={[0, 10, 0]} intensity={0.4} color="#ffffff" />
              <directionalLight position={[2, 5, -2]} intensity={0.3} color="#e8e8e8" />
            </>
          )}
          
          <Suspense fallback={null}>
            <ModelViewer 
              modelPath={modelPath}
              position={modelConfig.modelPosition}
              scale={modelConfig.modelScale}
              rotation={modelConfig.modelRotation}
              onError={handleModelError}
              autoRotate={true}
              // fitToView={isProductPage ? false : true} // 제거 - 스케일은 modelScale에서만 관리
              metalness={materialProps.metalness}
              roughness={materialProps.roughness}
              transmission={materialProps.transmission}
              transparent={materialProps.transparent}
              color={selectedColor}
            />
            <Environment preset={isHeroModel ? "warehouse" : "studio"} background={false} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={isProductPage ? isCtrlPressed : true} // 제품 페이지에서는 Ctrl 키 눌렸을 때만 줌 활성화
            enablePan={false}
            minPolarAngle={isProductPage ? 0 : (isHeroModel ? Math.PI / 16 : Math.PI / 6)}
            maxPolarAngle={isProductPage ? Math.PI : (isHeroModel ? Math.PI / 1.2 : Math.PI / 1.8)}
            minAzimuthAngle={isProductPage ? -Infinity : -Math.PI / 3}
            maxAzimuthAngle={isProductPage ? Infinity : Math.PI / 3}
            minDistance={isProductPage ? (modelConfig.minDistance || 4) : (isHeroModel ? 5 : 3)}
            maxDistance={isProductPage ? (modelConfig.maxDistance || 12) : (isHeroModel ? 20 : 10)}
            zoomSpeed={isProductPage ? 0.8 : 0.5} // 제품 페이지에서 줌 속도 조정
            autoRotate={true}
            autoRotateSpeed={modelConfig.autoRotateSpeed}
            target={modelConfig.targetPosition}
            enableDamping={true} // 부드러운 애니메이션 효과 추가
            dampingFactor={0.05} // 댐핑 팩터 설정
          />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
} 