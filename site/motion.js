/* ============================================================================
   motion.js — GSAP choreography cho SECTION TĨNH CHỈ (§0.3). Ranh giới sở
   hữu: GSAP sở hữu section tĩnh · engine + CSS sở hữu cảnh scrub · page.js +
   CSS sở hữu tour annotation. File này không được chạm bất kỳ `.scrub` nào.

   KHÔNG dùng ScrollTrigger (bỏ theo ruling của team-lead — xem index.html):
   mọi timeline ở đây chỉ cần "play khi vào khung, reverse khi rời khung", đó
   đúng là việc của IntersectionObserver — miễn phí, trang đã dùng nó ở
   scrub-section.js rồi, không cần thêm một thư viện scroll riêng cho một việc
   IntersectionObserver làm được (es-lazy: nền tảng có sẵn trước phụ thuộc
   ngoài). Timeline dựng `paused:true`, IO gọi `play()`/`reverse()` — tương
   đương `toggleActions: 'play none none reverse'` cũ, không cần plugin.

   Không có SplitText trong bundle (chỉ core GSAP — không còn ScrollTrigger
   cũng không có SplitText) nên [data-split] tách dòng bằng chính các thẻ
   <br> tác giả đã đặt sẵn trong markup, không đo lại bằng font metrics.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return; // vendored lib vắng mặt: nội dung vẫn đọc được tĩnh

  var css = getComputedStyle(document.documentElement);
  var EASE = 'power4.out'; // tương đương cubic-bezier(0.16, 1, 0.3, 1) — §0.3: một đường cong duy nhất
  var DUR_BASE = (parseFloat(css.getPropertyValue('--motion-base')) || 560) / 1000;
  var DUR_SLOW = (parseFloat(css.getPropertyValue('--motion-slow')) || 900) / 1000;

  var mm = gsap.matchMedia();

  // Dùng HAI lệnh mm.add() dạng chuỗi riêng biệt, KHÔNG dùng dạng một object
  // nhiều điều kiện ({reduce: '...'}) — đã kiểm chứng trực tiếp: bản
  // gsap.min.js 3.15.0 vendor (chỉ core, không có ScrollTrigger đi kèm) nhận
  // mm.add() dạng object mà không throw lỗi nào, nhưng callback KHÔNG BAO GIỜ
  // chạy (xác nhận bằng console.log đặt ngay đầu callback — không in ra dù
  // không có exception). Dạng chuỗi đơn hoạt động đúng trong cùng bản này.
  // Không phải lỗi do gỡ ScrollTrigger — gsap.matchMedia là core API, đã test
  // cô lập cả hai dạng trên chính bản lib này.
  mm.add('(prefers-reduced-motion: reduce)', function () {
    gsap.set('[data-split], [data-row], [data-count]', { clearProps: 'all' });
    // reduced motion: mọi thứ hiện sẵn, không tween nào được tạo
  });

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var timelines = []; // { el, tl } — el là phần tử IntersectionObserver quan sát

    // 1 — [data-split]: mỗi dòng (theo <br> có sẵn) dựng lên từ dưới mặt nạ
    // .line-mask (đã khai ở page.css). motion-base, không phải motion-slow —
    // §0.3 dành motion-slow riêng cho chữ cỡ display, mà display type chỉ
    // sống trong cảnh scrub (GSAP bị cấm đụng vào), nên không phần tử tĩnh
    // nào ở đây đủ điều kiện dùng motion-slow.
    document.querySelectorAll('[data-split]').forEach(function (el) {
      var lines = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = '';
      var spans = lines.map(function (line) {
        var mask = document.createElement('span');
        mask.className = 'line-mask';
        var span = document.createElement('span');
        span.innerHTML = line.trim();
        mask.appendChild(span);
        el.appendChild(mask);
        return span;
      });
      var tl = gsap.timeline({ paused: true });
      tl.from(spans, { yPercent: 100, duration: DUR_BASE, ease: EASE, stagger: 0.08 });
      timelines.push({ el: el, tl: tl });
    });

    // 2 — [data-row]: cả danh sách vào cùng lượt cuộn, so le theo thứ tự hàng.
    document.querySelectorAll('.row-list').forEach(function (list) {
      var rows = list.querySelectorAll('[data-row]');
      if (!rows.length) return;
      var tl = gsap.timeline({ paused: true });
      tl.from(rows, { autoAlpha: 0, y: 16, duration: DUR_BASE, ease: EASE, stagger: 0.08 });
      timelines.push({ el: list, tl: tl });
    });

    // 3 — [data-count]: đếm tới đúng giá trị trong thuộc tính rồi dừng khớp số
    // thật (không lệch số lẻ). motion-slow ở đây theo đúng T5.3 — số cỡ lớn
    // trong dải .figs đọc như "chữ cỡ display" dù không mang token đó.
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var textNode = el.firstChild;
      if (isNaN(target) || !textNode) return;
      var counter = { val: 0 };
      var tl = gsap.timeline({ paused: true });
      tl.to(counter, {
        val: target,
        duration: DUR_SLOW,
        ease: EASE,
        onUpdate: function () { textNode.nodeValue = String(Math.round(counter.val)); }
      });
      timelines.push({ el: el, tl: tl });
    });

    // IntersectionObserver thay ScrollTrigger: play khi phần tử vào khung,
    // reverse khi rời khung — đúng hành vi 'play none none reverse' cũ.
    // threshold 0.25 + rootMargin âm ở đáy: kích hoạt sớm một chút trước khi
    // phần tử chạm hẳn mép dưới thật của viewport, không phải đợi đến giây
    // cuối mới bắt đầu dựng chữ lên.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        for (var i = 0; i < timelines.length; i++) {
          if (timelines[i].el !== entry.target) continue;
          if (entry.isIntersecting) timelines[i].tl.play();
          else timelines[i].tl.reverse();
          break;
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

    timelines.forEach(function (t) { io.observe(t.el); });
  });
})();
