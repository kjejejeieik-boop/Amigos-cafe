/* ══════════════════════════════════════════════════════
   AMIGOS CAFE — Premium Edition script.js
   ══════════════════════════════════════════════════════ */

/* ── 1. PAGE LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 1500);
});

/* ── 2. CUSTOM CURSOR ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Cursor hover states */
document.querySelectorAll('a, button, .dish-card, .menu-tab, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

/* ── 3. NAV SCROLL EFFECT ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

/* ── 4. LIVE STATUS ── */
(function () {
  const dot2 = document.getElementById('liveDot');
  const txt  = document.getElementById('statusTxt');
  if (!dot2 || !txt) return;

  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const OPEN  = 8 * 60;
  const CLOSE = 23 * 60;

  if (mins >= OPEN && mins < CLOSE) {
    dot2.classList.remove('closed');
    txt.innerHTML = '<strong style="color:#4caf50">Open Now</strong>';
  } else {
    dot2.classList.add('closed');
    const left = mins < OPEN ? OPEN - mins : (24 * 60 - mins) + OPEN;
    const h = Math.floor(left / 60), m = left % 60;
    txt.innerHTML = `<strong style="color:#ef5350">Closed</strong> · Opens in ${h > 0 ? h + 'h ' : ''}${m}m`;
  }
})();

/* ── 5. MENU TABS ── */
function switchTab(id, btn) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}
window.switchTab = switchTab;

/* ── 6. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── 7. COUNTER ANIMATION ── */
function animateCounter(el) {
  const raw    = el.dataset.target;
  const isFloat = raw.includes('.');
  const target  = parseFloat(raw);
  const suffix  = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ── 8. MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.28;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.28;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
    btn.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1)';
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform .15s ease';
  });
});

/* ── 9. NAV "FIND US" CTA ── */
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
});

/* ── 10. PARALLAX HERO FLOATS (subtle) ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.hero-float').forEach((el, i) => {
    const speed = (i % 2 === 0) ? 0.08 : 0.05;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

/* ── 11. DISH CARD — subtle tilt on hover ── */
document.querySelectorAll('.dish-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1), border-color .3s, box-shadow .4s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .15s ease, border-color .3s, box-shadow .4s';
  });
});
