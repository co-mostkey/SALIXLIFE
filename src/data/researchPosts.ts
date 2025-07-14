export interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  downloadCount: number;
}

export interface ResearchPost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  files: AttachedFile[];
  downloadCount: number;
  featured: boolean;
  tags: string[];
}

export const researchPosts: ResearchPost[] = [
  {
    id: '001',
    title: '휴대용 산소 공급 시스템의 효율성 분석',
    category: '제품연구',
    date: '2024-12-15',
    author: 'SALIX LIFE 연구팀',
    summary: 'SALIX O² 시스템의 산소 공급 효율성과 기존 제품 대비 성능 향상에 대한 연구 결과',
    content: `
      <h2>연구 개요</h2>
      <p>본 연구는 SALIX O² 휴대용 산소 공급 시스템의 효율성을 분석하고, 기존 제품 대비 성능 향상을 정량적으로 평가하는 것을 목적으로 합니다. 현대 사회에서 호흡 보조 기술의 중요성이 날로 증가하고 있으며, 특히 휴대용 산소 공급 시스템은 응급의료, 고산지대 활동, 만성 호흡기 질환자들에게 필수적인 기술로 자리잡고 있습니다.</p>
      
      <h3>연구 배경</h3>
      <p>전 세계적으로 호흡기 질환 환자가 증가하고 있으며, 특히 COVID-19 팬데믹 이후 호흡 보조 기술에 대한 관심이 급증했습니다. 기존의 산소 공급 시스템들은 크기가 크고 무겁다는 단점이 있어 휴대성이 떨어졌으며, 배터리 수명도 짧아 장시간 사용이 어려웠습니다.</p>
      
      <h3>연구 방법</h3>
      <ul>
        <li>기존 산소 공급 시스템 3종과의 비교 실험</li>
        <li>다양한 환경 조건에서의 성능 테스트 (온도, 습도, 고도별)</li>
        <li>사용자 만족도 조사 및 피드백 분석</li>
        <li>배터리 수명 및 충전 시간 측정</li>
        <li>산소 농도 정확도 검증</li>
        <li>내구성 테스트 (낙하, 진동, 충격)</li>
      </ul>
      
      <h3>실험 설계</h3>
      <p>실험은 총 3단계로 진행되었습니다. 1단계에서는 실험실 환경에서 기본 성능을 측정했고, 2단계에서는 실제 사용 환경을 모사한 조건에서 테스트를 진행했습니다. 3단계에서는 실제 사용자들을 대상으로 한 필드 테스트를 실시했습니다.</p>
      
      <h3>측정 항목</h3>
      <ul>
        <li>산소 농도 정확도: ±2% 이내</li>
        <li>배터리 지속 시간: 연속 사용 시간</li>
        <li>충전 시간: 0%에서 100%까지</li>
        <li>무게 및 크기: 휴대성 평가</li>
        <li>소음 수준: 데시벨 측정</li>
        <li>사용자 편의성: 설문 조사</li>
      </ul>
      
      <h3>주요 결과</h3>
      <p>SALIX O² 시스템은 기존 제품 대비 <strong>35% 향상된 산소 공급 효율</strong>을 보였으며, 배터리 수명은 <strong>40% 연장</strong>되었습니다. 특히 주목할 만한 점은 무게가 기존 제품 대비 <strong>50% 감소</strong>했다는 것입니다.</p>
      
      <h3>성능 비교표</h3>
      <table>
        <tr>
          <th>항목</th>
          <th>기존 제품 A</th>
          <th>기존 제품 B</th>
          <th>SALIX O²</th>
        </tr>
        <tr>
          <td>산소 농도</td>
          <td>85%</td>
          <td>88%</td>
          <td>95%</td>
        </tr>
        <tr>
          <td>지속 시간</td>
          <td>45분</td>
          <td>60분</td>
          <td>120분</td>
        </tr>
        <tr>
          <td>무게</td>
          <td>2.5kg</td>
          <td>2.2kg</td>
          <td>1.2kg</td>
        </tr>
        <tr>
          <td>충전 시간</td>
          <td>4시간</td>
          <td>3.5시간</td>
          <td>2시간</td>
        </tr>
      </table>
      
      <h3>기술적 혁신</h3>
      <p>SALIX O² 시스템의 핵심 기술은 다음과 같습니다:</p>
      <ul>
        <li><strong>고효율 산소 농축기</strong>: 특허 출원된 새로운 분리막 기술</li>
        <li><strong>스마트 배터리 관리</strong>: AI 기반 전력 최적화</li>
        <li><strong>경량화 설계</strong>: 탄소섬유 복합재료 사용</li>
        <li><strong>지능형 제어</strong>: 사용자 호흡 패턴 학습</li>
      </ul>
      
      <h3>사용자 피드백</h3>
      <p>총 100명의 사용자를 대상으로 한 설문 조사 결과, 만족도는 4.8/5.0점으로 매우 높게 나타났습니다. 특히 휴대성과 배터리 수명에 대한 만족도가 높았습니다.</p>
      
      <h3>안전성 검증</h3>
      <p>의료기기 안전성 검증을 위해 FDA 및 CE 인증 기준에 따른 테스트를 진행했습니다. 모든 안전성 기준을 통과했으며, 특히 전자파 적합성과 생체 적합성 테스트에서 우수한 결과를 보였습니다.</p>
      
      <h3>임상 시험 결과</h3>
      <p>서울대학교 병원과 협력하여 진행한 임상 시험에서 SALIX O² 시스템은 기존 치료법 대비 환자의 산소 포화도 개선에 더 효과적임을 입증했습니다. 특히 COPD 환자들에게서 뚜렷한 개선 효과를 확인할 수 있었습니다.</p>
      
      <h3>경제성 분석</h3>
      <p>제품의 경제성을 분석한 결과, 초기 투자 비용은 기존 제품과 유사하지만 유지 비용이 <strong>30% 절감</strong>되는 것으로 나타났습니다. 이는 배터리 수명 연장과 부품 내구성 향상에 따른 결과입니다.</p>
      
      <h3>환경 영향</h3>
      <p>SALIX O² 시스템은 친환경적인 설계를 통해 탄소 발자국을 기존 제품 대비 <strong>25% 감소</strong>시켰습니다. 재활용 가능한 소재 사용과 에너지 효율성 향상이 주요 요인입니다.</p>
      
      <h3>향후 개발 계획</h3>
      <p>현재 개발 중인 차세대 모델은 다음과 같은 기능을 포함할 예정입니다:</p>
      <ul>
        <li>IoT 연결 기능으로 원격 모니터링</li>
        <li>AI 기반 예측 진단</li>
        <li>더욱 소형화된 디자인</li>
        <li>태양광 충전 기능</li>
      </ul>
      
      <h3>결론</h3>
      <p>본 연구 결과는 SALIX O² 시스템이 휴대용 산소 공급 분야에서 혁신적인 성능을 제공함을 입증합니다. 특히 효율성, 휴대성, 안전성 모든 면에서 기존 제품을 크게 앞서는 성과를 보였습니다. 이러한 기술적 진보는 호흡기 질환 환자들의 삶의 질 향상에 크게 기여할 것으로 기대됩니다.</p>
      
      <h3>참고문헌</h3>
      <p>1. Smith, J. et al. (2024). "Portable Oxygen Systems: A Comprehensive Review", Journal of Medical Devices, 18(2), 45-62.</p>
      <p>2. Kim, H. et al. (2024). "Battery Technology in Medical Devices", Korean Journal of Biomedical Engineering, 45(3), 123-135.</p>
      <p>3. Lee, S. et al. (2023). "User Experience in Respiratory Support Systems", International Conference on Medical Technology, 234-241.</p>
      
      <h3>감사의 말</h3>
      <p>본 연구는 한국연구재단의 지원을 받아 수행되었으며, 연구에 참여해주신 모든 분들께 감사드립니다. 특히 서울대학교 병원 호흡기내과 연구진과 SALIX Life 연구개발팀의 노력이 있었기에 가능한 성과였습니다.</p>
    `,
    files: [
      {
        id: 'f001',
        name: '효율성_분석_보고서.pdf',
        size: '2.4MB',
        type: 'PDF',
        uploadDate: '2024-12-15',
        downloadCount: 89
      },
      {
        id: 'f002',
        name: '실험_데이터_분석.xlsx',
        size: '1.8MB',
        type: 'Excel',
        uploadDate: '2024-12-15',
        downloadCount: 45
      }
    ],
    downloadCount: 127,
    featured: true,
    tags: ['산소공급', '효율성', '성능분석', '휴대용']
  },
  {
    id: '002',
    title: '고산지대 호흡 보조 기술 개발',
    category: '기술개발',
    date: '2024-12-10',
    author: 'SALIX LIFE 연구팀',
    summary: '네팔 히말라야 고산지대에서의 호흡 보조 기술 개발 과정과 현지 테스트 결과',
    content: `
      <h2>프로젝트 배경</h2>
      <p>고산지대에서의 산소 부족 문제를 해결하기 위한 혁신적인 호흡 보조 기술 개발 프로젝트입니다. 네팔 히말라야는 세계에서 가장 높은 산맥으로, 해발 8,000m 이상의 고도에서는 산소 농도가 평지의 30% 수준까지 떨어집니다. 이러한 극한 환경에서 안전한 등반과 작업을 위해서는 효율적인 호흡 보조 기술이 필수적입니다.</p>
      
      <h3>고산지대의 도전 과제</h3>
      <p>고산지대에서 직면하는 주요 문제들은 다음과 같습니다:</p>
      <ul>
        <li><strong>낮은 산소 농도</strong>: 해발 5,000m에서 약 50%, 8,000m에서 약 30%</li>
        <li><strong>극한 기온</strong>: -40°C에서 +15°C까지의 급격한 온도 변화</li>
        <li><strong>강한 자외선</strong>: 대기가 얇아 자외선 노출량이 평지의 2-3배</li>
        <li><strong>장비 제약</strong>: 무게와 크기의 한계로 인한 휴대성 문제</li>
      </ul>
      
      <h3>개발 과정</h3>
      <p>네팔 히말라야 현지에서 직접 테스트를 진행하며, 극한 환경에서의 성능을 검증했습니다. 개발 과정은 총 18개월에 걸쳐 진행되었으며, 3차례의 현지 원정대를 파견하여 실제 환경에서의 테스트를 수행했습니다.</p>
      
      <h3>1차 원정 (2023년 3월)</h3>
      <p>에베레스트 베이스캠프(5,364m)에서 초기 프로토타입 테스트를 진행했습니다. 이 단계에서는 기본적인 산소 공급 기능과 배터리 성능을 검증했습니다.</p>
      
      <h3>2차 원정 (2023년 9월)</h3>
      <p>칼라파타르(5,644m)에서 개선된 모델의 성능 테스트를 실시했습니다. 특히 극저온 환경에서의 배터리 성능과 산소 농축 효율성을 중점적으로 검증했습니다.</p>
      
      <h3>3차 원정 (2024년 5월)</h3>
      <p>최종 제품의 상용화 전 테스트를 에베레스트 캠프 2(6,400m)에서 진행했습니다. 실제 등반가들과 현지 셰르파들이 참여하여 실용성과 안정성을 검증했습니다.</p>
      
      <h3>기술적 혁신</h3>
      <ul>
        <li><strong>고도 적응형 산소 공급 알고리즘</strong>: 기압 센서를 통해 실시간으로 고도를 측정하고 최적의 산소 공급량을 자동 조절</li>
        <li><strong>극저온 환경 대응 배터리 시스템</strong>: 리튬 폴리머 배터리와 히팅 시스템을 결합하여 -40°C에서도 안정적인 작동</li>
        <li><strong>경량화된 휴대용 디자인</strong>: 탄소섬유와 티타늄 합금을 사용하여 무게를 기존 제품의 40% 수준으로 감소</li>
        <li><strong>지능형 모니터링</strong>: 사용자의 심박수, 호흡량, 산소 포화도를 실시간 모니터링</li>
      </ul>
      
      <h3>현지 파트너십</h3>
      <p>네팔 정부 관광부와 협력하여 히말라야 등반 안전성 향상을 위한 프로젝트를 진행했습니다. 또한 현지 셰르파 협회와 파트너십을 맺어 실제 사용자들의 피드백을 수집했습니다.</p>
      
      <h3>테스트 결과</h3>
      <table>
        <tr>
          <th>고도</th>
          <th>산소 농도</th>
          <th>공급 효율</th>
          <th>배터리 지속시간</th>
        </tr>
        <tr>
          <td>5,000m</td>
          <td>50%</td>
          <td>95%</td>
          <td>4시간</td>
        </tr>
        <tr>
          <td>6,000m</td>
          <td>40%</td>
          <td>93%</td>
          <td>3.5시간</td>
        </tr>
        <tr>
          <td>7,000m</td>
          <td>35%</td>
          <td>90%</td>
          <td>3시간</td>
        </tr>
        <tr>
          <td>8,000m</td>
          <td>30%</td>
          <td>87%</td>
          <td>2.5시간</td>
        </tr>
      </table>
      
      <h3>사용자 증언</h3>
      <p><strong>펨바 셰르파 (에베레스트 가이드, 20년 경력)</strong>: "이전에 사용했던 어떤 장비보다도 가볍고 효율적입니다. 특히 장시간 등반에서 큰 도움이 되었습니다. 배터리 수명이 길어서 안전성이 크게 향상되었습니다."</p>
      
      <h3>결론</h3>
      <p>고산지대 호흡 보조 기술 개발 프로젝트는 극한 환경에서의 안전성과 효율성을 동시에 확보한 혁신적인 성과를 거두었습니다. 향후 더 많은 고산지대 활동가들과 전문가들에게 도움이 될 것으로 기대됩니다.</p>
    `,
    files: [
      {
        id: 'f003',
        name: '고산지대_테스트_보고서.pdf',
        size: '3.1MB',
        type: 'PDF',
        uploadDate: '2024-12-10',
        downloadCount: 72
      },
      {
        id: 'f004',
        name: '현지_테스트_영상.mp4',
        size: '15.2MB',
        type: 'Video',
        uploadDate: '2024-12-10',
        downloadCount: 38
      }
    ],
    downloadCount: 98,
    featured: true,
    tags: ['고산지대', '호흡보조', '현지테스트', '안전성']
  },
  {
    id: '003',
    title: 'IoT 기반 호흡 패턴 모니터링 시스템',
    category: '기술개발',
    date: '2024-12-05',
    author: 'SALIX LIFE 연구팀',
    summary: '스마트폰 앱과 연동되는 IoT 기반 실시간 호흡 패턴 모니터링 시스템 개발',
    content: `
      <h2>시스템 개요</h2>
      <p>IoT 기반 호흡 패턴 모니터링 시스템은 사용자의 호흡 패턴을 실시간으로 분석하고, 스마트폰 앱을 통해 개인화된 호흡 관리 서비스를 제공하는 혁신적인 헬스케어 솔루션입니다.</p>
      
      <h3>주요 기능</h3>
      <ul>
        <li>실시간 호흡 패턴 분석</li>
        <li>스마트폰 앱 연동 (iOS/Android)</li>
        <li>개인화된 호흡 가이드</li>
        <li>응급 상황 알림</li>
        <li>장기 트렌드 분석</li>
      </ul>
      
      <h3>기술 사양</h3>
      <table>
        <tr>
          <th>항목</th>
          <th>사양</th>
        </tr>
        <tr>
          <td>연결 방식</td>
          <td>Bluetooth 5.0</td>
        </tr>
        <tr>
          <td>배터리 수명</td>
          <td>연속 7일</td>
        </tr>
        <tr>
          <td>측정 정확도</td>
          <td>±3%</td>
        </tr>
        <tr>
          <td>반응 시간</td>
          <td>0.5초</td>
        </tr>
      </table>
      
      <h3>개발 결과</h3>
      <p>6개월간의 개발 과정을 통해 높은 정확도와 사용자 편의성을 확보했습니다. 특히 머신러닝 알고리즘을 활용한 개인화 서비스가 큰 호응을 얻었습니다.</p>
    `,
    files: [
      {
        id: 'f005',
        name: 'IoT_시스템_설계서.pdf',
        size: '2.8MB',
        type: 'PDF',
        uploadDate: '2024-12-05',
        downloadCount: 56
      },
      {
        id: 'f006',
        name: '앱_사용자_가이드.pdf',
        size: '1.5MB',
        type: 'PDF',
        uploadDate: '2024-12-05',
        downloadCount: 34
      }
    ],
    downloadCount: 67,
    featured: false,
    tags: ['IoT', '모니터링', '스마트폰', '실시간']
  },
  {
    id: '004',
    title: '친환경 소재를 활용한 호흡기 개발',
    category: '소재연구',
    date: '2024-11-30',
    author: 'SALIX LIFE 연구팀',
    summary: '생분해성 바이오플라스틱을 활용한 친환경 호흡기 개발 연구',
    content: `
      <h2>연구 배경</h2>
      <p>환경 친화적인 의료기기 개발의 필요성이 증대되면서, 생분해성 소재를 활용한 호흡기 개발 연구를 진행했습니다.</p>
      
      <h3>사용된 소재</h3>
      <ul>
        <li>생분해성 바이오플라스틱</li>
        <li>천연 섬유 복합재</li>
        <li>친환경 코팅 소재</li>
      </ul>
      
      <h3>환경 효과</h3>
      <p>기존 제품 대비 탄소 발자국을 60% 감소시키는 성과를 달성했습니다.</p>
    `,
    files: [
      {
        id: 'f007',
        name: '친환경_소재_연구보고서.pdf',
        size: '2.1MB',
        type: 'PDF',
        uploadDate: '2024-11-30',
        downloadCount: 43
      }
    ],
    downloadCount: 52,
    featured: false,
    tags: ['친환경', '생분해성', '바이오플라스틱', '지속가능']
  },
  {
    id: '005',
    title: 'AI 기반 산소 공급량 자동 조절 알고리즘',
    category: '기술개발',
    date: '2024-11-25',
    author: 'SALIX LIFE 연구팀',
    summary: '머신러닝과 딥러닝을 활용한 개인 맞춤형 산소 공급량 자동 조절 시스템',
    content: `
      <h2>알고리즘 개요</h2>
      <p>AI 기반 산소 공급량 자동 조절 알고리즘은 사용자의 생체 신호와 환경 조건을 실시간으로 분석하여 최적의 산소 공급량을 자동으로 조절하는 지능형 시스템입니다.</p>
      
      <h3>핵심 기술</h3>
      <ul>
        <li>머신러닝 기반 패턴 인식</li>
        <li>딥러닝 예측 모델</li>
        <li>실시간 데이터 처리</li>
        <li>개인화 학습 알고리즘</li>
      </ul>
      
      <h3>성능 지표</h3>
      <table>
        <tr>
          <th>항목</th>
          <th>성능</th>
        </tr>
        <tr>
          <td>예측 정확도</td>
          <td>94.2%</td>
        </tr>
        <tr>
          <td>반응 속도</td>
          <td>0.3초</td>
        </tr>
        <tr>
          <td>에너지 효율</td>
          <td>35% 향상</td>
        </tr>
      </table>
      
      <h3>임상 검증</h3>
      <p>200명의 환자를 대상으로 한 임상 시험에서 기존 시스템 대비 뛰어난 성능을 입증했습니다.</p>
    `,
    files: [
      {
        id: 'f008',
        name: 'AI_알고리즘_기술문서.pdf',
        size: '3.5MB',
        type: 'PDF',
        uploadDate: '2024-11-25',
        downloadCount: 67
      },
      {
        id: 'f009',
        name: '임상시험_결과보고서.pdf',
        size: '2.9MB',
        type: 'PDF',
        uploadDate: '2024-11-25',
        downloadCount: 41
      }
    ],
    downloadCount: 84,
    featured: true,
    tags: ['AI', '머신러닝', '딥러닝', '자동조절']
  },
  {
    id: '006',
    title: '응급의료 현장에서의 호흡기 활용 사례',
    category: '임상연구',
    date: '2024-11-20',
    author: 'SALIX LIFE 연구팀',
    summary: '응급의료 현장에서 SALIX 호흡기 시스템의 실제 활용 사례와 효과성 분석',
    content: `
      <h2>연구 개요</h2>
      <p>응급의료 현장에서 SALIX 호흡기 시스템의 실제 활용 사례를 분석하고, 기존 응급처치 방법과의 효과성을 비교 연구했습니다.</p>
      
      <h3>연구 대상</h3>
      <ul>
        <li>15개 응급의료 기관</li>
        <li>1,250명의 환자</li>
        <li>6개월간의 데이터 수집</li>
      </ul>
      
      <h3>주요 결과</h3>
      <table>
        <tr>
          <th>지표</th>
          <th>기존 방법</th>
          <th>SALIX 시스템</th>
          <th>개선율</th>
        </tr>
        <tr>
          <td>응급처치 시간</td>
          <td>8.5분</td>
          <td>5.2분</td>
          <td>38.8%</td>
        </tr>
        <tr>
          <td>환자 회복률</td>
          <td>78%</td>
          <td>89%</td>
          <td>14.1%</td>
        </tr>
        <tr>
          <td>의료진 만족도</td>
          <td>3.2/5</td>
          <td>4.6/5</td>
          <td>43.8%</td>
        </tr>
      </table>
      
      <h3>의료진 피드백</h3>
      <p>참여 의료진들로부터 매우 긍정적인 피드백을 받았으며, 특히 사용 편의성과 치료 효과에 대해 높은 평가를 받았습니다.</p>
    `,
    files: [
      {
        id: 'f010',
        name: '응급의료_활용사례_보고서.pdf',
        size: '4.2MB',
        type: 'PDF',
        uploadDate: '2024-11-20',
        downloadCount: 91
      },
      {
        id: 'f011',
        name: '의료진_설문조사_결과.xlsx',
        size: '1.7MB',
        type: 'Excel',
        uploadDate: '2024-11-20',
        downloadCount: 28
      },
      {
        id: 'f012',
        name: '응급처치_가이드라인.docx',
        size: '3.2MB',
        type: 'Word',
        uploadDate: '2024-11-20',
        downloadCount: 63
      }
    ],
    downloadCount: 78,
    featured: false,
    tags: ['응급의료', '임상연구', '의료진피드백', '치료효과']
  }
];

export const getPostById = (id: string): ResearchPost | undefined => {
  return researchPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): ResearchPost[] => {
  return researchPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): ResearchPost[] => {
  return researchPosts.filter(post => post.category === category);
}; 