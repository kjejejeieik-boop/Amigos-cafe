/* ═══════════════════════════════════════════════════
   AMIGOS CAFE — script.js  |  Premium v3
   All bugs fixed · Mobile-first · Cool animations
═══════════════════════════════════════════════════ */

/* ══ 1. PAGE LOADER ══ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 1600);
});

/* ══ 2. CUSTOM CURSOR (desktop only) ══ */
const isTouch = window.matchMedia('(hover: none)').matches;
if (!isTouch) {
  const dot  = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(trackRing);
  })();

  document.querySelectorAll('a,button,.dish,.tab-btn,.gallery-item,.testi,.visit-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hov'); ring.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hov'); ring.classList.remove('hov'); });
  });
}

/* ══ 3. NAV SCROLL ══ */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 70);
}, { passive: true });

/* NAV "Find Us" CTA */
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
});

/* ══ 4. MOBILE HAMBURGER MENU ══ */
const burger = document.getElementById('burger');
const drawer = document.getElementById('mobileDrawer');
const drawerLinks = drawer.querySelectorAll('a');

burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

drawerLinks.forEach(a => {
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ══ 5. LIVE STATUS ══ */
(function () {
  const dot = document.getElementById('liveDot');
  const txt = document.getElementById('statusTxt');
  if (!dot || !txt) return;
  const mins = new Date().getHours() * 60 + new Date().getMinutes();
  const OPEN = 8 * 60, CLOSE = 23 * 60;
  if (mins >= OPEN && mins < CLOSE) {
    dot.classList.remove('closed');
    txt.innerHTML = '<strong style="color:#4caf50">Open Now</strong>';
  } else {
    dot.classList.add('closed');
    const left = mins < OPEN ? OPEN - mins : (1440 - mins + OPEN);
    const h = Math.floor(left / 60), m = left % 60;
    txt.innerHTML = `<strong style="color:#ef5350">Closed</strong> · Opens in ${h > 0 ? h + 'h ' : ''}${m}m`;
  }
})();

/* ══ 6. MENU TABS ══ */
window.switchTab = function(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  document.getElementById('tab-' + id).classList.add('on');
  btn.classList.add('on');
};

/* ══ 7. SCROLL REVEAL ══ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 65);
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.09, rootMargin: '0px 0px -35px 0px' });

document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => revObs.observe(el));

/* ══ 8. COUNTER ANIMATION ══ */
function runCounter(el) {
  const raw    = el.dataset.target;
  const target = parseFloat(raw);
  const isFloat = raw.includes('.');
  const suffix  = el.dataset.suffix || '';
  const dur = 1800;
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 4); // ease-out-quart
    el.textContent = (isFloat ? (target * e).toFixed(1) : Math.floor(target * e)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-n[data-target]').forEach(el => cntObs.observe(el));

/* ══ 9. DISH CARD 3D TILT (desktop) ══ */
if (!isTouch) {
  document.querySelectorAll('.dish').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 7;
      const y = ((e.clientY - r.top)  / r.height - .5) * 7;
      card.style.transition = 'transform .12s ease,border-color .3s,box-shadow .4s';
      card.style.transform = `translateY(-6px) perspective(900px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1),border-color .3s,box-shadow .4s';
      card.style.transform = '';
    });
  });
}

/* ══ 10. MAGNETIC BUTTONS (desktop) ══ */
if (!isTouch) {
  document.querySelectorAll('.btn-mag').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.28;
      const y = (e.clientY - r.top  - r.height / 2) * 0.28;
      btn.style.transition = 'transform .12s ease';
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .55s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform = '';
    });
  });
}

/* ══ 11. HERO PARALLAX (desktop) ══ */
if (!isTouch) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    document.querySelectorAll('.hero-float').forEach((el, i) => {
      el.style.transform = `translateY(${sy * (i % 2 === 0 ? .07 : .04)}px)`;
    });
  }, { passive: true });
}

/* ══ 12. IMAGE ERROR FALLBACK ══ */
document.querySelectorAll('img[data-fallback]').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none'; // hide broken img, parent CSS gradient shows
  });
});
// Also handle all images generically
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.opacity = '0';
  });
});
