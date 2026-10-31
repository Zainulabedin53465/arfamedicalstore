import { STORE } from '../config/store.js';
import { escapeHTML } from '../utils/sanitize.js';

export function initFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = `
    <div class="footer__inner">
      <div class="footer__brand">
        <strong>${escapeHTML(STORE.name)}</strong>
        <p>${escapeHTML(STORE.tagline)}</p>
        <p>Medical and healthcare products with easy WhatsApp ordering.</p>
      </div>

      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="#scene-categories">Categories</a></li>
          <li><a href="#scene-products">Products</a></li>
          <li><a href="#scene-cart">Cart</a></li>
          <li><a href="#scene-location">Location</a></li>
        </ul>
      </div>

      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${escapeHTML(STORE.phoneRaw)}">${escapeHTML(STORE.phoneDisplay)}</a></li>
          <li><a href="https://wa.me/${escapeHTML(STORE.whatsappNumber)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li>${escapeHTML(STORE.address.line1)}<br />${escapeHTML(STORE.address.line2)}</li>
        </ul>
      </div>

      <p class="footer__legal">
        &copy; ${new Date().getFullYear()} ${escapeHTML(STORE.name)}. All rights reserved.
        Orders are confirmed only when the store replies on WhatsApp. No payment is taken on this website.
        Product information shown may be sample data until replaced by the store.
        For medical advice, consult a qualified healthcare professional.
      </p>
    </div>`;
}
