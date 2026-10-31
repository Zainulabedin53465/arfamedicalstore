import { subscribe, getState } from '../utils/cartStore.js';
import { STORE } from '../config/store.js';

const LINKS = [
  { href: '#scene-future', label: 'About' },
  { href: '#scene-categories', label: 'Categories' },
  { href: '#scene-products', label: 'Products' },
  { href: '#scene-why', label: 'Why Us' },
  { href: '#scene-location', label: 'Location' },
];

const LOGO = `<svg class="nav__logo" viewBox="0 0 64 64" aria-hidden="true">
  <defs><linearGradient id="nl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#2979ff"/></linearGradient></defs>
  <path d="M25 6h14v19h19v14H39v19H25V39H6V25h19z" fill="url(#nl)"/></svg>`;

const CART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>`;
const MENU_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

export function initNavigation(scrollTo) {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav__inner">
      <a href="#scene-hero" class="nav__brand" aria-label="${STORE.name} home">
        ${LOGO}<span>${STORE.name}</span>
      </a>
      <nav class="nav__links" id="nav-links" aria-label="Main">
        ${LINKS.map((l) => `<a class="nav__link" href="${l.href}">${l.label}</a>`).join('')}
      </nav>
      <div class="nav__actions">
        <a href="#scene-cart" class="nav__cart" aria-label="Open cart">
          ${CART_ICON}<span class="nav__badge" id="cart-badge" hidden>0</span>
        </a>
        <button class="nav__toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${MENU_ICON}</button>
      </div>
    </div>`;

  const toggle = nav.querySelector('#nav-toggle');
  const badge = nav.querySelector('#cart-badge');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = open ? CLOSE_ICON : MENU_ICON;
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  // Smooth anchor scrolling for every in-page link
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    scrollTo(target);
  });

  // Cart badge
  const renderBadge = ({ count }) => {
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.hidden = count === 0;
  };
  renderBadge(getState());
  subscribe(renderBadge);

  // Background on scroll + hide on scroll down
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 30);
    const goingDown = y > lastY && y > 400;
    nav.classList.toggle('is-hidden', goingDown && !nav.classList.contains('is-open'));
    lastY = y;
  }, { passive: true });

  // Highlight the active section
  const links = [...nav.querySelectorAll('.nav__link')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  LINKS.forEach((l) => { const el = document.querySelector(l.href); if (el) io.observe(el); });
}
