/* ================================================
   마음 워크숍 — layout.js
   사이트 공통 헤더·푸터 자동 삽입
   ================================================
   사용법:
     HTML 파일에 빈 자리만 두고 이 스크립트를 가장 먼저 로드
       <header id="site-header"></header>
       <main>...</main>
       <footer id="site-footer"></footer>
       <script src="../js/layout.js"></script>

     경로(./ 또는 ../)는 URL을 보고 자동 판단.
     mini/ · workshop/ 하위 페이지 → ../
     그 외(루트) → ./
   ================================================ */

(function () {
  'use strict';

  function detectRoot() {
    var path = window.location.pathname;
    return /\/(mini|workshop)\//.test(path) ? '../' : './';
  }

  function renderSiteHeader(root) {
    var header = document.getElementById('site-header');
    if (!header) return;
    header.className = 'header';
    header.innerHTML =
      '<a href="' + root + 'index.html" class="header__logo">' +
        '<span class="maumi-placeholder" style="width:20px;height:20px;font-size:10px;">◡</span>' +
        '<span>마음 워크숍</span>' +
      '</a>' +
      '<a href="' + root + 'index.html" class="header__home">홈</a>';
  }

  function renderSiteFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="footer-info">' +
        '<p class="footer-info__org">모닝페이지 동아리</p>' +
        '<p class="footer-info__contact">장형우 · <a href="mailto:slow0704@gmail.com">slow0704@gmail.com</a></p>' +
      '</div>' +
      '<div class="footer-support">' +
        '<p class="footer-support__text">마음이 힘들 때는 전문가와 이야기해보세요</p>' +
        '<a href="https://www.mentalhealth.go.kr" target="_blank" rel="noopener" class="footer-support__link">정신건강복지센터 무료 상담 →</a>' +
        '<span class="footer-support__tel">위기상담 <a href="tel:1577-0199">1577-0199</a></span>' +
      '</div>' +
      '<p class="footer-disclaimer">본 서비스는 전문 의료 서비스가 아닙니다.</p>';
  }

  function init() {
    var root = detectRoot();
    renderSiteHeader(root);
    renderSiteFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
