// 기술혁신 섹션 루트 관리 파일
// 모든 슬라이드별 번역 파일을 통합 관리

import introData from './intro.json';
import coreInnovationsData from './core-innovations.json';
import techSpecsData from './tech-specs.json';
import competitiveAdvantageData from './competitive-advantage.json';
import futureVisionData from './future-vision.json';

// 기술혁신 섹션 통합 데이터 타입
export interface TechnologyData {
  title: string;
  description: string;
  slides: {
    intro: typeof introData;
    coreInnovations: typeof coreInnovationsData;
    techSpecs: typeof techSpecsData;
    competitiveAdvantage: typeof competitiveAdvantageData;
    futureVision: typeof futureVisionData;
  };
}

// 통합 데이터 객체
export const technologyData: TechnologyData = {
  title: "기술혁신",
  description: "SALIX O²의 혁신적인 핵심 기술을 소개합니다.",
  slides: {
    intro: introData,
    coreInnovations: coreInnovationsData,
    techSpecs: techSpecsData,
    competitiveAdvantage: competitiveAdvantageData,
    futureVision: futureVisionData
  }
};

// 개별 슬라이드 데이터 내보내기
export { 
  introData,
  coreInnovationsData,
  techSpecsData,
  competitiveAdvantageData,
  futureVisionData
};

// 기본 내보내기
export default technologyData; 