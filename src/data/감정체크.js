/* ================================================
   마음 워크숍 — 데이터 시트
   감정 체크 (category: emotion / mini)
   v3: 감정 옵션 6→8, 색상 카드 3→4, Q4 시간성 추가
   ================================================ */

window.WORKSHOP = {
  id: "emotion-check",
  title: "감정 체크",
  category: "emotion",
  duration: "1분",
  type: "mini",

  steps: [
    // ── 1. 시작 ──
    {
      type: "intro",
      id: "start",
      icon: "favorite",
      iconFilled: true,
      expression: "◡",
      speech: "지금 이 순간, 마음이 어떤지 같이 봐볼까?\n어떤 감정이든 괜찮아. 솔직하게 골라봐.",
      permission: "답은 저장되지 않아요.",
      nextId: "q1",
      nextLabel: "같이 해보자! →"
    },

    // ── 2. Q1: 감정 선택 (v3: 6→8) ──
    {
      type: "experience",
      id: "q1",
      progress: { current: 1, total: 4 },
      speech: "지금 가장 가까운 감정을 골라봐.",
      expression: "◠",
      questions: [{
        id: "emotion",
        type: "radio",
        sub: "Q1",
        title: "지금 이 순간, 가장 가까운 감정은?",
        options: [
          { id: "e-calm",     text: "편안하다" },
          { id: "e-excited",  text: "설렌다" },
          { id: "e-neutral",  text: "무덤덤하다" },
          { id: "e-anxious",  text: "불안하다" },
          { id: "e-tired",    text: "지쳐있다" },
          { id: "e-angry",    text: "화가 난다" },
          { id: "e-sad",      text: "슬프다" },
          { id: "e-unknown",  text: "잘 모르겠다" }
        ],
        reactions: {
          "e-calm":    { expression: "◕", speech: "편안한 순간이구나 :)" },
          "e-excited": { expression: "◕", speech: "오 뭔가 기대되는 게 있나 보다!" },
          "e-neutral": { expression: "◡", speech: "뚜렷한 감정이 없는 것도 자연스러운 거야." },
          "e-anxious": { expression: "◡", speech: "좀 불안한 마음이구나. 괜찮아." },
          "e-tired":   { expression: "♡", speech: "많이 힘든 하루인가 봐." },
          "e-angry":   { expression: "♡", speech: "화도 중요한 신호야. 그럴 만한 이유가 있겠지." },
          "e-sad":     { expression: "♡", speech: "슬픈 마음, 그대로 두어도 괜찮아." },
          "e-unknown": { expression: "◡", speech: "감정을 잘 모르겠는 것도 괜찮아." }
        }
      }],
      nextId: "q2"
    },

    // ── 3. Q2: 강도 슬라이더 ──
    {
      type: "experience",
      id: "q2",
      progress: { current: 2, total: 4 },
      expression: "◠",
      speech: "크기만 느껴봐. 정확하지 않아도 돼.",
      questions: [{
        id: "intensity",
        type: "slider",
        sub: "Q2",
        title: "그 감정의 크기는?",
        slider: {
          min: 1,
          max: 5,
          default: 3,
          labelMin: "약함",
          labelMax: "강함",
          ariaLabel: "감정 강도"
        }
      }],
      nextId: "q3"
    },

    // ── 4. Q3: 색상 (v3: 3→4) ──
    {
      type: "experience",
      id: "q3",
      progress: { current: 3, total: 4 },
      questions: [{
        id: "color",
        type: "radio",
        sub: "Q3",
        title: "그 감정을 색으로 표현한다면?",
        options: [
          { id: "c-warm", dots: [{ color: "#E53935" }, { color: "#FB8C00" }, { color: "#FDD835" }], text: "따뜻한 색" },
          { id: "c-cool", dots: [{ color: "#1E88E5" }, { color: "#8E24AA" }, { color: "#43A047" }], text: "차가운 색" },
          { id: "c-gray", dots: [{ color: "#E0E0E0" }, { color: "#9E9E9E" }, { color: "#424242" }], text: "무채색" },
          { id: "c-mix",  dots: [{ color: "#F06292" }, { color: "#7E57C2" }, { color: "#26C6DA" }], text: "알록달록" },
          { id: "c-idk",  text: "잘 모르겠어" }
        ],
        reactions: {
          "c-warm": { expression: "◕", speech: "따뜻한 마음이구나." },
          "c-cool": { expression: "◡", speech: "차분한 마음이네." },
          "c-gray": { expression: "♡", speech: "지금은 좀 무거운 느낌인가 봐." },
          "c-mix":  { expression: "◕", speech: "여러 감정이 섞여있는 시기일 수 있어." },
          "c-idk":  { expression: "◡", speech: "색으로 표현하기 어려운 감정도 있어." }
        },
        resultMap: {
          "c-warm": "res-sunny",
          "c-cool": "res-cloudy",
          "c-gray": "res-rainy",
          "c-mix":  "res-mixed",
          "c-idk":  "res-idk"
        }
      }],
      nextId: "q4"
    },

    // ── 5. Q4: 시간성 (v3 신설) ──
    {
      type: "experience",
      id: "q4",
      progress: { current: 4, total: 4 },
      expression: "◡",
      speech: "마지막이야. 편하게 골라봐.",
      questions: [{
        id: "since",
        type: "radio",
        sub: "Q4",
        title: "그 감정이 언제부터?",
        options: [
          { id: "t-today",   text: "오늘부터" },
          { id: "t-days",    text: "며칠 째" },
          { id: "t-long",    text: "한참 됐어" },
          { id: "t-idk",     text: "잘 모르겠어" }
        ],
        reactions: {
          "t-today": { expression: "◡", speech: "오늘만 그런 거면 곧 지나갈 수 있어." },
          "t-days":  { expression: "◡", speech: "며칠 이어진 거면 한 번 살펴볼 만해." },
          "t-long":  { expression: "♡", speech: "오래 지속된 감정이면 자기 돌봄이 필요해." },
          "t-idk":   { expression: "◡", speech: "정확히 짚기 어려운 것도 자연스러워." }
        }
      }],
      nextId: null
    },

    // ── 6. 결과 ──
    { type: "result", id: "result" }
  ],

  results: {
    type: "mapped",
    cardTitle: "오늘의 마음 날씨",
    items: {
      "res-sunny": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "오늘 마음 날씨 좋은 날!\n이 기분 저장해둬.",
        speeches: [
          { expression: "◕", text: "좋은 하루! 이 기분을 기억해둬 ☀" },
          { expression: "◡", text: "좋은 기분을 한 줄 메모해두면\n다음에 비슷한 날이 또 와." }
        ],
        guide: [
          "이 기분을 한 줄로 메모해두기",
          "기분 좋은 음악 한 곡 저장",
          "오늘 즐거웠던 일 1개 떠올리기"
        ]
      },
      "res-cloudy": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="16" r="7" fill="#FFD93D" stroke="#F5A623" stroke-width="1.5"/><path d="M14 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H14z" fill="#E8EDF2" stroke="#B0BEC5" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "잔잔한 하루네.\n이런 날도 괜찮아.",
        speeches: [
          { expression: "◡", text: "뚜렷한 감정이 없는 것도 자연스러운 거야. 그 자체로 괜찮아." }
        ],
        guide: [
          "퇴근 후 10분 산책",
          "좋아하는 음료 한 잔",
          "오늘 감사한 것 1개 떠올리기"
        ]
      },
      "res-rainy": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 28c-4 0-7-2.5-7-5.5S8 17 12 17c.5-4 4-7 8.5-7 4.6 0 8.5 3.2 8.5 7.5 0 .3 0 .7-.1 1C33 19 36 21.5 36 25c0 1.7-1.5 3-3.5 3H12z" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/><circle cx="15" cy="34" r="2" fill="#64B5F6"/><circle cx="24" cy="37" r="2" fill="#64B5F6"/><circle cx="33" cy="34" r="2" fill="#64B5F6"/><circle cx="19" cy="40" r="1.5" fill="#90CAF9"/><circle cx="29" cy="41" r="1.5" fill="#90CAF9"/></svg>',
        emojiType: "svg",
        expression: "♡",
        message: "좀 힘든 날이구나.\n오늘은 나한테 좀 더\n너그러워져봐.",
        speeches: [
          { expression: "♡", text: "좀 힘든 하루였나 봐.\n여기까지 온 것만으로도 나를 돌보고 있는 거야." },
          { expression: "◡", text: "더 깊은 이야기를 나누고 싶다면,\n전문 상담사와 대화해보는 것도 좋아.", style: { fontSize: "13px" } }
        ],
        guide: [
          "휴대폰 알림 1시간 꺼두기",
          "조명 낮추고 따뜻한 음료 한 잔",
          "오늘은 일찍 자기"
        ]
      },
      "res-mixed": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="20" r="9" fill="#F06292" opacity="0.6"/><circle cx="32" cy="20" r="9" fill="#7E57C2" opacity="0.6"/><circle cx="24" cy="32" r="9" fill="#26C6DA" opacity="0.6"/></svg>',
        emojiType: "svg",
        expression: "✦",
        message: "여러 감정이 섞인 날.\n그것도 솔직한 답이야.",
        speeches: [
          { expression: "✦", text: "한 가지로 못 정하는 마음, 그게 더 자연스러워." },
          { expression: "◡", text: "감정은 하나씩 또렷한 게 아니라\n여럿이 동시에 흐르는 거야." }
        ],
        guide: [
          "지금 떠오르는 감정 단어 3개 적어보기",
          "음악 한 곡으로 분위기 전환",
          "산책하며 머릿속 정리"
        ]
      },
      "res-idk": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "지금은 잘 모르겠어도\n괜찮아. 그것도 하나의\n솔직한 답이야.",
        speeches: [
          { expression: "◡", text: "지금 감정을 잘 모르겠는 것도 자연스러운 거야." }
        ],
        guide: [
          "잠깐 창밖 보며 멍 때리기",
          "물 한 잔 천천히 마시기",
          "오늘은 결정 내리지 않기"
        ]
      }
    }
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "지금 느끼는 감정에 이름 붙여보기",
      "좋아하는 노래 한 곡 들으며 잠깐 쉬기",
      "오늘 하루 고마운 것 하나 떠올려보기"
    ]
  },

  next: [
    {
      url: "../workshop/감정날씨.html",
      title: "오늘의 감정 날씨 체크",
      icon: "wb_sunny", iconFilled: true, iconColor: "#4A90D9",
      meta: "감정 관리 · 5분", badge: "혼합형", badgeType: "mixed"
    },
    {
      url: "../mini/에너지잔량.html",
      title: "나의 에너지 잔량은?",
      icon: "cloud", iconFilled: true, iconColor: "#9C27B0",
      meta: "스트레스 · 1분", badge: "선택형", badgeType: "select"
    }
  ],

  share: {
    text: "오늘의 마음 날씨를 체크해봤어!",
    url: "https://maum-workshop.github.io/mini/감정체크.html"
  }
};
