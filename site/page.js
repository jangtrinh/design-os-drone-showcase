/* ============================================================================
   page.js — mount ba cảnh cuộn, dựng hero fold, và lái tour chú thích anatomy.

   Tenant Law (xem scrub-section.js): một section chỉ đọc trang chủ nhà qua
   hộp bao CHÍNH NÓ. File này không đụng window.scrollY, chiều cao body hay
   document root — lớp annotation là con của chính stage cảnh anatomy, và chỉ
   đọc rect của đúng stage đó. Đọc `window.__scrubTicker` là hợp lệ: đó là
   ticker CHUNG của trang do chính engine phơi ra (không phải state riêng của
   một section khách trọ nào).
   ========================================================================== */
(function () {
  'use strict';

  var mount = window.mountScrubSection;
  if (typeof mount !== 'function') return; // engine missing: markup stays readable

  // --- 1 ─ HERO: drone hiện dần (Drone-Circling, 96 frame) -------------------
  // Beat chỉ còn `title` — eyebrow/body/tags đã dọn sạch, vì mọi dữ kiện đó đã
  // có ở hàng .row bên dưới; cảnh cuộn không được nhắc lại lần hai. Owner
  // override: không có dòng mô tả nào đi kèm title, kể cả số 249.
  var hero = document.querySelector('[data-scrub="hero"]');
  mount(hero, {
    frames: 'assets/hero/',
    framesLQ: 'assets/hero-lq/',
    frameCount: 96,
    beats: [
      { title: '249', range: [0, 50] },
      { title: 'Hits a wall.\nBounces back.\nKeeps flying.', range: [50, 95] }
    ]
  });

  // --- 2 ─ ANATOMY: nổ tung (Drone-Seedance2, 151 frame) ---------------------
  var anatomy = document.querySelector('[data-scrub="anatomy"]');
  mount(anatomy, {
    frames: 'assets/explode/',
    framesLQ: 'assets/explode-lq/',
    frameCount: 151,
    beats: [
      { title: 'One solid shell,\nseen from outside.', range: [0, 55] },
      { title: '38 parts.\nNone wasted.', range: [55, 112] },
      { range: [112, 150] } // không title — chú thích chiếm khung, chữ biến mất hẳn
    ]
  });

  // --- 3 ─ MODES: ba chế độ bay (Drone-Fly-4K, 96 frame) ---------------------
  // Owner override huỷ bản ::after dữ kiện dưới mode word (T4.3 cũ) — không
  // dòng mô tả nào đi kèm title ở bất kỳ cảnh nào. Ba con số (40%/GPS/68 km/h)
  // vẫn sống trong đoạn sr-only của section, không mất, chỉ mất bản hiện thị
  // hai lần trên phim.
  mount(document.querySelector('[data-scrub="modes"]'), {
    frames: 'assets/fly/',
    framesLQ: 'assets/fly-lq/',
    frameCount: 96,
    beats: [
      { title: 'CINE', range: [0, 31] },
      { title: 'NORMAL', range: [32, 63] },
      { title: 'SPORT', range: [64, 95] }
    ]
  });

  // --- 4 ─ HERO FOLD: dải bằng chứng + CTA neo đáy stage (T3.4) --------------
  // Phải nằm TRONG .scrub__stage (không phải .scrub__story, vốn pointer-
  // events:none) vì chỉ box đó position:sticky theo cuộn — ghim được.
  // Owner override G: CTA thật của trang là Design:OS, không phải drone chưa
  // có thật — đặc trỏ ra repo, viền trỏ vào colophon (nơi giải thích engine).
  var heroStage = hero && hero.querySelector('.scrub__stage');
  if (heroStage) {
    var fold = document.createElement('div');
    fold.className = 'fold grid';
    fold.innerHTML =
      '<div class="fold__row">' +
        '<p class="fold__specs">249 G · 4K 60 · 31 MIN · 10 KM</p>' +
        '<div class="fold__cta">' +
          '<a class="btn btn--brand" href="https://github.com/jangtrinh/design-os" target="_blank" rel="noopener">Get Design:OS</a>' +
          '<a class="btn btn--ghost" href="#built">How it\'s built</a>' +
        '</div>' +
      '</div>';
    heroStage.appendChild(fold);
  }

  // --- 5 ─ TOUR ANNOTATION: cảnh nổ tung, hiện ở frame cuối (T3.5) -----------
  var anatomyStage = anatomy && anatomy.querySelector('.scrub__stage');
  if (!anatomyStage) return;

  // Toạ độ theo % của KHUNG HÌNH 16:9 gốc, không phải của stage — stage vẽ
  // theo kiểu cover nên phần thừa bị cắt; `.anno__frame` (dưới) chịu đúng
  // phép cắt đó qua syncFrame(), nếu không chấm sẽ trôi khỏi linh kiện.
  //
  // Cột `side` là hướng panel mở lên/xuống so với chấm, do người viết spec
  // CHỌN TAY sau khi soi ảnh thật (chỗ nào trống quanh linh kiện đó), không
  // phải suy ra máy móc từ y<50%/y>=50% — vài điểm (02, 03, 04, 06) lệch khỏi
  // công thức đó có chủ đích. Hướng TRÁI/PHẢI thì spec không cho cột riêng nên
  // tính từ x<50% (mở về phía tâm khung) như mô tả. (Owner override gỡ gạch
  // dẫn nối chấm→panel — panel giờ nối bằng khoảng cách, xem anno.css.)
  var POINTS = [
    { x: 11.5, y: 44.0, side: 'down', n: '01', label: 'Propeller', note: 'Foldable polycarbonate, tool-free swap' },
    { x: 18.5, y: 42.0, side: 'up', n: '02', label: 'Motor', note: '1103-size, 11,000 rpm, dual bearings' },
    { x: 49.5, y: 61.5, side: 'down', n: '03', label: 'Camera cluster', note: '1/1.3-inch sensor, one-axis gimbal' },
    { x: 50.0, y: 17.5, side: 'up', n: '04', label: 'Top shell', note: 'Injection-molded PA12, one piece' },
    { x: 67.0, y: 52.0, side: 'up', n: '05', label: 'Mainboard', note: 'Six layers, dual IMU, video chip' },
    { x: 76.5, y: 52.0, side: 'down', n: '06', label: 'Battery', note: '2,450 mAh, single cell' }
  ];
  var FRAME_AR = 16 / 9;   // tỉ lệ chuỗi frame đã trích
  var CROP_Y = 0.42;       // khớp CROP_Y của engine và object-position: center 42%

  var layer = document.createElement('div');
  layer.className = 'anno';
  var frame = document.createElement('div');
  frame.className = 'anno__frame';
  layer.appendChild(frame);

  var buttons = [], panels = [], meters = [];
  POINTS.forEach(function (p, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'anno__pt anno__pt--' + p.side + ' anno__pt--' + (p.x < 50 ? 'r' : 'l');
    btn.style.left = p.x + '%';
    btn.style.top = p.y + '%';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', p.n + ' ' + p.label);
    btn.innerHTML =
      '<span class="anno__dot" aria-hidden="true"></span>' +
      '<span class="anno__ping" aria-hidden="true"></span>' +
      '<span class="anno__panel">' +
        '<span class="anno__caption">' + p.n + ' ' + p.label + '</span>' +
        '<span class="anno__line">' + p.note + '</span>' +
        '<span class="anno__foot">' +
          '<span class="anno__count">' + p.n + ' / 6</span>' +
          '<span class="anno__meter"></span>' +
        '</span>' +
      '</span>';
    frame.appendChild(btn);
    buttons.push(btn);
    panels.push(btn.querySelector('.anno__panel'));
    meters.push(btn.querySelector('.anno__meter'));
  });
  anatomyStage.appendChild(layer);

  // ---- máy trạng thái (T3.5) -------------------------------------------
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 860px)');
  var isMobile = mobileQuery.matches;

  var phase = 'hidden';   // 'hidden' | 'touring' — chỉ điều khiển việc CHẤM có hiện không
  var activeIdx = -1;
  var locked = false;     // ACTIVATED: dừng xoay vĩnh viễn cho lượt xem này
  var hoverCount = 0;     // số điểm đang hover/focus cùng lúc (>0 = tạm dừng vòng xoay)
  var timerId = null;

  function clearTimer() {
    if (timerId !== null) { clearTimeout(timerId); timerId = null; }
  }

  function restartMeter(idx) {
    var m = meters[idx];
    if (!m) return;
    m.classList.remove('is-running');
    void m.offsetWidth; // ép reflow để keyframe animation chạy lại từ đầu, không tiếp tục dở dang
    m.classList.add('is-running');
  }

  function setActive(idx) {
    activeIdx = idx;
    buttons.forEach(function (b, i) {
      var on = i === idx;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    if (!reduced) restartMeter(idx);
  }

  function scheduleAdvance() {
    clearTimer();
    if (phase !== 'touring' || locked || reduced || isMobile || hoverCount) return;
    timerId = setTimeout(function () {
      setActive((activeIdx + 1) % POINTS.length);
      scheduleAdvance();
    }, 5000);
  }

  buttons.forEach(function (btn, i) {
    function onEnter() {
      if (isMobile || phase !== 'touring') return;
      hoverCount++;
      clearTimer();
      if (activeIdx !== i) setActive(i);
    }
    function onLeave() {
      if (isMobile || phase !== 'touring') return;
      hoverCount = Math.max(0, hoverCount - 1);
      if (!hoverCount) scheduleAdvance(); // "chạy lại với một lượt 5s mới từ điểm hiện tại"
    }
    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('focus', onEnter);
    btn.addEventListener('blur', onLeave);
    btn.addEventListener('click', function () {
      if (isMobile || phase !== 'touring') return;
      locked = true;
      clearTimer();
      setActive(i);
    });
  });

  // ---- clamp panel trong hộp .scrub__stage (T3.5, "kẹp trong hộp") -------
  function clampPanels() {
    var stageRect = anatomyStage.getBoundingClientRect();
    if (!stageRect.width) return;
    var margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-2')) || 16;
    buttons.forEach(function (btn, i) {
      btn.style.setProperty('--nudge-x', '0px');
      btn.style.setProperty('--nudge-y', '0px');
      var r = panels[i].getBoundingClientRect(); // visibility:hidden vẫn đo được layout thật
      var dx = 0, dy = 0;
      if (r.left < stageRect.left + margin) dx = (stageRect.left + margin) - r.left;
      else if (r.right > stageRect.right - margin) dx = (stageRect.right - margin) - r.right;
      if (r.top < stageRect.top + margin) dy = (stageRect.top + margin) - r.top;
      else if (r.bottom > stageRect.bottom - margin) dy = (stageRect.bottom - margin) - r.bottom;
      if (dx) btn.style.setProperty('--nudge-x', dx + 'px');
      if (dy) btn.style.setProperty('--nudge-y', dy + 'px');
    });
  }

  // ---- tick: đọc --scrub-progress + data-armed của CHÍNH section anatomy -
  function annotationTick() {
    var mobileNow = mobileQuery.matches;
    if (mobileNow !== isMobile) {
      isMobile = mobileNow;
      layer.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
      buttons.forEach(function (b) { b.tabIndex = isMobile ? -1 : 0; });
      if (isMobile) { clearTimer(); locked = false; hoverCount = 0; }
    }

    var p = parseFloat(anatomy.style.getPropertyValue('--scrub-progress')) || 0;
    var armed = anatomy.getAttribute('data-armed') === 'true';
    var shouldReveal = armed && p >= 0.88;

    if (shouldReveal && phase !== 'touring') {
      phase = 'touring';
      layer.classList.add('is-live');
      if (!isMobile) { // MOBILE: chỉ chấm trang trí, không tour — không set active, không hẹn giờ
        locked = false;
        hoverCount = 0;
        setActive(0); // "01 active ngay lập tức kèm panel mở" — trạng thái nghỉ trước vòng xoay đầu
        scheduleAdvance();
      }
    } else if (!shouldReveal && phase === 'touring') {
      // RESET: về HIDDEN, lần vào sau là tour mới từ 01
      phase = 'hidden';
      clearTimer();
      locked = false;
      hoverCount = 0;
      layer.classList.remove('is-live');
      buttons.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-expanded', 'false');
      });
      activeIdx = -1;
    }
  }

  var ticker = window.__scrubTicker;
  if (ticker) ticker.add(annotationTick);

  // Trạng thái mobile ban đầu (trước cả tick đầu tiên): a11y đúng ngay từ đầu.
  layer.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
  buttons.forEach(function (b) { b.tabIndex = isMobile ? -1 : 0; });

  clampPanels();

  // ---- đồng bộ hình học frame (giữ nguyên — toán cover-crop đã đúng) -----
  // Đồng bộ hình học: đặt .anno__frame trùng khít vùng ảnh mà canvas thực sự vẽ.
  // s = max(scale phủ ngang, scale phủ dọc) — đúng công thức cover của engine.
  function syncFrame() {
    var r = anatomyStage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var w = r.width, h = r.height;
    var drawnW, drawnH;
    if (w / h > FRAME_AR) { drawnW = w; drawnH = w / FRAME_AR; }
    else { drawnH = h; drawnW = h * FRAME_AR; }
    frame.style.width = drawnW + 'px';
    frame.style.height = drawnH + 'px';
    frame.style.left = -((drawnW - w) / 2) + 'px';
    frame.style.top = -((drawnH - h) * CROP_Y) + 'px';
  }
  syncFrame();
  window.addEventListener('resize', function () { syncFrame(); clampPanels(); });
  if (typeof ResizeObserver === 'function') new ResizeObserver(function () { syncFrame(); clampPanels(); }).observe(anatomyStage);
})();
