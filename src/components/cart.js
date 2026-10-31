import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getState, subscribe, increment, decrement, removeItem, clearCart, MAX_QTY } from '../utils/cartStore.js';
import { formatINR } from '../utils/format.js';
import { escapeHTML } from '../utils/sanitize.js';
import { icon } from '../utils/icons.js';
import { prefersReducedMotion } from '../utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

let scrollTo = () => {};
let showToast = () => {};
let confirmTimer = 0;
let confirmingClear = false;

function lineHTML(l) {
  return `
    <div class="cart-item" data-id="${escapeHTML(l.id)}">
      <div>
        <p class="cart-item__name">${escapeHTML(l.name)}${l.isSample ? ' <span class="badge--sample" style="position:static;margin-left:.4rem">Sample</span>' : ''}</p>
        <p class="cart-item__meta">${l.unit ? escapeHTML(l.unit) + ' · ' : ''}${formatINR(l.price)} each</p>
      </div>
      <div class="cart-item__controls">
        <div class="qty" role="group" aria-label="Quantity for ${escapeHTML(l.name)}">
          <button type="button" class="qty__btn" data-act="dec" aria-label="Decrease quantity of ${escapeHTML(l.name)}">&minus;</button>
          <span class="qty__value">${l.qty}</span>
          <button type="button" class="qty__btn" data-act="inc" aria-label="Increase quantity of ${escapeHTML(l.name)}" ${l.qty >= MAX_QTY ? 'disabled' : ''}>+</button>
        </div>
        <span class="cart-item__sub">${formatINR(l.subtotal)}</span>
        <button type="button" class="icon-btn" data-act="remove" aria-label="Remove ${escapeHTML(l.name)} from cart">${icon('trash')}</button>
      </div>
    </div>`;
}

function render(state) {
  const root = document.getElementById('cart-content');
  if (!root) return;

  // Remember focus so keyboard users do not lose their place after a re-render
  const active = document.activeElement;
  const focusKey = active && root.contains(active)
    ? { act: active.dataset.act, id: active.closest('[data-id]')?.dataset.id }
    : null;

  if (state.lines.length === 0) {
    confirmingClear = false;
    root.innerHTML = `
      <div class="cart-empty glass">
        <div class="cat-card__icon">${icon('cart')}</div>
        <h3>Your cart is empty</h3>
        <p>Add items from the collection to start your order.</p>
        <a href="#scene-products" class="btn btn--primary">BROWSE PRODUCTS</a>
      </div>`;
    return;
  }

  const hasSample = state.lines.some((l) => l.isSample);

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-list glass" aria-label="Items in your cart">
        ${state.lines.map(lineHTML).join('')}
      </div>
      <aside class="cart-summary glass" aria-label="Order total">
        <div class="cart-summary__row"><span>Items</span><span>${state.count}</span></div>
        <div class="cart-summary__row"><span>Subtotal</span><span>${formatINR(state.total)}</span></div>
        <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span>${formatINR(state.total)}</span></div>
        ${hasSample ? '<p class="notice notice--warn">Your cart contains sample products with placeholder prices.</p>' : ''}
        <p class="field__hint">No payment is taken on this website. You will send your order to the store on WhatsApp.</p>
        <button type="button" class="btn btn--primary btn--block" data-act="checkout">ORDER NOW</button>
        <button type="button" class="btn btn--ghost btn--block btn--sm" data-act="clear">${confirmingClear ? 'TAP AGAIN TO CONFIRM' : 'CLEAR CART'}</button>
      </aside>
    </div>`;

  if (focusKey) {
    const sel = focusKey.id
      ? `[data-id="${CSS.escape(focusKey.id)}"] [data-act="${focusKey.act}"]`
      : `[data-act="${focusKey.act}"]`;
    root.querySelector(sel)?.focus({ preventScroll: true });
  }
}

function bindEvents() {
  document.getElementById('cart-content')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = btn.closest('[data-id]')?.dataset.id;

    switch (btn.dataset.act) {
      case 'inc': increment(id); break;
      case 'dec': decrement(id); break;
      case 'remove': removeItem(id); showToast('Item removed'); break;
      case 'clear':
        if (!confirmingClear) {
          confirmingClear = true;
          render(getState());
          clearTimeout(confirmTimer);
          confirmTimer = setTimeout(() => { confirmingClear = false; render(getState()); }, 3000);
        } else {
          clearTimeout(confirmTimer);
          confirmingClear = false;
          clearCart();
          showToast('Cart cleared');
        }
        break;
      case 'checkout': {
        const target = document.getElementById('scene-checkout');
        if (target) scrollTo(target);
        break;
      }
    }
  });
}

export function initCart(scrollFn, toastFn) {
  const el = document.getElementById('scene-cart');
  if (!el) return;
  if (typeof scrollFn === 'function') scrollTo = scrollFn;
  if (typeof toastFn === 'function') showToast = toastFn;

  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">Your Cart</span>
        <h2 class="section-title" id="cart-title">Review your <span class="grad">order</span></h2>
        <p class="section-lead">Change quantities, remove items, and check your total before ordering.</p>
      </div>
      <div id="cart-content"></div>
    </div>`;

  render(getState());
  bindEvents();
  subscribe(render);

  if (!prefersReducedMotion()) {
    gsap.from('#scene-cart .scene__head > *', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#scene-cart .scene__head', start: 'top 85%', once: true },
    });
  }
}
