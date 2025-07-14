// 관리자 이메일 목록 (실제 환경에서는 환경 변수나 데이터베이스 사용)
const ADMIN_EMAILS = [
  'admin@salixlife.com',
  'research@salixlife.com',
  'manager@salixlife.com',
  // 개발 환경용 테스트 이메일
  'test@example.com'
];

/**
 * 주어진 이메일이 관리자 권한을 가지고 있는지 확인
 * @param email 확인할 이메일 주소
 * @returns 관리자 여부
 */
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * 관리자 이메일 목록 반환 (보안상 일부만 마스킹하여 반환)
 * @returns 마스킹된 관리자 이메일 목록
 */
export const getMaskedAdminEmails = (): string[] => {
  return ADMIN_EMAILS.map(email => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  });
}; 