/* ITUM Muslim Students' Meet-up 2026 — vanilla JS, no dependencies */
(function () {
  'use strict';

  /* ===== CONFIG — edit here only ===== */
  var CONFIG = {
    // Sri Lanka has no DST: fixed UTC+05:30 offset is exact.
    eventStart: '2026-12-12T10:30:00+05:30',
    eventEnd:   '2026-12-12T15:30:00+05:30',
    mapEmbedUrl:      'https://www.google.com/maps?q=Viharamahadevi+Park,+Colombo+00700&output=embed',
    locationShareUrl: 'https://maps.app.goo.gl/txPWtLrLFuiv9TJm6?g_st=iw',
    directionsUrl:    'https://www.google.com/maps/dir/?api=1&destination=Viharamahadevi+Park%2C+Colombo+00700%2C+Sri+Lanka',
    mapTimeoutMs: 10000
  };
  /* To use an exact meeting point later, replace the three map URLs above. */

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ===== Nav: scroll state, progress, parallax ===== */
  var nav = $('#nav'), bar = $('#progress'), art = $('#heroArt'), ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', y > 40);
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (art && !reduce && y < window.innerHeight * 1.2) {
      art.style.transform = 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ===== Mobile menu ===== */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 900) setMenu(false); });

  /* ===== Active section indicator ===== */
  var links = $$('[data-link]');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var id = en.target.id;
      var map = { purpose: 'about', invitation: 'register' };
      var target = map[id] || id;
      links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + target); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('[data-section]').forEach(function (s) { spy.observe(s); });

  /* ===== Scroll reveal with stagger ===== */
  var items = $$('.reveal');
  items.forEach(function (el, i) { el.style.setProperty('--d', ((i % 4) * 0.08) + 's'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ===== Hero particles (few, CSS-animated) ===== */
  var box = $('#particles');
  if (box && !reduce) {
    var n = window.innerWidth < 700 ? 14 : 26, frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (40 + Math.random() * 60) + '%';
      p.style.animationDuration = (9 + Math.random() * 10) + 's';
      p.style.animationDelay = (-Math.random() * 14) + 's';
      frag.appendChild(p);
    }
    box.appendChild(frag);
  }

  /* ===== Countdown ===== */
  var start = new Date(CONFIG.eventStart).getTime();
  var end = new Date(CONFIG.eventEnd).getTime();
  var cd = {
    days: $('#cd-days'), hours: $('#cd-hours'), minutes: $('#cd-minutes'), seconds: $('#cd-seconds')
  };
  var grid = $('#cdGrid'), msg = $('#cdMsg'), label = $('#cdLabel'), sr = $('#cdSr');
  var last = {}, lastSr = -1;

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function setDigit(key, val) {
    if (last[key] === val) return;
    last[key] = val;
    var el = cd[key];
    el.textContent = val;
    if (!reduce) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
  }
  function tick() {
    var now = Date.now();
    if (now >= end) {
      grid.hidden = true; msg.hidden = false;
      label.textContent = 'Event status';
      msg.textContent = 'The meet-up has ended. Thank you for being part of it.';
      return;
    }
    if (now >= start) {
      grid.hidden = true; msg.hidden = false;
      label.textContent = 'Happening now';
      msg.textContent = 'The gathering has begun. Welcome, brothers.';
      setTimeout(tick, 1000);
      return;
    }
    grid.hidden = false; msg.hidden = true;
    var d = Math.floor((start - now) / 1000);
    var days = Math.floor(d / 86400), hours = Math.floor(d % 86400 / 3600),
        minutes = Math.floor(d % 3600 / 60), seconds = d % 60;
    setDigit('days', pad(days)); setDigit('hours', pad(hours));
    setDigit('minutes', pad(minutes)); setDigit('seconds', pad(seconds));
    if (minutes !== lastSr) { // screen-reader update once a minute
      lastSr = minutes;
      sr.textContent = days + ' days, ' + hours + ' hours and ' + minutes + ' minutes remaining.';
    }
    var delay = 1000 - (now % 1000); // stay aligned with the clock
    setTimeout(tick, delay);
  }
  tick();

  /* ===== Location: links + iframe with loading/fallback ===== */
  var open = $('#openLoc'), dir = $('#getDir'), frame = $('#mapIframe');
  var mState = $('#mapState'), mFail = $('#mapFail');
  open.href = CONFIG.locationShareUrl;
  dir.href = CONFIG.directionsUrl;
  var loaded = false;
  function loadMap() {
    if (frame.getAttribute('src')) return;
    var t = setTimeout(function () {
      if (!loaded) { mState.hidden = true; mFail.hidden = false; }
    }, CONFIG.mapTimeoutMs);
    frame.addEventListener('load', function () {
      loaded = true; clearTimeout(t); mFail.hidden = true; mState.classList.add('done');
    });
    frame.src = CONFIG.mapEmbedUrl;
  }
  if ('IntersectionObserver' in window) {
    var mo = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { loadMap(); mo.disconnect(); }
    }, { rootMargin: '300px' });
    mo.observe($('#mapFrame'));
  } else { loadMap(); }

  /* Registration CTAs are plain #register anchors; CSS smooth-scroll handles them.
     Move focus to the section for keyboard and screen-reader users. */
  $$('a[href="#register"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var s = $('#register'); s.setAttribute('tabindex', '-1');
      setTimeout(function () { s.focus({ preventScroll: true }); }, reduce ? 0 : 700);
    });
  });
})();