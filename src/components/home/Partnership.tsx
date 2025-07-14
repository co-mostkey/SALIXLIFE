import React from 'react';
import Icon from '../ui/Icon';

export default function Partnership() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            전략적 파트너십
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            글로벌 시장 확장을 위한 핵심 파트너들과의 협력
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 유나이티드자산운용 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/30 transition-colors">
                <Icon name="investment" className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">유나이티드자산운용</h3>
              <div className="inline-block bg-secondary/20 text-secondary text-sm px-3 py-1 rounded-full mb-4">
                투자 파트너
              </div>
              <p className="text-white/70 mb-4">
                성공적인 미팅을 통해 기본적 투자 합의에 도달 중
              </p>
              <div className="text-center">
                <div className="inline-flex items-center text-secondary text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  투자 협의 진행 중
                </div>
              </div>
            </div>
          </div>

          {/* J-ROCK */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Icon name="star" className="w-10 h-10 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">J-ROCK</h3>
              <div className="inline-block bg-pink-500/20 text-pink-400 text-sm px-3 py-1 rounded-full mb-4">
                엔터테인먼트 파트너
              </div>
              <p className="text-white/70 mb-4">
                일본 연예기획사와 협약 완료, 글로벌 시장 확장 및 엔터테인먼트 협력
              </p>
              <div className="text-center">
                <div className="inline-flex items-center text-pink-400 text-sm">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                  협약 완료
                </div>
              </div>
            </div>
          </div>

          {/* 네팔 현지 파트너십 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/30 transition-colors">
                <Icon name="mountain" className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">네팔 현지 파트너</h3>
              <div className="inline-block bg-secondary/20 text-secondary text-sm px-3 py-1 rounded-full mb-4">
                유통 파트너
              </div>
              <p className="text-white/70 mb-4">
                네팔 현지 파트너십 구축을 통한 트레킹 시장 진출 추진
              </p>
              <div className="text-center">
                <div className="inline-flex items-center text-secondary text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  구축 진행 중
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 파트너십 혜택 */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white text-center mb-8">파트너십을 통한 시너지 효과</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="global" className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-white font-semibold mb-2">글로벌 확장</h4>
              <p className="text-white/70 text-sm">네팔, 일본 시장 진출로 글로벌 시장 확장</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="users" className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-white font-semibold mb-2">다양한 고객층</h4>
              <p className="text-white/70 text-sm">트레커부터 팬덤 문화까지 다양한 고객 확보</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="trending" className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-white font-semibold mb-2">브랜드 가치 상승</h4>
              <p className="text-white/70 text-sm">젊고 트렌디한 브랜드 이미지 구축</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="rocket" className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">매출 다각화</h4>
              <p className="text-white/70 text-sm">렌탈 모델과 굿즈 시장 동시 진출</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 