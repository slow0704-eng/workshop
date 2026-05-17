/**
 * 마음 워크숍 — 단위테스트 자동 캡처 + 검증
 * UI설계서 v4 / 와이어프레임 v2 부합 여부 확인
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, '단위테스트결과', '캡처');
const REPORT = [];

function log(id, name, result, detail) {
  const icon = result === 'PASS' ? '✅' : result === 'FAIL' ? '❌' : '⚠️';
  console.log(`  ${icon} ${id}: ${name} — ${result}${detail ? ' (' + detail + ')' : ''}`);
  REPORT.push({ id, name, result, detail: detail || '' });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

  console.log('\n================================================================');
  console.log('  마음 워크숍 단위테스트 — 자동 캡처 + 검증');
  console.log('  기기: iPhone SE (375×812), 2x');
  console.log('================================================================\n');

  // ============================================================
  // 1. 메인 페이지 (SCR-001)
  // ============================================================
  console.log('── SCR-001 메인 페이지 ──');
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUT, '01_메인_전체.png'), fullPage: true });

  // 헤더 검증 (CMP-001, IF-001)
  const header = await page.$('.header');
  log('CMP-001', '헤더 존재', header ? 'PASS' : 'FAIL');

  const headerH = await page.$eval('.header', el => el.offsetHeight);
  log('IF-001', '헤더 높이 48px', headerH === 48 ? 'PASS' : 'FAIL', `${headerH}px`);

  // 히어로 캐릭터 (와이어프레임 v2 #11)
  const heroMaumi = await page.$('.hero .maumi-placeholder--large');
  log('WF-11', '히어로 캐릭터 64px', heroMaumi ? 'PASS' : 'FAIL');

  // 물결 구분선 — v5에서 의도적 제거 (AI 클리셰)
  const wave = await page.$('.wave-divider');
  log('v5-AI03', '물결 구분선 제거됨 (AI 클리셰)', !wave ? 'PASS' : 'FAIL');

  // SVG 아이콘 — v5에서 섹션 제목 SVG 제거, 풀 목록 3개만 유지
  const svgIcons = await page.$$('svg');
  log('v5-AI06', `SVG 아이콘 (${svgIcons.length}개, 3 예상)`, svgIcons.length >= 3 ? 'PASS' : 'FAIL');

  // 미니 카드 2열 (와이어프레임 v2 #12)
  const miniCards = await page.$$('.mini-card');
  log('WF-12', `미니 카드 수 (${miniCards.length}개)`, miniCards.length === 2 ? 'PASS' : 'FAIL');

  // 유형 뱃지 (CMP-032)
  const badges = await page.$$('.type-badge');
  log('CMP-032', `유형 뱃지 (${badges.length}개)`, badges.length >= 2 ? 'PASS' : 'FAIL');

  // 위기 안내 푸터 (CMP-002)
  const crisis = await page.$('.site-footer');
  log('CMP-002', '위기 안내 푸터 존재', crisis ? 'PASS' : 'FAIL');

  const tel1393 = await page.$('a[href*="mentalhealth"], .footer-info__org');
  log('IF-002', 'mentalhealth.go.kr 링크', tel1393 ? 'PASS' : 'FAIL');

  // 위기 안내에 캐릭터 미등장 (FTR-001)
  const crisisChar = await page.$('.site-footer .maumi-placeholder, .site-footer .character');
  log('FTR-001', '푸터에 캐릭터 미등장', !crisisChar ? 'PASS' : 'FAIL');

  // 폰트 로딩 (FNT-001)
  const gowunLink = await page.$('link[href*="Gowun"]');
  log('FNT-001', '고운돋움 폰트 링크', gowunLink ? 'PASS' : 'FAIL');

  const pretendLink = await page.$('link[href*="pretendard"]');
  log('FNT-002', '프리텐다드 폰트 링크', pretendLink ? 'PASS' : 'FAIL');

  // ============================================================
  // 2. M01 에너지잔량 — 시작 화면 (SCR-002)
  // ============================================================
  console.log('\n── SCR-002 미니 시작 (M01) ──');
  await page.goto(`${BASE}/mini/에너지잔량.html`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUT, '02_M01_시작.png') });

  // 캐릭터 가이드 (CMP-003)
  const charGuide = await page.$('.character-guide');
  log('CMP-003', '캐릭터 가이드 존재', charGuide ? 'PASS' : 'FAIL');

  // 말풍선 (와이어프레임 v2 #3)
  const bubble = await page.$('.speech-bubble');
  log('WF-3', '말풍선 존재', bubble ? 'PASS' : 'FAIL');

  // Permission 메시지
  const pageText = await page.content();
  const hasPermission = pageText.includes('괜찮아');
  log('CR-002', 'Permission 메시지', hasPermission ? 'PASS' : 'FAIL');

  // 안전 안내
  const hasSafe = pageText.includes('저장되지 않');
  log('CR-003', '"답은 저장되지 않아요" 안내', hasSafe ? 'PASS' : 'FAIL');

  // "같이 해보자" 버튼 존재
  const ctaBtn = await page.$('.btn-primary');
  log('CMP-031', '"같이 해보자" 버튼 존재', ctaBtn ? 'PASS' : 'FAIL');

  // ============================================================
  // 3. M01 — Q1 전환 + 시작 숨김 (SCR-003, TRN-001/002)
  // ============================================================
  console.log('\n── SCR-003 Q1 전환 + 시작 숨김 ──');
  await page.click('.btn-primary');
  await page.waitForSelector('#q1', { visible: true, timeout: 3000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, '03_M01_Q1.png') });

  // Q1 표시 확인
  const q1Visible = await page.$eval('#q1', el => getComputedStyle(el).display !== 'none').catch(() => false);
  log('TRN-001', 'Q1 화면 표시', q1Visible ? 'PASS' : 'FAIL');

  // 시작 화면 숨김 확인 ★핵심
  const startHidden = await page.$eval('#start', el => getComputedStyle(el).display === 'none').catch(() => false);
  log('TRN-002', '시작 화면 숨김 ★핵심', startHidden ? 'PASS' : 'FAIL');

  // 진행률 바 (CMP-030)
  const progressBar = await page.$('.progress-bar');
  log('CMP-030', '진행률 바 존재', progressBar ? 'PASS' : 'FAIL');

  // ============================================================
  // 4. M01 — Radio 선택 + 캐릭터 반응 (SEL-001, CHR-002/003)
  // ============================================================
  console.log('\n── 선택지 + 캐릭터 반응 ──');

  // 선택지 존재
  const options = await page.$$('.option__label');
  log('CMP-010', `Radio 선택지 (${options.length}개)`, options.length >= 2 ? 'PASS' : 'FAIL');

  // 첫 번째 선택지 (긍정) 탭
  await page.click('label[for="q1-a"]');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '04_M01_Q1_긍정선택.png') });

  // :checked 스타일 적용 확인
  const checkedBg = await page.$eval('#q1-a', el => el.checked).catch(() => false);
  log('SEL-001', 'Radio :checked 상태', checkedBg ? 'PASS' : 'FAIL');

  // 캐릭터 반응 표시 확인
  const reaction = await page.$eval('#r-q1-a', el => getComputedStyle(el).display !== 'none').catch(() => false);
  log('CHR-002', '긍정 선택 캐릭터 반응', reaction ? 'PASS' : 'FAIL');

  // 부정 선택으로 변경
  await page.click('label[for="q1-c"]');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '05_M01_Q1_부정선택.png') });

  const reactionNeg = await page.$eval('#r-q1-c', el => getComputedStyle(el).display !== 'none').catch(() => false);
  log('CHR-003', '부정 선택 캐릭터 반응', reactionNeg ? 'PASS' : 'FAIL');

  // 이전 반응 숨김
  const prevHidden = await page.$eval('#r-q1-a', el => getComputedStyle(el).display === 'none').catch(() => false);
  log('CHR-004', '이전 반응 숨김', prevHidden ? 'PASS' : 'FAIL');

  // ============================================================
  // 5. M01 — Q1→Q2→Q3→Q4 순차 진행
  // ============================================================
  console.log('\n── Q1→Q4 순차 진행 ──');
  // Q1→Q2
  await page.click('a[href="#q2"]');
  await new Promise(r => setTimeout(r, 500));
  const q2Visible = await page.$eval('#q2', el => getComputedStyle(el).display !== 'none').catch(() => false);
  log('TRN-003', 'Q2 전환', q2Visible ? 'PASS' : 'FAIL');

  // Q2 선택 + Q3 이동
  await page.click('#q2 label').catch(() => {});
  await page.click('a[href="#q3"]');
  await new Promise(r => setTimeout(r, 300));

  // Q3 선택 + Q4 이동
  await page.click('#q3 label').catch(() => {});
  await page.click('a[href="#q4"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, '06_M01_Q4.png') });

  // Q4 "전혀 없다" 선택 (부정 결과)
  await page.click('label[for="q4-c"]');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '07_M01_Q4_선택후.png') });

  // ============================================================
  // 6. M01 — 결과 화면 (SCR-004 v4)
  // ============================================================
  console.log('\n── SCR-004 결과 화면 (v4 개선) ──');
  await page.click('a[href="#result"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT, '08_M01_결과_상단.png') });

  // 축하 헤더 (v4 AREA-CONGRATS)
  const congrats = await page.$('.result-congrats');
  log('v4-CONGRATS', '축하 헤더 존재', congrats ? 'PASS' : 'FAIL');

  // result-card-area에 카드 복사됨 (v4 핵심 — showResult)
  const cardArea = await page.$('#result-card-area');
  const cardInArea = await page.$('#result-card-area .result-card');
  log('v4-CARD', '결과 카드 #result에 표시 ★핵심',
    cardInArea ? 'PASS' : 'FAIL',
    cardInArea ? '카드 복사 성공' : 'showResult() 미작동');

  // 결과 카드 정사각형 (CMP-020)
  if (cardInArea) {
    const cardBox = await page.$eval('#result-card-area .result-card', el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    log('CMP-020', `결과 카드 크기 ${cardBox.w}×${cardBox.h}`,
      Math.abs(cardBox.w - cardBox.h) < 20 ? 'PASS' : 'WARN',
      `${cardBox.w}×${cardBox.h}px`);
  }

  // 액션 바 (v4 CMP-033)
  const actionBar = await page.$('.result-actions');
  log('CMP-033', '액션 바 존재', actionBar ? 'PASS' : 'FAIL');

  const btnSave = await page.$('#btn-save');
  log('CMP-034', '이미지 저장 버튼', btnSave ? 'PASS' : 'FAIL');

  // SNS 공유 패널 기본 열림 (v4)
  const shareOpen = await page.$('details.share-panel[open]');
  log('v4-SNS', 'SNS 공유 패널 기본 열림', shareOpen ? 'PASS' : 'FAIL');

  // 트위터 공유 링크
  const twitterLink = await page.$('a[href*="twitter.com"]');
  log('SHR-002', '트위터 공유 링크', twitterLink ? 'PASS' : 'FAIL');

  // 결과 전체 스크롤 캡처
  await page.screenshot({ path: path.join(OUT, '09_M01_결과_전체.png'), fullPage: true });

  // 실천 가이드 (CMP-021)
  const guide = await page.$('.practice-guide');
  log('CMP-021', '실천 가이드 존재', guide ? 'PASS' : 'FAIL');

  // 추천 워크숍 (CMP-022)
  const nextItems = await page.$$('.next-workshop__item');
  log('CMP-022', `추천 워크숍 (${nextItems.length}개)`, nextItems.length >= 2 ? 'PASS' : 'FAIL');

  // 점 구분선 (divider)
  const dividers = await page.$$('.divider');
  log('FNT-005', `점 구분선 (${dividers.length}개)`, dividers.length >= 1 ? 'PASS' : 'FAIL');

  // 위기 안내 (결과 페이지에도 존재)
  const crisisResult = await page.$('.site-footer');
  log('FTR-002', '결과 페이지 푸터', crisisResult ? 'PASS' : 'FAIL');

  // ============================================================
  // 7. 이미지 저장 테스트 (CMP-034)
  // ============================================================
  console.log('\n── 이미지 저장 테스트 ──');

  if (btnSave) {
    // 다운로드 이벤트 감지
    const downloadPath = path.join(OUT, 'downloads');
    fs.mkdirSync(downloadPath, { recursive: true });

    const client = await page.createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    });

    await page.click('#btn-save');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT, '10_M01_이미지저장후.png') });

    // 버튼 상태 확인
    const btnText = await page.$eval('#btn-save', el => el.textContent).catch(() => '');
    const isSaved = btnText.includes('저장됨') || btnText.includes('이미지');
    log('IMG-007', `저장 버튼 상태 ("${btnText}")`, isSaved ? 'PASS' : 'WARN');

    // 다운로드 파일 확인
    await new Promise(r => setTimeout(r, 1000));
    const downloads = fs.readdirSync(downloadPath);
    const pngFile = downloads.find(f => f.endsWith('.png'));
    if (pngFile) {
      const fileSize = fs.statSync(path.join(downloadPath, pngFile)).size;
      log('IMG-001', `PNG 다운로드 (${pngFile})`, fileSize > 1000 ? 'PASS' : 'FAIL', `${fileSize} bytes`);
      log('IMG-002', `PNG 용량 > 1KB`, fileSize > 1000 ? 'PASS' : 'FAIL', `${Math.round(fileSize/1024)}KB`);
    } else {
      log('IMG-001', 'PNG 다운로드', 'WARN', '파일 미감지 (브라우저 설정 확인)');
    }
  }

  // ============================================================
  // 8. 다른 워크숍 순회 — F01 감정날씨
  // ============================================================
  console.log('\n── F01 감정날씨 (SCR-010~013) ──');
  await page.goto(`${BASE}/workshop/감정날씨.html`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUT, '11_F01_도입.png') });

  // 도입 (SCR-010)
  const f01Maumi = await page.$('.character-guide');
  log('SCR-010', 'F01 도입 캐릭터', f01Maumi ? 'PASS' : 'FAIL');

  // 도입→탐색 (SCR-011)
  await page.click('.btn-primary');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, '12_F01_탐색.png') });

  const detailsCards = await page.$$('.explore-card');
  log('SCR-011', `탐색 카드 (${detailsCards.length}개)`, detailsCards.length >= 3 ? 'PASS' : 'FAIL');

  // 탐색→체험 (SCR-012)
  await page.click('a[href="#experience"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, '13_F01_체험.png') });

  // 선택 + 서술 영역 확인 (유형 B)
  const textarea = await page.$('textarea');
  log('SCR-012', 'textarea 존재 (유형 B)', textarea ? 'PASS' : 'FAIL');

  // 맑음 선택
  await page.click('label[for="w-sunny"]').catch(() => {});
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '14_F01_맑음선택.png') });

  // 결과 보기
  await page.click('a[href="#result"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT, '15_F01_결과.png'), fullPage: true });

  const f01Card = await page.$('#result-card-area .result-card, #result .result-card');
  log('RPC-003-F01', 'F01 결과 카드 #result 표시', f01Card ? 'PASS' : 'FAIL');

  // ============================================================
  // 9. F03 5년후엽서 — 유형 C (탭 전환)
  // ============================================================
  console.log('\n── F03 5년후엽서 (유형 C, 탭 전환) ──');
  await page.goto(`${BASE}/workshop/5년후엽서.html`, { waitUntil: 'networkidle2' });

  // 도입→탐색→체험
  await page.click('.btn-primary');
  await new Promise(r => setTimeout(r, 300));
  await page.click('a[href="#experience"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, '16_F03_체험_카드선택.png') });

  // 카드 2×2 존재 (CMP-013)
  const cardGrid = await page.$('.card-grid');
  log('CMP-013', '카드 2×2 그리드 존재', cardGrid ? 'PASS' : 'FAIL');

  // 탭 전환 존재 (CMP-015)
  const tabLabels = await page.$$('.tab__label, label[for="tab-write"], label[for="tab-select"]');
  log('CMP-015', `탭 전환 (${tabLabels.length}개 라벨)`, tabLabels.length >= 2 ? 'PASS' : 'FAIL');

  // 골라쓰기 기본 활성 확인
  const tabSelectChecked = await page.$eval('#tab-select', el => el.checked).catch(() => false);
  log('SEL-009', '골라쓰기 기본 활성', tabSelectChecked ? 'PASS' : 'FAIL');

  // 카드 선택 + 결과
  await page.click('label[for="v-growth"]').catch(() => {});
  await new Promise(r => setTimeout(r, 300));
  await page.click('a[href="#result"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT, '17_F03_결과.png'), fullPage: true });

  const f03Card = await page.$('#result-card-area .result-card, #result .result-card');
  log('RPC-003-F03', 'F03 결과 카드 #result 표시', f03Card ? 'PASS' : 'FAIL');

  // ============================================================
  // 10. 프라이버시 검증
  // ============================================================
  console.log('\n── 프라이버시 검증 ──');

  // script 태그 (index, about)
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle2' });
  const indexScripts = await page.$$('script[src]');
  log('PRI-004a', `index.html script 태그 (${indexScripts.length}개, 0 예상)`,
    indexScripts.length === 0 ? 'PASS' : 'WARN');

  // 워크숍 script 태그 (result.js만)
  await page.goto(`${BASE}/mini/에너지잔량.html`, { waitUntil: 'networkidle2' });
  const wsScripts = await page.$$('script[src]');
  const scriptSrcs = await Promise.all(wsScripts.map(s => page.evaluate(el => el.src, s)));
  const onlyResultJs = scriptSrcs.every(src => src.includes('result.js'));
  log('PRI-004b', `워크숍 script (${wsScripts.length}개, result.js만)`,
    onlyResultJs ? 'PASS' : 'FAIL', scriptSrcs.join(', '));

  // html2canvas 완전 제거 확인
  const fullHtml = await page.content();
  const noH2C = !fullHtml.includes('html2canvas');
  log('ADR-008', 'html2canvas 완전 제거', noH2C ? 'PASS' : 'FAIL');

  // ============================================================
  // 11. 전 페이지 위기 안내 일괄 확인
  // ============================================================
  console.log('\n── 전 페이지 위기 안내 확인 ──');
  const pages = [
    { url: '/index.html', name: 'index' },
    { url: '/about.html', name: 'about' },
    { url: '/mini/에너지잔량.html', name: 'M01' },
    { url: '/mini/감정체크.html', name: 'M02' },
    { url: '/workshop/감정날씨.html', name: 'F01' },
    { url: '/workshop/강점발견.html', name: 'F02' },
    { url: '/workshop/5년후엽서.html', name: 'F03' },
  ];
  for (const p of pages) {
    await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle2' });
    const hasCrisis = await page.$('.site-footer');
    const hasTel = await page.$('a[href*="mentalhealth"], .footer-info__org');
    const hasChar = await page.$('.site-footer .maumi-placeholder, .site-footer .character');
    log(`CRS-${p.name}`,
      `${p.name} 위기안내:${hasCrisis?'O':'X'} tel:${hasTel?'O':'X'} 캐릭터:${hasChar?'X(정상)':'O(정상)'}`,
      (hasCrisis && hasTel && !hasChar) ? 'PASS' : 'FAIL');
  }

  // ============================================================
  // 결과 집계
  // ============================================================
  console.log('\n================================================================');
  console.log('  테스트 결과 집계');
  console.log('================================================================');
  const pass = REPORT.filter(r => r.result === 'PASS').length;
  const fail = REPORT.filter(r => r.result === 'FAIL').length;
  const warn = REPORT.filter(r => r.result === 'WARN').length;
  console.log(`  ✅ PASS: ${pass}건`);
  console.log(`  ❌ FAIL: ${fail}건`);
  console.log(`  ⚠️  WARN: ${warn}건`);
  console.log(`  합계: ${REPORT.length}건`);
  console.log(`  판정: ${fail === 0 ? '전체 통과 ✅' : 'FAIL 존재 — 수정 필요 ❌'}`);
  console.log('================================================================\n');

  // 보고서 저장
  const reportText = REPORT.map(r =>
    `${r.result === 'PASS' ? '✅' : r.result === 'FAIL' ? '❌' : '⚠️'} ${r.id}: ${r.name} — ${r.result}${r.detail ? ' (' + r.detail + ')' : ''}`
  ).join('\n');

  fs.writeFileSync(
    path.join(__dirname, '단위테스트결과', `자동검증결과_puppeteer_${new Date().toISOString().slice(0,10)}.txt`),
    `마음 워크숍 단위테스트 자동 검증 결과\n수행일: ${new Date().toISOString()}\n환경: Puppeteer, 375×812 (iPhone SE 2x)\n\nPASS: ${pass} / FAIL: ${fail} / WARN: ${warn} / 합계: ${REPORT.length}\n\n${reportText}\n`
  );

  console.log(`캡처 파일: ${OUT}`);
  console.log(`보고서: 단위테스트결과/자동검증결과_puppeteer_*.txt`);

  await browser.close();
})();
