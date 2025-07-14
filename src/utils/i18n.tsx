import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// 한국어 번역 파일 정적 import
import koCommon from '../locales/ko/common.json';
import koProducts from '../locales/ko/products.json';
import koAbout from '../locales/ko/about.json';
import koResearch from '../locales/ko/research.json';
import koContact from '../locales/ko/contact.json';
import { technologyData as koTechnology } from '../locales/ko/technology';

export type Locale = 'ko' | 'en' | 'ja';

interface TranslationFiles {
  common: any;
  technology: any;
  products: any;
  about: any;
  research: any;
  contact: any;
  [key: string]: any;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, any>) => any;
  // 섹션별 번역 함수들
  tCommon: (key: string, params?: Record<string, any>) => any;
  tTechnology: (key: string, params?: Record<string, any>) => any;
  tProducts: (key: string, params?: Record<string, any>) => any;
  tAbout: (key: string, params?: Record<string, any>) => any;
  tResearch: (key: string, params?: Record<string, any>) => any;
  tContact: (key: string, params?: Record<string, any>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>('ko');
  const [translations, setTranslations] = useState<TranslationFiles>({
    common: koCommon,
    technology: koTechnology,
    products: koProducts,
    about: koAbout,
    research: koResearch,
    contact: koContact
  });
  const [isInitialized, setIsInitialized] = useState(true); // 초기값을 true로 변경

  // 기술혁신 섹션 번역 로드 함수 (모든 언어에서 분산 구조 사용)
  const loadTechnologyTranslations = async (newLocale: Locale) => {
    try {
      const technologyModule = await import(`../locales/${newLocale}/technology/index.ts`);
      return technologyModule.technologyData || technologyModule.default;
    } catch (error) {
      console.error(`기술혁신 번역 파일 로드 실패 (${newLocale}):`, error);
      return {};
    }
  };

  // 번역 파일들을 로드하는 함수
  const loadTranslations = useCallback(async (newLocale: Locale) => {
    try {
      // 공통, 제품, about, research 번역은 병렬로 로드, 기술혁신은 별도 처리
      const [commonModule, productsModule, aboutModule, researchModule, technologyData, contactModule] = await Promise.all([
        import(`../locales/${newLocale}/common.json`),
        import(`../locales/${newLocale}/products.json`),
        import(`../locales/${newLocale}/about.json`),
        import(`../locales/${newLocale}/research.json`),
        loadTechnologyTranslations(newLocale),
        import(`../locales/${newLocale}/contact.json`)
      ]);

      setTranslations({
        common: commonModule.default || commonModule,
        technology: technologyData,
        products: productsModule.default || productsModule,
        about: aboutModule.default || aboutModule,
        research: researchModule.default || researchModule,
        contact: contactModule.default || contactModule
      });
      setIsInitialized(true);
    } catch (error) {
      console.error(`번역 파일 로드 실패 (${newLocale}):`, error);
      // 기본 언어로 폴백
      if (newLocale !== 'ko') {
        await loadTranslations('ko');
      }
    }
  }, []);

  // 초기 번역 파일 로드
  useEffect(() => {
    loadTranslations(locale);
  }, [locale, loadTranslations]);

  // 언어 변경 시 번역 파일 다시 로드
  const changeLocale = useCallback(async (newLocale: Locale) => {
    setLocale(newLocale);
    await loadTranslations(newLocale);
  }, [loadTranslations]);

  // 중첩된 객체에서 키를 통해 값을 가져오는 헬퍼 함수
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // 문자열 템플릿 처리 함수
  const interpolate = (template: string, params?: Record<string, any>): string => {
    if (!params) return template;
    
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  };

  // 섹션별 번역 함수들
  const createTranslationFunction = (sectionData: any) => {
    return (key: string, params?: Record<string, any>): any => {
      const value = getNestedValue(sectionData, key);
      
      if (value === undefined) {
        console.warn(`번역 키를 찾을 수 없습니다: ${key}`);
        return key;
      }
      
      if (typeof value === 'string') {
        return interpolate(value, params);
      }
      
      return value;
    };
  };

  // 통합 번역 함수 (하위 호환성을 위해 유지)
  const t = (key: string, params?: Record<string, any>): any => {
    // 키가 어느 섹션인지 자동 감지
    if (key.startsWith('technology.')) {
      return tTechnology(key.replace('technology.', ''), params);
    }
    if (key.startsWith('products.')) {
      return tProducts(key.replace('products.', ''), params);
    }
    if (key.startsWith('about.')) {
      return tAbout(key.replace('about.', ''), params);
    }
    if (key.startsWith('research.')) {
      return tResearch(key.replace('research.', ''), params);
    }
    if (key.startsWith('contact.')) {
      return tContact(key.replace('contact.', ''), params);
    }
    
    // 기본적으로 common에서 찾기
    return tCommon(key, params);
  };

  // 섹션별 번역 함수 생성
  const tCommon = createTranslationFunction(translations.common);
  const tTechnology = createTranslationFunction(translations.technology);
  const tProducts = createTranslationFunction(translations.products);
  const tAbout = createTranslationFunction(translations.about);
  const tResearch = createTranslationFunction(translations.research);
  const tContact = createTranslationFunction(translations.contact);

  const contextValue: LanguageContextType = {
    locale,
    setLocale: changeLocale,
    t,
    tCommon,
    tTechnology,
    tProducts,
    tAbout,
    tResearch,
    tContact
  };

  // 번역이 초기화되지 않았으면 로딩 상태 반환
  if (!isInitialized) {
    return (
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage는 LanguageProvider 내에서 사용되어야 합니다');
  }
  return context;
}

// 편의를 위한 개별 훅들
export function useCommonTranslation() {
  const { tCommon, locale } = useLanguage();
  return { t: tCommon, locale };
}

export function useTechnologyTranslation() {
  const { tTechnology, locale } = useLanguage();
  return { t: tTechnology, locale };
}

export function useProductsTranslation() {
  const { tProducts, locale } = useLanguage();
  return { t: tProducts, locale };
}

export function useAboutTranslation() {
  const { tAbout, locale } = useLanguage();
  return { t: tAbout, locale };
}

export function useResearchTranslation() {
  const { tResearch, locale } = useLanguage();
  return { t: tResearch, locale };
}

export function useContactTranslation() {
  const { tContact, locale } = useLanguage();
  return { t: tContact, locale };
}