import React from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import Icon from '../ui/Icon';
import { useProductsTranslation } from '../../utils/i18n';

export default function MarketAnalysis() {
  const { t } = useProductsTranslation();
  
  const marketData = [
    {
      category: '산소 용량',
      competitors: '~0.8L',
      salix: `${t('common.specs.oxygenCapacity')} (${t('common.specs.capacity_multiplier')})`
    },
    {
      category: '연속 사용시간',
      competitors: '~10분',
      salix: t('common.specs.duration')
    },
    {
      category: '가격 경쟁력',
      competitors: '고가',
      salix: t('common.specs.price_advantage')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            시장 분석 및 기회
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            WHO 경고와 웰니스 트렌드가 만나는 휴대용 산소 시장의 폭발적 성장
          </p>
        </div>

        {/* 시장 성장 동력 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Icon name="health" className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">WHO 호흡기 질환 경고</h3>
            <p className="text-white/70 text-sm mb-4">
              WHO는 2030년경 COPD, 폐질환, 결핵 등 호흡기 질환으로 인한 사망이 전세계 1위(20%)에 달할 것으로 예상한다고 발표
            </p>
            <div className="text-red-400 text-xs font-semibold">
              전세계적 공중보건 위기
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-secondary/30 transition-all">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
              <Icon name="trending" className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">스포츠 & 웰니스 트렌드</h3>
            <p className="text-white/70 text-sm mb-4">
              레브론 제임스, 호날두, 네이마르, 메시, BTS, aespa 등 세계적 스타들이 산소로 회복 및 컨디션 최적화 활용
            </p>
            <div className="text-secondary text-xs font-semibold">
              메인스트림 웰니스 확산
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <Icon name="eco" className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">도시 대기질 악화</h3>
            <p className="text-white/70 text-sm mb-4">
              밀폐공간에서 산소농도 매시간 0.1%씩 감소, CO2농도 10배 증가(최대 5,000ppm). 일반가정 실내도 산소농도 19%까지 감소
            </p>
            <div className="text-yellow-400 text-xs font-semibold">
              지속적 저산소 환경 노출
            </div>
          </div>
        </div>

        {/* 경쟁사 비교 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            글로벌 경쟁사 대비 <span className="text-secondary">압도적 우위</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4">구분</th>
                  <th className="text-center py-4 px-4">Boost Oxygen (미국)</th>
                  <th className="text-center py-4 px-4">Oxygen Plus (미국)</th>
                  <th className="text-center py-4 px-4">경쟁사 평균</th>
                  <th className="text-center py-4 px-4 bg-secondary/20">SALIX O²</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((row, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold">{row.category}</td>
                    <td className="text-center py-4 px-4">{row.competitors}</td>
                    <td className="text-center py-4 px-4">{row.competitors}</td>
                    <td className="text-center py-4 px-4">{row.competitors}</td>
                    <td className="text-center py-4 px-4 bg-secondary/20 font-bold text-secondary">{row.salix}</td>
                  </tr>
                ))}
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-semibold">유량 조절</td>
                  <td className="text-center py-4 px-4">없음</td>
                  <td className="text-center py-4 px-4">없음</td>
                  <td className="text-center py-4 px-4">없음</td>
                  <td className="text-center py-4 px-4 bg-secondary/20 font-bold text-secondary">3단계 정밀조절</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 시장 기회 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            다양한 <span className="text-secondary">산소 수요</span> 확대
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              '운전 중 졸음방지',
              '수험생 집중력',
              '숙취 해소',
              '직장인 컨디션',
              '수면 서포트',
              '호흡기 환자',
              '병원 응급상황',
              '피부 관리',
              '영양소 흡수',
              '엘리트 운동선수',
              '고산지대 등반',
              '격렬한 운동 후'
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-secondary/30 transition-all text-white/80 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 