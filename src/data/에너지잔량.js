/* ================================================
   마음 워크숍 — 데이터 시트
   나의 에너지 잔량은? (category: stress / mini)
   ================================================ */

window.WORKSHOP = {
  id: "energy-level",
  title: "나의 에너지 잔량은?",
  category: "stress",
  duration: "1분",
  type: "mini",

  steps: [
    // ── 1. 도입 ──
    {
      type: "intro",
      id: "start",
      icon: "cloud",
      iconFilled: true,
      expression: "◡",
      speech: "안녕! 오늘은 에너지 잔량을 체크해볼 거야.\n1분이면 돼. 어떤 결과든 괜찮아.",
      permission: "답은 저장되지 않아요.",
      nextId: "q1",
      nextLabel: "같이 해보자! →"
    },

    // ── 2. Q1 ──
    {
      type: "question",
      id: "q1",
      progress: { current: 1, total: 4 },
      expression: "◠",
      speech: "가장 가까운 걸 골라봐.",
      sub: "Q1",
      title: "오늘 아침 눈 떴을 때 기분은?",
      options: [
        { id: "q1-a", text: "개운했다", value: 2 },
        { id: "q1-b", text: "보통이었다", value: 1 },
        { id: "q1-c", text: "일어나기 싫었다", value: 0 },
        { id: "q1-idk", text: "잘 모르겠어", value: 1 }
      ],
      reactions: {
        "q1-a":   { expression: "◕", speech: "좋은 아침이었나 보다!" },
        "q1-b":   { expression: "◡", speech: "그렇구나." },
        "q1-c":   { expression: "◡", speech: "좀 피곤한 아침이었나 봐." },
        "q1-idk": { expression: "◡", speech: "모르겠는 것도 자연스러운 거야." }
      },
      nextId: "q2",
      nextLabel: "다음 →"
    },

    // ── 3. Q2 ──
    {
      type: "question",
      id: "q2",
      progress: { current: 2, total: 4 },
      sub: "Q2",
      title: "지금 가장 하고 싶은 건?",
      options: [
        { id: "q2-a", text: "뭔가 새로운 거 해보기", value: 2 },
        { id: "q2-b", text: "맛있는 거 먹기", value: 1 },
        { id: "q2-c", text: "아무것도 안 하기", value: 0 },
        { id: "q2-d", text: "누군가와 이야기", value: 1 },
        { id: "q2-idk", text: "잘 모르겠어", value: 1 }
      ],
      nextId: "q3",
      nextLabel: "다음 →"
    },

    // ── 4. Q3 ──
    {
      type: "question",
      id: "q3",
      progress: { current: 3, total: 4 },
      sub: "Q3",
      title: "이번 주 가장 많이 느낀 감정은?",
      options: [
        { id: "q3-a", text: "즐거움·기대", value: 2 },
        { id: "q3-b", text: "무난함·평온", value: 1 },
        { id: "q3-c", text: "피곤·지침", value: 0 },
        { id: "q3-idk", text: "잘 모르겠어", value: 1 }
      ],
      nextId: "q4",
      nextLabel: "다음 →"
    },

    // ── 5. Q4 (마지막 질문 — 결과 분기) ──
    {
      type: "question",
      id: "q4",
      progress: { current: 4, total: 4 },
      sub: "Q4",
      title: "좋아하는 취미를 할 에너지가 있어?",
      options: [
        { id: "q4-a", text: "충분하다", value: "high" },
        { id: "q4-b", text: "좀 쉬면 할 수 있다", value: "mid" },
        { id: "q4-c", text: "전혀 없다", value: "low" },
        { id: "q4-idk", text: "잘 모르겠어", value: "idk" }
      ],
      reactions: {
        "q4-idk": { expression: "◡", speech: "모르겠는 것도 자연스러운 거야." }
      },
      resultMap: {
        "q4-a":   "result-high",
        "q4-b":   "result-mid",
        "q4-c":   "result-low",
        "q4-idk": "result-idk"
      },
      nextId: null,
      nextLabel: "결과 보기 →"
    },

    // ── 6. 결과 ──
    { type: "result", id: "result" }
  ],

  results: {
    type: "mapped",
    cardTitle: "나의 에너지 잔량",

    items: {
      "result-high": {
        number: "85%",
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "오늘 에너지가 넘치는 날!\n이 기분을 기억해둬.",
        speeches: [
          { expression: "◕", text: "에너지 넘치는 하루! 이 기분 소중한 사람한테 나눠보는 건 어때?" }
        ]
      },

      "result-mid": {
        number: "55%",
        emoji: "⛅",
        emojiType: "text",
        expression: "◡",
        message: "적당히 충전된 상태야.\n오늘은 페이스를 유지해봐.",
        speeches: [
          { expression: "◡", text: "무리하지 않아도 돼. 지금 페이스면 충분해." }
        ]
      },

      "result-low": {
        number: "23%",
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H12z" fill="#CFD8DC" stroke="#90A4AE" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "♡",
        message: "작은 쉼 하나가\n내일의 에너지가 됩니다.",
        speeches: [
          { expression: "♡", text: "좀 지친 하루였나 봐.\n여기까지 온 것만으로도 나를 돌보고 있는 거야.\n당신 잘못이 아니야." },
          { expression: "◡", text: "더 깊은 이야기를 나누고 싶다면,\n전문 상담사와 대화해보는 것도 좋아." }
        ],
        extraSpeech: {
          expression: "◡",
          text: "더 깊은 이야기를 나누고 싶다면,\n전문 상담사와 대화해보는 것도 좋아."
        }
      },

      "result-idk": {
        number: "?%",
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "지금은 잘 모르겠어도\n괜찮아. 여기까지 온 것\n만으로도 충분해.",
        speeches: [
          { expression: "◡", text: "지금 내 상태를 잘 모르겠는 것도 자연스러운 거야.\n그것도 하나의 솔직한 답이야." }
        ]
      }
    }
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "좋아하는 카페에서 혼자 10분 앉아보기",
      "어린 시절 좋아했던 것 하나 떠올려보기",
      "오늘 나에게 \"수고했어\" 한마디"
    ]
  },

  next: [
    {
      url: "../workshop/감정날씨.html",
      title: "오늘의 감정 날씨 체크",
      icon: "wb_sunny", iconColor: "#4A90D9",
      meta: "감정 관리 · 5분", badge: "혼합형", badgeType: "mixed"
    },
    {
      url: "../mini/감정체크.html",
      title: "30초 감정 체크",
      icon: "favorite", iconColor: "#4A90D9",
      meta: "감정 관리 · 1분", badge: "선택형", badgeType: "select"
    }
  ],

  share: {
    text: "나의 에너지 잔량을 체크해봤어! 나도 해보기:",
    url: "https://maum-workshop.github.io/mini/에너지잔량.html"
  }
};
