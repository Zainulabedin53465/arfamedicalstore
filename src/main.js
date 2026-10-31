import './styles/main.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from './utils/motion.js';
import { initNavigation } from './components/navigation.js';
import { initHero } from './components/hero.js';
import { initSections } from './components/sections.js';
import { initCatalog } from './components/catalog.js';
import { initToast, toast } from './components/toast.js';
import { initCart } from './components/cart.js';
import { initCheckout } from './components/checkout.js';
import { initLocation } from './components/location.js';
import { initFooter } from './components/footer.js';

gsap.registerPlugin(ScrollTrigger);

// ---------- Smooth scrolling (disabled for reduced motion) ----------
let lenis = null;
if (!prefersReducedMotion()) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target) {
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
  if (lenis) lenis.scrollTo(target, { offset: -navH + 1, duration: 1.6 });
  else target.scrollIntoView({ behavior: 'auto' });
}

// ---------- Loader ----------
let loaderGone = false;
function hideLoader() {
  if (loaderGone) return;
  loaderGone = true;
  const loader = document.getElementById('loader');
  loader?.classList.add('is-hidden');
  setTimeout(() => loader?.remove(), 900);
}

// ---------- Boot ----------
async function boot() {
  // Safety net: never leave visitors staring at the loader
  const safety = setTimeout(hideLoader, 6000);

  // Build all scenes (order matters: the toast must exist before the catalog uses it)
  initNavigation(scrollToTarget);
  initToast();
  initSections(scrollToTarget);
  initCatalog(toast);
  initCart(scrollToTarget, toast);
  initCheckout(toast);
  initLocation();
  initFooter();

  // Hero (3D) is optional: the store works even if it fails
  let hero = null;
  try {
    hero = await initHero();
  } catch (err) {
    console.warn('Hero scene failed, continuing without 3D.', err);
  }

  clearTimeout(safety);
  hideLoader();
  hero?.intro();

  // Recalculate scroll positions after fonts and layout settle
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
}

boot().catch((err) => {
  console.error(err);
  hideLoader();
});
