import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { LanguageProvider } from '../utils/i18n';
import { ViewportProvider } from '../contexts/ViewportContext';
import PageTransition from '../components/ui/PageTransition';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/layout/LoadingScreen';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // 첫 방문 여부 확인 (클라이언트 사이드에서만 실행)
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem('hasVisitedBefore');
      
      if (!hasVisited) {
        // 첫 방문이면 로딩 화면 표시
        setShowLoading(true);
        // 방문 기록 저장
        localStorage.setItem('hasVisitedBefore', 'true');
      }
    }
  }, []);

  return (
    <ViewportProvider>
      <LanguageProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg?v=1" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico?v=1" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/favicon.svg?v=1" />
          <meta name="theme-color" content="#007F5F" />
        </Head>
        {showLoading && <LoadingScreen minDuration={3000} />}
        <Layout>
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </Layout>
      </LanguageProvider>
    </ViewportProvider>
  );
} 