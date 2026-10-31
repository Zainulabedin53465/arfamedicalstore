import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/motion.js';

gsap.registerPlugin(ScrollTrigger);

export async function initHero() {
  const canvas = document.getElementById('hero-canvas');
  const reduced = prefersReducedMotion();
  let sceneApi = null;

  // Load Three.js lazily so the page shows up fast
  if (canvas) {
    try {
      const probe = document.createElement('canvas');
      const hasGL = !!(probe.getContext('webgl2') || probe.getContext('webgl'));
      if (hasGL) {
        const { createHeroScene } = await import('../scene/heroScene.js');
        sceneApi = createHeroScene(canvas);
      } else {
        canvas.style.background = 'radial-gradient(circle at 50% 45%, rgba(0,229,255,.25), transparent 60%)';
      }
    } catch (err) {
      console.warn('3D scene unavailable, using fallback.', err);
      canvas.style.background = 'radial-gradient(circle at 50% 45%, rgba(0,229,255,.25), transparent 60%)';
    }
  }

  // Intro animation (plays once the loader has gone)
  const words = gsap.utils.toArray('.hero__word');
  const intro = () => {
    if (reduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero__content .eyebrow', { y: 20, opacity: 0, duration: 0.9 })
      .from(words, { yPercent: 110, opacity: 0, rotateX: -60, duration: 1.3, stagger: 0.14 }, '-=0.5')
      .from('.hero__tagline', { y: 24, opacity: 0, duration: 1 }, '-=0.7')
      .from('.hero__sub', { y: 24, opacity: 0, duration: 1 }, '-=0.8')
      .from('#enter-store', { y: 24, opacity: 0, scale: 0.9, duration: 1 }, '-=0.8')
      .from('.hero__scroll', { opacity: 0, duration: 1 }, '-=0.5');
  };

  // Scroll: fade the text out and push the 3D scene deeper
  if (!reduced) {
    ScrollTrigger.create({
      trigger: '#scene-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => sceneApi?.setScroll(self.progress),
    });
    gsap.to('.hero__content', {
      yPercent: -18, opacity: 0.1, ease: 'none',
      scrollTrigger: { trigger: '#scene-hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  return { intro };
}
