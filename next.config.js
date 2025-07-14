/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  
  // 번들 최적화
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber'],
  },

  // 정적 자산 최적화
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // 빌드 최적화
  webpack: (config, { dev, isServer }) => {
    // 번들 크기 최적화 (Three.js alias 제거)
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Three.js 라이브러리를 별도 청크로 분리
          three: {
            name: 'three-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            priority: 20,
          },
          // React 라이브러리를 별도 청크로 분리
          react: {
            name: 'react-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 10,
          },
        },
      };
    }
    
    return config;
  },

  // 헤더 최적화
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/models/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;