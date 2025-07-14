import React, { useState, useEffect } from 'react';
import { useLanguage, Locale } from '../../utils/i18n';

const LANGUAGE_INFO = {
  ko: { name: '한국어', flag: '🇰🇷', code: 'KR' },
  en: { name: 'English', flag: '🇺🇸', code: 'EN' },
  ja: { name: '日本語', flag: '🇯🇵', code: 'JP' }
};

const LANGUAGES: Locale[] = ['ko', 'en', 'ja'];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleLanguageChange = (lang: Locale) => {
    setLocale(lang);
    setIsOpen(false);
  };
  
  if (!isMounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
          aria-label="언어 선택"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <span className="text-sm font-medium text-white">Language</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
        aria-label="언어 선택"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span className="text-sm font-medium text-white">Language</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
          <ul>
            {LANGUAGES.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 transition-all duration-200 ${
                    locale === lang 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{LANGUAGE_INFO[lang].flag}</span>
                  <span className="text-sm font-medium">{LANGUAGE_INFO[lang].name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 클릭 외부 영역 감지를 위한 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 