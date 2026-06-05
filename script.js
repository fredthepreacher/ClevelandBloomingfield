// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Sticky nav
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.style.background = window.scrollY > 60
      ? 'rgba(6,14,28,0.99)'
      : 'rgba(10,22,40,0.97)';
  }
});

// Mobile menu
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.removeAttribute('style');
  } else {
    Object.assign(links.style, {
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: '72px', left: '0', right: '0',
      background: 'rgba(6,14,28,0.99)', padding: '20px 5%',
      gap: '16px', borderBottom: '1px solid rgba(201,168,76,0.2)'
    });
  }
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').removeAttribute('style');
  });
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent! I\'ll be in touch soon.';
  btn.style.cssText = 'background:#10b981;color:white;width:100%;padding:14px;border-radius:10px;border:none;font-size:15px;font-weight:600;';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.removeAttribute('style');
  }, 5000);
}
