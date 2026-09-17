const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    navToggle.textContent = nav.classList.contains('is-open') ? 'Close' : 'Menu';
  });
}

if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
