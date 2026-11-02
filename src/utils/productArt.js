// Generated product illustrations (inline SVG).
// Generic shapes by product FORM, not photos of real brands, so nothing here
// can be mistaken for a specific medicine pack. Zero files, zero requests.

const C = '#00e5ff';      // cyan accent
const W = '#eaf6ff';      // white-ish body
const B = '#2979ff';      // blue accent
const D = '#0b2a5c';      // dark fill

const svg = (inner) =>
  `<svg viewBox="0 0 120 120" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

const plus = (x, y, s = 7) =>
  `<path d="M${x - s / 3} ${y - s}h${(s * 2) / 3}v${s * 2 / 3}h${s * 2 / 3}v${(s * 2) / 3}h${-s * 2 / 3}v${(s * 2) / 3}h${(-s * 2) / 3}v${(-s * 2) / 3}h${-s * 2 / 3}v${(-s * 2) / 3}h${(s * 2) / 3}z" fill="${C}"/>`;

const ART = {
  strip: svg(`
    <rect x="16" y="34" width="88" height="52" rx="8" fill="${D}" stroke="${C}" stroke-width="2"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${24 + i * 20}" y="44" width="14" height="32" rx="7" fill="${W}" stroke="${B}" stroke-width="1.5"/>`).join('')}`),

  syrup: svg(`
    <rect x="44" y="14" width="32" height="14" rx="3" fill="${B}"/>
    <rect x="36" y="28" width="48" height="82" rx="10" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="36" y="58" width="48" height="52" rx="10" fill="${C}" opacity=".28"/>
    <rect x="42" y="44" width="36" height="22" rx="4" fill="${W}"/>${plus(60, 55, 6)}`),

  bottle: svg(`
    <rect x="48" y="12" width="24" height="16" rx="3" fill="${B}"/>
    <path d="M46 28h28l8 14v58a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10V42z" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="44" y="56" width="32" height="26" rx="4" fill="${W}"/>${plus(60, 69, 7)}`),

  tube: svg(`
    <path d="M30 20h60l-6 18H36z" fill="${B}"/>
    <path d="M36 38h48l-8 66H44z" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="46" y="54" width="28" height="26" rx="4" fill="${W}"/>${plus(60, 67, 7)}
    <rect x="48" y="104" width="24" height="6" rx="2" fill="${C}"/>`),

  jar: svg(`
    <rect x="26" y="26" width="68" height="20" rx="6" fill="${B}" stroke="${C}" stroke-width="2"/>
    <rect x="30" y="46" width="60" height="58" rx="10" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="38" y="58" width="44" height="30" rx="5" fill="${W}"/>${plus(60, 73, 8)}`),

  spray: svg(`
    <rect x="50" y="10" width="26" height="12" rx="3" fill="${B}"/>
    <path d="M76 14h14" stroke="${C}" stroke-width="3"/><path d="M96 10l8-4M96 16h10M96 22l8 4" stroke="${C}" stroke-width="2"/>
    <rect x="54" y="22" width="18" height="12" fill="${D}" stroke="${C}" stroke-width="1.5"/>
    <rect x="40" y="34" width="46" height="76" rx="10" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="46" y="54" width="34" height="28" rx="4" fill="${W}"/>${plus(63, 68, 7)}`),

  sachet: svg(`
    <path d="M28 22h64l-4 78H32z" fill="${D}" stroke="${C}" stroke-width="2"/>
    <path d="M28 22h64M30 30h60" stroke="${B}" stroke-width="2" stroke-dasharray="3 3"/>
    <rect x="40" y="46" width="40" height="30" rx="5" fill="${W}"/>${plus(60, 61, 8)}`),

  drops: svg(`
    <path d="M52 10h16v16H52z" fill="${B}"/>
    <path d="M50 26h20l6 10v62a8 8 0 0 1-8 8H52a8 8 0 0 1-8-8V36z" fill="${D}" stroke="${C}" stroke-width="2"/>
    <path d="M60 52s9 10 9 17a9 9 0 0 1-18 0c0-7 9-17 9-17Z" fill="${C}"/>`),

  box: svg(`
    <path d="M16 40l44-18 44 18v52L60 108 16 92z" fill="${D}" stroke="${C}" stroke-width="2"/>
    <path d="M16 40l44 18 44-18M60 58v50" stroke="${B}" stroke-width="2"/>
    ${plus(38, 78, 7)}`),

  pack: svg(`
    <rect x="22" y="26" width="76" height="70" rx="10" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="22" y="26" width="76" height="14" rx="6" fill="${B}"/>
    <rect x="34" y="52" width="52" height="30" rx="5" fill="${W}"/>${plus(60, 67, 9)}`),

  bandage: svg(`
    <rect x="14" y="40" width="92" height="40" rx="20" fill="${W}" stroke="${C}" stroke-width="2" transform="rotate(-20 60 60)"/>
    <rect x="42" y="46" width="36" height="28" rx="3" fill="${C}" opacity=".35" transform="rotate(-20 60 60)"/>
    ${[0, 1, 2, 3].map((i) => `<circle cx="${30 + i * 5}" cy="${75 - i * 2}" r="1.4" fill="${B}"/>`).join('')}`),

  thermometer: svg(`
    <rect x="18" y="52" width="84" height="18" rx="9" fill="${W}" stroke="${C}" stroke-width="2" transform="rotate(-25 60 61)"/>
    <circle cx="38" cy="73" r="0.1" fill="${B}"/>
    <rect x="34" y="55" width="34" height="12" rx="3" fill="${D}" transform="rotate(-25 60 61)"/>
    <path d="M44 62h14" stroke="${C}" stroke-width="2.5" transform="rotate(-25 60 61)"/>`),

  monitor: svg(`
    <rect x="20" y="22" width="80" height="76" rx="12" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="30" y="32" width="60" height="30" rx="5" fill="${W}"/>
    <path d="M36 50h10l4-10 6 16 4-8h14" stroke="${B}" stroke-width="2.5"/>
    <circle cx="44" cy="80" r="7" fill="${C}"/><circle cx="76" cy="80" r="7" fill="${B}"/>`),

  device: svg(`
    <rect x="22" y="30" width="76" height="62" rx="12" fill="${D}" stroke="${C}" stroke-width="2"/>
    <circle cx="60" cy="61" r="18" fill="none" stroke="${C}" stroke-width="3"/>
    ${plus(60, 61, 9)}
    <rect x="44" y="18" width="32" height="12" rx="4" fill="${B}"/>`),

  mask: svg(`
    <path d="M22 44c10-8 66-8 76 0v26c0 14-18 26-38 26S22 84 22 70z" fill="${W}" stroke="${C}" stroke-width="2"/>
    <path d="M32 54h56M32 64h56M32 74h56" stroke="${B}" stroke-width="2"/>
    <path d="M22 50c-10 0-14 6-14 14M98 50c10 0 14 6 14 14" stroke="${C}" stroke-width="2"/>`),

  soap: svg(`
    <rect x="22" y="38" width="76" height="44" rx="14" fill="${W}" stroke="${C}" stroke-width="2"/>
    <rect x="34" y="50" width="52" height="20" rx="6" fill="${D}"/>${plus(60, 60, 6)}
    <circle cx="94" cy="30" r="6" stroke="${C}" stroke-width="1.5"/><circle cx="104" cy="44" r="3.5" stroke="${C}" stroke-width="1.5"/>`),

  inhaler: svg(`
    <rect x="44" y="12" width="32" height="96" rx="16" fill="${D}" stroke="${C}" stroke-width="2"/>
    <rect x="50" y="22" width="20" height="12" rx="6" fill="${B}"/>
    <rect x="50" y="46" width="20" height="30" rx="4" fill="${W}"/>${plus(60, 61, 6)}`),
};

const FALLBACK = ART.pack;

export const productArt = (form) => ART[form] || FALLBACK;
