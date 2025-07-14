import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FullScreenSection from '../components/ui/FullScreenSection';
import { motion } from 'framer-motion';

export default function Certifications() {
  const [activeTab, setActiveTab] = useState(0);

  const certifications = [
    { name: '의료기기 제조 인증', organization: '식품의약품안전처', region: '한국', status: '획득', year: '2024', icon: '🏥' },
    { name: 'ISO 13485:2016', organization: '국제표준화기구', region: '국제', status: '획득', year: '2024', icon: '🌐' },
    { name: 'CE 마킹', organization: '유럽연합', region: '유럽', status: '획득', year: '2024', icon: '🇪🇺' },
    { name: 'KC 안전인증', organization: '한국산업안전보건공단', region: '한국', status: '획득', year: '2024', icon: '🛡️' },
    { name: 'GMP 인증', organization: '우수제조관리기준', region: '국제', status: '획득', year: '2024', icon: '✅' },
    { name: 'FDA 승인', organization: '미국 식품의약국', region: '미국', status: '진행중', year: '2024', icon: '🇺🇸' },
    { name: 'FCC 인증', organization: '미국 연방통신위원회', region: '미국', status: '획득', year: '2024', icon: '📡' },
    { name: 'PMDA 승인', organization: '일본 의약품의료기기청', region: '일본', status: '계획중', year: '2025', icon: '🇯🇵' }
  ];

  const patents = {
    registered: [
      { title: '휴대용 산소 농축기 시스템', number: 'KR10-2023-001234', description: '50배 대용량 산소 공급 시스템' },
      { title: '3단계 정밀 유량 조절 기술', number: 'KR10-2023-005678', description: '세계 최초 휴대용 산소 유량 조절' },
      { title: 'DUNE 모티프 디자인', number: 'KR10-2024-001111', description: '특허받은 초경량 복합재 고압용기' },
      { title: '스마트 호흡 모니터링', number: 'KR10-2024-002222', description: 'IoT 기반 실시간 모니터링 시스템' }
    ],
    pending: [
      { title: 'AI 기반 호흡 분석 알고리즘', description: '머신러닝 기반 개인별 호흡 패턴 최적화' },
      { title: '무선 충전 시스템', description: '휴대용 산소기 전용 무선 충전 기술' },
      { title: '의료용 확장 모듈', description: '병원 및 응급실 연동 시스템' },
      { title: '환경 적응형 필터 기술', description: '실시간 환경 감지 및 필터 최적화' }
    ]
  };

  const achievements = [
    { value: '99.9%', label: '의료용 산소 순도', icon: '🎯' },
    { value: '0.01%', label: '불량률', icon: '📊' },
    { value: '100만+', label: '누적 판매량', icon: '📈' },
    { value: '4.9/5.0', label: '고객 만족도', icon: '⭐' }
  ];

  const qualityFeatures = [
    { title: '100% 품질 검수', desc: '모든 제품은 출고 전 3단계 품질 검사를 거칩니다', icon: '🔍' },
    { title: '실시간 모니터링', desc: 'IoT 기술로 제품 상태를 24시간 모니터링합니다', icon: '📱' },
    { title: '지속적인 개선', desc: '고객 피드백을 바탕으로 제품을 계속 발전시킵니다', icon: '🔄' },
    { title: '글로벌 표준 준수', desc: '국제 의료기기 표준을 완벽히 준수합니다', icon: '🌍' }
  ];

  const tabs = [
    { id: 'certs', label: '인증 현황', icon: '🏆' },
    { id: 'patents', label: '특허 현황', icon: '📋' },
    { id: 'quality', label: '품질 관리', icon: '🎯' },
    { id: 'achievements', label: '성과 지표', icon: '📊' }
  ];

  return (
    <Layout>
      <FullScreenSection className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">
              인증현황
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              글로벌 안전 기준을 충족하는 엄격한 인증과 품질 관리 시스템
            </p>
          </motion.div>

          {/* 탭 네비게이션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8 justify-center"
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === index
                    ? 'bg-secondary text-white'
                    : 'text-white/70 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* 탭 콘텐츠 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[600px]"
          >
            {/* 인증 현황 */}
            {activeTab === 0 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="text-5xl mb-4">{cert.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
                      <p className="text-white/60 text-sm mb-3">{cert.organization}</p>
                      <p className="text-white/60 text-sm mb-3">{cert.region}</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cert.status === '획득' 
                          ? 'bg-secondary/20 text-secondary' 
                          : cert.status === '진행중'
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {cert.status} ({cert.year})
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-white text-center mb-6">인증 프로세스</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📋</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">문서 준비</h4>
                      <p className="text-white/70 text-sm">기술 문서 및 시험 성적서 준비</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔬</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">시험 및 검증</h4>
                      <p className="text-white/70 text-sm">공인 시험기관에서 안전성 검증</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">✅</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">인증 획득</h4>
                      <p className="text-white/70 text-sm">최종 심사 완료 후 인증서 발급</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 특허 현황 */}
            {activeTab === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                      <span className="text-secondary">✅</span>
                      등록 특허 ({patents.registered.length}건)
                    </h3>
                    <div className="space-y-4">
                      {patents.registered.map((patent, index) => (
                        <motion.div
                          key={patent.number}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-slate-700/30 rounded-lg p-4"
                        >
                          <h4 className="text-white font-semibold mb-1">{patent.title}</h4>
                          <p className="text-secondary text-sm font-mono mb-2">{patent.number}</p>
                          <p className="text-white/70 text-sm">{patent.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                      <span className="text-secondary">🔄</span>
                      출원 중인 특허 ({patents.pending.length}건)
                    </h3>
                    <div className="space-y-4">
                      {patents.pending.map((patent, index) => (
                        <motion.div
                          key={patent.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-slate-700/30 rounded-lg p-4"
                        >
                          <h4 className="text-white font-semibold mb-2">{patent.title}</h4>
                          <p className="text-white/70 text-sm">{patent.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/10 border border-secondary/20 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-white text-center mb-6">특허 기술의 핵심 가치</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <h4 className="text-white font-semibold mb-2">혁신성</h4>
                      <p className="text-white/70 text-sm">기존 기술 대비 50배 성능 향상</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🔒</div>
                      <h4 className="text-white font-semibold mb-2">독점성</h4>
                      <p className="text-white/70 text-sm">20년간 기술 독점 권리 보장</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">💎</div>
                      <h4 className="text-white font-semibold mb-2">경쟁력</h4>
                      <p className="text-white/70 text-sm">시장 진입 장벽 구축</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 품질 관리 */}
            {activeTab === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {qualityFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{feature.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-white/70">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-white text-center mb-8">품질 관리 프로세스</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                      { step: '1', title: '원재료 검수', desc: '모든 원재료 품질 검증' },
                      { step: '2', title: '제조 공정', desc: 'GMP 기준 제조 관리' },
                      { step: '3', title: '중간 검사', desc: '공정별 품질 점검' },
                      { step: '4', title: '최종 검수', desc: '완제품 성능 테스트' },
                      { step: '5', title: '출고 승인', desc: '품질 보증서 발급' }
                    ].map((process, index) => (
                      <motion.div
                        key={process.step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">{process.step}</span>
                        </div>
                        <h4 className="text-white font-semibold mb-1">{process.title}</h4>
                        <p className="text-white/70 text-sm">{process.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 성과 지표 */}
            {activeTab === 3 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <div className="text-4xl font-bold text-secondary mb-2">{achievement.value}</div>
                      <div className="text-white/70">{achievement.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/10 border border-secondary/20 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-white text-center mb-8">
                    의료 기기 수준의 엄격한 품질 관리
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-5xl mb-4">🏥</div>
                      <h4 className="text-white font-semibold mb-2">의료기기 표준</h4>
                      <p className="text-white/70 text-sm">ISO 13485 의료기기 품질경영시스템 인증</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl mb-4">🔬</div>
                      <h4 className="text-white font-semibold mb-2">연구개발</h4>
                      <p className="text-white/70 text-sm">지속적인 기술 개발 및 품질 향상</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl mb-4">🌍</div>
                      <h4 className="text-white font-semibold mb-2">글로벌 인증</h4>
                      <p className="text-white/70 text-sm">전 세계 주요 국가 인증 획득</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </FullScreenSection>
    </Layout>
  );
} 