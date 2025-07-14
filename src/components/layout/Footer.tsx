import React, { useState } from 'react';
import Link from 'next/link';
import { useCommonTranslation } from '../../utils/i18n';
import LanguageSelector from '../ui/LanguageSelector';

export default function Footer() {
  const { t } = useCommonTranslation();
  const currentYear = new Date().getFullYear();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInvestorAlert, setShowInvestorAlert] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInvestorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowInvestorAlert(true);
    setTimeout(() => setShowInvestorAlert(false), 3000);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          {/* 토글 헤더 (모든 화면 크기) */}
          <div className="relative">
            <button
              onClick={toggleExpanded}
              className="w-full py-4 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
            >
              {isExpanded ? (
                <div className="flex items-center space-x-2">
                  <img 
                    src="/images/salix-life-logo.png" 
                    alt="SALIX Life" 
                    className="h-6 w-auto filter brightness-0 invert"
                  />
                  <span className="text-sm font-medium">SALIX Life</span>
                </div>
              ) : (
                <span className="text-sm text-gray-300">
                  © 2025 SALIX LIFE. All rights reserved.
                </span>
              )}
            </button>
            
            {/* 언어 버튼 - 우측 끝에 고정 */}
            <div className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2">
              <LanguageSelector />
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className={`${
            isExpanded ? 'block' : 'hidden'
          } pb-6 md:pb-12`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 로고 및 회사 정보 */}
              <div className="col-span-1">
                <p className="text-gray-300 mb-4">
                  {t('footer.companyDescription')}
                </p>
                <p className="text-sm text-gray-400">
                  {t('footer.address')}
                </p>
              </div>

              {/* 회사 메뉴 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footer.company.title')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                      {t('nav.about')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="text-gray-300 hover:text-white transition-colors">
                      {t('nav.research')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                      {t('nav.contact')}
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      onClick={handleInvestorClick}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {t('footer.company.investors')}
                    </a>
                  </li>
                </ul>
              </div>

              {/* 제품 메뉴 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footer.products.title')}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                      {t('nav.products')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/technology" className="text-gray-300 hover:text-white transition-colors">
                      {t('nav.technology')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 하단 저작권 */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-center text-sm text-gray-400">
                {t('footer.copyright', { year: currentYear.toString() })}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 투자자 정보 준비중 팝업 */}
      {showInvestorAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowInvestorAlert(false)} />
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative z-10 transform animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('footer.investorAlert.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('footer.investorAlert.message')}
                <br />
                {t('footer.investorAlert.submessage')}
              </p>
              <button
                onClick={() => setShowInvestorAlert(false)}
                className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              >
                {t('footer.investorAlert.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 