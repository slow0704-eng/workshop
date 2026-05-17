/* ================================================
   마음 워크숍 — result.js
   결과 카드 표시 + Canvas API 이미지 저장
   ================================================
   카드 매칭:
   - 라디오 분기형: renderer가 .result div에 data-result-for="<opt-id>"
     속성을 박아두므로, :checked 라디오의 id로 directly 매칭
   - 체크박스 동적형(강점발견): 체크된 항목 수로 카드 본문 생성
   ================================================ */

/**
 * 결과 카드를 #result-card-area에 표시
 */
function showResult() {
  var area = document.getElementById('result-card-area');
  if (!area) return;
  area.innerHTML = '';
  var msgArea = document.getElementById('result-message-area');
  if (msgArea) msgArea.innerHTML = '';

  // 1) checkbox-dynamic (강점발견)
  if (renderCheckboxDynamicResult(area, msgArea)) return;

  // 2) 라디오 매핑 결과 — data-result-for 속성으로 찾기
  if (renderRadioMappedResult(area)) return;

  // 3) fallback — 미선택 시 "잘 모르겠어" 자동 + 기본 카드
  renderFallbackResult(area);
}

/**
 * 라디오 매핑형 결과: 체크된 라디오의 id로 [data-result-for]를 찾아 복제
 */
function renderRadioMappedResult(area) {
  var checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
  for (var i = 0; i < checkedRadios.length; i++) {
    var card = document.querySelector(
      '.result[data-result-for="' + checkedRadios[i].id + '"]'
    );
    if (card) {
      area.appendChild(cloneResultBlock(card));
      return true;
    }
  }
  return false;
}

/**
 * 결과 div를 #result-card-area로 옮길 때 표시용 스타일로 변환
 */
function cloneResultBlock(originalEl) {
  var clone = originalEl.cloneNode(true);
  clone.removeAttribute('data-result-for');
  clone.style.display = 'block';
  clone.style.position = 'static';
  clone.style.visibility = 'visible';
  clone.style.height = 'auto';
  clone.style.left = 'auto';
  clone.style.overflow = 'visible';
  return clone;
}

/**
 * 강점발견 등 checkbox 기반 — 체크한 항목으로 동적 카드 생성
 */
function renderCheckboxDynamicResult(area, msgArea) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"].option__input');
  if (checkboxes.length === 0) return false;

  var cardCls = 'card-' + categoryFromBody();
  var checked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) checked.push(checkboxes[i]);
  }

  if (checked.length === 0) {
    area.appendChild(buildEmptyCheckboxCard(cardCls));
    if (msgArea) msgArea.appendChild(buildSpeechBubble(
      '◡', '지금 모르겠어도 괜찮아. 살다 보면 자연스럽게 발견하게 될 거야.'
    ));
    return true;
  }

  var items = checked.map(function (cb) {
    var label = document.querySelector('label[for="' + cb.id + '"]');
    var textEl = label ? label.querySelector('.option__text') : null;
    return textEl ? textEl.textContent.trim() : '';
  }).filter(Boolean);

  area.appendChild(buildFoundCheckboxCard(cardCls, items.length));
  if (msgArea) {
    msgArea.appendChild(buildItemList(items));
    msgArea.appendChild(buildSpeechBubble(
      '◕', '방금 체크한 것들, 전부 네 강점이야.<br>혹시 몰랐다면, 이제 기억해둬.'
    ));
  }
  return true;
}

/**
 * fallback: 미선택 시 "잘 모르겠어" 자동 체크 후 재시도, 그래도 없으면 기본 카드
 */
function renderFallbackResult(area) {
  var idkRadios = document.querySelectorAll('input[id$="-idk"][type="radio"]');
  var lastIdk = idkRadios[idkRadios.length - 1];
  if (lastIdk && !lastIdk.checked) {
    lastIdk.checked = true;
    if (renderRadioMappedResult(area)) return;
  }
  area.appendChild(buildGenericIdkCard('card-' + categoryFromBody()));
}

/* ── 카드 빌더 헬퍼 ── */

function categoryFromBody() {
  var cls = document.body.className || '';
  if (cls.indexOf('stress') > -1)     return 'stress';
  if (cls.indexOf('esteem') > -1)     return 'esteem';
  if (cls.indexOf('career') > -1)     return 'career';
  if (cls.indexOf('relation') > -1)   return 'relation';
  if (cls.indexOf('resilience') > -1) return 'resilience';
  return 'emotion';
}

function buildCard(html) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstChild;
}

function buildSpeechBubble(face, htmlMsg) {
  return buildCard(
    '<div class="character-guide" style="margin-top:20px;">' +
    '<span class="maumi-placeholder">' + face + '</span>' +
    '<div class="speech-bubble">' + htmlMsg + '</div>' +
    '</div>'
  );
}

function buildEmptyCheckboxCard(cardCls) {
  return buildCard(
    '<div style="padding:24px 24px 0;"><div class="result-card ' + cardCls + '">' +
      '<span class="result-card__decoration">— · —</span>' +
      '<span class="result-card__title">나의 숨겨진 강점</span>' +
      '<div class="result-card__main"><span class="result-card__emoji material-symbols-rounded filled" style="font-size:48px;color:#4CAF50;">eco</span></div>' +
      '<span class="maumi-placeholder maumi-placeholder--small">◡</span>' +
      '<p class="result-card__message">"아직 잘 모르겠어도 괜찮아.<br>강점은 천천히<br>발견할 수 있어."</p>' +
      '<span class="result-card__decoration">— · —</span>' +
      '<span class="result-card__watermark">maum-workshop.github.io</span>' +
    '</div></div>'
  );
}

function buildFoundCheckboxCard(cardCls, count) {
  return buildCard(
    '<div style="padding:24px 24px 0;"><div class="result-card ' + cardCls + '">' +
      '<span class="result-card__decoration">— · —</span>' +
      '<span class="result-card__title">나의 숨겨진 강점</span>' +
      '<div class="result-card__main"><span class="result-card__emoji" style="font-size:48px;color:#F5A623;"><span class="material-symbols-rounded filled">star</span></span></div>' +
      '<span class="maumi-placeholder maumi-placeholder--small">◕</span>' +
      '<p class="result-card__message">"' + count + '개의 강점을 발견했어요!"</p>' +
      '<span class="result-card__decoration">— · —</span>' +
      '<span class="result-card__watermark">maum-workshop.github.io</span>' +
    '</div></div>'
  );
}

function buildItemList(items) {
  var listHtml = items.map(function (t) {
    return '<li style="list-style:disc;margin-left:16px;line-height:1.8;">' + t + '</li>';
  }).join('');
  return buildCard(
    '<div style="padding:16px 24px 0;">' +
      '<ul style="background:#FAFAFA;border-radius:12px;padding:16px 16px 16px 24px;font-size:14px;color:#444;">' +
        listHtml +
      '</ul>' +
    '</div>'
  );
}

function buildGenericIdkCard(cardCls) {
  return buildCard(
    '<div style="padding:24px 24px 0;"><div class="result-card ' + cardCls + '">' +
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
    '</div>'
  );
}

/* ================================================
   Canvas API 이미지 저장 (변경 없음)
   ================================================ */

var BG_MAP = {
  'card-emotion':    { bg: '#EBF4FF', accent: '#4A90D9' },
  'card-esteem':     { bg: '#FFF8E1', accent: '#F5A623' },
  'card-relation':   { bg: '#E8F5E9', accent: '#4CAF50' },
  'card-stress':     { bg: '#F3E5F5', accent: '#9C27B0' },
  'card-career':     { bg: '#FFF3E0', accent: '#FF7043' },
  'card-resilience': { bg: '#FCE4EC', accent: '#E91E63' }
};

function getCardColors(card) {
  for (var cls in BG_MAP) {
    if (card.classList.contains(cls)) return BG_MAP[cls];
  }
  var parent = card.closest('[class*="card-"]');
  if (parent) {
    for (var cls2 in BG_MAP) {
      if (parent.classList.contains(cls2)) return BG_MAP[cls2];
    }
  }
  return { bg: '#F5F5F5', accent: '#999999' };
}

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

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  var lines = text.split('\n');
  var drawnLines = [];
  lines.forEach(function (line) {
    var words = line.trim();
    if (ctx.measureText(words).width > maxWidth) {
      var chars = words.split('');
      var currentLine = '';
      chars.forEach(function (ch) {
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
  drawnLines.forEach(function (line, i) {
    ctx.fillText(line, x, y + i * lineHeight);
  });
  return drawnLines.length;
}

function saveResultImage() {
  var btn = document.getElementById('btn-save');

  var card = document.querySelector('#result-card-area .result-card')
          || document.querySelector('#result .result-card')
          || document.querySelector('.result:not([style*="none"]) .result-card');

  if (!card) {
    alert('결과를 먼저 확인해주세요!');
    return;
  }

  if (btn.disabled) return;
  btn.disabled = true;
  btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">hourglass_empty</span> 저장 중...';

  var titleEl = card.querySelector('.result-card__title');
  var numberEl = card.querySelector('.result-card__number');
  var emojiEl = card.querySelector('.result-card__emoji');
  var maumiEl = card.querySelector('.maumi-placeholder');
  var messageEl = card.querySelector('.result-card__message');
  var watermarkEl = card.querySelector('.result-card__watermark');
  var decoEls = card.querySelectorAll('.result-card__decoration');

  var title = titleEl ? titleEl.textContent.trim() : '';
  var number = numberEl ? numberEl.textContent.trim() : '';
  var emoji = emojiEl ? emojiEl.textContent.trim() : '';
  var maumiFace = maumiEl ? maumiEl.textContent.trim() : '◡';
  var watermark = watermarkEl ? watermarkEl.textContent.trim() : 'maum-workshop.github.io';
  var decoTop = decoEls[0] ? decoEls[0].textContent.trim() : '— · —';
  var decoBottom = decoEls[1] ? decoEls[1].textContent.trim() : '— · —';

  var messageHtml = messageEl ? messageEl.innerHTML : '';
  var message = messageHtml.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();

  var colors = getCardColors(card);

  var S = 640;
  var canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = colors.bg;
  roundRect(ctx, 0, 0, S, S, 32);
  ctx.fill();

  ctx.fillStyle = '#CCC';
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.fillText(decoTop, S / 2, 60);

  ctx.fillStyle = '#666';
  ctx.font = '26px sans-serif';
  ctx.fillText(title, S / 2, 100);

  var contentY = 200;
  if (number) {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 88px sans-serif';
    ctx.fillText(number, S / 2, contentY);
    contentY += 30;
  }

  var emojiY = contentY + 50;
  if (emoji) {
    var emojiClean = emoji.replace(/<[^>]*>/g, '').trim();
    if (emojiClean.length > 0 && emojiClean.length <= 3) {
      ctx.font = (number ? '56px' : '80px') + ' serif';
      ctx.fillText(emojiClean, S / 2, emojiY);
    } else {
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

  // 캐릭터 (카드에서 추출한 표정 그대로)
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
  ctx.fillText(maumiFace, S / 2, maumiY + 7);

  if (message) {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 30px sans-serif';
    var msgY = maumiY + 55;
    drawWrappedText(ctx, message, S / 2, msgY, S - 80, 42);
  }

  ctx.fillStyle = '#CCC';
  ctx.font = '24px serif';
  ctx.fillText(decoBottom, S / 2, S - 56);

  ctx.fillStyle = '#BBB';
  ctx.font = '20px sans-serif';
  ctx.fillText(watermark, S / 2, S - 24);

  try {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      canvas.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 길게 눌러 저장!';
        btn.disabled = false;
        setTimeout(function () {
          btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
          btn.classList.remove('result-actions__btn--saved');
        }, 4000);
      }, 'image/png');
    } else {
      var link = document.createElement('a');
      link.download = 'maum-workshop-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">check</span> 저장됨!';
      btn.classList.add('result-actions__btn--saved');
      setTimeout(function () {
        btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
        btn.classList.remove('result-actions__btn--saved');
        btn.disabled = false;
      }, 2500);
    }
  } catch (e) {
    btn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span> 이미지 저장';
    btn.disabled = false;
    alert('저장에 실패했어요. 스크린샷으로 저장해주세요!');
  }
}
