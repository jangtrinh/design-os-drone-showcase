/* ============================================================================
   page.js — mount ba cảnh cuộn, dựng hero fold, và lái tour chú thích anatomy.

   Tenant Law (xem scrub-section.js): một section chỉ đọc trang chủ nhà qua
   hộp bao CHÍNH NÓ. File này không đụng window.scrollY, chiều cao body hay
   document root — lớp annotation là con của chính stage cảnh anatomy, và chỉ
   đọc rect của đúng stage đó. Đọc `window.__scrubTicker` là hợp lệ: đó là
   ticker CHUNG của trang do chính engine phơi ra (không phải state riêng của
   một section khách trọ nào).

   MOBILE-SPEC M2/M3: mount lại toàn bộ ba cảnh khi vượt ngưỡng 860px, vì tầng
   frame (M2) chốt lúc mount — xoay ngang/dọc qua ngưỡng để lại cấu hình sai
   nếu không mount lại. Nghe `matchMedia.change`, KHÔNG nghe `resize` (thanh
   URL trình duyệt ẩn/hiện bắn resize liên tục, mount lại mỗi lần sẽ giật hình
   và rò rỉ). `mountScrubSection` trả `unmount()` nhưng KHÔNG tự dọn DOM nó đã
   tạo (xem scrub-section.js) — `clearEngineChildren()` dưới đây làm việc đó,
   chừa lại đúng phần tử `.sr-only` tĩnh của section.
   ========================================================================== */
(function () {
  'use strict';

  var mount = window.mountScrubSection;
  if (typeof mount !== 'function') return; // engine missing: markup stays readable

  var mobileMQ = window.matchMedia('(max-width: 860px)');

  // Beat chỉ còn `title` — eyebrow/body/tags đã dọn sạch, vì mọi dữ kiện đó đã
  // có ở hàng .row bên dưới; cảnh cuộn không được nhắc lại lần hai. Owner
  // override: không có dòng mô tả nào đi kèm title, kể cả số 249.
  var SCENES = {
    hero: {
      el: document.querySelector('[data-scrub="hero"]'),
      frames: 'assets/hero/', framesLQ: 'assets/hero-lq/', frameCount: 96,
      beats: [
        { title: '249', range: [0, 50] },
        { title: 'Hits a wall.\nBounces back.\nKeeps flying.', range: [50, 95] }
      ]
    },
    anatomy: {
      el: document.querySelector('[data-scrub="anatomy"]'),
      frames: 'assets/explode/', framesLQ: 'assets/explode-lq/', frameCount: 151,
      beats: [
        { title: 'One solid shell,\nseen from outside.', range: [0, 55] },
        { title: '38 parts.\nNone wasted.', range: [55, 112] },
        { range: [112, 150] } // không title — chú thích chiếm khung, chữ biến mất hẳn
      ]
    },
    // Owner override huỷ bản ::after dữ kiện dưới mode word (T4.3 cũ) — không
    // dòng mô tả nào đi kèm title ở bất kỳ cảnh nào. Ba con số (40%/GPS/68 km/h)
    // vẫn sống trong đoạn sr-only của section, không mất, chỉ mất bản hiện thị
    // hai lần trên phim.
    modes: {
      el: document.querySelector('[data-scrub="modes"]'),
      frames: 'assets/fly/', framesLQ: 'assets/fly-lq/', frameCount: 96,
      beats: [
        { title: 'CINE', range: [0, 31] },
        { title: 'NORMAL', range: [32, 63] },
        { title: 'SPORT', range: [64, 95] }
      ]
    }
  };

  // M2 — một tầng frame trên mobile: dùng thẳng thư mục LQ làm nguồn DUY NHẤT
  // (không truyền framesLQ) — engine vốn nạp song song hai tầng quanh frame
  // đang xem; trên máy yếu, giải mã WebP 1600px là chi phí lớn nhất mỗi khung,
  // và ở bề rộng CSS 390-430px thì tầng 480px đã đủ nét. Chọn tầng MỘT LẦN lúc
  // mount, đọc matchMedia — không đọc lại giữa chừng (đó là việc của M3).
  function sceneConfig(def) {
    if (mobileMQ.matches) {
      return { frames: def.framesLQ, frameCount: def.frameCount, beats: def.beats };
    }
    return { frames: def.frames, framesLQ: def.framesLQ, frameCount: def.frameCount, beats: def.beats };
  }

  // mountScrubSection() không dọn DOM nó tạo khi unmount (chỉ ngắt observer/
  // ticker/cache) — gọi lại mount() trên section chưa dọn sẽ CHỒNG một bộ
  // stage/progress/route/story thứ hai. Dọn mọi con TRỪ .sr-only (nội dung
  // tĩnh của section, không phải engine dựng, phải giữ nguyên qua mọi lần
  // mount lại).
  function clearEngineChildren(el) {
    if (!el) return;
    Array.prototype.slice.call(el.children).forEach(function (child) {
      if (!child.classList.contains('sr-only')) el.removeChild(child);
    });
  }

  // --- HERO FOLD: dải bằng chứng + CTA neo đáy stage -------------------------
  // Phải nằm TRONG .scrub__stage (không phải .scrub__story, vốn pointer-
  // events:none) vì chỉ box đó position:sticky theo cuộn — ghim được.
  // Owner override G: CTA thật của trang là Design:OS, không phải drone chưa
  // có thật — đặc trỏ ra repo, viền trỏ vào colophon (nơi giải thích engine).
  function buildHeroFold(heroEl) {
    var heroStage = heroEl && heroEl.querySelector('.scrub__stage');
    if (!heroStage) return;
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

    // Dải fold mờ dần theo --scrub-progress (hero-fold.css). Nhưng `visibility`
    // không nội suy được từ một biến số, mà hai CTA trong đó là LINK THẬT —
    // để mờ không thôi thì bàn phím vẫn tab vào một thứ vô hình. Cầu dao phải
    // là JS, và nó thuộc về đây vì page.js là nơi dựng ra .fold.
    // Bám ticker CHUNG của engine, không tạo vòng rAF riêng.
    var wasPast = null;
    var readFoldGate = function () {
      // heroEl, KHÔNG phải biến ngoài: engine bọc mỗi subscriber trong try/catch
      // ("one bad subscriber must not kill the ticker"), nên một ReferenceError
      // ở đây sẽ chết IM LẶNG và cửa mãi mãi không mở.
      var p = parseFloat(getComputedStyle(heroEl).getPropertyValue('--scrub-progress')) || 0;
      var past = p > 0.44;
      if (past !== wasPast) { // chỉ ghi DOM khi ĐỔI trạng thái, không mỗi frame
        wasPast = past;
        fold.setAttribute('data-past-intro', past ? 'true' : 'false');
      }
    };
    // Ticker CHUNG do engine tạo ở lần mount ĐẦU TIÊN. Nếu hàm này chạy trước
    // đó thì `window.__scrubTicker` còn undefined và việc đăng ký im lặng biến
    // mất — chờ tới khi nó có rồi mới bám, thay vì chụp một lần rồi thôi.
    (function attach() {
      var t = window.__scrubTicker;
      if (t) t.add(readFoldGate);
      else window.requestAnimationFrame(attach);
    })();
  }

  // --- TOUR ANNOTATION: cảnh nổ tung, hiện ở frame cuối ----------------------
  // Trả về một hàm teardown() để M3 gọi trước khi mount lại — ngắt ticker,
  // timer, resize listener, ResizeObserver, và gỡ DOM nó đã tạo.
  function buildAnnotation(anatomyEl) {
    var anatomyStage = anatomyEl && anatomyEl.querySelector('.scrub__stage');
    if (!anatomyStage) return function teardown() {};

    // Toạ độ theo % của KHUNG HÌNH 16:9 gốc, không phải của stage — stage vẽ
    // theo kiểu cover nên phần thừa bị cắt; `.anno__frame` (dưới) chịu đúng
    // phép cắt đó qua syncFrame(), nếu không chấm sẽ trôi khỏi linh kiện.
    //
    // Cột `side` là hướng panel mở lên/xuống so với chấm, do người viết spec
    // CHỌN TAY sau khi soi ảnh thật (chỗ nào trống quanh linh kiện đó), không
    // phải suy ra máy móc từ y<50%/y>=50% — vài điểm (02, 03, 04, 06) lệch khỏi
    // công thức đó có chủ đích. Hướng TRÁI/PHẢI thì spec không cho cột riêng
    // nên tính từ x<50% (mở về phía tâm khung) như mô tả.
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

    // M4 — panel dùng CHUNG cho mobile: khung hẹp không đủ chỗ cho panel bám
    // sát từng chấm như desktop (sẽ tràn ra ngoài) — thay bằng một khối neo
    // đáy stage, rộng hết bề ngang trừ lề, chỉ nội dung điểm active đổ vào.
    // CSS ẩn hẳn trên desktop (anno.css). Nằm ngoài .anno (z-index riêng, xem
    // anno.css) vì .anno có overflow:hidden khớp theo .anno__frame, còn panel
    // này phải khớp theo STAGE, không phải frame.
    var mobilePanel = document.createElement('div');
    mobilePanel.className = 'anno-mobile-panel';

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
    anatomyStage.appendChild(mobilePanel);

    // ---- máy trạng thái -----------------------------------------------
    // M4: mobile giờ tương tác đầy đủ như desktop (tour tự chạy, chạm để khoá)
    // — chỉ khác GIAO DIỆN panel (chung, neo đáy, thay vì bám theo chấm).
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var phase = 'hidden';   // 'hidden' | 'touring' — chỉ điều khiển việc CHẤM có hiện không
    var activeIdx = -1;
    var locked = false;     // ACTIVATED: dừng xoay vĩnh viễn cho lượt xem này
    var hoverCount = 0;     // số điểm đang hover/focus cùng lúc (>0 = tạm dừng vòng xoay)
    var timerId = null;

    function clearTimer() {
      if (timerId !== null) { clearTimeout(timerId); timerId = null; }
    }

    function restartMeterEl(m) {
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
      var p = POINTS[idx];
      mobilePanel.innerHTML =
        '<span class="anno__caption">' + p.n + ' ' + p.label + '</span>' +
        '<span class="anno__line">' + p.note + '</span>' +
        '<span class="anno__foot">' +
          '<span class="anno__count">' + p.n + ' / 6</span>' +
          '<span class="anno__meter"></span>' +
        '</span>';
      mobilePanel.classList.add('is-active');
      if (!reduced) {
        restartMeterEl(meters[idx]);
        restartMeterEl(mobilePanel.querySelector('.anno__meter'));
      }
      // Tính lại clamp NGAY LÚC HIỆN, không dựa vào lần tính ở mount/resize —
      // .scrub__stage là position:sticky nên rect.top của nó chỉ đúng nghĩa
      // (0, hoặc chạm mép nav) khi section ĐANG ở trong đoạn cuộn bị ghim;
      // ở mount (chưa cuộn tới), rect.top là vị trí tài liệu bình thường (một
      // số nghìn px), khiến so sánh với mép nav sai hoàn toàn — đây chính là
      // lý do panel 04 (Vỏ trên) vẫn chui dưới nav dù đã thêm topLimit
      // (Fable fix #3): topLimit tính đúng công thức nhưng tính SAI THỜI ĐIỂM.
      clampPanels();
    }

    function scheduleAdvance() {
      clearTimer();
      if (phase !== 'touring' || locked || reduced || hoverCount) return; // không còn chặn mobile (M4)
      timerId = setTimeout(function () {
        setActive((activeIdx + 1) % POINTS.length);
        scheduleAdvance();
      }, 5000);
    }

    buttons.forEach(function (btn, i) {
      function onEnter() {
        if (phase !== 'touring') return;
        hoverCount++;
        clearTimer();
        if (activeIdx !== i) setActive(i);
      }
      function onLeave() {
        if (phase !== 'touring') return;
        hoverCount = Math.max(0, hoverCount - 1);
        if (!hoverCount) scheduleAdvance(); // "chạy lại với một lượt 5s mới từ điểm hiện tại"
      }
      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);
      btn.addEventListener('focus', onEnter);
      btn.addEventListener('blur', onLeave);
      // M4: click/tap khoá vĩnh viễn trên MỌI thiết bị — trước đây chặn mobile,
      // đó chính là "tắt trải nghiệm" owner bắt lỗi.
      btn.addEventListener('click', function () {
        if (phase !== 'touring') return;
        locked = true;
        clearTimer();
        setActive(i);
      });
    });

    // ---- clamp panel theo-chấm trong hộp .scrub__stage — CHỈ áp dụng khi
    // panel đó thật sự hiển thị (desktop); trên mobile nó bị ẩn hẳn bằng CSS,
    // panel chung (.anno-mobile-panel) đã tự neo đáy bằng CSS, không cần JS. --
    function clampPanels() {
      if (mobileMQ.matches) return;
      var stageRect = anatomyStage.getBoundingClientRect();
      if (!stageRect.width) return;
      // .scrub__stage chỉ có nghĩa hình học đúng khi THẬT SỰ đang ghim
      // (rect.top ~ 0) — bây giờ clampPanels() còn được gọi từ setActive()
      // (Fable fix #3 cần geometry MỚI mỗi lần mở panel, không phải giá trị
      // tính từ lúc mount), nên có thể bị gọi đúng lúc section đang cuộn
      // NGANG QUA (chưa ghim, hoặc vừa nhả), khi rect.top là một số bất kỳ
      // (âm hoặc dương lớn) không phản ánh vị trí thật trên màn hình — clamp
      // theo số đó cho ra nudge vô nghĩa (đã bắt được: 454px). Bỏ qua lần gọi
      // đó, giữ nudge hiện tại; lần gọi kế (resize, hoặc setActive kế tiếp
      // khi đã ghim thật) sẽ tính lại đúng.
      if (Math.abs(stageRect.top) > 2) return;
      var margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-2')) || 16;
      // Fable fix: điểm vỏ trên (y 17.5%) mở panel LÊN TRÊN, và ở gần đỉnh
      // stage panel đó chui xuống dưới .nav sticky (panel + nav đều z-index
      // riêng, panel không tự biết nav chiếm mất phần trên cùng màn hình).
      // Trần trên hiệu lực là mép DƯỚI của nav, không phải mép trên của
      // stage, nếu nav đang che một phần stage (luôn đúng vì cả hai đều
      // sticky top:0 và nav nạp trước nên đứng trên).
      var nav = document.querySelector('.nav');
      var navBottom = nav ? nav.getBoundingClientRect().bottom : stageRect.top;
      var topLimit = Math.max(stageRect.top, navBottom);
      buttons.forEach(function (btn, i) {
        btn.style.setProperty('--nudge-x', '0px');
        btn.style.setProperty('--nudge-y', '0px');
        var r = panels[i].getBoundingClientRect(); // visibility:hidden vẫn đo được layout thật
        var dx = 0, dy = 0;
        if (r.left < stageRect.left + margin) dx = (stageRect.left + margin) - r.left;
        else if (r.right > stageRect.right - margin) dx = (stageRect.right - margin) - r.right;
        if (r.top < topLimit + margin) dy = (topLimit + margin) - r.top;
        else if (r.bottom > stageRect.bottom - margin) dy = (stageRect.bottom - margin) - r.bottom;
        if (dx) btn.style.setProperty('--nudge-x', dx + 'px');
        if (dy) btn.style.setProperty('--nudge-y', dy + 'px');
      });
    }

    // ---- tick: đọc --scrub-progress + data-armed của CHÍNH section anatomy -
    function annotationTick() {
      var p = parseFloat(anatomyEl.style.getPropertyValue('--scrub-progress')) || 0;
      var armed = anatomyEl.getAttribute('data-armed') === 'true';
      var shouldReveal = armed && p >= 0.88;

      if (shouldReveal && phase !== 'touring') {
        phase = 'touring';
        layer.classList.add('is-live');
        locked = false;
        hoverCount = 0;
        setActive(0); // "01 active ngay lập tức kèm panel mở" — trạng thái nghỉ trước vòng xoay đầu
        scheduleAdvance();
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
          // Phòng hờ: xoá neo panel cũ — nếu lần clampPanels() gần nhất lỡ
          // chạy đúng lúc section đang rời khỏi vị trí ghim (geometry nhất
          // thời sai), --nudge-* có thể mang giá trị vô nghĩa; xoá ở đây đảm
          // bảo lượt tour SAU luôn bắt đầu từ 0px, không kế thừa lỗi cũ.
          b.style.setProperty('--nudge-x', '0px');
          b.style.setProperty('--nudge-y', '0px');
        });
        mobilePanel.classList.remove('is-active');
        mobilePanel.innerHTML = '';
        activeIdx = -1;
      }
    }

    var ticker = window.__scrubTicker;
    if (ticker) ticker.add(annotationTick);

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

    function onResize() { syncFrame(); clampPanels(); }
    window.addEventListener('resize', onResize);
    var ro = null;
    if (typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(onResize);
      ro.observe(anatomyStage);
    }

    return function teardown() {
      if (ticker) ticker.remove(annotationTick);
      clearTimer();
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      if (layer.parentNode) layer.parentNode.removeChild(layer);
      if (mobilePanel.parentNode) mobilePanel.parentNode.removeChild(mobilePanel);
    };
  }

  // ---- mount / unmount toàn trang (M3: gọi lại khi vượt ngưỡng 860px) -----
  var heroUnmount = null, anatomyUnmount = null, modesUnmount = null, annotationTeardown = null;

  function mountAll() {
    if (SCENES.hero.el) {
      heroUnmount = mount(SCENES.hero.el, sceneConfig(SCENES.hero));
      buildHeroFold(SCENES.hero.el);
    }
    if (SCENES.anatomy.el) {
      anatomyUnmount = mount(SCENES.anatomy.el, sceneConfig(SCENES.anatomy));
      annotationTeardown = buildAnnotation(SCENES.anatomy.el);
    }
    if (SCENES.modes.el) {
      modesUnmount = mount(SCENES.modes.el, sceneConfig(SCENES.modes));
    }
  }

  function unmountAll() {
    if (heroUnmount) heroUnmount();
    if (anatomyUnmount) anatomyUnmount();
    if (modesUnmount) modesUnmount();
    if (annotationTeardown) annotationTeardown();
    heroUnmount = anatomyUnmount = modesUnmount = annotationTeardown = null;
    clearEngineChildren(SCENES.hero.el);
    clearEngineChildren(SCENES.anatomy.el);
    clearEngineChildren(SCENES.modes.el);
  }

  mountAll();

  // M3: mount lại CHỈ khi thật sự vượt ngưỡng breakpoint — nghe sự kiện
  // `change` của matchMedia, KHÔNG nghe `resize` (thanh URL ẩn/hiện trên
  // mobile bắn resize liên tục; mount lại mỗi lần sẽ giật hình và rò rỉ).
  function onBreakpointCross() { unmountAll(); mountAll(); }
  if (typeof mobileMQ.addEventListener === 'function') {
    mobileMQ.addEventListener('change', onBreakpointCross);
  } else if (typeof mobileMQ.addListener === 'function') {
    mobileMQ.addListener(onBreakpointCross); // Safari cũ chưa có addEventListener trên MediaQueryList
  }
})();
