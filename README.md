# SALIX Life - 생명을 지키는 가장 작은 혁신

SALIX Life는 혁신적인 휴대용 산소 공급 장치를 개발하는 기업의 공식 웹사이트입니다.

## 🚀 주요 기능

- **다국어 지원**: 한국어, 영어, 일본어 완벽 지원
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **3D 모델 뷰어**: 제품을 360도로 확인 가능
- **연구게시판**: 이메일 인증 기반 보안 게시판
- **문의하기**: 실시간 문의 접수 시스템

## 📋 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

### 설치 방법

1. 저장소 클론
```bash
git clone [repository-url]
cd salixlife
```

2. 의존성 설치
```bash
pnpm install
```

3. 환경변수 설정
```bash
cp env.example .env.local
```
`.env.local` 파일을 열어 필요한 환경변수를 설정하세요.

4. 개발 서버 실행
```bash
pnpm run dev
```

5. 프로덕션 빌드
```bash
pnpm run build
pnpm run start
```

## 🔧 환경변수 설정

### 필수 환경변수

- `JWT_SECRET`: JWT 토큰 생성을 위한 시크릿 키 (보안을 위해 반드시 변경)
- `ADMIN_EMAILS`: 관리자 이메일 목록 (쉼표로 구분)

### 선택적 환경변수

이메일 전송 기능을 사용하려면 다음 중 하나를 설정하세요:

#### SMTP 설정
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@salixlife.com
```

#### SendGrid 설정
```
SENDGRID_API_KEY=your-sendgrid-api-key
```

#### AWS SES 설정
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
```

## 📁 프로젝트 구조

```
salixlife/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # Next.js 페이지
│   ├── styles/        # 전역 스타일
│   ├── utils/         # 유틸리티 함수
│   ├── locales/       # 다국어 번역 파일
│   └── data/          # 정적 데이터
├── public/            # 정적 파일
├── .env.local         # 환경변수 (git 제외)
└── package.json       # 프로젝트 설정
```

## 🌐 주요 페이지

- `/` - 메인 페이지
- `/products` - 제품 소개
- `/technology` - 기술 혁신
- `/about` - 회사 소개
- `/research` - 연구 게시판
- `/contact` - 문의하기

## 🔒 보안 기능

- 연구게시판 이메일 인증
- JWT 기반 세션 관리
- 관리자 권한 시스템
- XSS 방지

## 📝 라이선스

© 2025 SALIX LIFE. All rights reserved.

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈를 생성해주세요.

## 📞 문의

- 이메일: info@salixlife.com
- 주소: 경기도 고양시 덕양구 소원로 227 포스콤타워 5층
