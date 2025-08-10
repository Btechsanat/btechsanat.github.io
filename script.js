// script.js

// Theme toggle (light/dark saved in localStorage)
const themeBtn = document.querySelector('.toggle-theme');
function applyTheme(saved) {
  if (!saved) return;
  if (saved === 'dark') document.documentElement.dataset.theme = 'dark';
  else document.documentElement.removeAttribute('data-theme');
  const icon = document.querySelector('.toggle-theme i');
  if (icon) icon.className = saved === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('site-theme') || 'dark';
  applyTheme(saved);
});
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = localStorage.getItem('site-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('site-theme', next);
    applyTheme(next);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

function openMenu() {
  navList.classList.add('open');
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navList.setAttribute('aria-hidden', 'false');
}
function closeMenu() {
  navList.classList.remove('open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navList.setAttribute('aria-hidden', 'true');
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    if (navList.classList.contains('open')) closeMenu();
    else openMenu();
  });

  /// close when a nav link clicked (mobile)
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 880) closeMenu();
}));


  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // close when clicking outside the menu on mobile
  document.addEventListener('click', (e) => {
    if (!navList.classList.contains('open')) return;
    const isClickInside = navList.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside && window.innerWidth <= 880) closeMenu();
  });
}

// AOS init (if loaded)
if (window.AOS) AOS.init({ once: true, duration: 700, easing: 'ease-out' });

// IntersectionObserver for welcome drop
document.addEventListener('DOMContentLoaded', () => {
  const toDrop = document.querySelectorAll('.welcome-title, .address-line');
  if (toDrop.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.5 });
    toDrop.forEach(el => obs.observe(el));
  }
});

// Setup AJAX contact handling if present
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const status = document.querySelector('#form-status');
      if (btn) btn.disabled = true, btn.textContent = 'Sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = 'Thanks — message sent!';
          status.style.color = 'green';
          form.reset();
        } else {
          const data = await res.json();
          status.textContent = (data && data.error) ? data.error : 'Oops — there was a problem.';
          status.style.color = 'crimson';
        }
      } catch (err) {
        status.textContent = 'Network error — please try again later.';
        status.style.color = 'crimson';
      } finally {
        if (btn) btn.disabled = false, btn.textContent = 'Send Message';
      }
    });
  }
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = "rgba(255, 215, 102, 0.8)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();
