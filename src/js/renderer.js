/* ================================================
   마음 워크숍 — renderer.js
   데이터 시트(window.WORKSHOP) → DOM 자동 생성
   ================================================ */

(function () {
  'use strict';

  /* ── 유틸리티 ── */

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') el.className = attrs[k];
        else if (k === 'htmlContent') el.innerHTML = attrs[k];
        else if (k === 'textContent') el.textContent = attrs[k];
        else if (k === 'style' && typeof attrs[k] === 'object') {
          Object.keys(attrs[k]).forEach(function (s) { el.style[s] = attrs[k][s]; });
        } else el.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (!c) return;
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else el.appendChild(c);
      });
    }
    return el;
  }

  function html(str) {
    var t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstChild;
  }

  /* ── 컴포넌트 렌더러 ── */

  function renderCharacterGuide(face, text, style) {
    var wrapper = h('div', { className: 'character-guide' });
    if (style) wrapper.setAttribute('style', style);
    wrapper.appendChild(h('span', { className: 'maumi-placeholder', textContent: face }));
    var bubble = h('div', { className: 'speech-bubble', htmlContent: text.replace(/\n/g, '<br>') });
    wrapper.appendChild(bubble);
    return wrapper;
  }

  function renderProgressBar(index, total) {
    var pct = Math.round((index + 1) / total * 100);
    var label = (index + 1) + '/' + total;
    var bar = h('div', { className: 'progress-bar' });
    bar.appendChild(h('div', { className: 'progress-bar__fill', style: { width: pct + '%' } }));
    bar.appendChild(h('span', { className: 'progress-bar__text', textContent: label }));
    return bar;
  }

  function renderBtn(href, text, isResult) {
    var a = h('a', { href: href, className: 'btn-primary', textContent: text });
    if (isResult) a.setAttribute('onclick', 'showResult()');
    return a;
  }

  function renderMaterialIcon(name, filled, style) {
    var cls = 'material-symbols-rounded' + (filled ? ' filled' : '');
    var span = h('span', { className: cls, 'aria-hidden': 'true', textContent: name });
    if (style) span.setAttribute('style', style);
    return span;
  }

  /* ── 선택지 렌더러 ── */

  function renderRadioOption(opt, name) {
    var frag = document.createDocumentFragment();
    var input = h('input', { type: 'radio', id: opt.id, name: name, className: 'option__input' });
    if (opt.value !== undefined) input.setAttribute('value', opt.value);
    frag.appendChild(input);

    var label = h('label', { 'for': opt.id, className: 'option__label' });
    label.appendChild(h('span', { className: 'option__indicator' }));

    var textSpan = h('span', { className: 'option__text' });
    if (opt.dots) {
      opt.dots.forEach(function (d) {
        textSpan.appendChild(h('span', { className: 'color-dot', style: { '--dot-color': d.color } }));
      });
      textSpan.appendChild(document.createTextNode(' ' + opt.text));
    } else if (opt.icon) {
      textSpan.appendChild(renderMaterialIcon(opt.icon, false, 'font-size:18px;'));
      textSpan.appendChild(document.createTextNode(' ' + opt.text));
    } else {
      textSpan.textContent = opt.text;
    }
    label.appendChild(textSpan);
    label.appendChild(h('span', { className: 'option__check', textContent: '✓' }));
    frag.appendChild(label);
    return frag;
  }

  function renderCheckboxOption(opt, name) {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('input', { type: 'checkbox', id: opt.id, name: name, className: 'option__input' }));
    var label = h('label', { 'for': opt.id, className: 'option__label' });
    label.appendChild(h('span', { className: 'option__checkbox', textContent: '✓' }));
    label.appendChild(h('span', { className: 'option__text', textContent: opt.text }));
    frag.appendChild(label);
    return frag;
  }

  function renderCardGridOption(opt, name, iconColor) {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('input', { type: 'radio', id: opt.id, name: name, className: 'card-grid__input' }));
    var label = h('label', { 'for': opt.id, className: 'card-grid__card' });
    label.appendChild(renderMaterialIcon(opt.icon, true, 'color:' + (iconColor || 'var(--color)') + ';font-size:32px;'));
    label.appendChild(h('span', { className: 'card-grid__title', textContent: opt.title }));
    if (opt.sub) label.appendChild(h('span', { className: 'card-grid__sub', textContent: opt.sub }));
    frag.appendChild(label);
    return frag;
  }

  function renderSlider(cfg) {
    var group = h('div', { className: 'slider-group' });
    group.appendChild(h('span', { className: 'slider-group__label', textContent: cfg.labelMin }));
    group.appendChild(h('input', {
      type: 'range', min: String(cfg.min), max: String(cfg.max),
      value: String(cfg.default), className: 'slider-group__input',
      'aria-label': cfg.ariaLabel || '강도'
    }));
    group.appendChild(h('span', { className: 'slider-group__label', textContent: cfg.labelMax }));
    return group;
  }

  /* ── 반응·결과 렌더러 ── */

  function renderReaction(id, face, text) {
    var div = h('div', { className: 'reaction', id: id });
    div.appendChild(renderCharacterGuide(face, text));
    return div;
  }

  function renderResultBlock(id, data, category) {
    var outer = h('div', { className: 'result', id: id });
    var padDiv = h('div', { style: { padding: '24px 24px 0' } });
    var cardClass = 'result-card card-' + category;
    var card = h('div', { className: cardClass });

    card.appendChild(h('span', { className: 'result-card__decoration', textContent: '— · —' }));
    card.appendChild(h('span', { className: 'result-card__title', textContent: data.title || '' }));

    var main = h('div', { className: 'result-card__main' });
    if (data.number) main.appendChild(h('span', { className: 'result-card__number', textContent: data.number }));
    if (data.emoji) {
      var emojiSpan = h('span', { className: 'result-card__emoji' });
      if (data.emojiType === 'svg' || (data.emoji.indexOf('<svg') > -1)) {
        emojiSpan.innerHTML = data.emoji;
        emojiSpan.setAttribute('style', 'font-size:48px;line-height:0;');
      } else if (data.emojiType === 'material') {
        emojiSpan.appendChild(renderMaterialIcon(data.emoji, true, 'font-size:48px;color:' + (data.emojiColor || 'var(--color)') + ';'));
      } else {
        emojiSpan.textContent = data.emoji;
        emojiSpan.setAttribute('style', 'font-size:48px;');
      }
      main.appendChild(emojiSpan);
    }
    card.appendChild(main);

    card.appendChild(h('span', { className: 'maumi-placeholder maumi-placeholder--small', textContent: data.expression || '◡' }));
    card.appendChild(h('p', { className: 'result-card__message', htmlContent: data.message || '' }));
    card.appendChild(h('span', { className: 'result-card__decoration', textContent: '— · —' }));
    card.appendChild(h('span', { className: 'result-card__watermark', textContent: data.watermark || 'maum-workshop.github.io' }));

    padDiv.appendChild(card);
    outer.appendChild(padDiv);

    // 카드 뒤 캐릭터 대사
    if (data.speeches) {
      data.speeches.forEach(function (s) {
        var g = renderCharacterGuide(s.face, s.text, 'margin-top:' + (s.marginTop || '20px') + ';');
        if (s.fontSize) g.querySelector('.speech-bubble').style.fontSize = s.fontSize;
        outer.appendChild(g);
      });
    }

    return outer;
  }

  /* ── 텍스트 영역 ── */

  function renderTextarea(cfg) {
    var frag = document.createDocumentFragment();
    if (cfg.guide) frag.appendChild(renderCharacterGuide(cfg.guide.face, cfg.guide.text));
    var group = h('div', { className: 'textarea-group' });
    group.appendChild(h('textarea', {
      className: 'textarea-group__input',
      rows: String(cfg.rows || 3),
      placeholder: cfg.placeholder || '',
      'aria-label': cfg.ariaLabel || '자유 서술'
    }));
    if (cfg.note) group.appendChild(h('p', { className: 'textarea-group__note', textContent: cfg.note }));
    frag.appendChild(group);
    return frag;
  }

  /* ── 탭 섹션 (5년후엽서 등) ── */

  function renderTabSection(cfg) {
    var wrapper = h('div', { style: { marginTop: '32px' } });
    if (cfg.guide) wrapper.appendChild(renderCharacterGuide(cfg.guide.face, cfg.guide.text));

    var tab = h('div', { className: 'tab' });
    var header = h('div', { className: 'tab__header' });

    // 탭 입력 + 라벨
    var writeInput = h('input', { type: 'radio', id: 'tab-write', name: 'tab', className: 'tab__input' });
    var writeLabel = h('label', { 'for': 'tab-write', className: 'tab__label' });
    writeLabel.appendChild(renderMaterialIcon('edit', false));
    writeLabel.appendChild(document.createTextNode(' 직접 쓰기'));

    var selectInput = h('input', { type: 'radio', id: 'tab-select', name: 'tab', className: 'tab__input', checked: '' });
    var selectLabel = h('label', { 'for': 'tab-select', className: 'tab__label' });
    selectLabel.appendChild(renderMaterialIcon('checklist', false));
    selectLabel.appendChild(document.createTextNode(' 골라 쓰기'));

    if (cfg.defaultTab === 'write') writeInput.setAttribute('checked', '');
    else selectInput.setAttribute('checked', '');

    header.appendChild(writeInput);
    header.appendChild(writeLabel);
    header.appendChild(selectInput);
    header.appendChild(selectLabel);
    tab.appendChild(header);

    // 직접 쓰기 패널
    var writePanel = h('div', { className: 'tab-write' });
    if (cfg.writeTab.guide) writePanel.appendChild(renderCharacterGuide(cfg.writeTab.guide.face, cfg.writeTab.guide.text));
    writePanel.appendChild(renderTextarea({
      placeholder: cfg.writeTab.placeholder,
      rows: cfg.writeTab.rows,
      note: cfg.writeTab.note,
      ariaLabel: cfg.writeTab.ariaLabel || '직접 쓰기'
    }));
    tab.appendChild(writePanel);

    // 골라 쓰기 패널
    var selectPanel = h('div', { className: 'tab-select' });
    if (cfg.selectTab.guide) selectPanel.appendChild(renderCharacterGuide(cfg.selectTab.guide.face, cfg.selectTab.guide.text));

    var optList = h('div', { className: 'option-list' });
    cfg.selectTab.options.forEach(function (opt) {
      optList.appendChild(renderRadioOption(opt, cfg.selectTab.name));
    });

    // 골라 쓰기 반응
    if (cfg.selectTab.reaction) {
      var r = cfg.selectTab.reaction;
      optList.appendChild(renderReaction(r.id, r.face, r.text));
      // :checked CSS 규칙
      var rules = cfg.selectTab.options.map(function (o) {
        return '#' + o.id + ':checked ~ #' + r.id + ' { display:block; }';
      });
      optList.appendChild(html('<style>' + rules.join('\n') + '</style>'));
    }
    selectPanel.appendChild(optList);

    // 추가 서술
    if (cfg.selectTab.extraCaption) {
      selectPanel.appendChild(h('p', {
        className: 'text-caption px',
        textContent: cfg.selectTab.extraCaption,
        style: { marginTop: '16px' }
      }));
    }
    if (cfg.selectTab.extraTextarea) {
      selectPanel.appendChild(renderTextarea(cfg.selectTab.extraTextarea));
    }

    tab.appendChild(selectPanel);
    wrapper.appendChild(tab);

    // JS 탭 전환 보강 (CSS ~ 형제 선택자가 구조상 작동 안 할 수 있으므로)
    setTimeout(function () {
      var wI = document.getElementById('tab-write');
      var sI = document.getElementById('tab-select');
      var wP = tab.querySelector('.tab-write');
      var sP = tab.querySelector('.tab-select');
      function updateTab() {
        if (wI && wI.checked) {
          wP.style.display = 'block';
          sP.style.display = 'none';
        } else {
          wP.style.display = 'none';
          sP.style.display = 'block';
        }
      }
      if (wI) wI.addEventListener('change', updateTab);
      if (sI) sI.addEventListener('change', updateTab);
      updateTab();
    }, 0);

    return wrapper;
  }

  /* ── 섹션 렌더러 ── */

  function renderIntroSection(step, ws, idx, total) {
    var sec = h('section', { className: 'ws-section', id: step.id });

    // 아이콘
    var iconDiv = h('div', { style: { paddingTop: '48px', textAlign: 'center' } });
    iconDiv.appendChild(renderMaterialIcon(step.icon, step.iconFilled !== false, 'color:var(--color);font-size:48px;display:block;text-align:center;'));
    sec.appendChild(iconDiv);

    // 캐릭터 대사
    sec.appendChild(renderCharacterGuide(step.expression || '◡', step.speech));

    // 안내 텍스트
    if (step.permission) {
      sec.appendChild(h('p', {
        className: 'text-tiny text-center',
        textContent: step.permission,
        style: { marginTop: '8px' }
      }));
    }

    sec.appendChild(renderProgressBar(idx, total));
    sec.appendChild(renderBtn('#' + step.nextId, step.nextLabel || '같이 해보자! →'));
    return sec;
  }

  function renderExploreSection(step, ws, idx, total) {
    var sec = h('section', { className: 'ws-section', id: step.id });
    sec.appendChild(renderProgressBar(idx, total));
    sec.appendChild(renderCharacterGuide(step.expression || '◠', step.speech));

    step.cards.forEach(function (c) {
      var det = h('details', { className: 'explore-card' });
      var sum = h('summary');
      if (c.icon) {
        sum.appendChild(renderMaterialIcon(c.icon, true, 'color:var(--color);'));
        sum.appendChild(document.createTextNode(' ' + c.title));
      } else {
        sum.textContent = c.title;
      }
      det.appendChild(sum);
      det.appendChild(h('div', { className: 'explore-card__body', textContent: c.body }));
      sec.appendChild(det);
    });

    sec.appendChild(renderBtn('#' + step.nextId, step.nextLabel || '다음 →'));
    return sec;
  }

  function renderExperienceSection(step, ws, idx, total) {
    var sec = h('section', { className: 'ws-section', id: step.id });
    sec.appendChild(renderProgressBar(idx, total));

    if (step.speech) {
      sec.appendChild(renderCharacterGuide(step.expression || '◡', step.speech));
    }

    var cssRules = [];

    (step.questions || []).forEach(function (q, qi) {
      // 질문 제목
      if (q.sub) sec.appendChild(h('p', { className: 'question-sub', textContent: q.sub }));

      if (q.title) {
        var titleP = h('p', { className: 'question-title' });
        if (qi > 0) titleP.style.marginTop = '24px';
        if (q.titleIcon) {
          titleP.appendChild(renderMaterialIcon(q.titleIcon, true, 'color:var(--color);'));
          titleP.appendChild(document.createTextNode(' ' + q.title));
        } else {
          titleP.textContent = q.title;
        }
        sec.appendChild(titleP);
      }

      // 질문 유형별 렌더링
      if (q.type === 'slider') {
        if (q.guide) sec.appendChild(renderCharacterGuide(q.guide.face, q.guide.text));
        sec.appendChild(renderSlider(q.slider));
        return;
      }

      var isCardGrid = q.type === 'card-grid';
      var container = h('div', { className: isCardGrid ? 'card-grid' : 'option-list' });
      if (isCardGrid && q.style) container.setAttribute('style', q.style);

      // 선택지
      (q.options || []).forEach(function (opt) {
        if (q.type === 'checkbox') {
          container.appendChild(renderCheckboxOption(opt, q.name || q.id));
        } else if (isCardGrid) {
          container.appendChild(renderCardGridOption(opt, q.name || q.id, q.iconColor));
        } else {
          container.appendChild(renderRadioOption(opt, q.name || q.id));
        }
      });

      // 반응 (형제로 삽입)
      (q.reactions || []).forEach(function (r) {
        container.appendChild(renderReaction(r.reactionId, r.face, r.text));
        cssRules.push('#' + r.triggerId + ':checked ~ #' + r.reactionId + ' { display:block; }');
      });

      // 결과 블록 (형제로 삽입)
      if (q.resultMap) {
        Object.keys(q.resultMap).forEach(function (optId) {
          var resId = q.resultMap[optId];
          var resData = ws.results[resId];
          if (resData && resData.card) {
            container.appendChild(renderResultBlock(resId, resData.card, ws.category));
          }
          cssRules.push('#' + optId + ':checked ~ #' + resId + ' { display:block; }');
        });
      }

      sec.appendChild(container);
    });

    // CSS 규칙 삽입
    if (cssRules.length > 0) {
      sec.appendChild(html('<style>' + cssRules.join('\n') + '</style>'));
    }

    // 텍스트 영역 (선택 사항)
    if (step.textarea) {
      var taWrapper = h('div', { style: { marginTop: '24px' } });
      taWrapper.appendChild(renderTextarea(step.textarea));
      sec.appendChild(taWrapper);
    }

    // 탭 섹션 (선택 사항)
    if (step.tab) {
      sec.appendChild(renderTabSection(step.tab));
    }

    // 다음 버튼
    var isLast = !step.nextId;
    sec.appendChild(renderBtn(isLast ? '#result' : '#' + step.nextId,
      step.nextLabel || (isLast ? '결과 보기 →' : '다음 →'), isLast));

    return sec;
  }

  function renderResultSection(step, ws) {
    var sec = h('section', { className: 'ws-section', id: 'result' });

    // 진행률
    var bar = h('div', { className: 'progress-bar' });
    bar.appendChild(h('div', { className: 'progress-bar__fill', style: { width: '100%' } }));
    bar.appendChild(h('span', { className: 'progress-bar__text', textContent: '완료' }));
    sec.appendChild(bar);

    // 축하 헤더
    var congrats = h('div', { className: 'result-congrats' });
    var maumiC = h('span', { className: 'maumi-placeholder anim-bounce', textContent: '◕' });
    maumiC.style.margin = '0 auto';
    congrats.appendChild(maumiC);
    congrats.appendChild(h('p', { className: 'result-congrats__text', textContent: '워크숍 완료!' }));
    sec.appendChild(congrats);

    // 결과 카드 영역
    sec.appendChild(h('div', { id: 'result-card-area' }));
    sec.appendChild(h('div', { id: 'result-message-area' }));

    // 공유 안내
    var sg1 = h('p', { className: 'result-share-guide' });
    sg1.appendChild(renderMaterialIcon('photo_camera', false));
    sg1.appendChild(document.createTextNode(' 캡처해서 저장하거나 공유해봐!'));
    sec.appendChild(sg1);
    sec.appendChild(h('p', { className: 'result-share-guide result-share-guide--noforce', textContent: '안 해도 괜찮아.' }));

    // 액션 바
    var actWrap = h('div', { style: { maxWidth: '340px', margin: '0 auto', padding: '0 24px' } });
    var actBar = h('div', { className: 'result-actions' });

    var saveBtn = h('button', { type: 'button', className: 'result-actions__btn', id: 'btn-save', onclick: 'saveResultImage()' });
    saveBtn.appendChild(renderMaterialIcon('photo_camera', false));
    saveBtn.appendChild(document.createTextNode(' 이미지 저장'));
    actBar.appendChild(saveBtn);

    var copyBtn = h('button', { type: 'button', className: 'result-actions__btn', id: 'btn-copy' });
    copyBtn.appendChild(renderMaterialIcon('link', false));
    copyBtn.appendChild(document.createTextNode(' 링크 복사'));
    copyBtn.onclick = function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        copyBtn.textContent = '✓ 복사됨!';
        setTimeout(function () {
          copyBtn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">link</span> 링크 복사';
        }, 2000);
      }).catch(function () {
        prompt('링크를 복사해주세요:', window.location.href);
      });
    };
    actBar.appendChild(copyBtn);
    actWrap.appendChild(actBar);
    sec.appendChild(actWrap);

    // SNS 공유
    if (ws.share) {
      var panel = h('details', { className: 'share-panel', open: '' });
      panel.appendChild(h('summary', { textContent: 'SNS에 공유하기' }));
      var btns = h('div', { className: 'share-panel__buttons' });
      btns.appendChild(h('a', {
        href: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(ws.share.text) + '&url=' + encodeURIComponent(ws.share.url),
        target: '_blank', rel: 'noopener', className: 'share-panel__btn', textContent: '트위터(X)'
      }));
      btns.appendChild(h('a', {
        href: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(ws.share.url),
        target: '_blank', rel: 'noopener', className: 'share-panel__btn', textContent: '페이스북'
      }));
      var linkCopyBtn = h('button', { type: 'button', className: 'share-panel__btn', textContent: '링크 복사' });
      linkCopyBtn.onclick = function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          linkCopyBtn.textContent = '복사됨!';
          setTimeout(function () { linkCopyBtn.textContent = '링크 복사'; }, 2000);
        });
      };
      btns.appendChild(linkCopyBtn);
      panel.appendChild(btns);

      var tip = h('p', { className: 'share-panel__or' });
      tip.appendChild(renderMaterialIcon('lightbulb', false, 'font-size:16px;'));
      tip.appendChild(document.createTextNode(' 링크를 복사해서 카카오톡에 붙여넣으면 공유돼요!'));
      panel.appendChild(tip);

      if (ws.share.url) {
        var displayUrl = ws.share.url.replace('https://', '');
        panel.appendChild(h('p', { className: 'share-panel__url', textContent: displayUrl }));
      }
      sec.appendChild(panel);
    }

    sec.appendChild(h('hr', { className: 'divider' }));

    // 실천 가이드
    if (ws.guide) {
      var guideDiv = h('div', { className: 'practice-guide' });
      guideDiv.appendChild(renderCharacterGuide('◡', ws.guide.speech));
      var ol = h('ol', { className: 'practice-guide__list' });
      ws.guide.items.forEach(function (item) {
        ol.appendChild(h('li', { textContent: item }));
      });
      guideDiv.appendChild(ol);
      sec.appendChild(guideDiv);
    }

    sec.appendChild(h('hr', { className: 'divider' }));

    // 다음 워크숍 추천
    if (ws.next && ws.next.length > 0) {
      var nextDiv = h('div', { className: 'next-workshop' });
      nextDiv.appendChild(renderCharacterGuide('◡', '다른 워크숍도 해볼래?'));

      ws.next.forEach(function (n) {
        var item = h('a', { href: n.url, className: 'next-workshop__item' });
        item.appendChild(renderMaterialIcon(n.icon, true, 'color:' + n.iconColor + ';font-size:24px;margin-right:12px;flex-shrink:0;'));
        var info = h('span', { className: 'next-workshop__info' });
        info.appendChild(h('span', { className: 'next-workshop__title', textContent: n.title }));
        var meta = h('span', { className: 'next-workshop__meta' });
        meta.appendChild(document.createTextNode(n.meta + ' '));
        if (n.badge) {
          meta.appendChild(h('span', {
            className: 'type-badge type-badge--' + (n.badgeType || 'select'),
            textContent: n.badge
          }));
        }
        info.appendChild(meta);
        item.appendChild(info);
        item.appendChild(h('span', { className: 'next-workshop__arrow', textContent: '→' }));
        nextDiv.appendChild(item);
      });

      sec.appendChild(nextDiv);
    }

    return sec;
  }

  /* ── 메인 렌더러 ── */

  function renderWorkshop(ws) {
    if (!ws || !ws.steps) {
      console.error('[renderer] window.WORKSHOP 데이터가 없습니다.');
      return;
    }

    var app = document.getElementById('app');
    if (!app) return;

    // checkbox-dynamic 결과 설정을 전역으로 전달 (result.js 참조용)
    if (ws.results && ws.results.type === 'checkbox-dynamic') {
      window.__RESULT_CONFIG = ws.results;
    }

    var form = h('form');
    var total = ws.steps.length;

    ws.steps.forEach(function (step, idx) {
      var sec;
      switch (step.type) {
        case 'intro':
          sec = renderIntroSection(step, ws, idx, total);
          break;
        case 'explore':
          sec = renderExploreSection(step, ws, idx, total);
          break;
        case 'experience':
          sec = renderExperienceSection(step, ws, idx, total);
          break;
        case 'result':
          sec = renderResultSection(step, ws);
          break;
        default:
          console.warn('[renderer] 알 수 없는 step type:', step.type);
          return;
      }
      if (sec) form.appendChild(sec);
    });

    app.appendChild(form);
  }

  /* ── 초기화 ── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.WORKSHOP) renderWorkshop(window.WORKSHOP);
    });
  } else {
    if (window.WORKSHOP) renderWorkshop(window.WORKSHOP);
  }

})();
