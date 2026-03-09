/* ════════════════════════════════════════
   Fluxr Landing Page — script.js
   ════════════════════════════════════════ */

// ── Mobile menu toggle ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when any link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal (IntersectionObserver) ──
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Nav shadow on scroll ──
const navEl = document.querySelector('nav');

window.addEventListener('scroll', () => {
  navEl.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.3)'
    : 'none';
});
