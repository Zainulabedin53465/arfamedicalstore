import { STORE } from '../config/store.js';
import { WHATSAPP_ICON } from '../utils/icons.js';

let el = null;
let timer = 0;

export function initToast() {
  el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  document.body.appendChild(el);

  // Floating WhatsApp button (opens a plain chat, no order)
  const fab = document.createElement('a');
  fab.className = 'fab-whatsapp';
  fab.href = `https://wa.me/${STORE.whatsappNumber}`;
  fab.target = '_blank';
  fab.rel = 'noopener noreferrer';
  fab.setAttribute('aria-label', 'Chat with ARFA Medical Store on WhatsApp');
  fab.innerHTML = WHATSAPP_ICON;
  document.body.appendChild(fab);
}

export function toast(message) {
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-visible'), 2200);
}
