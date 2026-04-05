// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth animate-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .process-step').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Projects toggle
function toggleProjects() {
  const extra = document.getElementById('projectsExtra');
  const btn = document.getElementById('projectsToggle');
  extra.classList.toggle('show');
  btn.textContent = extra.classList.contains('show') ? 'הסתר פרויקטים' : 'פרויקטים נוספים';
}

// About more toggle
function toggleAboutMore() {
  const section = document.getElementById('about-more');
  const btn = document.querySelector('.about-more-btn');
  section.classList.toggle('open');
  btn.textContent = section.classList.contains('open') ? 'סגור' : 'עוד על אירית שור';
}

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'שולח...';
  btn.disabled = true;

  const data = new FormData(form);
  fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
    .then(() => {
      btn.textContent = 'הפנייה נשלחה! נחזור אליכם בקרוב.';
      btn.style.background = '#2a2a2a';
      btn.style.color = '#C9A84C';
      btn.style.cursor = 'default';
      form.reset();
    })
    .catch(() => {
      btn.textContent = 'שגיאה בשליחה — נסו שוב';
      btn.disabled = false;
    });
}
