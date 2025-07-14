/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D4F3C', // 스페이스 그린 (메인 히어로 컬러)
        secondary: '#60BFB0', // 올로라 민트 톤 (기존 유지)
        dark: '#0A1E1A',
        accent: '#E8FFF6', // 올로라 민트 (메인 히어로 컬러)
        light: '#E8F8F5',
        silver: '#C0C0C0', // 실버 메탈 (메인 히어로 컬러)
        'pure-white': '#FFFFFF' // 퓨어 화이트 (메인 히어로 컬러)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 