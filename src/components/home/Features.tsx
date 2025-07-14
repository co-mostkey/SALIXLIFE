import React from 'react';
import ContainerWrapper from '../ui/ContainerWrapper';
import Icon from '../ui/Icon';
import { useCommonTranslation } from '../../utils/i18n';

export default function Features() {
  const { t } = useCommonTranslation();
  
  const healthBenefits = [
    {
      title: t('home.features.therapy.healthBenefits.performance.title'),
      description: t('home.features.therapy.healthBenefits.performance.description'),
      icon: 'trending',
      color: 'blue'
    },
    {
      title: t('home.features.therapy.healthBenefits.recovery.title'),
      description: t('home.features.therapy.healthBenefits.recovery.description'),
      icon: 'health',
      color: 'green'
    },
    {
      title: t('home.features.therapy.healthBenefits.focus.title'),
      description: t('home.features.therapy.healthBenefits.focus.description'),
      icon: 'smart',
      color: 'purple'
    }
  ];

  const usageScenarios = t('home.features.therapy.usageScenarios.scenarios');

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <ContainerWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('home.features.therapy.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('home.features.therapy.subtitle')}
          </p>
        </div>

        {/* 건강 효과 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {healthBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                benefit.color === 'blue' ? 'bg-secondary/20 group-hover:bg-secondary/30' :
                benefit.color === 'green' ? 'bg-secondary/20 group-hover:bg-secondary/30' :
                'bg-purple-500/20 group-hover:bg-purple-500/30'
              }`}>
                <Icon name={benefit.icon as any} className={`w-8 h-8 ${
                  benefit.color === 'blue' ? 'text-secondary' :
                  benefit.color === 'green' ? 'text-secondary' :
                  'text-purple-400'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/70">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* 의학적 근거 */}
        <div className="bg-gradient-to-r from-secondary/10 to-secondary/10 rounded-2xl p-8 border border-white/10 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {t('home.features.therapy.medicalEvidence.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {t('home.features.therapy.medicalEvidence.nobel.title')}
              </h4>
              <p className="text-white/70 text-sm">
                {t('home.features.therapy.medicalEvidence.nobel.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧬</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {t('home.features.therapy.medicalEvidence.cellular.title')}
              </h4>
              <p className="text-white/70 text-sm">
                {t('home.features.therapy.medicalEvidence.cellular.description')}
              </p>
            </div>
          </div>
        </div>

        {/* 다양한 활용 분야 */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">
            {t('home.features.therapy.usageScenarios.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(usageScenarios as string[]).map((scenario: string, index: number) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-secondary/30 transition-all text-white/80 text-sm"
              >
                {scenario}
              </div>
            ))}
          </div>
        </div>

        {/* K-POP & 글로벌 스타 활용 */}
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            {t('home.features.therapy.globalStars.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t('home.features.therapy.globalStars.kpop.title')}
              </h4>
              <p className="text-white/70 text-sm mb-4">
                {t('home.features.therapy.globalStars.kpop.description')}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t('home.features.therapy.globalStars.sports.title')}
              </h4>
              <p className="text-white/70 text-sm mb-4">
                {t('home.features.therapy.globalStars.sports.description')}
              </p>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </section>
  );
} 