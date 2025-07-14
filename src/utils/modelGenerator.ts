import * as THREE from 'three';

/**
 * 메인 호흡기 모델 생성 (실린더형)
 */
export const createDeviceModel = (metalness: number = 0.8, roughness: number = 0.2, color?: string): THREE.Group => {
  const group = new THREE.Group();
  
  // 메인 바디 (실린더)
  const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: color ? new THREE.Color(color) : 0x60BFB0,
    metalness,
    roughness
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  group.add(body);
  
  // 상단 캡
  const capGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: Math.min(1, metalness + 0.1),
    roughness: Math.max(0.1, roughness - 0.1)
  });
  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.set(0, 1.2, 0);
  group.add(cap);
  
  // 추가 디테일: 버튼
  const buttonGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: 0x007F5F,
    metalness: Math.min(1, metalness - 0.1),
    roughness: Math.min(1, roughness + 0.1)
  });
  const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button.position.set(0.7, 0.2, 0);
  button.rotation.set(0, 0, Math.PI / 2);
  group.add(button);
  
  // 디스플레이 패널
  const displayGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.1);
  const displayMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: Math.min(1, metalness - 0.3),
    roughness: Math.min(1, roughness + 0.6),
    emissive: 0x222222
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 0.5, 0.75);
  group.add(display);
  
  return group;
};

/**
 * 인이어형 호흡기 모델 생성 (곡선형)
 */
export const createEarDeviceModel = (metalness: number = 0.7, roughness: number = 0.3, color?: string): THREE.Group => {
  const group = new THREE.Group();
  
  // 메인 곡선 부분
  const mainGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI);
  const mainMaterial = new THREE.MeshStandardMaterial({
    color: color ? new THREE.Color(color) : 0x60BFB0,
    metalness,
    roughness
  });
  const main = new THREE.Mesh(mainGeometry, mainMaterial);
  main.rotation.set(0, 0, Math.PI / 2);
  group.add(main);
  
  // 이어버드 부분
  const earbudGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const earbudMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: Math.min(1, metalness + 0.1),
    roughness: Math.max(0.1, roughness - 0.1)
  });
  const earbud = new THREE.Mesh(earbudGeometry, earbudMaterial);
  earbud.position.set(0.5, 0, 0);
  group.add(earbud);
  
  // 스피커 디테일
  const speakerGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
  const speakerMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: Math.min(1, metalness + 0.1),
    roughness: Math.max(0.1, roughness - 0.1)
  });
  const speaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
  speaker.position.set(0.5, 0, 0.2);
  speaker.rotation.set(Math.PI / 2, 0, 0);
  group.add(speaker);
  
  // LED 인디케이터
  const ledGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    emissive: 0x00FF00,
    emissiveIntensity: 0.5
  });
  const led = new THREE.Mesh(ledGeometry, ledMaterial);
  led.position.set(-0.4, -0.3, 0);
  group.add(led);
  
  return group;
};

/**
 * 연결 호스 모델 생성 (튜브형)
 */
export const createContactModel = (metalness: number = 0.6, roughness: number = 0.4, color?: string): THREE.Group => {
  const group = new THREE.Group();
  
  // 메인 튜브
  const tubeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 32);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: color ? new THREE.Color(color) : 0x60BFB0,
    metalness,
    roughness,
    transparent: true,
    opacity: 0.9
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  tube.rotation.set(Math.PI / 2, 0, 0);
  group.add(tube);
  
  // 첫 번째 커넥터
  const connector1Geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 32);
  const connectorMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: Math.min(1, metalness + 0.2),
    roughness: Math.max(0.1, roughness - 0.2)
  });
  const connector1 = new THREE.Mesh(connector1Geometry, connectorMaterial);
  connector1.position.set(0, 0, 1.5);
  connector1.rotation.set(Math.PI / 2, 0, 0);
  group.add(connector1);
  
  // 두 번째 커넥터
  const connector2Geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 32);
  const connector2 = new THREE.Mesh(connector2Geometry, connectorMaterial);
  connector2.position.set(0, 0, -1.5);
  connector2.rotation.set(Math.PI / 2, 0, 0);
  group.add(connector2);
  
  // 유연한 호스 느낌을 위한 세그먼트 추가
  for (let i = -4; i <= 4; i++) {
    if (i === 0) continue; // 중앙은 건너뜀
    
    const ringGeometry = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: color ? new THREE.Color(color) : 0x60BFB0,
      metalness,
      roughness
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, 0, i * 0.3);
    ring.rotation.set(Math.PI / 2, 0, 0);
    group.add(ring);
  }
  
  return group;
};