// ─── Scroll Reveal ───────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 75);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Sticky Nav ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// ─── Mobile Menu ─────────────────────────────────────────────
let mobilePanel = null;

function toggleMenu() {
  if (!mobilePanel) {
    mobilePanel = document.createElement('div');
    mobilePanel.className = 'mobile-nav-panel';
    const links = [
      ['#services', 'Services'],
      ['#medicare', 'Medicare'],
      ['#annuities', 'Annuities'],
      ['#about', 'About'],
      ['#testimonials', 'Reviews'],
      ['#faq', 'FAQ'],
      ['#contact', 'Contact'],
      ['tel:9412766928', '📞 (941) 276-6928'],
    ];
    links.forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      a.addEventListener('click', closeMenu);
      mobilePanel.appendChild(a);
    });
    document.body.appendChild(mobilePanel);
  }

  const isOpen = mobilePanel.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    mobilePanel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  if (mobilePanel) {
    mobilePanel.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobilePanel && mobilePanel.classList.contains('open')) {
    if (!navbar.contains(e.target) && !mobilePanel.contains(e.target)) {
      closeMenu();
    }
  }
});

// ─── FAQ Accordion ───────────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    openItem.classList.remove('open');
    const a = openItem.querySelector('.faq-answer');
    if (a) a.classList.remove('open');
  });

  // Open this one if it wasn't open
  if (!isOpen) {
    item.classList.add('open');
    answer.classList.add('open');
  }
}

// ─── Contact Form ────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent! I\'ll be in touch soon.';
  btn.style.cssText = 'background:#10b981;color:white;width:100%;padding:13px;border-radius:10px;border:none;font-size:15px;font-weight:600;cursor:default;letter-spacing:0.02em;';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = original;
    btn.removeAttribute('style');
  }, 5000);
}

// ─── Hero Particles ──────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${3 + Math.random() * 5}s;
      --delay: ${Math.random() * 6}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

// ─── Smooth Anchor with Offset ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Active Nav Highlighting ─────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
