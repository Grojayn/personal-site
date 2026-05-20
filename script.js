// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Scroll reveal animation
const animateTargets = document.querySelectorAll(
  '.skill-card, .project-card, .stat, .about-text p, .contact-item'
);
animateTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
});

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Like button
const likeStat = document.getElementById('likeStat');
const likeCount = document.getElementById('likeCount');

const storedLikes = localStorage.getItem('like_count');
const hasLiked = localStorage.getItem('liked') === 'true';

if (storedLikes) {
  likeCount.textContent = storedLikes;
}

if (hasLiked) {
  likeStat.classList.add('liked');
}

likeStat.addEventListener('click', () => {
  if (hasLiked || likeStat.classList.contains('liked')) return;

  const current = parseInt(likeCount.textContent, 10) || 0;
  const next = current + 1;

  likeCount.textContent = next;
  localStorage.setItem('like_count', next);
  localStorage.setItem('liked', 'true');
  likeStat.classList.add('liked', 'like-pop');

  setTimeout(() => {
    likeStat.classList.remove('like-pop');
  }, 400);
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
