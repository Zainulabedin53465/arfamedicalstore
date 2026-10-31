// Motion and device helpers used by animations and the 3D scene.
const mqReduce = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

export const prefersReducedMotion = () => !!mqReduce?.matches;

export function onReducedMotionChange(fn) {
  mqReduce?.addEventListener?.('change', (e) => fn(e.matches));
}

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const isMobileViewport = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

// Lower-power mode: phones, touch devices or low core counts
export const isLowPower = () =>
  isMobileViewport() || isTouchDevice() || (navigator.hardwareConcurrency || 8) <= 4;
