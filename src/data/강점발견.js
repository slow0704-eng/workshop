/* ================================================
   마음 워크숍 — 데이터 시트
   나의 강점 발견 (category: esteem)
   ================================================ */

window.WORKSHOP = {
  id: "strength",
  title: "나의 강점 발견",
  category: "esteem",
  duration: "5분",
  type: "full",

  steps: [
    // ── 1. 도입 ──
    {
      type: "intro",
      id: "intro",
      icon: "fitness_center",
      iconFilled: true,
      expression: "◡",
      speech: "우리는 부족한 점은 잘 알면서 강점은 잘 몰라.\n오늘은 숨겨진 강점을 같이 찾아보자!\n\n해당하는 거 다 골라봐. 많이 골라도 괜찮아.",
      permission: "5분이면 돼 · 답은 저장되지 않아요",
      nextId: "explore",
      nextLabel: "같이 해보자! →"
    },

    // ── 2. 탐색 ──
    {
      type: "explore",
      id: "explore",
      expression: "◠",
      speech: "강점에는 여러 영역이 있어. 천천히 살펴봐.",
      cards: [
        { icon: "lightbulb", title: "지혜", body: "배우고 생각하는 힘. 호기심, 창의력, 판단력, 학습 의욕." },
        { icon: "shield", title: "용기", body: "어려운 상황에서 행동하는 힘. 용감함, 끈기, 정직, 열정." },
        { icon: "favorite", title: "사랑", body: "사람과 연결되는 힘. 친절, 공감, 관대함, 배려." },
        { icon: "balance", title: "정의", body: "공동체에 기여하는 힘. 공정함, 리더십, 팀워크." },
        { icon: "self_improvement", title: "절제", body: "균형을 유지하는 힘. 자기 조절, 신중함, 겸손." },
        { icon: "auto_awesome", title: "초월", body: "의미를 발견하는 힘. 감사, 유머, 희망, 영성." }
      ],
      nextId: "exp-wisdom"
    },

    // ── 3. 체험: 지혜 ──
    {
      type: "experience",
      id: "exp-wisdom",
      expression: "◡",
      speech: "나에게 해당하는 거 다 골라봐!",
      questions: [{
        id: "wisdom",
        type: "checkbox",
        title: "지혜 — 배우고 생각하는 힘",
        titleIcon: "lightbulb",
        options: [
          { id: "s1", text: "새로운 것을 배우는 걸 좋아한다" },
          { id: "s2", text: "다양한 관점으로 생각하려 한다" },
          { id: "s3", text: "호기심이 많은 편이다" }
        ]
      }],
      nextId: "exp-courage"
    },

    // ── 4. 체험: 용기 ──
    {
      type: "experience",
      id: "exp-courage",
      expression: "◠",
      speech: "잘하고 있어. 계속 골라봐!",
      questions: [{
        id: "courage",
        type: "checkbox",
        title: "용기 — 어려운 상황에서 행동하는 힘",
        titleIcon: "shield",
        options: [
          { id: "s4", text: "어려운 일도 도전하는 편이다" },
          { id: "s5", text: "한 번 시작하면 끝까지 하려 한다" },
          { id: "s6", text: "솔직하게 표현하는 편이다" }
        ]
      }],
      nextId: "exp-love"
    },

    // ── 5. 체험: 사랑 ──
    {
      type: "experience",
      id: "exp-love",
      expression: "◡",
      speech: "마지막이야. 편하게 골라봐.",
      questions: [{
        id: "love",
        type: "checkbox",
        title: "사랑 — 사람과 연결되는 힘",
        titleIcon: "favorite",
        options: [
          { id: "s7", text: "다른 사람을 잘 챙기는 편이다" },
          { id: "s8", text: "상대방 감정을 잘 알아차린다" },
          { id: "s9", text: "사람들과 함께 있으면 에너지가 난다" }
        ]
      }],
      nextId: null
    },

    // ── 6. 결과 ──
    { type: "result", id: "result" }
  ],

  results: {
    type: "checkbox-dynamic",
    cardTitle: "나의 숨겨진 강점",
    zeroMessage: "아직 잘 모르겠어도 괜찮아.<br>강점은 천천히<br>발견할 수 있어.",
    zeroSpeech: "지금 모르겠어도 괜찮아. 살다 보면 자연스럽게 발견하게 될 거야.",
    foundMessage: "{count}개의 강점을 발견했어요!",
    foundSpeech: "방금 체크한 것들, 전부 네 강점이야.<br>혹시 몰랐다면, 이제 기억해둬."
  },

  guide: {
    speech: "이건 그냥 제안이야. 하고 싶은 것만 해봐.",
    items: [
      "오늘 체크한 강점 중 하나를 메모에 적어두기",
      "이 강점을 쓴 최근 경험 하나 떠올려보기",
      "가까운 사람에게 '내 강점이 뭐 같아?' 물어보기"
    ]
  },

  next: [
    {
      url: "../workshop/5년후엽서.html",
      title: "5년 후 나에게 보내는 엽서",
      icon: "mail", iconColor: "#FF7043",
      meta: "진로·목표 · 5분", badge: "골라쓰기", badgeType: "pick"
    },
    {
      url: "../workshop/감정날씨.html",
      title: "오늘의 감정 날씨 체크",
      icon: "wb_sunny", iconColor: "#4A90D9",
      meta: "감정 관리 · 5분", badge: "혼합형", badgeType: "mixed"
    }
  ],

  share: {
    text: "나의 숨겨진 강점을 발견했어!",
    url: "https://maum-workshop.github.io/workshop/강점발견.html"
  }
};
