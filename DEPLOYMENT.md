# SALIX Life 배포 가이드

## 📋 배포 전 체크리스트

### 1. 환경 설정 확인
- [ ] `.env.local` 파일 생성 및 환경변수 설정
- [ ] JWT_SECRET 강력한 랜덤 문자열로 변경
- [ ] ADMIN_EMAILS 실제 관리자 이메일로 설정
- [ ] 이메일 서비스 설정 (SMTP/SendGrid/AWS SES)

### 2. 빌드 테스트
```bash
pnpm run build
pnpm run start
```

### 3. 필수 디렉토리 확인
```bash
mkdir -p public/uploads/research
mkdir -p data
```

---

## 🚀 배포 방법

### 1. Vercel 배포 (권장 - 초보자용)

#### 특징
- ✅ 가장 간단한 배포
- ✅ 자동 CI/CD
- ✅ 전 세계 CDN
- ✅ 무료 플랜 제공
- ⚠️ 서버리스 환경 (파일 저장 제한)

#### 배포 단계
1. **Vercel 계정 생성**: https://vercel.com
2. **GitHub 연결**: 레포지토리 연결
3. **환경변수 설정**: Vercel 대시보드에서 설정
   ```
   JWT_SECRET=your-secure-jwt-secret
   ADMIN_EMAILS=admin@salix.co.kr,research@salix.co.kr
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@salixlife.com
   ```
4. **배포 실행**: 자동으로 배포 시작
5. **도메인 설정**: 커스텀 도메인 연결

#### 제한사항
- 파일 업로드는 임시 저장소 사용 (재시작 시 삭제)
- 영구 파일 저장을 위해서는 AWS S3 등 외부 스토리지 필요

---

### 2. Railway 배포 (권장 - 중급자용)

#### 특징
- ✅ 우수한 개발자 경험
- ✅ Docker 기반 배포
- ✅ 영구 볼륨 지원
- ✅ 자동 SSL
- 💰 월 $5부터 시작

#### 배포 단계
1. **Railway 계정 생성**: https://railway.app
2. **프로젝트 생성**: "Deploy from GitHub repo"
3. **환경변수 설정**: Railway 대시보드에서 설정
4. **볼륨 마운트**: 파일 저장을 위한 볼륨 생성
   ```
   /app/data -> Railway Volume
   /app/public/uploads -> Railway Volume
   ```
5. **배포 실행**: 자동 배포 시작
6. **커스텀 도메인**: 도메인 연결

---

### 3. DigitalOcean 배포 (VPS)

#### 특징
- ✅ 완전한 제어권
- ✅ 가격 대비 최고 성능
- ✅ 영구 스토리지
- ⚠️ 서버 관리 필요
- 💰 월 $4부터 시작

#### 배포 단계
1. **Droplet 생성**: Ubuntu 22.04 LTS 선택
2. **서버 설정**:
   ```bash
   # 시스템 업데이트
   sudo apt update && sudo apt upgrade -y
   
   # Docker 설치
   sudo apt install docker.io docker-compose -y
   sudo systemctl start docker
   sudo systemctl enable docker
   
   # 사용자를 docker 그룹에 추가
   sudo usermod -aG docker $USER
   ```
3. **프로젝트 배포**:
   ```bash
   # 프로젝트 클론
   git clone https://github.com/your-username/salixlife.git
   cd salixlife
   
   # 환경변수 설정
   cp env.example .env
   # .env 파일 수정
   
   # Docker Compose로 배포
   docker-compose up -d
   ```
4. **도메인 설정**: DNS A 레코드를 서버 IP로 설정
5. **SSL 인증서**: Let's Encrypt 또는 Cloudflare 사용

---

### 4. AWS Amplify 배포 (엔터프라이즈)

#### 특징
- ✅ 무제한 확장성
- ✅ AWS 생태계 완전 활용
- ✅ 엔터프라이즈급 보안
- ⚠️ 복잡한 설정
- 💰 사용량 기반 요금

#### 배포 단계
1. **AWS 계정 생성**: https://aws.amazon.com
2. **Amplify 앱 생성**: GitHub 레포지토리 연결
3. **빌드 설정**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```
4. **환경변수 설정**: Amplify 콘솔에서 설정
5. **배포 실행**: 자동 배포 시작

---

## 🔧 환경변수 설정 가이드

### 필수 환경변수
```env
# 연구게시판 인증 (필수)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAILS=admin@salix.co.kr,research@salix.co.kr

# 이메일 서비스 (선택 - 하나만 선택)
# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@salixlife.com

# 또는 SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# 또는 AWS SES
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

### 보안 설정
```env
# 프로덕션 환경
NODE_ENV=production

# CORS 설정
CORS_ORIGIN=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

---

## 📊 성능 최적화

### 1. CDN 설정
- Vercel: 자동 CDN 적용
- Railway: Cloudflare 연동 권장
- VPS: Cloudflare 또는 AWS CloudFront 사용

### 2. 캐싱 설정
- 정적 파일: 1년 캐싱
- API 응답: 적절한 캐싱 헤더 설정
- 이미지: WebP 변환 및 압축

### 3. 모니터링
- Vercel: 내장 Analytics 사용
- Railway: 내장 모니터링 사용
- VPS: Sentry, LogRocket 등 활용

---

## 🔒 보안 체크리스트

### 배포 전 확인사항
- [ ] JWT_SECRET 강력한 랜덤 문자열 사용
- [ ] 환경변수 안전하게 관리
- [ ] HTTPS 적용 (SSL 인증서)
- [ ] 관리자 이메일 정확히 설정
- [ ] 파일 업로드 크기 제한 (10MB)
- [ ] Rate limiting 적용
- [ ] CORS 설정 확인

### 운영 중 모니터링
- [ ] 정기적인 보안 업데이트
- [ ] 로그 모니터링
- [ ] 성능 모니터링
- [ ] 백업 설정

---

## 🆘 문제 해결

### 자주 발생하는 문제

#### 1. 빌드 실패
```bash
# 의존성 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 빌드 재시도
pnpm run build
```

#### 2. 이메일 전송 실패
- Gmail 2단계 인증 설정 확인
- 앱 비밀번호 생성 및 사용
- SMTP 설정 정확성 확인

#### 3. 파일 업로드 실패
- 디렉토리 권한 확인
- 파일 크기 제한 (10MB) 확인
- 스토리지 공간 확인

#### 4. 연구게시판 인증 실패
- JWT_SECRET 설정 확인
- 관리자 이메일 목록 확인
- 인증 코드 만료 시간 확인

---

## 📞 지원

배포 관련 문의사항이 있으시면:
- 이메일: dev@salix.co.kr
- 이슈 트래커: GitHub Issues
- 문서: README.md 참조

---

**배포 성공을 위한 팁**: 
1. 먼저 로컬에서 프로덕션 빌드를 테스트하세요
2. 환경변수를 단계별로 설정하고 테스트하세요
3. 배포 후 모든 기능이 정상 작동하는지 확인하세요
4. 정기적인 백업과 모니터링을 설정하세요 