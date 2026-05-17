/* ================================================
   마음 워크숍 — 데이터 시트
   오늘의 감정 날씨 체크 (category: emotion)
   ================================================
   표준 스키마: energy-level.js 헤더 참조
   ================================================ */

window.WORKSHOP = {
  id: "emotion-weather",
  title: "오늘의 감정 날씨 체크",
  category: "emotion",
  duration: "3~5분",
  type: "full",

  steps: [
    {
      type: "intro",
      id: "intro",
      icon: "wb_sunny",
      iconFilled: true,
      expression: "◡",
      speech: "하루에도 감정은 여러 번 변해.\n지금 이 순간, 마음이 어떤 날씨인지 같이 봐보자.\n\n어떤 날씨든 괜찮아.",
      permission: "3~5분이면 돼 · 답은 저장되지 않아요",
      nextId: "explore",
      nextLabel: "같이 해보자! →"
    },

    {
      type: "explore",
      id: "explore",
      expression: "◠",
      speech: "감정을 날씨로 표현하면 이해하기 쉬워.\n천천히 살펴봐. 정답은 없어.",
      cards: [
        { title: "☀ 맑음",       body: "기분 좋고 에너지가 충분한 상태. 웃음이 나오고 뭐든 할 수 있을 것 같은 느낌." },
        { title: "⛅ 구름 조금",   body: "대체로 괜찮지만 약간 흐린 상태. 좋지도 나쁘지도 않은 무난한 하루." },
        { title: "☁ 흐림",       body: "뚜렷한 감정 없이 무거운 상태. 의욕이 좀 떨어지고 조용히 있고 싶은 느낌." },
        { title: "🌧 비",        body: "슬프거나 지친 상태. 눈물이 날 것 같거나 모든 것이 힘겹게 느껴지는 순간." },
        { title: "🌫 안개",      body: "감정의 윤곽이 흐릿한 상태. 멍하고 정리되지 않는 느낌. 한 발씩만 봐도 돼." },
        { title: "🌈 비 후 갬",   body: "힘들었지만 한고비 넘긴 상태. 회복의 신호가 보이는 순간." }
      ],
      nextId: "weather"
    },

    {
      type: "experience",
      id: "weather",
      progress: { current: 1, total: 4 },
      expression: "◡",
      speech: "감정 날씨를 골라봐.",
      questions: [{
        id: "weather",
        type: "radio",
        sub: "Q1",
        title: "지금 당신의 감정 날씨는?",
        options: [
          { id: "w-sunny",   text: "☀ 맑음" },
          { id: "w-partly",  text: "⛅ 구름 조금" },
          { id: "w-cloudy",  text: "☁ 흐림" },
          { id: "w-rainy",   text: "🌧 비" },
          { id: "w-foggy",   text: "🌫 안개" },
          { id: "w-rainbow", text: "🌈 비 후 갬" },
          { id: "w-idk",     text: "잘 모르겠어" }
        ],
        reactions: {
          "w-sunny":   { expression: "◕", speech: "좋은 날씨구나! ☀" },
          "w-partly":  { expression: "◡", speech: "대체로 괜찮은 날이네." },
          "w-cloudy":  { expression: "◡", speech: "좀 흐린 날씨구나." },
          "w-rainy":   { expression: "♡", speech: "좀 힘든 하루인가 봐. 괜찮아." },
          "w-foggy":   { expression: "◡", speech: "흐릿한 마음, 그대로 둬도 돼." },
          "w-rainbow": { expression: "◕", speech: "한고비 넘긴 너, 정말 대단해." },
          "w-idk":     { expression: "◡", speech: "어떤 날씨인지 모르겠어도 돼." }
        },
        resultMap: {
          "w-sunny":   "res-sunny",
          "w-partly":  "res-partly",
          "w-cloudy":  "res-cloudy",
          "w-rainy":   "res-rainy",
          "w-foggy":   "res-foggy",
          "w-rainbow": "res-rainbow",
          "w-idk":     "res-idk"
        }
      }],
      nextId: "intensity"
    },

    {
      type: "experience",
      id: "intensity",
      progress: { current: 2, total: 4 },
      expression: "◠",
      speech: "그 날씨의 세기는 어느 정도야? 정확하지 않아도 돼.",
      questions: [{
        id: "intensity",
        type: "slider",
        sub: "Q2",
        title: "감정의 세기는?",
        slider: {
          min: 1, max: 5, default: 3,
          labelMin: "잔잔", labelMax: "강함",
          ariaLabel: "감정 세기"
        }
      }],
      nextId: "cause"
    },

    {
      type: "experience",
      id: "cause",
      progress: { current: 3, total: 4 },
      expression: "◡",
      speech: "오늘 그렇게 느낀 이유, 짚이는 게 있어?",
      questions: [{
        id: "cause",
        type: "radio",
        sub: "Q3",
        title: "오늘 감정의 출처는?",
        options: [
          { id: "c-tired",    text: "🛌 피곤·수면 부족" },
          { id: "c-people",   text: "👥 사람과의 일" },
          { id: "c-work",     text: "💼 일·공부" },
          { id: "c-weather",  text: "🌤 날씨·계절" },
          { id: "c-event",    text: "✨ 특별한 일" },
          { id: "c-idk",      text: "잘 모르겠어" }
        ],
        reactions: {
          "c-tired":   { expression: "◡", speech: "잠과 피로는 감정의 가장 큰 변수야." },
          "c-people":  { expression: "◡", speech: "사람 사이의 일은 마음에 오래 남지." },
          "c-work":    { expression: "◡", speech: "일이나 공부에서 오는 무게도 진짜야." },
          "c-weather": { expression: "◡", speech: "날씨도 진짜 영향을 줘. 자기 탓 아니야." },
          "c-event":   { expression: "✦", speech: "특별한 일이 마음을 움직였구나." },
          "c-idk":     { expression: "◡", speech: "이유를 모르겠는 것도 답이야." }
        }
      }],
      nextId: "reflection"
    },

    {
      type: "experience",
      id: "reflection",
      progress: { current: 4, total: 4 },
      expression: "◠",
      speech: "적고 싶은 게 있으면 적어봐도 좋아.\n안 적어도 괜찮아. 여기 적은 건 아무도 안 봐.",
      textarea: {
        placeholder: "지금 마음에 떠오르는 한 줄... (선택)",
        rows: 3,
        note: "답은 저장되지 않아요."
      },
      nextId: null
    },

    { type: "result", id: "result" }
  ],

  results: {
    type: "mapped",
    cardTitle: "오늘의 감정 날씨",

    items: {
      "res-sunny": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "\"맑은 하루!\n이 기분을 기억해둬.\"",
        speeches: [
          { expression: "◕", speech: "오늘 기분 좋은 날! 이 에너지를 소중한 사람한테 나눠보는 건 어때?" },
          { expression: "◡", speech: "좋은 하루는 한 줄로 적어두면\n다음에 비슷한 날 만들기 쉬워." }
        ],
        guide: [
          "이 기분 한 줄로 메모하기",
          "주변 사람한테 짧은 안부 묻기",
          "내일도 해보고 싶은 일 1개 적기"
        ]
      },

      "res-partly": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="16" r="7" fill="#FFD93D" stroke="#F5A623" stroke-width="1.5"/><path d="M14 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H14z" fill="#E8EDF2" stroke="#B0BEC5" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "\"구름 조금.\n나쁘지 않은 하루야.\"",
        speeches: [
          { expression: "◡", speech: "무난한 하루도 충분히 좋은 거야." },
          { expression: "◡", speech: "특별한 일 없이 하루를 마무리하는 것도\n자기 돌봄의 한 형태야." }
        ],
        guide: [
          "좋아하는 음료 한 잔",
          "10분 가벼운 산책",
          "오늘 잘 한 일 1개 떠올리기"
        ]
      },

      "res-cloudy": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 36c-4.4 0-8-3.1-8-7s3.6-7 8-7c.5-4.4 4.5-8 9.5-8 5.2 0 9.5 3.8 9.5 8.5 0 .5 0 1-.1 1.5C37 24.5 40 27.5 40 31c0 2.8-2.7 5-6 5H12z" fill="#CFD8DC" stroke="#90A4AE" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "♡",
        message: "\"잔잔한 흐림.\n오늘은 좀 쉬어가도\n괜찮아.\"",
        speeches: [
          { expression: "♡", speech: "여기까지 온 것만으로도 나를 돌보고 있는 거야." },
          { expression: "◡", speech: "오늘 흐려도 내일은 또 다른 날씨가 와." }
        ],
        guide: [
          "조용한 음악 한 곡",
          "따뜻한 음료 천천히 마시기",
          "오늘은 일을 적게 잡기"
        ]
      },

      "res-rainy": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 28c-4 0-7-2.5-7-5.5S8 17 12 17c.5-4 4-7 8.5-7 4.6 0 8.5 3.2 8.5 7.5 0 .3 0 .7-.1 1C33 19 36 21.5 36 25c0 1.7-1.5 3-3.5 3H12z" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/><circle cx="15" cy="34" r="2" fill="#64B5F6"/><circle cx="24" cy="37" r="2" fill="#64B5F6"/><circle cx="33" cy="34" r="2" fill="#64B5F6"/><circle cx="19" cy="40" r="1.5" fill="#90CAF9"/><circle cx="29" cy="41" r="1.5" fill="#90CAF9"/></svg>',
        emojiType: "svg",
        expression: "♡",
        message: "\"비 오는 날.\n괜찮아, 비 뒤에는\n반드시 햇살이 와.\"",
        speeches: [
          { expression: "♡", speech: "많이 힘든 하루구나. 이 워크숍을 해본 것 자체가\n자기를 돌보려는 용기야. 당신 잘못이 아니야." },
          { expression: "◡", speech: "더 깊은 이야기를 나누고 싶다면, 전문 상담사와\n대화해보는 것도 좋아." }
        ],
        guide: [
          "휴대폰 알림 1시간 꺼두기",
          "따뜻한 이불에 일찍 들어가기",
          "내일 일정 하나만 비워두기"
        ]
      },

      "res-foggy": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="8"  y1="16" x2="40" y2="16" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/><line x1="6"  y1="24" x2="42" y2="24" stroke="#90A4AE" stroke-width="3" stroke-linecap="round"/><line x1="10" y1="32" x2="38" y2="32" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "\"안개 낀 날.\n한 발씩만 보면 돼.\"",
        speeches: [
          { expression: "◡", speech: "감정의 윤곽이 흐릿한 날도 있어. 무리해서 분류 안 해도 돼." },
          { expression: "◡", speech: "안개는 시간이 지나면 걷혀.\n오늘은 한 발만 보고 가도 충분해." }
        ],
        guide: [
          "오늘은 큰 결정 미루기",
          "잠깐 멍 때리기",
          "지금 떠오르는 단어 3개 적기"
        ]
      },

      "res-rainbow": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 38 A18 18 0 0 1 42 38" stroke="#E91E63" stroke-width="3" fill="none"/><path d="M10 38 A14 14 0 0 1 38 38" stroke="#FF9800" stroke-width="3" fill="none"/><path d="M14 38 A10 10 0 0 1 34 38" stroke="#FFEB3B" stroke-width="3" fill="none"/><path d="M18 38 A6 6 0 0 1 30 38" stroke="#4CAF50" stroke-width="3" fill="none"/></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "\"비 그친 후 무지개.\n회복의 신호가 보여.\"",
        speeches: [
          { expression: "◕", speech: "한 고비 넘긴 너, 정말 대단해." },
          { expression: "◡", speech: "비를 지나온 너만 볼 수 있는 풍경이 있어." }
        ],
        guide: [
          "한 고비 넘긴 나에게 칭찬 한 마디",
          "지금까지 도와준 사람 떠올리기",
          "다음에 비 올 때 도움 될 만한 것 1개 메모"
        ]
      },

      "res-idk": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "\"지금은 잘 모르겠어도\n괜찮아. 그것도 하나의\n솔직한 답이야.\"",
        speeches: [
          { expression: "◡", speech: "어떤 날씨인지 모르겠어도 자연스러운 거야. 그것도 하나의 답이야." }
        ],
        guide: [
          "지금 떠오르는 단어 1개 적기",
          "잠깐 산책 후 다시 느껴보기",
          "오늘은 결정 없이 흘려보내기"
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
      url: "../workshop/strength.html",
      title: "나의 강점 발견",
      icon: "fitness_center", iconColor: "#F5A623",
      meta: "자존감 · 5분", badge: "선택형", badgeType: "select"
    },
    {
      url: "../mini/energy-level.html",
      title: "나의 에너지 잔량은?",
      icon: "cloud", iconColor: "#9C27B0",
      meta: "스트레스 · 1분", badge: "선택형", badgeType: "select"
    }
  ],

  share: {
    text: "오늘의 감정 날씨를 체크해봤어!",
    url: "https://maum-workshop.github.io/workshop/emotion-weather.html"
  }
};
