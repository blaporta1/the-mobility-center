/* =====================================================
   The Mobility Center — script.js
   ===================================================== */

'use strict';

// ── Sticky Header ──────────────────────────────────────
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Mobile Menu ────────────────────────────────────────
const navToggle   = document.getElementById('navToggle');
const mobileMenu  = document.getElementById('mobileMenu');
const menuClose   = document.getElementById('menuClose');

function openMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  navToggle?.classList.add('open');
  navToggle?.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  menuClose?.focus();
}

function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  navToggle?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  navToggle?.focus();
}

navToggle?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeMenu() : openMenu();
});
menuClose?.addEventListener('click', closeMenu);

// Close on overlay click
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) closeMenu();
});

// ── Active Nav Link ────────────────────────────────────
(function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === 'index.html') ||
        (path === ''   && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// ── Testimonial Slider ─────────────────────────────────
class Slider {
  constructor(container) {
    this.container  = container;
    this.track      = container.querySelector('.testimonials-track');
    this.slides     = Array.from(container.querySelectorAll('.testimonial'));
    this.dots       = Array.from(container.querySelectorAll('.slider-dot'));
    this.prevBtn    = container.querySelector('.slider-prev');
    this.nextBtn    = container.querySelector('.slider-next');
    this.current    = 0;
    this.perView    = this._perView();
    this.total      = Math.ceil(this.slides.length / this.perView);
    this.autoTimer  = null;
    this.touchStartX = 0;

    if (!this.track || this.slides.length < 2) return;
    this._bind();
    this._render();
    this._auto();
  }

  _perView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  _render() {
    const offset = -(this.current * (100 / this._perView())) + '%';
    this.track.style.transform = `translateX(${offset})`;

    this.dots.forEach((d, i) => {
      d.classList.toggle('active', i === this.current);
      d.setAttribute('aria-pressed', i === this.current ? 'true' : 'false');
    });

    if (this.prevBtn) this.prevBtn.disabled = this.current === 0;
    if (this.nextBtn) this.nextBtn.disabled = this.current >= this.total - 1;
  }

  prev() { if (this.current > 0) { this.current--; this._render(); } }
  next() { if (this.current < this.total - 1) { this.current++; this._render(); } else { this.current = 0; this._render(); } }
  goTo(i) { this.current = i; this._render(); }

  _auto() {
    this.autoTimer = setInterval(() => this.next(), 5000);
    this.container.addEventListener('mouseenter', () => clearInterval(this.autoTimer));
    this.container.addEventListener('mouseleave', () => { this.autoTimer = setInterval(() => this.next(), 5000); });
  }

  _bind() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.dots.forEach((d, i) => d.addEventListener('click', () => this.goTo(i)));

    // Keyboard
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    this.track.addEventListener('touchstart', (e) => { this.touchStartX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend',   (e) => {
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(dx) > 50) dx < 0 ? this.next() : this.prev();
    }, { passive: true });

    window.addEventListener('resize', () => {
      const p = this._perView();
      if (p !== this.perView) { this.perView = p; this.total = Math.ceil(this.slides.length / p); this.current = 0; this._render(); }
    }, { passive: true });
  }
}

document.querySelectorAll('.testimonials-slider').forEach(el => new Slider(el));

// ── Scroll Animation (IntersectionObserver) ────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

// ── Form Validation ─────────────────────────────────────
class FormValidator {
  constructor(form) {
    this.form    = form;
    this.fields  = form.querySelectorAll('[data-validate]');
    this.submit  = form.querySelector('[type="submit"]');
    this._bind();
  }

  _bind() {
    this.fields.forEach(field => {
      field.addEventListener('blur', () => this._validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) this._validateField(field);
      });
    });
    this.form.addEventListener('submit', (e) => this._onSubmit(e));
  }

  _validateField(field) {
    const rules = (field.dataset.validate || '').split(' ');
    let error   = '';
    const val   = field.value.trim();

    if (rules.includes('required') && !val)       error = 'This field is required.';
    if (!error && rules.includes('email') && val)  error = this._validEmail(val) ? '' : 'Please enter a valid email address.';
    if (!error && rules.includes('phone') && val)  error = this._validPhone(val) ? '' : 'Please enter a valid phone number.';
    if (!error && rules.includes('minlen') && val) {
      const min = parseInt(field.dataset.minlen || 3, 10);
      if (val.length < min) error = `Minimum ${min} characters required.`;
    }

    this._showError(field, error);
    return !error;
  }

  _validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  _validPhone(v) { return /^[\d\s\-\(\)\+\.]{7,20}$/.test(v); }

  _showError(field, message) {
    field.classList.toggle('error', !!message);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    const errEl = field.parentNode.querySelector('.form-error');
    if (errEl) { errEl.textContent = message; errEl.style.display = message ? 'block' : 'none'; }
  }

  _onSubmit(e) {
    e.preventDefault();
    let valid = true;
    this.fields.forEach(f => { if (!this._validateField(f)) valid = false; });

    if (!valid) {
      const firstErr = this.form.querySelector('.form-control.error');
      firstErr?.focus();
      return;
    }

    this._submitForm();
  }

  _submitForm() {
    if (this.submit) {
      this.submit.classList.add('loading');
      this.submit.disabled = true;
    }

    // Simulate async submission
    setTimeout(() => {
      this._showSuccess();
    }, 1400);
  }

  _showSuccess() {
    const wrap    = this.form.closest('[data-form-wrap]');
    const success = wrap?.querySelector('[data-form-success]');
    if (success && wrap) {
      this.form.style.display = 'none';
      success.style.display   = 'flex';
      success.setAttribute('aria-live', 'polite');
      success.focus?.();
    } else {
      // fallback
      if (this.submit) { this.submit.classList.remove('loading'); this.submit.disabled = false; }
      const banner = document.createElement('div');
      banner.className = 'alert alert--success';
      banner.setAttribute('role', 'alert');
      banner.innerHTML = `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Thank you! We'll be in touch within one business day.</span>`;
      this.form.parentNode.insertBefore(banner, this.form);
      this.form.reset();
    }
  }
}

document.querySelectorAll('form[data-validate-form]').forEach(f => new FormValidator(f));

// ── Smooth scroll for anchor links ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

// ── FAQ Accordion ───────────────────────────────────────
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';

    // Close siblings
    btn.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(other => {
      const b = other.querySelector('.accordion-btn');
      const c = other.querySelector('.accordion-content');
      if (b && c && other !== item) {
        b.setAttribute('aria-expanded', 'false');
        c.style.maxHeight = '0';
        c.style.opacity   = '0';
      }
    });

    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    if (isOpen) {
      content.style.maxHeight = '0';
      content.style.opacity   = '0';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity   = '1';
    }
  });
});

// ── Counter Animation ───────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
