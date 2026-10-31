import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORE } from '../config/store.js';
import { escapeHTML } from '../utils/sanitize.js';
import { icon, WHATSAPP_ICON } from '../utils/icons.js';
import { prefersReducedMotion } from '../utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

export function initLocation() {
  const el = document.getElementById('scene-location');
  if (!el) return;

  const waLink = `https://wa.me/${STORE.whatsappNumber}`;

  el.innerHTML = `
    <div class="container">
      <div class="scene__head">
        <span class="eyebrow">Visit Us</span>
        <h2 class="section-title" id="location-title">Find the <span class="grad">store</span></h2>
        <p class="section-lead">Visit ${escapeHTML(STORE.name)} in ${escapeHTML(STORE.address.locality)}, or message us before you come.</p>
      </div>

      <div class="location-layout">
        <div class="location-card glass">
          <h3>${escapeHTML(STORE.name)}</h3>
          <address class="location-address" style="font-style:normal">
            ${escapeHTML(STORE.address.line1)}<br />${escapeHTML(STORE.address.line2)}
          </address>

          <div class="location-info">
            <span>PIN code: ${escapeHTML(STORE.address.pincode)}</span>
            <span>Phone / WhatsApp: <a href="tel:${escapeHTML(STORE.phoneRaw)}">${escapeHTML(STORE.phoneDisplay)}</a></span>
            ${STORE.openingHours ? `<span>Hours: ${escapeHTML(STORE.openingHours)}</span>` : ''}
          </div>

          <div class="location-actions">
            <a class="btn btn--primary" href="${escapeHTML(STORE.mapsLink)}" target="_blank" rel="noopener noreferrer">${icon('pin')}<span>GOOGLE MAPS</span></a>
            <a class="btn btn--ghost" href="${escapeHTML(STORE.directionsLink)}" target="_blank" rel="noopener noreferrer">${icon('navigation')}<span>GET DIRECTIONS</span></a>
            <a class="btn btn--whatsapp" href="${escapeHTML(waLink)}" target="_blank" rel="noopener noreferrer">${WHATSAPP_ICON}<span>WHATSAPP US</span></a>
            <a class="btn btn--ghost" href="tel:${escapeHTML(STORE.phoneRaw)}">${icon('phone')}<span>CALL</span></a>
          </div>
        </div>

        <div class="map-visual" aria-hidden="true">
          <div class="map-visual__grid"></div>
          <span class="map-visual__pulse"></span>
          <span class="map-visual__pulse"></span>
          <div class="map-visual__pin">${icon('pin')}</div>
        </div>
      </div>
    </div>`;

  if (!prefersReducedMotion()) {
    gsap.from('#scene-location .scene__head > *', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#scene-location .scene__head', start: 'top 85%', once: true },
    });
    gsap.from('.location-card, .map-visual', {
      y: 50, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
      scrollTrigger: { trigger: '.location-layout', start: 'top 82%', once: true },
    });
  }
}
