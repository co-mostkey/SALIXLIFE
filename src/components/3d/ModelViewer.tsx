import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial, Color } from 'three';
import { createDeviceModel, createEarDeviceModel, createContactModel } from '../../utils/modelGenerator';

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  // fitToView?: boolean; // 제거 - ModelContainer에서만 스케일 관리
  metalness?: number;
  roughness?: number;
  transmission?: number;
  transparent?: boolean;
  color?: string;
  onError?: () => void;
}

export default function ModelViewer({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  autoRotate = true,
  // fitToView = false, // 제거
  metalness = 0.5,
  roughness = 0.5,
  transmission,
  transparent,
  color,
  onError
}: ModelViewerProps) {
  const groupRef = useRef<Group>(null);
  
  // GLB 파일 로드 (Suspense 또는 ErrorBoundary에서 오류를 처리합니다)
  const gltf = useGLTF(modelPath);
  
  // 모델이 정상적으로 로드되었는지 확인
  const isModelValid = useMemo(() => {
    return gltf?.scene && gltf.scene.children && gltf.scene.children.length > 0;
  }, [gltf]);
  
  // 자동 회전은 OrbitControls에서 처리하므로 제거
  // useFrame((state, delta) => {
  //   if (groupRef.current && autoRotate) {
  //     groupRef.current.rotation.y += delta * 0.3;
  //   }
  // });

  // 모델 로드 실패 알림 (scene 이 없을 경우)
  useEffect(() => {
    if (!isModelValid && onError) {
      onError();
    }
  }, [isModelValid, onError]);

  // position은 JSX에서 직접 사용
  
  // 컴포넌트 마운트 시 초기 설정
  useEffect(() => {
    // 위치는 이미 JSX position prop으로 설정되므로 중복 제거
    
    // 메테리얼 설정 적용
    if (isModelValid && gltf?.scene) {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (child.material instanceof MeshStandardMaterial) {
            // 기본 메터리얼 속성 적용
            child.material.metalness = metalness;
            child.material.roughness = roughness;
            
            // 색상 적용 (지정된 경우)
            if (color) {
              child.material.color = new Color(color);
            }
            
            // 투명도 속성 적용 (지정된 경우)
            if (transmission !== undefined) {
              child.material.transmission = transmission;
            }
            
            if (transparent !== undefined) {
              child.material.transparent = transparent;
            }
          }
        }
      });
    }
  }, [isModelValid, gltf?.scene, metalness, roughness, color, transmission, transparent]);
  
  // 모델 타입에 따라 적절한 대체 모델 생성 함수 반환 (로드 실패 시)
  const getFallbackModel = useMemo(() => {
    if (modelPath.includes('device.') && !modelPath.includes('deviceear.') && !modelPath.includes('devicecontact.')) {
      return <primitive object={createDeviceModel(metalness, roughness, color)} />;
    } else if (modelPath.includes('deviceear.')) {
      return <primitive object={createEarDeviceModel(metalness, roughness, color)} />;
    } else if (modelPath.includes('devicecontact.')) {
      return <primitive object={createContactModel(metalness, roughness, color)} />;
    } else {
      // 기본값은 메인 디바이스
      return <primitive object={createDeviceModel(metalness, roughness, color)} />;
    }
  }, [modelPath, metalness, roughness, color]);

  // fitToView가 활성화된 경우 스케일 조정 - 제거하여 ModelContainer에서만 관리
  // const finalScale = useMemo(() => fitToView ? scale * 1.8 : scale, [fitToView, scale]);
  const finalScale = scale; // ModelContainer에서 전달받은 스케일 그대로 사용

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[finalScale, finalScale, finalScale]}>
      {isModelValid && gltf?.scene ? (
        <primitive object={gltf.scene.clone()} />
      ) : (
        getFallbackModel
      )}
    </group>
  );
}

// 모델 경로 설정
const modelPaths = [
  '/models/device.glb',
  '/models/deviceear.glb',
  '/models/devicecontact.glb'
];

// 모델 미리 로드 (선택적)
modelPaths.forEach(path => {
  useGLTF.preload(path);
}); 