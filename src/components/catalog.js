import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES, PRODUCTS } from '../config/products.js';
import { addItem, MAX_QTY } from '../utils/cartStore.js';
import { formatINR } from '../utils/format.js';
import { escapeHTML } from '../utils/sanitize.js';
import { icon } from '../utils/icons.js';
import { prefersReducedMotion } from '../utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

const catById = new Map(CATEGORIES.map((c) => [c.id, c]));
let activeCat = 'all';
let showToast = () => {};

function cardHTML(p) {
  const cat = catById.get(p.category);
  const media = p.image
    ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" decoding="async" width="400" height="300" />`
    : `<div class="product-card__icon">${icon(cat?.icon || 'cross')}</div>`;
  return `
    <article class="product-card glass" data-id="${escapeHTML(p.id)}">
      <div class="product-card__media">
        ${media}
        ${p.isSample ? '<span class="badge--sample">Sample</span>' : ''}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${escapeHTML(cat?.label || '')}</span>
        <h3 class="product-card__name">${escapeHTML(p.name)}</h3>
        ${p.unit ? `<p class="product-card__unit">${escapeHTML(p.unit)}</p>` : ''}
        <p class="product-card__price">${formatINR(p.price)}</p>
        <div class="product-card__actions">
          <div class="qty" role="group" aria-label="Quantity for ${escapeHTML(p.name)}">
            <button type="button" class="qty__btn" data-act="dec" aria-label="Decrease quantity" disabled>&minus;</button>
            <span class="qty__value" aria-live="polite">1</span>
            <button type="button" class="qty__btn" data-act="inc" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn btn--primary btn--sm" data-act="add">ADD TO CART</button>
        </div>
      </div>
    </article>`;
}

function renderGrid(animateIn = false) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const list = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCat);
  grid.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : '<p class="empty-state">No products in this category yet.</p>';

  if (animateIn && !prefersReducedMotion()) {
    gsap.from('#product-grid .product-card', { y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity' });
  }
}

function renderChips() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  const chips = [{ id: 'all', label: 'All' }, ...CATEGORIES];
  bar.innerHTML = chips.map((c) => `
    <button type="button" class="chip${c.id === activeCat ? ' is-active' : ''}" data-cat="${escapeHTML(c.id)}" aria-pressed="${c.id === activeCat}">
      ${escapeHTML(c.label)}
    </button>`).join('');
}

function setCategory(id) {
  activeCat = id === 'all' || catById.has(id) ? id : 'all';
  renderChips();
  renderGrid(true);
}

function bindEvents() {
  // Filter chips
  document.getElementById('filter-bar')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) setCategory(chip.dataset.cat);
  });

  // Quantity + add to cart (one delegated listener for the whole grid)
  document.getElementById('product-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const card = btn.closest('.product-card');
    if (!card) return;
    const valueEl = card.querySelector('.qty__value');
    const decBtn = card.querySelector('[data-act="dec"]');
    const incBtn = card.querySelector('[data-act="inc"]');
    let qty = parseInt(valueEl.textContent, 10) || 1;

    if (btn.dataset.act === 'inc') qty = Math.min(MAX_QTY, qty + 1);
    if (btn.dataset.act === 'dec') qty = Math.max(1, qty - 1);

    if (btn.dataset.act === 'add') {
      const id = card.dataset.id;
      if (addItem(id, qty)) {
        const name = card.querySelector('.product-card__name').textContent;
        showToast(`Added ${qty} × ${name} to cart`);
        qty = 1; // reset selector after adding
        if (!prefersReducedMotion()) gsap.fromTo(btn, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
      }
    }

    valueEl.textContent = String(qty);
    decBtn.disabled = qty <= 1;
    incBtn.disabled = qty >= MAX_QTY;
  });

  // Category cards from Scene 03
  window.addEventListener('arfa:category', (e) => setCategory(e.detail?.id));
}

export function initCatalog(toastFn) {
  const el = document.getElementById('scene-products');
  if (!el) return;
  if (typeof toastFn === 'function') showToast = toastFn;

  const hasSample = PRODUCTS.some((p) => p.isSample);

  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">Medicine Collection</span>
        <h2 class="section-title" id="products-title">Our <span class="grad">collection</span></h2>
        <p class="section-lead">Choose a quantity and add items to your cart.</p>
      </div>
      ${hasSample ? `
        <div class="sample-banner" role="note">
          <strong>Sample data:</strong>&nbsp;Product names and prices below are placeholders and not real items. The store owner will replace them.
        </div>` : ''}
      <div class="filter-bar" id="filter-bar" role="toolbar" aria-label="Filter products by category"></div>
      <div class="product-grid" id="product-grid"></div>
    </div>`;

  renderChips();
  renderGrid(false);
  bindEvents();

  if (!prefersReducedMotion()) {
    gsap.from('#scene-products .scene__head > *', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#scene-products .scene__head', start: 'top 85%', once: true },
    });
  }
}
