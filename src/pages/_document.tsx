import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 폰트 프리로드 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* 파비콘 설정 */}
        <link rel="icon" href="/favicon.png?v=3" type="image/png" />
        <link rel="alternate icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png?v=3" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png?v=3" sizes="32x32" type="image/png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/images/salix-new-logo.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/salix-new-logo.png?v=3" />
        
        {/* Android/Chrome */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#007F5F" />
        <meta name="background-color" content="#0A1E1A" />
        
        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#007F5F" />
        <meta name="msapplication-TileImage" content="/images/salix-new-logo.png?v=3" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/favicon.png?v=3" color="#007F5F" />
        
        {/* 추가 메타 태그 */}
        <meta name="application-name" content="샐릭스 라이프" />
        <meta name="apple-mobile-web-app-title" content="SalixLife" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* DNS 프리페치 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}