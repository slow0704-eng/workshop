/* ================================================
   마음 워크숍 — 데이터 시트
   5년 후 나에게 보내는 엽서 (category: career)
   ================================================ */

window.WORKSHOP = {
  id: "postcard-5yr",
  title: "5년 후 나에게 보내는 엽서",
  category: "career",
  duration: "5분",
  type: "full",

  steps: [
    // ── 1. 도입 ──
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

    // ── 2. 탐색 ──
    {
      type: "explore",
      id: "explore",
      expression: "◠",
      speech: "미래를 상상할 때 도움이 되는 질문들이야. 편하게 읽어봐.",
      cards: [
        { icon: "home",    title: "어디에서 살고 있을까?", body: "도시? 시골? 외국? 지금과 같은 곳? 공간을 상상해봐." },
        { icon: "work",    title: "어떤 일을 하고 있을까?", body: "지금과 같은 일? 완전히 다른 일? 어떤 일이든 괜찮아." },
        { icon: "group",   title: "누구와 함께할까?",     body: "가족? 친구? 새로운 사람? 혼자? 모두 좋은 선택이야." },
        { icon: "diamond", title: "가장 중요한 건 뭘까?",  body: "돈? 관계? 건강? 자유? 지금은 몰라도 괜찮아." }
      ],
      nextId: "experience"
    },

    // ── 3. 체험 (서술대안형) ──
    {
      type: "experience",
      id: "experience",
      expression: "◡",
      speech: "5년 후에 가장 중요하게 여기고 싶은 걸 골라봐.",
      questions: [
        // Q1: 카드 선택 (가치관)
        {
          id: "value",
          type: "card-grid",
          title: "5년 후 가장 중요한 가치는?",
          iconColor: "#FF7043",
          options: [
            { id: "v-growth", icon: "wb_sunny",  title: "성장", sub: "·도전" },
            { id: "v-stable", icon: "home",      title: "안정", sub: "·편안함" },
            { id: "v-love",   icon: "favorite",  title: "관계", sub: "·사랑" },
            { id: "v-free",   icon: "spa",       title: "자유", sub: "·여유" },
            { id: "v-idk",    icon: "help",      title: "잘",   sub: "모르겠어" }
          ],
          reactions: {
            "v-growth": { id: "rv-growth", expression: "◕", speech: "성장을 중요하게 생각하는 사람이구나!" },
            "v-stable": { id: "rv-stable", expression: "◡", speech: "안정과 편안함, 좋은 선택이야." },
            "v-love":   { id: "rv-love",   expression: "◕", speech: "사람과의 연결을 소중히 여기는구나." },
            "v-free":   { id: "rv-free",   expression: "◡", speech: "자유로운 삶, 멋진 가치야." },
            "v-idk":    { id: "rv-idk",    expression: "◡", speech: "아직 모르겠어도 괜찮아. 천천히." }
          },
          resultMap: {
            "v-growth": "res-growth",
            "v-stable": "res-stable",
            "v-love":   "res-love",
            "v-free":   "res-free",
            "v-idk":    "res-idk"
          }
        }
      ],

      // Q2: 서술대안형 (직접 쓰기 / 골라 쓰기)
      tab: {
        guide: { expression: "◡", text: "5년 후 나에게 하고 싶은 말이 있어?" },
        defaultTab: "select",

        writeTab: {
          guide: { expression: "◠", text: "자유롭게 적어봐. 한 글자도 괜찮아.\n여기 적은 건 아무도 안 봐." },
          placeholder: "5년 후의 나에게...",
          rows: 4,
          note: "답은 저장되지 않아요."
        },

        selectTab: {
          guide: { expression: "◡", text: "마음에 드는 걸 골라봐." },
          name: "pick",
          options: [
            { id: "pick-a", text: "\u201c지금 고생하고 있지만, 다 잘 될 거야.\u201d" },
            { id: "pick-b", text: "\u201c뭘 하든 너답게 살고 있길.\u201d" },
            { id: "pick-c", text: "\u201c지금 고민한 시간이 다 의미 있었어.\u201d" },
            { id: "pick-d", text: "\u201c가장 중요한 건 네가 건강한 거야.\u201d" },
            { id: "pick-e", text: "\u201c어떤 선택을 했든, 그게 정답이야.\u201d" }
          ],
          reaction: { id: "rp", expression: "◕", text: "좋은 말이다. 5년 후의 너도 분명 고마워할 거야." },
          extraCaption: "추가로 적고 싶은 게 있으면 아래에 적어봐도 좋아. (선택)",
          extraTextarea: { placeholder: "더 하고 싶은 말... (선택)", rows: 2 }
        }
      },

      nextId: null,
      nextLabel: "결과 보기 →"
    },

    // ── 4. 결과 ──
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
          { expression: "◕", text: "미래의 너한테 엽서를 보냈어. 지금 고민하는 것도 전부 의미 있어." }
        ]
      },

      "res-stable": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="36" height="24" rx="3" fill="#FFCCBC" stroke="#FF8A65" stroke-width="1.5"/><path d="M6 15l18 12 18-12" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "편안한 일상을 꿈꾸는 너,<br>지금 불안해도<br>다 괜찮아질 거야.",
        speeches: [
          { expression: "◡", text: "안정을 원하는 마음, 당연한 거야. 조급해하지 않아도 돼." }
        ]
      },

      "res-love": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="36" height="24" rx="3" fill="#FFCCBC" stroke="#FF8A65" stroke-width="1.5"/><path d="M6 15l18 12 18-12" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        emojiType: "svg",
        expression: "◕",
        message: "소중한 사람들과 함께하는 너,<br>지금의 관계도<br>충분히 소중해.",
        speeches: [
          { expression: "◕", text: "사람을 소중히 여기는 마음, 정말 좋은 강점이야." }
        ]
      },

      "res-free": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="36" height="24" rx="3" fill="#FFCCBC" stroke="#FF8A65" stroke-width="1.5"/><path d="M6 15l18 12 18-12" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "자유롭게 살고 싶은 너,<br>지금의 선택 하나하나가<br>그 자유를 만들고 있어.",
        speeches: [
          { expression: "◡", text: "어떤 선택을 하든, 그게 너의 정답이야." }
        ]
      },

      "res-idk": {
        emoji: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" fill="#F3E5F5" stroke="#CE93D8" stroke-width="2"/><text x="24" y="31" text-anchor="middle" font-size="22" font-weight="600" fill="#9C27B0">?</text></svg>',
        emojiType: "svg",
        expression: "◡",
        message: "아직 모르겠어도 괜찮아.<br>지금 이 순간 고민하는 것<br>자체가 의미 있어.",
        speeches: [
          { expression: "◡", text: "아직 모르겠는 것도 자연스러운 거야. 천천히 찾아가면 돼." }
        ]
      }
    }
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "오늘 결과를 캡처해서 나중에 다시 보기",
      "어린 시절 꿈꿨던 것 하나 떠올려보기",
      "\u201c지금 이대로도 괜찮다\u201d 한 번 말해보기"
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
      url: "../workshop/감정날씨.html",
      title: "오늘의 감정 날씨 체크",
      icon: "wb_sunny", iconColor: "#4A90D9",
      meta: "감정 관리 · 5분", badge: "혼합형", badgeType: "mixed"
    }
  ],

  share: {
    text: "5년 후의 나에게 엽서를 보냈어!",
    url: "https://maum-workshop.github.io/workshop/5년후엽서.html"
  }
};
