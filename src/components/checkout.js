import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getState, subscribe } from '../utils/cartStore.js';
import { formatINR } from '../utils/format.js';
import {
  escapeHTML, validateName, validatePhone, validateAddress, validateInstructions,
} from '../utils/sanitize.js';
import { STORE, ORDER_NOTICE } from '../config/store.js';
import { WHATSAPP_ICON, icon } from '../utils/icons.js';
import { prefersReducedMotion } from '../utils/motion.js';
import { buildOrderMessage, buildWhatsAppURL, openWhatsApp, copyText } from './whatsapp.js';

gsap.registerPlugin(ScrollTrigger);

const VALIDATORS = {
  name: validateName,
  phone: validatePhone,
  address: validateAddress,
  instructions: validateInstructions,
};

let showToast = () => {};
let form, fallback, fallbackText, fallbackLink;
let lastMessage = '';

function fieldHTML({ key, label, optional, hint, control }) {
  return `
    <div class="field" data-field="${key}">
      <label for="f-${key}">${label}${optional ? ' <span class="opt">(optional)</span>' : ''}</label>
      ${control}
      ${hint ? `<span class="field__hint" id="h-${key}">${hint}</span>` : ''}
      <span class="field__error" id="e-${key}" role="alert"></span>
    </div>`;
}

function setError(key, message) {
  const wrap = form.querySelector(`[data-field="${key}"]`);
  const input = form.querySelector(`[name="${key}"]`);
  wrap.classList.toggle('has-error', !!message);
  wrap.querySelector('.field__error').textContent = message || '';
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function renderSummary(state) {
  const empty = document.getElementById('checkout-empty');
  const main = document.getElementById('checkout-main');
  const has = state.lines.length > 0;
  empty.hidden = has;
  main.hidden = !has;

  // Any change to the cart makes a previously generated message out of date
  fallback.hidden = true;

  if (!has) return;

  document.getElementById('summary-list').innerHTML = state.lines.map((l) => `
    <div class="order-summary__line">
      <span>${escapeHTML(l.name)} × ${l.qty}</span>
      <span>${formatINR(l.subtotal)}</span>
    </div>`).join('');
  document.getElementById('summary-total').textContent = formatINR(state.total);
  document.getElementById('summary-count').textContent = String(state.count);
  document.getElementById('summary-warn').hidden = !state.lines.some((l) => l.isSample);
}

function showFallback(message, url) {
  lastMessage = message;
  fallbackText.textContent = message; // textContent, so customer input can never run as HTML
  fallbackLink.href = url;
  fallback.hidden = false;
  fallback.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
}

function onSubmit(e) {
  e.preventDefault();
  const state = getState();
  if (!state.lines.length) {
    showToast('Your cart is empty');
    return;
  }

  const values = {};
  let firstBad = null;
  for (const key of Object.keys(VALIDATORS)) {
    const input = form.querySelector(`[name="${key}"]`);
    const r = VALIDATORS[key](input.value);
    setError(key, r.ok ? '' : r.error);
    values[key] = r.value;
    if (!r.ok && !firstBad) firstBad = input;
  }
  if (firstBad) {
    firstBad.focus();
    return;
  }

  const message = buildOrderMessage(values, state);
  const url = buildWhatsAppURL(message);
  openWhatsApp(url);
  showFallback(message, url);
}

export function initCheckout(toastFn) {
  const el = document.getElementById('scene-checkout');
  if (!el) return;
  if (typeof toastFn === 'function') showToast = toastFn;

  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">WhatsApp Order</span>
        <h2 class="section-title" id="checkout-title">Send your order on <span class="grad">WhatsApp</span></h2>
        <p class="section-lead">Enter your details. We prepare your order message, and you send it to the store on WhatsApp.</p>
      </div>

      <div class="cart-empty glass" id="checkout-empty">
        <div class="cat-card__icon">${icon('cart')}</div>
        <h3>Nothing to order yet</h3>
        <p>Add items to your cart first, then come back here.</p>
        <a href="#scene-products" class="btn btn--primary">BROWSE PRODUCTS</a>
      </div>

      <div class="checkout-layout" id="checkout-main" hidden>
        <form class="form glass" id="checkout-form" novalidate>
          ${fieldHTML({ key: 'name', label: 'Full name',
            control: '<input id="f-name" name="name" type="text" autocomplete="name" maxlength="60" required aria-describedby="e-name" />' })}
          ${fieldHTML({ key: 'phone', label: 'Mobile number', hint: '10 digit Indian mobile number',
            control: '<input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="16" required aria-describedby="h-phone e-phone" />' })}
          ${fieldHTML({ key: 'address', label: 'Delivery address',
            control: '<textarea id="f-address" name="address" autocomplete="street-address" maxlength="250" required aria-describedby="e-address"></textarea>' })}
          ${fieldHTML({ key: 'instructions', label: 'Additional instructions', optional: true,
            control: '<textarea id="f-instructions" name="instructions" maxlength="300" aria-describedby="e-instructions"></textarea>' })}

          <div class="notice notice--warn"><strong>Please note:</strong> ${escapeHTML(ORDER_NOTICE)}</div>

          <button type="submit" class="btn btn--whatsapp btn--block">${WHATSAPP_ICON}<span>SEND ORDER ON WHATSAPP</span></button>
          <p class="field__hint">WhatsApp opens with your order already written. You must press Send there. We only use these details to prepare your message, and they are not stored on this website.</p>

          <div class="checkout-fallback" id="checkout-fallback" hidden>
            <p class="notice"><strong>Your message is ready, but NOT sent yet.</strong> If WhatsApp did not open, tap the green button below, or copy the message and send it to <a href="tel:${STORE.phoneRaw}"><strong>${escapeHTML(STORE.phoneDisplay)}</strong></a>. Your order is confirmed only after the store replies on WhatsApp.</p>
            <pre id="fallback-text" tabindex="0" aria-label="Order message"></pre>
            <a class="btn btn--whatsapp btn--block" id="fallback-link" href="#" target="_blank" rel="noopener noreferrer">${WHATSAPP_ICON}<span>OPEN WHATSAPP</span></a>
            <button type="button" class="btn btn--ghost btn--block btn--sm" id="fallback-copy">COPY MESSAGE</button>
          </div>
        </form>

        <aside class="order-summary glass" aria-label="Order summary">
          <h3>Order summary</h3>
          <div class="order-summary__list" id="summary-list"></div>
          <div class="cart-summary__row"><span>Items</span><span id="summary-count">0</span></div>
          <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span id="summary-total">₹0</span></div>
          <p class="notice notice--warn" id="summary-warn" hidden>Your cart contains sample products with placeholder prices.</p>
          <a href="#scene-cart" class="btn btn--ghost btn--block btn--sm">EDIT CART</a>
        </aside>
      </div>
    </div>`;

  form = document.getElementById('checkout-form');
  fallback = document.getElementById('checkout-fallback');
  fallbackText = document.getElementById('fallback-text');
  fallbackLink = document.getElementById('fallback-link');

  form.addEventListener('submit', onSubmit);

  // Validate each field when the user leaves it, and clear its error while typing
  Object.keys(VALIDATORS).forEach((key) => {
    const input = form.querySelector(`[name="${key}"]`);
    input.addEventListener('blur', () => {
      if (input.value === '' && key !== 'instructions') return;
      const r = VALIDATORS[key](input.value);
      setError(key, r.ok ? '' : r.error);
    });
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') setError(key, '');
    });
  });

  document.getElementById('fallback-copy').addEventListener('click', async () => {
    const ok = await copyText(lastMessage);
    showToast(ok ? 'Message copied' : 'Could not copy. Select the text manually.');
  });

  renderSummary(getState());
  subscribe(renderSummary);

  if (!prefersReducedMotion()) {
    gsap.from('#scene-checkout .scene__head > *', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#scene-checkout .scene__head', start: 'top 85%', once: true },
    });
  }
}
