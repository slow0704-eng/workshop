/* ================================================
   마음 워크숍 — result.js
   결과 카드 표시 + Canvas API 이미지 저장
   ================================================ */

/**
 * Q 섹션의 :checked 결과를 #result-card-area에 복사
 */
function showResult() {
  var area = document.getElementById('result-card-area');
  if (!area) return;
  area.innerHTML = '';

  // .result가 CSS로 시각적으로 숨겨져 있지만(position:absolute, visibility:hidden)
  // :checked CSS 규칙에 의해 display는 block이 됨.
  // → display가 'block' 또는 'none'이 아닌 것을 확인하기 어려우므로
  // → 각 워크숍의 <style>에 정의된 :checked 규칙을 직접 시뮬레이션
  var found = false;

  // 모든 :checked radio를 찾아서 대응하는 result ID 추정
  var checkedInputs = document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');
  checkedInputs.forEach(function(input) {
    if (found) return;
    var id = input.id; // 예: q4-c, w-sunny, c-warm, v-growth

    // 같은 부모(option-list, card-grid) 안의 모든 .result를 확인
    var container = input.closest('.option-list') || input.closest('.card-grid') || input.closest('form');
    if (!container) return;

    // 해당 input의 :checked로 CSS에서 display:block이 되는 .result를 찾기
    // 방법: 임시로 visibility를 되돌려서 확인
    var results = container.querySelectorAll('.result');
    results.forEach(function(r) {
      if (found) return;
      // 해당 result에 연결된 CSS 규칙이 있는지 확인
      // 각 HTML의 <style>에 "#q4-c:checked ~ #result-low" 같은 규칙이 있음
      // → 간접 확인: input ID와 result ID의 패턴 매칭
      var styles = document.querySelectorAll('style');
      styles.forEach(function(styleEl) {
        if (found) return;
        var text = styleEl.textContent;
        // "#q4-c:checked ~ #result-low { display: block; }" 패턴 찾기
        var pattern = '#' + id + ':checked';
        if (text.indexOf(pattern) > -1) {
          // 이 style에서 해당 input이 체크되면 보이는 result ID 추출
          var regex = new RegExp('#' + id + ':checked\\s*~\\s*#([\\w-]+)', 'g');
          var match;
          while ((match = regex.exec(text)) !== null) {
            var targetId = match[1];
            // reaction이 아닌 result만
            if (targetId.indexOf('result') > -1 || targetId.indexOf('res-') > -1) {
              var targetEl = document.getElementById(targetId);
              if (targetEl) {
                var clone = targetEl.cloneNode(true);
                clone.style.display = 'block';
                clone.style.position = 'static';
                clone.style.visibility = 'visible';
                clone.style.height = 'auto';
                clone.style.left = 'auto';
                clone.style.overflow = 'visible';
                area.appendChild(clone);
                found = true;
              }
            }
          }
        }
      });
    });
  });

  // 방법 2: checkbox 기반 워크숍 (강점발견) — 체크한 항목으로 동적 카드 생성
  if (!found) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"].option__input');
    if (checkboxes.length > 0) {
      var checked = Array.from(checkboxes).filter(function(cb) { return cb.checked; });
      var msgArea = document.getElementById('result-message-area');
      var cardCls = 'card-esteem';

      if (checked.length === 0) {
        // 0개 체크 → 대안 카드
        area.innerHTML =
          '<div style="padding:24px 24px 0;"><div class="result-card ' + cardCls + '">' +
          '<span class="result-card__decoration">— · —</span>' +
          '<span class="result-card__title">나의 숨겨진 강점</span>' +
          '<div class="result-card__main"><span class="result-card__emoji material-symbols-rounded filled" style="font-size:48px;color:#4CAF50;">eco</span></div>' +
          '<span class="maumi-placeholder maumi-placeholder--small">◡</span>' +
          '<p class="result-card__message">"아직 잘 모르겠어도 괜찮아.<br>강점은 천천히<br>발견할 수 있어."</p>' +
          '<span class="result-card__decoration">— · —</span>' +
          '<span class="result-card__watermark">maum-workshop.github.io</span>' +
          '</div></div>';
        if (msgArea) msgArea.innerHTML =
          '<div class="character-guide" style="margin-top:20px;">' +
          '<span class="maumi-placeholder">◡</span>' +
          '<div class="speech-bubble">지금 모르겠어도 괜찮아. 살다 보면 자연스럽게 발견하게 될 거야.</div></div>';
      } else {
        // 체크한 항목 텍스트 수집
        var items = checked.map(function(cb) {
          var label = document.querySelector('label[for="' + cb.id + '"]');
          var textEl = label ? label.querySelector('.option__text') : null;
          return textEl ? textEl.textContent.trim() : '';
        }).filter(function(t) { return t; });

        // 카드 메시지: 체크한 개수 기반
        var count = items.length;
        var cardMsg = count + '개의 강점을 발견했어요!';
        var listHtml = items.map(function(t) { return '<li style="list-style:disc;margin-left:16px;line-height:1.8;">' + t + '</li>'; }).join('');

        area.innerHTML =
          '<div style="padding:24px 24px 0;"><div class="result-card ' + cardCls + '">' +
          '<span class="result-card__decoration">— · —</span>' +
          '<span class="result-card__title">나의 숨겨진 강점</span>' +
          '<div class="result-card__main"><span class="result-card__emoji" style="font-size:48px;color:#F5A623;"><span class="material-symbols-rounded filled">star</span></span></div>' +
          '<span class="maumi-placeholder maumi-placeholder--small">◕</span>' +
          '<p class="result-card__message">"' + cardMsg + '"</p>' +
          '<span class="result-card__decoration">— · —</span>' +
          '<span class="result-card__watermark">maum-workshop.github.io</span>' +
          '</div></div>';

        // 체크한 강점 목록 + 마음이 대사
        if (msgArea) msgArea.innerHTML =
          '<div style="padding:16px 24px 0;">' +
          '<ul style="background:#FAFAFA;border-radius:12px;padding:16px 16px 16px 24px;font-size:14px;color:#444;">' + listHtml + '</ul></div>' +
          '<div class="character-guide" style="margin-top:20px;">' +
          '<span class="maumi-placeholder">◕</span>' +
          '<div class="speech-bubble">방금 체크한 것들, 전부 네 강점이야.<br>혹시 몰랐다면, 이제 기억해둬.</div></div>';
      }
      found = true;
    }
  }

  // 방법 2-b: #result 내 직접 카드 (하드코딩된 카드가 있는 경우)
  if (!found) {
    var directCard = document.querySelector('#result .result-card');
    if (directCard) {
      area.appendChild(directCard.cloneNode(true));
      found = true;
    }
  }

  // 방법 3: 미선택 시 → "잘 모르겠어" 자동 선택 후 결과 표시
  if (!found) {
    // "잘 모르겠어" radio를 찾아서 자동 체크
    var idkRadios = document.querySelectorAll('input[id$="-idk"][type="radio"]');
    var lastIdk = null;
    idkRadios.forEach(function(r) { lastIdk = r; });

    if (lastIdk && !lastIdk.checked) {
      lastIdk.checked = true;
      // :checked 상태 변경 후 결과 다시 찾기
      results.forEach(function(r) {
        if (getComputedStyle(r).display !== 'none') {
          var clone = r.cloneNode(true);
          clone.style.display = 'block';
          area.appendChild(clone);
          found = true;
        }
      });
    }

    // 그래도 없으면 (idk 결과 div가 없는 경우) 기본 카드 생성
    if (!found) {
      var bodyClass = document.body.className || '';
      var cardClass = 'card-emotion';
      if (bodyClass.indexOf('stress') > -1) cardClass = 'card-stress';
      else if (bodyClass.indexOf('esteem') > -1) cardClass = 'card-esteem';
      else if (bodyClass.indexOf('career') > -1) cardClass = 'card-career';
      else if (bodyClass.indexOf('relation') > -1) cardClass = 'card-relation';
      else if (bodyClass.indexOf('resilience') > -1) cardClass = 'card-resilience';

      area.innerHTML =
        '<div style="padding:24px 24px 0;"><div class="result-card ' + cardClass + '">' +
        '<span class="result-card__decoration">— · —</span>' +
        '<span class="result-card__title">워크숍 결과</span>' +
        '<div class="result-card__main"><span class="result-card__emoji material-symbols-rounded filled" style="font-size:48px;color:#999;">help</span></div>' +
        '<span class="maumi-placeholder maumi-placeholder--small">◡</span>' +
        '<p class="result-card__message">"지금은 잘 모르겠어도<br>괜찮아. 여기까지 온 것<br>만으로도 충분해."</p>' +
        '<span class="result-card__decoration">— · —</span>' +
        '<span class="result-card__watermark">maum-workshop.github.io</span>' +
        '</div></div>' +
        '<div class="character-guide" style="margin-top:20px;">' +
        '<span class="maumi-placeholder">◡</span>' +
        '<div class="speech-bubble">모르겠는 것도 자연스러운 거야. 그것도 하나의 답이야.</div>' +
        '</div>';
    }
  }
}

/**
 * 카테고리 배경색 매핑 (CSS 변수 우회)
 */
var BG_MAP = {
  'card-emotion':    { bg: '#EBF4FF', accent: '#4A90D9' },
  'card-esteem':     { bg: '#FFF8E1', accent: '#F5A623' },
  'card-relation':   { bg: '#E8F5E9', accent: '#4CAF50' },
  'card-stress':     { bg: '#F3E5F5', accent: '#9C27B0' },
  'card-career':     { bg: '#FFF3E0', accent: '#FF7043' },
  'card-resilience': { bg: '#FCE4EC', accent: '#E91E63' }
};

/**
 * 카드에서 카테고리 색상 찾기
 */
function getCardColors(card) {
  for (var cls in BG_MAP) {
    if (card.classList.contains(cls)) return BG_MAP[cls];
  }
  // 부모에서 찾기
  var parent = card.closest('[class*="card-"]');
  if (parent) {
    for (var cls2 in BG_MAP) {
      if (parent.classList.contains(cls2)) return BG_MAP[cls2];
    }
  }
  return { bg: '#F5F5F5', accent: '#999999' };
}

/**
 * Canvas에 둥근 사각형 그리기
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Canvas에 텍스트 줄바꿈 그리기
 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  var lines = text.split('\n');
  var drawnLines = [];
  lines.forEach(function(line) {
    var words = line.trim();
    if (ctx.measureText(words).width > maxWidth) {
      // 긴 줄 자르기
      var chars = words.split('');
      var currentLine = '';
      chars.forEach(function(ch) {
        if (ctx.measureText(currentLine + ch).width > maxWidth) {
          drawnLines.push(currentLine);
          currentLine = ch;
        } else {
          currentLine += ch;
        }
      });
      if (currentLine) drawnLines.push(currentLine);
    } else {
      drawnLines.push(words);
    }
  });
  drawnLines.forEach(function(line, i) {
    ctx.fillText(line, x, y + i * lineHeight);
  });
  return drawnLines.length;
}

/**
 * 결과 카드를 Canvas API로 직접 그려서 PNG 다운로드
 */
function saveResultImage() {
  var btn = document.getElementById('btn-save');

  // 카드 찾기: result-card-area 안 → 또는 페이지 내 아무 result-card
  var card = document.querySelector('#result-card-area .result-card')
          || document.querySelector('#result .result-card')
          || document.querySelector('.result:not([style*="none"]) .result-card');

  if (!card) {
    alert('결과를 먼저 확인해주세요!');
    return;
  }

  // EX-04: 버튼 연타 방지
  if (btn.disabled) return;
  btn.disabled = true;
  btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">hourglass_empty</span> 저장 중...';

  // DOM에서 텍스트 추출
  var titleEl = card.querySelector('.result-card__title');
  var numberEl = card.querySelector('.result-card__number');
  var emojiEl = card.querySelector('.result-card__emoji');
  var messageEl = card.querySelector('.result-card__message');
  var watermarkEl = card.querySelector('.result-card__watermark');
  var decoEls = card.querySelectorAll('.result-card__decoration');

  var title = titleEl ? titleEl.textContent.trim() : '';
  var number = numberEl ? numberEl.textContent.trim() : '';
  var emoji = emojiEl ? emojiEl.textContent.trim() : '';
  var watermark = watermarkEl ? watermarkEl.textContent.trim() : 'maum-workshop.github.io';
  var decoTop = decoEls[0] ? decoEls[0].textContent.trim() : '— · —';
  var decoBottom = decoEls[1] ? decoEls[1].textContent.trim() : '— · —';

  // 메시지: <br> → \n 변환 후 태그 제거
  var messageHtml = messageEl ? messageEl.innerHTML : '';
  var message = messageHtml.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();

  // 색상
  var colors = getCardColors(card);

  // Canvas 생성 (640×640 = 2x 레티나)
  var S = 640;
  var canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  var ctx = canvas.getContext('2d');

  // 1. 배경 (둥근 사각형)
  ctx.fillStyle = colors.bg;
  roundRect(ctx, 0, 0, S, S, 32);
  ctx.fill();

  // 2. 상단 장식
  ctx.fillStyle = '#CCC';
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.fillText(decoTop, S / 2, 60);

  // 3. 제목
  ctx.fillStyle = '#666';
  ctx.font = '26px sans-serif';
  ctx.fillText(title, S / 2, 100);

  // 4. 숫자 (있으면)
  var contentY = 200;
  if (number) {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 88px sans-serif';
    ctx.fillText(number, S / 2, contentY);
    contentY += 30;
  }

  // 5. 이모지 → Canvas 도형 (SVG가 fillText에서 안 보이므로)
  var emojiY = contentY + 50;
  if (emoji) {
    var emojiClean = emoji.replace(/<[^>]*>/g, '').trim();
    if (emojiClean.length > 0 && emojiClean.length <= 3) {
      ctx.font = (number ? '56px' : '80px') + ' serif';
      ctx.fillText(emojiClean, S / 2, emojiY);
    } else {
      // SVG가 들어간 경우 → 카테고리 색상 원형으로 대체
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(S / 2, emojiY - 10, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    contentY += (number ? 80 : 110);
  }

  // 6. 마음이 캐릭터 (원형 + 텍스트)
  var maumiY = contentY + 40;
  ctx.fillStyle = colors.bg;
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(S / 2, maumiY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = colors.accent;
  ctx.font = '20px sans-serif';
  ctx.fillText('◡', S / 2, maumiY + 7);

  // 7. 메시지
  if (message) {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 30px sans-serif';
    var msgY = maumiY + 55;
    drawWrappedText(ctx, message, S / 2, msgY, S - 80, 42);
  }

  // 8. 하단 장식
  ctx.fillStyle = '#CCC';
  ctx.font = '24px serif';
  ctx.fillText(decoBottom, S / 2, S - 56);

  // 9. 워터마크
  ctx.fillStyle = '#BBB';
  ctx.font = '20px sans-serif';
  ctx.fillText(watermark, S / 2, S - 24);

  // 다운로드 (EX-18: iOS 대응, EX-19: 파일명 영문)
  try {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // iOS Safari: <a download> 미작동 → 새 탭에서 이미지 열기
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 길게 눌러 저장!';
        btn.disabled = false;
        setTimeout(function() {
          btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
          btn.classList.remove('result-actions__btn--saved');
        }, 4000);
      }, 'image/png');
    } else {
      // 일반 브라우저: <a download> 정상 작동
      var link = document.createElement('a');
      link.download = 'maum-workshop-result.png';  // EX-19: 영문 파일명
      link.href = canvas.toDataURL('image/png');
      link.click();
      btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">check</span> 저장됨!';
      btn.classList.add('result-actions__btn--saved');
      setTimeout(function() {
        btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
        btn.classList.remove('result-actions__btn--saved');
        btn.disabled = false;  // EX-04: 복원
      }, 2500);
    }
  } catch (e) {
    btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
    btn.disabled = false;
    alert('저장에 실패했어요. 스크린샷으로 저장해주세요!');
  }
}
