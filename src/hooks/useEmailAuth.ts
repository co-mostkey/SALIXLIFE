import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
  loading: boolean;
}

interface UseEmailAuthReturn {
  authState: AuthState;
  sendVerificationCode: (email: string, purpose: 'post' | 'comment') => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AUTH_TOKEN_KEY = 'salix_research_auth_token';
const AUTH_EMAIL_KEY = 'salix_research_auth_email';

export const useEmailAuth = (): UseEmailAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    email: null,
    token: null,
    loading: true
  });
  const [error, setError] = useState<string | null>(null);

  // 로컬 스토리지에서 토큰 가져오기
  const getStoredAuth = () => {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const email = localStorage.getItem(AUTH_EMAIL_KEY);
    
    return token && email ? { token, email } : null;
  };

  // 토큰 저장
  const saveAuth = (token: string, email: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_EMAIL_KEY, email);
  };

  // 토큰 삭제
  const clearAuth = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EMAIL_KEY);
  };

  // 인증 상태 확인
  const checkAuthStatus = useCallback(async () => {
    const stored = getStoredAuth();
    
    if (!stored) {
      setAuthState({
        isAuthenticated: false,
        email: null,
        token: null,
        loading: false
      });
      return;
    }

    try {
      const response = await fetch('/api/research/auth/check-status', {
        headers: {
          'Authorization': `Bearer ${stored.token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuthState({
          isAuthenticated: true,
          email: data.data.email,
          token: stored.token,
          loading: false
        });
      } else {
        // 토큰이 유효하지 않으면 삭제
        clearAuth();
        setAuthState({
          isAuthenticated: false,
          email: null,
          token: null,
          loading: false
        });
      }
    } catch (err) {
      console.error('인증 상태 확인 오류:', err);
      clearAuth();
      setAuthState({
        isAuthenticated: false,
        email: null,
        token: null,
        loading: false
      });
    }
  }, []);

  // 인증 코드 발송
  const sendVerificationCode = async (email: string, purpose: 'post' | 'comment') => {
    setError(null);
    
    try {
      const response = await fetch('/api/research/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, purpose })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || '인증 코드 발송에 실패했습니다.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '인증 코드 발송에 실패했습니다.';
      setError(message);
      throw new Error(message);
    }
  };

  // 인증 코드 확인
  const verifyCode = async (email: string, code: string) => {
    setError(null);
    
    try {
      const response = await fetch('/api/research/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || '인증 코드 확인에 실패했습니다.');
      }

      // 인증 성공 - 토큰 저장
      saveAuth(data.data.token, data.data.email);
      setAuthState({
        isAuthenticated: true,
        email: data.data.email,
        token: data.data.token,
        loading: false
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : '인증 코드 확인에 실패했습니다.';
      setError(message);
      throw new Error(message);
    }
  };

  // 로그아웃
  const logout = () => {
    clearAuth();
    setAuthState({
      isAuthenticated: false,
      email: null,
      token: null,
      loading: false
    });
    setError(null);
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    authState,
    sendVerificationCode,
    verifyCode,
    checkAuthStatus,
    logout,
    error
  };
}; 