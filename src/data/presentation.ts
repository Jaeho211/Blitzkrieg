export type EventKind = 'mistake' | 'success' | 'friction' | 'command';

export type TimelineEvent = {
  id: string;
  date: string;
  time?: string;
  title: string;
  kind: EventKind;
  image?: string;
  summary: string;
  detail: string;
};

export const thesis = {
  kicker: '독서감상문',
  title: '“전격전의 전설”을 읽고',
};

export const blitzkriegDefinition = {
  term: 'Blitzkrieg',
  korean: '전격전',
  english: 'lightning war',
  description:
    '전격전은 제2차 세계대전 초반 독일군의 빠른 기동전 양상을 설명하는 말이다. 전차·기계화부대·항공전력을 집중 운용하여 적 방어선의 약점을 빠르게 돌파하고, 후방 지휘·보급 체계를 마비시켜 단기간에 작전적 붕괴를 유도하는 전쟁 수행 방식이다.',
  scope:
    '이 용어는 특히 1939년 폴란드 침공과 1940년 프랑스 전역을 설명할 때 자주 사용된다. 1940년 5월 독일군은 아르덴을 통과해 스당 방면에서 뫼즈 강을 도하하고 프랑스 방어선을 돌파했으며, 이후 약 6주 만에 프랑스 전역을 종결시켰다.',
};

export const levels = [
  {
    label: '전략',
    english: 'Strategy',
    focus: '목표와 방향: What / Why',
    action: '전쟁 (War)',
    analogy: 'CEO가 향후 5년 내 업계 1위라는 목표와 자원 배분 방향을 정함',
  },
  {
    label: '작전술',
    english: 'Operational Art',
    focus: '기획과 운용: When / Where / In what order',
    action: '전역 (Campaign)',
    analogy: '본부장이 목표 달성을 위해 제품 출시, 지역 공략, 마케팅, 영업 자원을 단계적으로 운용함',
  },
  {
    label: '전술',
    english: 'Tactics',
    focus: '현장 실행: How',
    action: '전투 (Battle)',
    analogy: '실무자가 광고 문구 작성, 예산 집행, 영업 활동 등 개별 과업을 수행함',
  },
];

export const operationalFrame = {
  kicker: '핵심 주장',
  title: '히틀러는 전격전이라는 Strategy를 준비한 적이 없다',
  bodyLines: [
    '전격전은 독일군 총사령부나 히틀러가 처음부터 준비한 국가 차원의 필승 전략이 아니었다.',
    '프랑스 전역에서 작전술과 현장 지휘가 겹치며 사후적으로 설명된 결과에 가깝다.',
  ],
  reasons: [
    {
      label: '근거 1',
      title: '전쟁을 감당할 양적 우세가 없었다',
      body:
        '독일군은 연합군에 비해 병력, 포병, 전차, 항공기 등에서 양적·질적 우세를 확보하지 못했다. 통상적인 군사 교리에서 공자는 방자에 비해 적어도 3:1의 우세가 필요하다고 보지만, 독일군은 그런 조건을 갖추지 못했다. 전쟁은 히틀러의 세계정세 오판 속에서 시작됐다.',
    },
    {
      label: '근거 2',
      title: '독일군은 장기전과 진지전에 대비하고 있었다',
      body:
        '영국의 선전포고 후 독일군은 참호전과 장기전을 의식했다. 질적 팽창보다 기본 방어 임무를 수행할 보병사단 창설을 늘렸고, 탄약과 화기 생산을 우선했다. 전차와 장갑차 증강은 후순위였으며, 육군 편제에서도 말에 크게 의존했다.',
    },
  ],
  conclusion:
    '그렇다면 프랑스는 왜 패배했는가. 핵심은 지헬슈니트, 즉 낫질이라는 작전술이었다. 프랑스군의 실책, 아르덴-스당 돌파 계획, 그리고 그 계획을 머리에 새긴 독일 하급 지휘관들의 임무형 지휘와 훈련된 융통성이 겹치며 독일은 Campaign에서 승리했다.',
};

export const commandFrame = {
  title: '지휘 원칙의 차이가 기동전에서 드러났다',
  body:
    '1940년 프랑스 전역에서는 기동전의 속도 속에서 지휘 원칙의 차이가 선명하게 드러났다.',
  note:
    '쟁점은 불완전한 정보와 끊긴 명령 속에서 현장이 어디까지 판단할 수 있었는가이다.',
};

export const commandComparison = [
  {
    force: '독일군',
    mode: 'Mission command',
    title: '임무와 의도를 공유한 뒤 현장 판단을 허용',
    summary:
      '하급 지휘관은 상급자의 의도 안에서 기회를 포착하면 보고와 허가를 기다리기보다 움직이도록 훈련받았다.',
    principles: [
      { label: '명령의 기준', body: '세부 절차보다 임무 달성과 상급 지휘관의 의도를 우선했다.' },
      { label: '현장의 권한', body: '통신이 끊기거나 상황이 바뀌면 간부가 주도권을 행사할 수 있었다.' },
      { label: '지휘 위치', body: '지휘관이 전방에서 직접 보고 판단하는 진두 지휘를 더 적극적으로 활용했다.' },
      { label: '기동전에서의 효과', body: '기계화부대의 속도가 만든 빈틈을 명령 지연으로 잃지 않을 가능성이 컸다.' },
    ],
  },
  {
    force: '연합군',
    mode: 'Command control',
    title: '상급 지휘부의 세부 명령과 절차를 기다림',
    summary:
      '프랑스군도 계획과 훈련을 갖고 있었지만, 지휘권 위임과 서식명령 전달이 늦어지면 실행 자체가 멈추기 쉬웠다.',
    principles: [
      { label: '명령의 기준', body: '상급 지휘부가 정리한 계획, 승인, 서식명령의 전달이 중요했다.' },
      { label: '현장의 권한', body: '이미 훈련한 계획도 공식 명령과 지휘권 전달 없이는 실행이 지연됐다.' },
      { label: '지휘 위치', body: '후방 지휘소에서 전선 정보를 모아 조정하는 방식에 가까웠다.' },
      { label: '기동전에서의 약점', body: '결정 주기가 길어지면 상대의 돌파가 다음 단계로 넘어간 뒤에야 반응했다.' },
    ],
  },
];

export const operationalArtBrief = {
  kicker: '작전술',
  title: '칸나이 섬멸전의 “회전문” 원리가 지헬슈니트 계획으로 이어졌다',
  summary:
    '정면의 적을 붙잡아 둔 상태에서 측면의 기동축이 크게 회전해 후방을 닫는다. 1940년 프랑스 전역의 지헬슈니트는 이 포위 원리를 전역 규모로 적용한 작전술이었다.',
  frames: [
    {
      label: '고전적 원리 (기원전 216년)',
      title: '칸나이 섬멸전: 정면 고착, 양익 회전, 후방 차단',
      image: '/content/cannae.jpg',
      body:
        '로마 보병을 중앙에 끌어들인 뒤 양익 기병이 크게 돌아 후방을 닫는다. 전투의 승부는 정면 돌파가 아니라 회전과 포위에서 났다.',
    },
    {
      label: '1940년 적용',
      title: '지헬슈니트: 북부 고착, 아르덴 회전, 해안 차단',
      image: '/content/Sichelschnitt.jpg',
      body:
        '연합군 주력을 북부로 끌어낸 뒤, 기갑부대가 아르덴과 스당을 지나 서쪽 해안으로 회전한다. 포위의 대상은 한 전투부대가 아니라 전역 전체였다.',
    },
  ],
  steps: [
    '정면 고착',
    '측면 회전',
    '후방 차단',
  ],
};

export const timeline: TimelineEvent[] = [
  {
    id: 'command-culture',
    date: '전투 이전',
    title: '불완전한 명령을 전제로 한 장교 교육',
    kind: 'command',
    summary: '독일군은 통신과 명령이 끊기는 상황에서도 현장 주도권이 필요하다고 보고 장교를 교육했다.',
    detail:
      '임무형 지휘는 전차전 전용 원칙은 아니지만, 프랑스 전역의 기계화전에서는 세부 지시 없이도 임무와 지휘관 의도에 맞춰 움직일 수 있다는 장점이 크게 드러났다.',
  },
  {
    id: 'start',
    date: '1940.05.10',
    time: '05:35',
    title: '제1기갑사단 기동 시작',
    kind: 'success',
    image: '/content/image.png',
    summary: '구데리안의 제1기갑사단은 4일째에 마스강을 건너야 하는 압박 속에서 출발했다.',
    detail:
      '최정예 부대였지만 시간표는 극단적으로 촘촘했다. 속도는 여유에서 나온 것이 아니라 위험을 감수한 압박에서 시작됐다.',
  },
  {
    id: 'dyle',
    date: '1940.05.11-13',
    title: '딜 계획과 아르덴 오판',
    kind: 'mistake',
    image: '/content/Sichelschnitt.jpg',
    summary: '프랑스군은 아르덴 돌파 가능성을 낮게 봤고, 정찰 보고도 조공으로 해석했다.',
    detail:
      '독일군은 실제로 57시간 만에 아르덴을 돌파했다. 1938년 훈련에서 60시간 돌파 가능성이 나왔지만 그 결과는 군 내부에서 제대로 반영되지 않았다.',
  },
  {
    id: 'traffic',
    date: '1940.05.13',
    title: '250km 기동로의 교통 정체',
    kind: 'friction',
    summary: '라인강에서 마스강까지 기동로가 마비되며 독일군도 취약한 순간을 맞았다.',
    detail:
      '지뢰, 보병사단과 기갑사단의 동선 충돌, 보급과 포병 지연이 겹쳤다. 승리의 과정에도 계획 실패와 마찰은 컸다.',
  },
  {
    id: 'bouillon',
    date: '1940.05.11',
    time: '18:30',
    title: '부용 기습',
    kind: 'success',
    image: '/content/Bouillon.jpg',
    summary: '보병 도착 전 제1전차연대 1대대가 단독으로 부용을 기습했다.',
    detail:
      '프랑스군은 교량을 폭파하고 방어했지만, 기습적 공세를 과대평가해 21:30부터 후퇴했다. 현장 판단이 시간을 단축했다.',
  },
  {
    id: 'mouzaive',
    date: '1940.05.11',
    title: '무자이브 교량 확보',
    kind: 'success',
    image: '/content/Mouzaive.jpg',
    summary: '제1오토바이보병대대가 제2기갑사단 작전지역의 교량을 먼저 확보했다.',
    detail:
      '정체로 늦어진 부대를 기다리지 않고 기회를 잡았다. 노출된 측방에 대한 프랑스군의 공포는 전선 후퇴로 이어졌다.',
  },
  {
    id: 'sedan-bombing',
    date: '1940.05.13',
    time: '08:00-일몰',
    title: '스당 공군 폭격',
    kind: 'success',
    image: '/content/Sedan_fortress.jpg',
    summary: '슈투카를 포함한 약 1500대의 항공기가 스당 일대를 지속적으로 폭격했다.',
    detail:
      '오전부터 오후까지 마스강변을 압박하고, 이후 후방을 타격했다. 방어선은 물리적 피해와 심리적 압박을 동시에 받았다.',
  },
  {
    id: 'sedan-crossing',
    date: '1940.05.13',
    time: '16:00',
    title: '중대가 흩어지고 통신이 끊겼다',
    kind: 'friction',
    image: '/content/Battle_of_Sedan.jpg',
    summary: '제43돌격공병대대 3중대는 도하를 시작해야 했지만, 교통 체증으로 부대가 뿔뿔이 흩어졌다.',
    detail:
      '중대장은 각 소대장에게 각자 마스강변까지 진격하라고 명령했다. 이후의 돌파는 완성된 명령 체계가 아니라, 불완전한 지휘 상황을 견디도록 훈련된 간부들의 판단에 의존했다.',
  },
  {
    id: 'korthals',
    date: '1940.05.13',
    time: '17:15-18:30',
    title: '코르탈스의 독단적 도하와 벙커 제압',
    kind: 'success',
    image: '/content/Battle_of_Sedan.jpg',
    summary: '연대장, 중대장과 통신이 두절된 상태에서 코르탈스는 1소대와 3소대를 단독 지휘해 공격을 이어갔다.',
    detail:
      '그는 제2기갑사단의 작전이 주춤한 것을 보고 그 작전지역으로 들어가 포병 요새와 대형 벙커를 제압했다. 명령 대기보다 임무 달성을 우선한 임무형 전술의 장면이었다.',
  },
  {
    id: 'laubert',
    date: '1940.05.13',
    title: '루바르트 중사의 고립 후 공격 지속',
    kind: 'success',
    summary: '루바르트는 11명의 분대와 마스강을 건넌 뒤 고립됐지만, 명령을 기다리지 않고 7개 벙커를 장악했다.',
    detail:
      '이 작은 단독 행동은 제10기갑사단의 도하 성공으로 이어졌다. 현장 간부의 판단이 작전 전체의 시간표를 앞당긴 사례다.',
  },
  {
    id: 'ghost-tanks',
    date: '1940.05.13',
    title: '유령 전차 소문',
    kind: 'mistake',
    image: '/content/1940_0513.jpg',
    summary: '전차가 아직 도하하지 않았는데도 “독일 전차 출현” 소문이 퍼졌다.',
    detail:
      '보고는 전파되는 과정에서 변형됐고, 일부 장교의 후퇴 명령과 지휘소 이동, 탈영과 후방 포병 붕괴로 이어졌다.',
  },
  {
    id: 'bulson-orders',
    date: '1940.05.13-14',
    time: '20:00-04:45',
    title: '서식명령을 기다린 시간',
    kind: 'mistake',
    summary: '라퐁텐은 유선 통화가 가능했지만 서식명령을 직접 받기 위해 군단 지휘소로 이동했고, 지휘권 전달은 밤새 지연됐다.',
    detail:
      '01:00 출발, 02:30 군단 지휘소 도착, 04:00 복귀, 04:45 명령 수령까지 시간이 흘렀다. 작전 내용은 이미 훈련했던 계획과 동일했지만 실행은 멈춰 있었다.',
  },
  {
    id: 'bulson',
    date: '1940.05.13-15',
    title: '불송 전투의 지휘 지연',
    kind: 'mistake',
    image: '/content/1940_0514.jpg',
    summary: '이미 훈련된 역습 계획이 있었지만, 서식명령과 지휘권 전달 지연으로 실행이 늦어졌다.',
    detail:
      '프랑스군이 5월 15일 09:00 불송에 도착했을 때 독일군은 이미 08:45에 도착해 있었다. 계획은 있었지만 속도가 없었다.',
  },
];

export const outcomes = [
  { label: '연합군 포로', value: '120만명' },
  { label: '덩케르크 탈출', value: '37만명' },
  { label: '독일군 사상자', value: '2만명' },
];

export const takeaways = [
  '정보는 존재만으로 충분하지 않다. 조직이 믿고 행동해야 가치가 생긴다.',
  '전략보다 작전술과 실행 속도가 상황을 결정하는 순간이 있다.',
  '현장 자율성은 계획의 빈틈을 메우지만, 동시에 큰 위험을 감수한다.',
  '상대의 지연과 내부 공포는 작은 돌파를 전역 전체의 붕괴로 바꾼다.',
];
