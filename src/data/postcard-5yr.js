/* ================================================
   마음 워크숍 — 데이터 시트
   5년 후 나에게 보내는 엽서 (category: career)
   ================================================
   표준 스키마: energy-level.js 헤더 참조
   ================================================ */

window.WORKSHOP = {
  id: "postcard-5yr",
  title: "5년 후 나에게 보내는 엽서",
  category: "career",
  duration: "5분",
  type: "full",

  steps: [
    {
      type: "intro",
      id: "intro",
      icon: "mail",
      iconFilled: true,
      expression: "◡",
      speech: "5년 후의 나한테 엽서 한 장 보내볼까?\n뭘 써야 할지 모르겠으면 골라 써도 괜찮아.",
      permission: "5분이면 돼 · 답은 저장되지 않아요",
      nextId: "explore",
      nextLabel: "같이 해보자! →"
    },

    {
      type: "explore",
      id: "explore",
      expression: "◠",
      speech: "미래를 상상할 때 도움이 되는 질문들이야. 편하게 읽어봐.",
      cards: [
        { icon: "home",    title: "어디에서 살고 있을까?", body: "도시? 시골? 외국? 지금과 같은 곳? 공간을 상상해봐." },
        { icon: "work",    title: "어떤 일을 하고 있을까?", body: "지금과 같은 일? 완전히 다른 일? 어떤 일이든 괜찮아." },
        { icon: "group",   title: "누구와 함께할까?",     body: "가족? 친구? 새로운 사람? 혼자? 모두 좋은 선택이야." },
        { icon: "diamond", title: "가장 중요한 건 뭘까?",  body: "돈? 관계? 건강? 자유? 의미? 지금은 몰라도 괜찮아." }
      ],
      nextId: "experience"
    },

    {
      type: "experience",
      id: "experience",
      progress: { current: 1, total: 4 },
      expression: "◡",
      speech: "5년 후에 가장 중요하게 여기고 싶은 걸 골라봐.",
      questions: [
        {
          id: "value",
          type: "card-grid",
          sub: "Q1",
          title: "5년 후 가장 중요한 가치는?",
          iconColor: "#FF7043",
          options: [
            { id: "v-growth",  icon: "wb_sunny",   title: "성장", sub: "·도전" },
            { id: "v-stable",  icon: "home",       title: "안정", sub: "·편안함" },
            { id: "v-love",    icon: "favorite",   title: "관계", sub: "·사랑" },
            { id: "v-free",    icon: "spa",        title: "자유", sub: "·여유" },
            { id: "v-meaning", icon: "psychology", title: "기여", sub: "·의미" },
            { id: "v-idk",     icon: "help",       title: "잘",   sub: "모르겠어" }
          ],
          reactions: {
            "v-growth":  { id: "rv-growth",  expression: "◕", speech: "성장을 중요하게 생각하는 사람이구나!" },
            "v-stable":  { id: "rv-stable",  expression: "◡", speech: "안정과 편안함, 좋은 선택이야." },
            "v-love":    { id: "rv-love",    expression: "◕", speech: "사람과의 연결을 소중히 여기는구나." },
            "v-free":    { id: "rv-free",    expression: "◡", speech: "자유로운 삶, 멋진 가치야." },
            "v-meaning": { id: "rv-meaning", expression: "✦", speech: "의미를 좇는 마음, 깊이 있는 선택이야." },
            "v-idk":     { id: "rv-idk",     expression: "◡", speech: "아직 모르겠어도 괜찮아. 천천히." }
          },
          resultMap: {
            "v-growth":  "res-growth",
            "v-stable":  "res-stable",
            "v-love":    "res-love",
            "v-free":    "res-free",
            "v-meaning": "res-meaning",
            "v-idk":     "res-idk"
          }
        }
      ],
      nextId: "word"
    },

    {
      type: "experience",
      id: "word",
      progress: { current: 2, total: 4 },
      expression: "◠",
      speech: "5년 후 너를 한 단어로 표현한다면? 직감으로 골라봐.",
      questions: [{
        id: "word",
        type: "radio",
        sub: "Q2",
        title: "5년 후 내 모습 한 단어",
        options: [
          { id: "w-firm",     text: "단단한" },
          { id: "w-warm",     text: "따뜻한" },
          { id: "w-free",     text: "자유로운" },
          { id: "w-simple",   text: "단순한" },
          { id: "w-bold",     text: "도전하는" },
          { id: "w-easy",     text: "여유로운" },
          { id: "w-deep",     text: "깊이 있는" },
          { id: "w-meaning",  text: "의미 있는" },
          { id: "w-idk",      text: "잘 모르겠어" }
        ],
        reactions: {
          "w-firm":    { expression: "◕", speech: "단단함, 굵직한 가치야." },
          "w-warm":    { expression: "◕", speech: "따뜻한 사람이 되는 것, 멋진 그림이야." },
          "w-free":    { expression: "◕", speech: "자유, 어떤 선택을 해도 정답이야." },
          "w-simple":  { expression: "◡", speech: "단순함은 의외로 어려운 가치지." },
          "w-bold":    { expression: "◕", speech: "도전을 끊지 않는 너, 응원할게." },
          "w-easy":    { expression: "◡", speech: "여유, 요즘 많이 필요한 단어야." },
          "w-deep":    { expression: "✦", speech: "깊이는 시간이 쌓아주는 거야." },
          "w-meaning": { expression: "✦", speech: "의미를 좇는 마음이 보여." },
          "w-idk":     { expression: "◡", speech: "지금 한 단어로 못 정해도 괜찮아." }
        }
      }],
      nextId: "message"
    },

    {
      type: "experience",
      id: "message",
      progress: { current: 3, total: 4 },
      expression: "◡",
      speech: "5년 후 나에게 하고 싶은 말이 있어?",
      tab: {
        guide: { expression: "◡", speech: "직접 적어도 좋고, 마음에 드는 걸 골라도 좋아." },
        defaultTab: "select",

        writeTab: {
          guide: { expression: "◠", speech: "자유롭게 적어봐. 한 글자도 괜찮아.\n여기 적은 건 아무도 안 봐." },
          placeholder: "5년 후의 나에게...",
          rows: 4,
          note: "답은 저장되지 않아요."
        },

        selectTab: {
          guide: { expression: "◡", speech: "마음에 드는 걸 골라봐." },
          name: "pick",
          options: [
            { id: "pick-a", text: "“지금 고생하고 있지만, 다 잘 될 거야.”" },
            { id: "pick-b", text: "“뭘 하든 너답게 살고 있길.”" },
            { id: "pick-c", text: "“지금 고민한 시간이 다 의미 있었어.”" },
            { id: "pick-d", text: "“가장 중요한 건 네가 건강한 거야.”" },
            { id: "pick-e", text: "“어떤 선택을 했든, 그게 정답이야.”" },
            { id: "pick-f", text: "“넘어져도 다시 일어났던 거 기억해.”" },
            { id: "pick-g", text: "“지금 못 가진 것보다 가진 걸 봐.”" }
          ],
          reaction: { id: "rp", expression: "◕", speech: "좋은 말이다. 5년 후의 너도 분명 고마워할 거야." },
          extraCaption: "추가로 적고 싶은 게 있으면 아래에 적어봐도 좋아. (선택)",
          extraTextarea: { placeholder: "더 하고 싶은 말... (선택)", rows: 2 }
        }
      },
      nextId: "cheer"
    },

    {
      type: "experience",
      id: "cheer",
      progress: { current: 4, total: 4 },
      expression: "◠",
      speech: "5년 후의 너가 지금의 너에게 보내는 응원이라면?",
      tab: {
        guide: { expression: "◡", speech: "직접 적어도 좋고, 마음에 드는 걸 골라도 좋아." },
        defaultTab: "select",

        writeTab: {
          guide: { expression: "◠", speech: "자유롭게 적어봐. 짧아도 괜찮아." },
          placeholder: "지금의 나에게...",
          rows: 3,
          note: "답은 저장되지 않아요."
        },

        selectTab: {
          guide: { expression: "◡", speech: "마음에 드는 걸 골라봐." },
          name: "cheer-pick",
          options: [
            { id: "ch-a", text: "“여기까지 온 것만으로도 충분해.”" },
            { id: "ch-b", text: "“쉬어가도 괜찮아.”" },
            { id: "ch-c", text: "“오늘 하루 잘 버텼어.”" },
            { id: "ch-d", text: "“조급해하지 마, 너만의 속도가 있어.”" },
            { id: "ch-e", text: "“혹시 모를 좋은 일이 기다리고 있을지도.”" }
          ],
          reaction: { id: "rc", expression: "◕", speech: "5년 후의 너가 보낸 말이라고 생각해봐." }
        }
      },
      nextId: null,
      nextLabel: "결과 보기 →"
    },

    { type: "result", id: "result" }
  ],

  results: {
    type: "mapped",
    cardTitle: "5년 후 나에게 보내는 엽서",

    items: {
      "res-growth": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="10" fill="#FFD93D" stroke="#F5A623" stroke-width="2"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><line x1="9.9" y1="9.9" x2="14" y2="14"/><line x1="34" y1="34" x2="38.1" y2="38.1"/><line x1="9.9" y1="38.1" x2="14" y2="34"/><line x1="34" y1="14" x2="38.1" y2="9.9"/></g></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "성장을 향해 달려가는 너,<br>지금 이 순간의 고민도<br>그 여정의 일부야.",
        speeches: [
          { expression: "◕", speech: "미래의 너한테 엽서를 보냈어. 지금 고민하는 것도 전부 의미 있어." },
          { expression: "◡", speech: "성장은 직선이 아니야. 굽이굽이가 다 길이야." }
        ],
        guide: [
          "오늘 새로 배운 것 하나 메모하기",
          "다음에 도전할 작은 한 발 적기",
          "5년 후 나에게 보낸 메시지 저장하기"
        ]
      },

      "res-stable": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="20" width="36" height="22" rx="2" fill="#FFCCBC" stroke="#FF8A65" stroke-width="1.5"/><path d="M6 20l18 -12 18 12" stroke="#FF8A65" stroke-width="1.5" stroke-linejoin="round" fill="none"/><rect x="20" y="28" width="8" height="14" fill="#FF8A65"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "편안한 일상을 꿈꾸는 너,<br>지금 불안해도<br>다 괜찮아질 거야.",
        speeches: [
          { expression: "◡", speech: "안정을 원하는 마음, 당연한 거야. 조급해하지 않아도 돼." },
          { expression: "◡", speech: "오늘도 무사히 보낸 게 이미 그 안정의 한 부분이야." }
        ],
        guide: [
          "오늘 하루 무사한 것에 감사",
          "내일 일정 비울 시간 1개 잡기",
          "편안한 장소 한 곳 떠올리기"
        ]
      },

      "res-love": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 42s-14-9-14-20a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 11-14 20-14 20z" fill="#F06292" stroke="#E91E63" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "소중한 사람들과 함께하는 너,<br>지금의 관계도<br>충분히 소중해.",
        speeches: [
          { expression: "◕", speech: "사람을 소중히 여기는 마음, 정말 좋은 강점이야." },
          { expression: "◡", speech: "관계는 노력 + 운이야. 너는 노력 충분히 하고 있어." }
        ],
        guide: [
          "오랜만에 연락하고 싶은 사람 1명 떠올리기",
          "오늘 고마운 사람에게 한 줄 메시지",
          "내 곁의 좋은 사람 3명 적어보기"
        ]
      },

      "res-free": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8c-6 4-10 9-10 16 0 8 4 14 10 16 6-2 10-8 10-16 0-7-4-12-10-16z" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1.5"/><line x1="24" y1="14" x2="24" y2="38" stroke="#388E3C" stroke-width="1.5"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "자유롭게 살고 싶은 너,<br>지금의 선택 하나하나가<br>그 자유를 만들고 있어.",
        speeches: [
          { expression: "◡", speech: "어떤 선택을 하든, 그게 너의 정답이야." },
          { expression: "◡", speech: "자유는 큰 결심이 아니라\n매일 작은 \"안 해도 돼\"의 합이야." }
        ],
        guide: [
          "오늘 \"안 해도 되는 일\" 1개 찾기",
          "혼자만의 시간 30분 확보",
          "하고 싶은 일 리스트 한 줄 추가"
        ]
      },

      "res-meaning": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="14" fill="#CE93D8" stroke="#9C27B0" stroke-width="1.5"/><path d="M16 24h16M24 16v16" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>',
        emojiType: "svg",
        expression: "✦",
        message: "의미를 찾고 싶은 너,<br>그 질문 자체가<br>이미 답의 시작이야.",
        speeches: [
          { expression: "✦", speech: "의미는 발견하는 게 아니라 만드는 거야." },
          { expression: "◡", speech: "오늘 의미 있었던 30초가 있다면\n그게 시작이야." }
        ],
        guide: [
          "오늘 의미 있었던 순간 1개 떠올리기",
          "도움 준 사람 1명에게 한 줄 메시지",
          "내가 정말 좋아하는 것 3개 적기"
        ]
      },

      "res-idk": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "아직 모르겠어도 괜찮아.<br>지금 이 순간 고민하는 것<br>자체가 의미 있어.",
        speeches: [
          { expression: "◡", speech: "아직 모르겠는 것도 자연스러운 거야. 천천히 찾아가면 돼." },
          { expression: "◡", speech: "정답을 알고 시작하는 사람은 없어." }
        ],
        guide: [
          "오늘 끌리는 단어 1개 적기",
          "지금 안 끌리는 것 1개 빼기",
          "5년 후 나에게 \"천천히 가도 돼\" 한 마디"
        ]
      }
    }
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "오늘 결과를 캡처해서 나중에 다시 보기",
      "어린 시절 꿈꿨던 것 하나 떠올려보기",
      "“지금 이대로도 괜찮다” 한 번 말해보기"
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
      url: "../workshop/emotion-weather.html",
      title: "오늘의 감정 날씨 체크",
      icon: "wb_sunny", iconColor: "#4A90D9",
      meta: "감정 관리 · 5분", badge: "혼합형", badgeType: "mixed"
    }
  ],

  share: {
    text: "5년 후의 나에게 엽서를 보냈어!",
    url: "https://maum-workshop.github.io/workshop/postcard-5yr.html"
  }
};
