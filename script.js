/* ══════════════════════════════════════════
   AMIGOS CAFE — script.js
   ══════════════════════════════════════════ */

/* ── 1. NAV — add .scrolled class on scroll ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── 2. LIVE STATUS — open/closed based on device time ── */
(function () {
  const dot = document.getElementById('liveDot');
  const txt = document.getElementById('statusText');
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const OPEN  = 8  * 60;   // 08:00 AM
  const CLOSE = 23 * 60;   // 11:00 PM

  if (mins >= OPEN && mins < CLOSE) {
    dot.classList.remove('closed');
    txt.innerHTML = '<strong style="color:#4caf50;">Open Now</strong>';
  } else {
    dot.classList.add('closed');
    const remaining = mins < OPEN ? OPEN - mins : (24 * 60 - mins) + OPEN;
    const h = Math.floor(remaining / 60);
    const m = remaining % 60;
    const opensMsg = h > 0 ? `Opens in ${h}h ${m}m` : `Opens in ${m}m`;
    txt.innerHTML = `<strong style="color:#f44336;">Closed</strong> · ${opensMsg}`;
  }
})();

/* ── 3. MENU TABS ── */
function switchTab(id, btn) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

/* ── 4. SCROLL FADE-IN ANIMATIONS ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── 5. SMOOTH SCROLL for nav CTA ── */
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  document.getElementById('visit').scrollIntoView({ behavior: 'smooth' });
});
