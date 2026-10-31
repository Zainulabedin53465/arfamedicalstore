import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES } from '../config/products.js';
import { STORE } from '../config/store.js';
import { icon } from '../utils/icons.js';
import { escapeHTML } from '../utils/sanitize.js';
import { prefersReducedMotion, isTouchDevice } from '../utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

// Content for Scene 02. Wording describes how the site works, with no unverified claims.
const FUTURE_CARDS = [
  { icon: 'search', title: 'Browse digitally', text: 'Explore product categories and find what you need from your phone or computer.' },
  { icon: 'cart', title: 'Build your cart', text: 'Add items, change quantities and see your total update instantly.' },
  { icon: 'chat', title: 'Order on WhatsApp', text: 'Send your finished order straight to the store in one tap.' },
];

// Content for Scene 05
const WHY_CARDS = [
  { icon: 'list', title: 'Easy ordering', text: 'Pick your items, enter your details, and your order message is prepared for you.' },
  { icon: 'chat', title: 'Convenient WhatsApp contact', text: 'Talk to the store on the app you already use every day.' },
  { icon: 'pin', title: 'Local store', text: `Find us in ${STORE.address.locality}, ${STORE.address.line2.replace(/\.$/, '')}.` },
  { icon: 'heart', title: 'Customer-friendly service', text: 'Questions about an item? Message the store and ask before you order.' },
];

function renderFuture() {
  const el = document.getElementById('scene-future');
  if (!el) return;
  el.innerHTML = `
    <div class="future__bg" aria-hidden="true">
      <div class="future__grid-lines" data-parallax="0.15"></div>
      <div class="future__ring future__ring--1"></div>
      <div class="future__ring future__ring--2"></div>
    </div>
    <div class="container future__layout">
      <div class="future__intro">
        <span class="eyebrow">The Future of Healthcare</span>
        <h2 class="section-title" id="future-title">Healthcare, <span class="grad">reimagined</span> for your neighbourhood</h2>
        <p class="section-lead">${escapeHTML(STORE.name)} brings a modern, simple way to shop for medical and healthcare products. Browse, build your cart and order, all in a few taps.</p>
        <a href="#scene-products" class="btn btn--primary" style="margin-top:1.6rem">VIEW PRODUCTS</a>
      </div>
      <div class="future__list">
        ${FUTURE_CARDS.map((c) => `
          <article class="tech-card glass">
            <div class="tech-card__icon">${icon(c.icon)}</div>
            <div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.text)}</p></div>
          </article>`).join('')}
      </div>
    </div>`;
}

function renderCategories() {
  const el = document.getElementById('scene-categories');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">Explore Our Products</span>
        <h2 class="section-title" id="categories-title">Find what you <span class="grad">need</span></h2>
        <p class="section-lead">Choose a category to jump straight to its products.</p>
      </div>
      <div class="cat-grid">
        ${CATEGORIES.map((c) => `
          <button type="button" class="cat-card glass" data-cat="${escapeHTML(c.id)}" aria-label="Show ${escapeHTML(c.label)} products">
            <div class="cat-card__icon">${icon(c.icon)}</div>
            <h3>${escapeHTML(c.label)}</h3>
            <p>${escapeHTML(c.blurb)}</p>
            <span class="cat-card__cta">VIEW PRODUCTS &rarr;</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function renderWhy() {
  const el = document.getElementById('scene-why');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">Why Choose Us</span>
        <h2 class="section-title" id="why-title">Healthcare shopping, <span class="grad">made simple</span></h2>
        <p class="section-lead">A straightforward way to order from your local medical store.</p>
      </div>
      <div class="why-grid">
        ${WHY_CARDS.map((c) => `
          <article class="why-card glass">
            <div class="why-card__icon">${icon(c.icon)}</div>
            <h3>${escapeHTML(c.title)}</h3>
            <p>${escapeHTML(c.text)}</p>
          </article>`).join('')}
      </div>
    </div>`;
}

// Category click: tell the catalog to filter, then scroll to it.
function bindCategoryClicks(scrollTo) {
  document.querySelectorAll('.cat-card').forEach((card) => {
    card.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('arfa:category', { detail: { id: card.dataset.cat } }));
      const target = document.getElementById('scene-products');
      if (target) scrollTo(target);
    });
  });
}

// Subtle 3D tilt on desktop only
function bindTilt() {
  if (isTouchDevice() || prefersReducedMotion()) return;
  document.querySelectorAll('.cat-card, .why-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

function animate() {
  if (prefersReducedMotion()) return;
  const fromTo = (targets, trigger, extra = {}) =>
    gsap.from(targets, {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger, start: 'top 82%', once: true },
      ...extra,
    });

  // Scene 02
  fromTo('.future__intro > *', '.future__intro', { x: -40, y: 20 });
  fromTo('.tech-card', '.future__list', { x: 50, y: 0, stagger: 0.18 });
  gsap.to('.future__grid-lines', {
    yPercent: 14, ease: 'none',
    scrollTrigger: { trigger: '#scene-future', start: 'top bottom', end: 'bottom top', scrub: true },
  });
  gsap.to('.future__ring--1', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '#scene-future', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  // Scene 03
  fromTo('#scene-categories .scene__head > *', '#scene-categories .scene__head');
  fromTo('.cat-card', '.cat-grid', { stagger: 0.08 });

  // Scene 05
  fromTo('#scene-why .scene__head > *', '#scene-why .scene__head');
  fromTo('.why-card', '.why-grid', { stagger: 0.14 });
}

export function initSections(scrollTo) {
  renderFuture();
  renderCategories();
  renderWhy();
  bindCategoryClicks(scrollTo);
  bindTilt();
  animate();
}
