/* ================================================
   마음 워크숍 — 데이터 시트
   감정 체크 (category: emotion / mini)
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

    // ── 2. Q1 감정 선택 ──
    {
      type: "experience",
      id: "q1",
      progress: { current: 1, total: 3 },
      guide: { face: "◠", text: "지금 가장 가까운 감정을 골라봐." },
      questions: [{
        id: "emotion",
        type: "radio",
        sub: "Q1",
        title: "지금 이 순간, 가장 가까운 감정은?",
        options: [
          { id: "e-calm",    text: "편안하다",  reaction: { id: "r-calm",    expression: "◕", speech: "편안한 순간이구나 :)" } },
          { id: "e-excited", text: "설렌다",    reaction: { id: "r-excited", expression: "◕", speech: "오 뭔가 기대되는 게 있나 보다!" } },
          { id: "e-neutral", text: "무덤덤하다", reaction: { id: "r-neutral", expression: "◡", speech: "뚜렷한 감정이 없는 것도 자연스러운 거야." } },
          { id: "e-anxious", text: "불안하다",  reaction: { id: "r-anxious", expression: "◡", speech: "좀 불안한 마음이구나. 괜찮아." } },
          { id: "e-tired",   text: "지쳐있다",  reaction: { id: "r-tired",   expression: "♡", speech: "많이 힘든 하루인가 봐." } },
          { id: "e-unknown", text: "모르겠다",  reaction: { id: "r-unknown", expression: "◡", speech: "감정을 잘 모르겠는 것도 괜찮아." } }
        ]
      }],
      nextId: "q2"
    },

    // ── 3. Q2 감정 강도 ──
    {
      type: "experience",
      id: "q2",
      progress: { current: 2, total: 3 },
      guide: { face: "◠", text: "크기만 느껴봐. 정확하지 않아도 돼." },
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

    // ── 4. Q3 감정 색상 ──
    {
      type: "experience",
      id: "q3",
      progress: { current: 3, total: 3 },
      questions: [{
        id: "color",
        type: "radio",
        sub: "Q3",
        title: "그 감정을 색으로 표현한다면?",
        options: [
          { id: "c-warm", dots: [{ color: "#E53935" }, { color: "#FB8C00" }, { color: "#FDD835" }], text: "따뜻한 색" },
          { id: "c-cool", dots: [{ color: "#1E88E5" }, { color: "#8E24AA" }, { color: "#43A047" }], text: "차가운 색" },
          { id: "c-gray", dots: [{ color: "#E0E0E0" }, { color: "#9E9E9E" }, { color: "#424242" }], text: "무채색" },
          { id: "c-idk",  text: "잘 모르겠어" }
        ],
        resultMap: {
          "c-warm": "res-sunny",
          "c-cool": "res-cloudy",
          "c-gray": "res-rainy",
          "c-idk":  "res-idk"
        }
      }],
      nextId: null
    },

    // ── 5. 결과 ──
    { type: "result", id: "result" }
  ],

  results: {
    type: "mapped",
    items: {
      "res-sunny": {
        cardTitle: "오늘의 마음 날씨",
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        expression: "◕",
        message: "오늘 마음 날씨 좋은 날!\n이 기분 저장해둬.",
        speeches: [
          { expression: "◕", text: "좋은 하루! 이 기분을 기억해둬 ☀" }
        ]
      },
      "res-cloudy": {
        cardTitle: "오늘의 마음 날씨",
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="16" r="7" fill="#FFD93D" stroke="#F5A623" stroke-width="1.5"/><path d="M14 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H14z" fill="#E8EDF2" stroke="#B0BEC5" stroke-width="1.5"/></svg>',
        expression: "◡",
        message: "잔잔한 하루네.\n이런 날도 괜찮아.",
        speeches: [
          { expression: "◡", text: "뚜렷한 감정이 없는 것도 자연스러운 거야. 그 자체로 괜찮아." }
        ]
      },
      "res-rainy": {
        cardTitle: "오늘의 마음 날씨",
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 28c-4 0-7-2.5-7-5.5S8 17 12 17c.5-4 4-7 8.5-7 4.6 0 8.5 3.2 8.5 7.5 0 .3 0 .7-.1 1C33 19 36 21.5 36 25c0 1.7-1.5 3-3.5 3H12z" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/><circle cx="15" cy="34" r="2" fill="#64B5F6"/><circle cx="24" cy="37" r="2" fill="#64B5F6"/><circle cx="33" cy="34" r="2" fill="#64B5F6"/><circle cx="19" cy="40" r="1.5" fill="#90CAF9"/><circle cx="29" cy="41" r="1.5" fill="#90CAF9"/></svg>',
        expression: "♡",
        message: "좀 힘든 날이구나.\n오늘은 나한테 좀 더\n너그러워져봐.",
        speeches: [
          { expression: "♡", text: "좀 힘든 하루였나 봐.\n여기까지 온 것만으로도 나를 돌보고 있는 거야." },
          { expression: "◡", text: "더 깊은 이야기를 나누고 싶다면,\n전문 상담사와 대화해보는 것도 좋아.", style: { fontSize: "13px" } }
        ]
      },
      "res-idk": {
        cardTitle: "오늘의 마음 날씨",
        svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        expression: "◡",
        message: "지금은 잘 모르겠어도\n괜찮아. 그것도 하나의\n솔직한 답이야.",
        speeches: [
          { expression: "◡", text: "지금 감정을 잘 모르겠는 것도 자연스러운 거야." }
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
