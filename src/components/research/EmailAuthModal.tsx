import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../ui/Icon';
import { useEmailAuth } from '../../hooks/useEmailAuth';

interface EmailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  purpose: 'post' | 'comment';
  title?: string;
}

export default function EmailAuthModal({
  isOpen,
  onClose,
  onSuccess,
  purpose,
  title = '이메일 인증'
}: EmailAuthModalProps) {
  const { sendVerificationCode, verifyCode, error: authError } = useEmailAuth();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  // 타이머 관리
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 모달 닫을 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setEmail('');
      setCode('');
      setError(null);
      setTimer(0);
    }
  }, [isOpen]);

  // 인증 에러 처리
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // 이메일 유효성 검사
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 인증 코드 발송
  const handleSendCode = async () => {
    if (!isValidEmail(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendVerificationCode(email, purpose);
      setStep('code');
      setTimer(600); // 10분
    } catch (err) {
      // 에러는 hook에서 처리됨
    } finally {
      setLoading(false);
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setError('6자리 인증 코드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyCode(email, code);
      onSuccess();
      onClose();
    } catch (err) {
      // 에러는 hook에서 처리됨
    } finally {
      setLoading(false);
    }
  };

  // 재발송
  const handleResend = async () => {
    if (timer > 0) {
      setError(`${timer}초 후에 재발송 가능합니다.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendVerificationCode(email, purpose);
      setTimer(60); // 재발송 후 1분 대기
      setError(null);
      setCode('');
    } catch (err) {
      // 에러는 hook에서 처리됨
    } finally {
      setLoading(false);
    }
  };

  // 타이머 포맷
  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="technology" className="w-6 h-6 rotate-45" />
                </button>
              </div>
            </div>

            {/* 본문 */}
            <div className="px-6 py-6">
              {step === 'email' ? (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      {purpose === 'post' 
                        ? '게시글 작성을 위해 이메일 인증이 필요합니다.'
                        : '댓글 작성을 위해 이메일 인증이 필요합니다.'}
                    </p>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendCode()}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </div>

                  {/* 관리자 안내 */}
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <Icon name="trending" className="w-4 h-4 inline mr-1" />
                      연구 자료 보호를 위해 인증된 사용자만 게시판을 이용할 수 있습니다.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      <strong>{email}</strong>로 발송된 6자리 인증 코드를 입력해주세요.
                    </p>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      인증 코드
                    </label>
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      onKeyPress={(e) => e.key === 'Enter' && handleVerifyCode()}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="000000"
                      disabled={loading}
                      maxLength={6}
                    />
                    
                    {timer > 0 && (
                      <p className="mt-2 text-sm text-gray-500 text-center">
                        남은 시간: {formatTimer(timer)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setStep('email')}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      이메일 변경
                    </button>
                    <button
                      onClick={handleResend}
                      disabled={timer > 0 || loading}
                      className={`text-sm ${
                        timer > 0 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      {timer > 0 ? `${timer}초 후 재발송` : '인증 코드 재발송'}
                    </button>
                  </div>
                </>
              )}

              {/* 에러 메시지 */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center">
                    <Icon name="trending" className="w-4 h-4 mr-2 rotate-45" />
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* 푸터 */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  취소
                </button>
                <button
                  onClick={step === 'email' ? handleSendCode : handleVerifyCode}
                  disabled={loading || (step === 'email' && !email) || (step === 'code' && code.length !== 6)}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    loading || (step === 'email' && !email) || (step === 'code' && code.length !== 6)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      처리 중...
                    </span>
                  ) : (
                    step === 'email' ? '인증 코드 발송' : '인증 완료'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 