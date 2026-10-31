import * as THREE from 'three';
import { isLowPower, prefersReducedMotion, isTouchDevice } from '../utils/motion.js';

export function createHeroScene(canvas) {
  const low = isLowPower();
  const reduced = prefersReducedMotion();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !low, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030814, 0.055);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // ---- Lights ----
  scene.add(new THREE.AmbientLight(0x4a78b8, 0.9));
  const key = new THREE.PointLight(0x00e5ff, 60, 30);
  key.position.set(4, 3, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x2979ff, 50, 30);
  rim.position.set(-5, -2, 3);
  scene.add(rim);

  // ---- Medical cross (extruded plus with bevel) ----
  const arm = 0.62, len = 1.9;
  const s = new THREE.Shape();
  s.moveTo(-arm, len);  s.lineTo(arm, len);   s.lineTo(arm, arm);
  s.lineTo(len, arm);   s.lineTo(len, -arm);  s.lineTo(arm, -arm);
  s.lineTo(arm, -len);  s.lineTo(-arm, -len); s.lineTo(-arm, -arm);
  s.lineTo(-len, -arm); s.lineTo(-len, arm);  s.lineTo(-arm, arm);
  s.closePath();

  const crossGeo = new THREE.ExtrudeGeometry(s, {
    depth: 0.7, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.14, bevelSegments: low ? 2 : 4,
  });
  crossGeo.center();

  const crossMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b2a5c, metalness: 0.65, roughness: 0.18,
    emissive: 0x006a8a, emissiveIntensity: 0.55, clearcoat: 1, clearcoatRoughness: 0.1,
  });
  const cross = new THREE.Mesh(crossGeo, crossMat);

  // Glowing edge outline
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(crossGeo, 30),
    new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.9 })
  );
  cross.add(edges);

  // Soft glow halo behind the cross
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(0x00b7ff) } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'varying vec2 vUv; uniform vec3 uColor; void main(){ float d=distance(vUv,vec2(.5)); float a=smoothstep(.5,.0,d); gl_FragColor=vec4(uColor, a*a*.38); }',
    })
  );
  halo.position.z = -2.2;

  const group = new THREE.Group();
  group.add(cross);
  scene.add(group, halo);

  // ---- Orbiting rings ----
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.35 });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.012, 8, low ? 90 : 160), ringMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.01, 8, low ? 90 : 160), ringMat.clone());
  ring2.material.opacity = 0.2;
  ring1.rotation.x = Math.PI / 2.4;
  ring2.rotation.set(Math.PI / 2.8, 0.5, 0);
  group.add(ring1, ring2);

  // ---- Floating medical shapes (capsules and small crosses) ----
  const floaters = [];
  const capGeo = new THREE.CapsuleGeometry(0.16, 0.42, 4, 10);
  const smallCrossGeo = crossGeo.clone().scale(0.16, 0.16, 0.16);
  const count = low ? 7 : 12;
  for (let i = 0; i < count; i++) {
    const isCap = i % 2 === 0;
    const mat = new THREE.MeshStandardMaterial({
      color: isCap ? 0xe9f6ff : 0x00e5ff, metalness: 0.3, roughness: 0.3,
      emissive: isCap ? 0x2a6fa8 : 0x00a0c0, emissiveIntensity: 0.6,
    });
    const m = new THREE.Mesh(isCap ? capGeo : smallCrossGeo, mat);
    const a = (i / count) * Math.PI * 2;
    const r = 4 + Math.random() * 3.2;
    m.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 5, Math.sin(a) * 2 - 1.5);
    m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    m.userData = { speed: 0.2 + Math.random() * 0.4, phase: Math.random() * 6.28, base: m.position.y };
    scene.add(m);
    floaters.push(m);
  }

  // ---- Particles ----
  const pCount = low ? 350 : 900;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 24;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x7fdcff, size: low ? 0.045 : 0.035, transparent: true, opacity: 0.75,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(particles);

  // ---- Sizing ----
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so the cross never gets cropped
    camera.position.z = w < 700 ? 12.5 : 9;
    group.position.y = w < 700 ? 1.4 : 0;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- Mouse parallax (desktop) ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!isTouchDevice() && !reduced) {
    window.addEventListener('pointermove', (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // ---- Loop (only runs while the hero is on screen) ----
  const clock = new THREE.Clock();
  let visible = true;
  let running = false;
  let raf = 0;
  let scrollProgress = 0; // 0 at top, 1 when hero has scrolled away

  function frame() {
    if (!visible) { running = false; return; }
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    cross.rotation.y = t * 0.45 + mouse.x * 0.5 + scrollProgress * 2.2;
    cross.rotation.x = Math.sin(t * 0.6) * 0.18 + mouse.y * 0.3;
    cross.position.y = Math.sin(t * 0.9) * 0.16;

    ring1.rotation.z = t * 0.2;
    ring2.rotation.z = -t * 0.14;

    floaters.forEach((f) => {
      const d = f.userData;
      f.position.y = d.base + Math.sin(t * d.speed + d.phase) * 0.5;
      f.rotation.x += 0.004 * d.speed * 6;
      f.rotation.y += 0.006 * d.speed * 6;
    });

    particles.rotation.y = t * 0.02 + mouse.x * 0.05;
    particles.position.y = scrollProgress * 2;

    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
    camera.position.z += ((canvas.clientWidth < 700 ? 12.5 : 9) + scrollProgress * 3 - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    clock.start();
    raf = requestAnimationFrame(frame);
  }

  // Render a single still frame when the user prefers reduced motion
  if (reduced) {
    renderer.render(scene, camera);
  } else {
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    }, { threshold: 0.02 });
    io.observe(canvas);
    start();
  }

  return {
    setScroll(p) { scrollProgress = Math.min(1, Math.max(0, p)); },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    },
  };
}
