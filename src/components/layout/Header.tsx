import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCommonTranslation } from '../../utils/i18n';

export default function Header() {
  const { t } = useCommonTranslation();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.technology'), href: '/technology' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.research'), href: '/research' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <nav className="w-full">
        <div className="flex justify-center items-center h-16 px-4 relative">
          {/* 중앙 로고 및 브랜드명 */}
          <Link href="/" className="flex flex-col items-center justify-center">
            <img 
              src="/images/salix-life-logo.png" 
              alt="SALIX Life" 
              className="h-8 w-auto filter brightness-0 invert"
            />
            <span className="text-xs font-medium text-white tracking-wider -mt-0.5">
              SALIX LIFE
            </span>
          </Link>

          {/* 우측 햄버거 메뉴 버튼 */}
          <div className="absolute right-4">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors"
              >
                <span className="sr-only">메뉴 열기</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>

              {/* 햄버거 메뉴 드롭다운 - 버튼 바로 아래 */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 shadow-2xl rounded-lg border border-gray-700 z-40 overflow-hidden">
                  <div className="py-2">
                    {/* 네비게이션 메뉴 */}
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          router.pathname === item.href
                            ? 'text-white bg-gray-700 border-l-4 border-primary'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 클릭 외부 영역 감지 오버레이 */}
              {isMenuOpen && (
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
} 