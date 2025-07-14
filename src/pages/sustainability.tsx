import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FullScreenSection from '../components/ui/FullScreenSection';
import { motion } from 'framer-motion';

export default function Sustainability() {
  const [activeTab, setActiveTab] = useState(0);

  const missionValues = [
    {
      title: '생명을 위한 혁신',
      description: '화재 현장, 밀폐 공간, 고산 지대, 의료 응급 상황 등에서 즉각적으로 활용 가능한 혁신적인 호흡기기를 개발합니다.',
      icon: '🚑',
      impact: '응급상황에서 생명 구조'
    },
    {
      title: '포괄적인 호흡 솔루션',
      description: '작업자, 소방관, 환자, 일반 소비자까지 포괄적인 호흡의 질을 보장하는 초소형 장치를 통해 안전한 호흡을 제공합니다.',
      icon: '🌬️',
      impact: '모든 사람의 호흡 건강'
    },
    {
      title: '지속가능한 기술',
      description: '환경 친화적 소재와 에너지 효율적인 설계로 지구 환경을 보호하면서도 최고의 성능을 제공합니다.',
      icon: '🌱',
      impact: '환경 보호와 기술 발전의 조화'
    },
    {
      title: '사회적 책임',
      description: '의료진, 응급구조대, 취약계층을 위한 특별 프로그램을 통해 사회적 가치를 창출합니다.',
      icon: '🤝',
      impact: '사회적 가치 창출'
    }
  ];

  const partnerships = [
    {
      name: '유나이티드자산운용',
      type: '투자 파트너',
      status: '투자 협의 진행 중',
      description: '성공적인 미팅을 통해 기본적 투자 합의에 도달 중',
      icon: '💼',
      color: 'blue',
      contribution: '지속가능한 성장을 위한 자본 확보'
    },
    {
      name: 'J-ROCK',
      type: '엔터테인먼트 파트너',
      status: '협약 완료',
      description: '일본 연예기획사와 협약 완료, 글로벌 시장 확장 및 엔터테인먼트 협력',
      icon: '🎌',
      color: 'pink',
      contribution: '젊은 세대에게 건강한 라이프스타일 확산'
    },
    {
      name: '네팔 현지 파트너',
      type: '유통 파트너',
      status: '구축 진행 중',
      description: '네팔 현지 파트너십 구축을 통한 트레킹 시장 진출 추진',
      icon: '🏔️',
      color: 'green',
      contribution: '고산 지역 안전 문화 정착'
    },
    {
      name: '의료기관 네트워크',
      type: '의료 파트너',
      status: '협력 확대 중',
      description: '전국 주요 병원과의 협력을 통한 의료용 산소 공급 시스템 구축',
      icon: '🏥',
      color: 'purple',
      contribution: '의료 접근성 향상 및 환자 안전 강화'
    }
  ];

  const esgInitiatives = [
    {
      category: 'Environmental (환경)',
      initiatives: [
        { title: '친환경 소재 사용', description: '재활용 가능한 티타늄 합금과 생분해성 포장재 사용', progress: 85 },
        { title: '탄소 중립 제조', description: '2025년까지 제조 과정에서 탄소 중립 달성 목표', progress: 60 },
        { title: '에너지 효율 최적화', description: '저전력 설계로 배터리 수명 연장 및 폐기물 감소', progress: 90 },
        { title: '순환 경제 모델', description: '제품 회수 및 재활용 프로그램 운영', progress: 70 }
      ],
      icon: '🌍'
    },
    {
      category: 'Social (사회)',
      initiatives: [
        { title: '의료진 지원 프로그램', description: '코로나19 최전선 의료진에게 무료 제품 지원', progress: 100 },
        { title: '응급구조대 협력', description: '소방서 및 응급구조대와 협력하여 안전 장비 제공', progress: 80 },
        { title: '취약계층 지원', description: '호흡기 질환자를 위한 특별 할인 프로그램', progress: 75 },
        { title: '교육 및 인식 개선', description: '올바른 호흡법과 산소 치료에 대한 교육 프로그램', progress: 65 }
      ],
      icon: '👥'
    },
    {
      category: 'Governance (지배구조)',
      initiatives: [
        { title: '투명한 경영', description: '정기적인 경영 성과 및 ESG 보고서 공개', progress: 95 },
        { title: '윤리 경영', description: '엄격한 윤리 기준과 컴플라이언스 시스템 운영', progress: 90 },
        { title: '이해관계자 참여', description: '고객, 투자자, 지역사회와의 정기적 소통', progress: 85 },
        { title: '혁신 거버넌스', description: 'R&D 투자 확대 및 지속가능한 혁신 추진', progress: 80 }
      ],
      icon: '⚖️'
    }
  ];

  const sustainabilityGoals = [
    {
      year: '2024',
      goals: [
        '탄소 발자국 20% 감소',
        '재활용 소재 사용률 50% 달성',
        '의료진 지원 프로그램 1만명 혜택',
        'ESG 경영 체계 구축 완료'
      ],
      status: '진행중'
    },
    {
      year: '2025',
      goals: [
        '탄소 중립 제조 공정 구축',
        '순환 경제 모델 완전 도입',
        '글로벌 의료 파트너십 확대',
        'UN SDGs 연계 프로그램 런칭'
      ],
      status: '계획'
    },
    {
      year: '2030',
      goals: [
        '완전한 탄소 중립 달성',
        '전 세계 응급의료 시스템 혁신',
        '지속가능한 호흡 생태계 구축',
        'ESG 선도 기업으로 글로벌 인정'
      ],
      status: '비전'
    }
  ];

  const tabs = [
    { id: 'mission', label: '미션 & 비전', icon: '🎯' },
    { id: 'partnerships', label: '전략적 파트너십', icon: '🤝' },
    { id: 'esg', label: 'ESG 경영', icon: '🌱' },
    { id: 'goals', label: '지속가능성 목표', icon: '📈' }
  ];

  return (
    <Layout>
      <FullScreenSection 
        contentPadding={false}
        backgroundPattern={true}
      >
        <div className="h-full flex flex-col">
          {/* 헤더 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
          
          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 min-h-0">
            <div className="h-full overflow-y-auto product-scroll-area">
              <div className="max-w-6xl mx-auto px-4 py-8">
                {/* 헤더 */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">
                    지속가능성
                  </h1>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    환경을 생각하는 지속가능한 호흡 솔루션으로 더 나은 미래를 만들어갑니다
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
                      className={`product-tab-transition px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                        activeTab === index
                          ? 'bg-secondary text-white shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
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
                  {/* 환경 가치 */}
                  {activeTab === 0 && (
                    <div className="space-y-8">
                      <div className="bg-dark/50 border border-primary/20 rounded-xl p-8">
                        <h3 className="text-2xl font-semibold text-white text-center mb-8">
                          환경을 위한 우리의 약속
                        </h3>
                        <p className="text-white/80 text-lg text-center max-w-4xl mx-auto mb-8">
                          모든 사람의 <span className="text-secondary">안전한 호흡</span>을 위하여
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {missionValues.map((value, index) => (
                            <motion.div
                              key={value.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="text-center"
                            >
                              <div className="bg-secondary/10 rounded-lg p-3 border border-secondary/20">
                                <p className="text-secondary text-sm font-medium">
                                  <span className="text-white">임팩트:</span> {value.impact}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-6">2030 지속가능 목표</h3>
                        <p className="text-white/80 max-w-3xl mx-auto">
                          UN SDGs와 연계하여 지속가능한 발전에 기여하고 있습니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 파트너십 */}
                  {activeTab === 1 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {partnerships.map((partner, index) => (
                          <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-dark/50 border border-primary/20 rounded-xl p-8 hover:border-secondary/50 transition-all duration-300"
                          >
                            <div className="flex items-center mb-6">
                              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                                <span className="text-4xl">{partner.icon}</span>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-white">{partner.name}</h3>
                                <p className="text-secondary font-medium">{partner.type}</p>
                              </div>
                            </div>
                            
                            <div className="bg-dark/30 rounded-lg p-3">
                              <p className="text-white/80 mb-4">{partner.description}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">{partner.status}</span>
                                <span className="text-secondary font-medium">기여도:</span> {partner.contribution}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="bg-dark/50 border border-primary/20 rounded-xl p-8">
                        <h3 className="text-2xl font-semibold text-white text-center mb-8">
                          지속가능성 이니셔티브
                        </h3>
                        
                        <div className="space-y-6">
                          {esgInitiatives.map((initiative, index) => (
                            <motion.div
                              key={initiative.category}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="bg-dark/30 rounded-lg p-6"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-semibold text-white">{initiative.category}</h4>
                                <span className="text-secondary text-sm font-bold">🌱</span>
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {initiative.initiatives.map((initiativeItem, idx) => (
                                  <div key={idx} className="bg-dark/20 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-3">
                                      <h5 className="text-white font-semibold">{initiativeItem.title}</h5>
                                      <span className="text-secondary text-sm font-bold">{initiativeItem.progress}%</span>
                                    </div>
                                    <p className="text-white/70 text-sm mb-4">{initiativeItem.description}</p>
                                    
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-white/60">진행률</span>
                                        <span className="text-secondary font-medium">{initiativeItem.progress}%</span>
                                      </div>
                                      <div className="w-full bg-dark/50 rounded-full h-2">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${initiativeItem.progress}%` }}
                                          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 미래 계획 */}
                  {activeTab === 2 && (
                    <div className="space-y-8">
                      <div className="bg-dark/50 border border-primary/20 rounded-xl p-8">
                        <h3 className="text-2xl font-semibold text-white text-center mb-8">
                          2030 로드맵
                        </h3>
                        
                        <div className="space-y-6">
                          {sustainabilityGoals.map((goal, index) => (
                            <div key={goal.year}>
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-center gap-3 p-4 bg-dark/30 rounded-lg mb-4"
                              >
                                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                <span className="text-white/80">{goal.year}년 목표</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  goal.status === '진행중' 
                                    ? 'bg-secondary/20 text-secondary'
                                    : goal.status === '계획'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-purple-500/20 text-purple-400'
                                }`}>
                                  {goal.status}
                                </span>
                              </motion.div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {goal.goals.map((goalItem, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-4 bg-dark/30 rounded-lg">
                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                    <span className="text-white/80">{goalItem}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-6">지속가능한 미래를 향하여</h3>
                        <p className="text-white/80 max-w-3xl mx-auto mb-8">
                          샐릭스 라이프는 환경과 인류의 건강을 동시에 생각하는 
                          지속가능한 호흡 솔루션을 통해 더 나은 미래를 만들어갑니다.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sustainabilityGoals.map((sdg, index) => (
                            <motion.div
                              key={sdg.year}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="text-center"
                            >
                              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-secondary font-bold text-xl">{sdg.year}</span>
                              </div>
                              <h4 className="text-white font-semibold mb-2 text-sm">{sdg.year}년 목표</h4>
                              <p className="text-white/70 text-xs">{sdg.status}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* 푸터 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
        </div>
      </FullScreenSection>
    </Layout>
  );
} 