/* ================================================
   마음 워크숍 — 데이터 시트
   오늘의 감정 날씨 체크 (category: emotion)
   ================================================ */

window.WORKSHOP = {
  id: "emotion-weather",
  title: "오늘의 감정 날씨 체크",
  category: "emotion",
  duration: "3분",
  type: "full",

  steps: [
    // ── 1. 도입 ──
    {
      type: "intro",
      id: "intro",
      icon: "wb_sunny",
      iconFilled: true,
      expression: "◡",
      speech: "하루에도 감정은 여러 번 변해.\n지금 이 순간, 마음이 어떤 날씨인지 같이 봐보자.\n\n어떤 날씨든 괜찮아.",
      permission: "3분이면 돼 · 답은 저장되지 않아요",
      nextId: "explore",
      nextLabel: "같이 해보자! →"
    },

    // ── 2. 탐색 ──
    {
      type: "explore",
      id: "explore",
      expression: "◠",
      speech: "감정을 날씨로 표현하면 이해하기 쉬워.\n천천히 살펴봐. 정답은 없어.",
      cards: [
        { title: "☀ 맑음", body: "기분 좋고 에너지가 충분한 상태. 웃음이 나오고 뭐든 할 수 있을 것 같은 느낌." },
        { title: "⛅ 구름 조금", body: "대체로 괜찮지만 약간 흐린 상태. 좋지도 나쁘지도 않은 무난한 하루." },
        { title: "☁ 흐림", body: "뚜렷한 감정 없이 무거운 상태. 의욕이 좀 떨어지고 조용히 있고 싶은 느낌." },
        { title: "🌧 비", body: "슬프거나 지친 상태. 눈물이 날 것 같거나 모든 것이 힘겹게 느껴지는 순간." }
      ],
      nextId: "experience"
    },

    // ── 3. 체험 (혼합형) ──
    {
      type: "experience",
      id: "experience",
      expression: "◡",
      speech: "감정 날씨를 골라봐.",
      questions: [{
        id: "weather",
        type: "radio",
        title: "지금 당신의 감정 날씨는?",
        options: [
          { id: "w-sunny",  text: "맑음",       reaction: { expression: "◕", speech: "좋은 날씨구나! ☀" } },
          { id: "w-partly", text: "구름 조금",   reaction: { expression: "◡", speech: "대체로 괜찮은 날이네." } },
          { id: "w-cloudy", text: "흐림",        reaction: { expression: "◡", speech: "좀 흐린 날씨구나." } },
          { id: "w-rainy",  text: "비",          reaction: { expression: "♡", speech: "좀 힘든 하루인가 봐. 괜찮아." } },
          { id: "w-idk",    text: "잘 모르겠어",  reaction: { expression: "◡", speech: "어떤 날씨인지 모르겠어도 돼." } }
        ],
        resultMap: {
          "w-sunny":  "res-sunny",
          "w-partly": "res-partly",
          "w-cloudy": "res-cloudy",
          "w-rainy":  "res-rainy",
          "w-idk":    "res-idk"
        }
      }],
      textarea: {
        guide: { expression: "◠", speech: "적고 싶은 게 있으면 적어봐도 좋아.\n안 적어도 괜찮아. 여기 적은 건 아무도 안 봐." },
        placeholder: "지금 마음에 떠오르는 한 줄... (선택)",
        rows: 3,
        note: "답은 저장되지 않아요."
      },
      nextId: null
    },

    // ── 4. 결과 ──
    { type: "result", id: "result" }
  ],

  results: {
    type: "radio-mapped",
    cardTitle: "오늘의 감정 날씨",

    items: {
      "res-sunny": {
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        expression: "◕",
        message: "\"맑은 하루!\n이 기분을 기억해둬.\"",
        speeches: [
          { expression: "◕", text: "오늘 기분 좋은 날! 이 에너지를 소중한 사람한테 나눠보는 건 어때?" }
        ]
      },

      "res-partly": {
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="16" r="7" fill="#FFD93D" stroke="#F5A623" stroke-width="1.5"/><path d="M14 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H14z" fill="#E8EDF2" stroke="#B0BEC5" stroke-width="1.5"/></svg>',
        expression: "◡",
        message: "\"구름 조금.\n나쁘지 않은 하루야.\"",
        speeches: [
          { expression: "◡", text: "무난한 하루도 충분히 좋은 거야." }
        ]
      },

      "res-cloudy": {
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H12z" fill="#CFD8DC" stroke="#90A4AE" stroke-width="1.5"/></svg>',
        expression: "♡",
        message: "\"잔잔한 흐림.\n오늘은 좀 쉬어가도\n괜찮아요.\"",
        speeches: [
          { expression: "♡", text: "여기까지 온 것만으로도 나를 돌보고 있는 거야." }
        ]
      },

      "res-rainy": {
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 28c-4 0-7-2.5-7-5.5S8 17 12 17c.5-4 4-7 8.5-7 4.6 0 8.5 3.2 8.5 7.5 0 .3 0 .7-.1 1C33 19 36 21.5 36 25c0 1.7-1.5 3-3.5 3H12z" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/><circle cx="15" cy="34" r="2" fill="#64B5F6"/><circle cx="24" cy="37" r="2" fill="#64B5F6"/><circle cx="33" cy="34" r="2" fill="#64B5F6"/><circle cx="19" cy="40" r="1.5" fill="#90CAF9"/><circle cx="29" cy="41" r="1.5" fill="#90CAF9"/></svg>',
        expression: "♡",
        message: "\"비 오는 날.\n괜찮아, 비 뒤에는\n반드시 햇살이 와.\"",
        speeches: [
          { expression: "♡", text: "많이 힘든 하루구나. 이 워크숍을 해본 것 자체가 자기를 돌보려는 용기야. 당신 잘못이 아니야." },
          { expression: "◡", text: "더 깊은 이야기를 나누고 싶다면, 전문 상담사와 대화해보는 것도 좋아.", style: "font-size:13px;" }
        ],
        extraSpeech: true
      },

      "res-idk": {
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        expression: "◡",
        message: "\"지금은 잘 모르겠어도\n괜찮아. 그것도 하나의\n솔직한 답이야.\"",
        speeches: [
          { expression: "◡", text: "어떤 날씨인지 모르겠어도 자연스러운 거야. 그것도 하나의 답이야." }
        ]
      }
    }
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "퇴근 후 10분 아무 목적 없이 산책하기",
      "좋아하는 음료 한 잔 천천히 마시기",
      "오늘 감사한 것 1개 떠올려보기"
    ]
  },

  next: [
    {
      url: "../workshop/강점발견.html",
      title: "나의 강점 발견",
      icon: "fitness_center", iconColor: "#F5A623",
      meta: "자존감 · 5분", badge: "선택형", badgeType: "select"
    },
    {
      url: "../mini/에너지잔량.html",
      title: "나의 에너지 잔량은?",
      icon: "cloud", iconColor: "#9C27B0",
      meta: "스트레스 · 1분", badge: "선택형", badgeType: "select"
    }
  ],

  share: {
    text: "오늘의 감정 날씨를 체크해봤어!",
    url: "https://maum-workshop.github.io/workshop/감정날씨.html"
  }
};
