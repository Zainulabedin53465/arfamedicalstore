// ============================================================
// ARFA MEDICAL STORE — Business configuration
// Edit this file to update store details across the whole site.
// ============================================================

export const STORE = {
  name: 'ARFA MEDICAL STORE',
  tagline: 'Your Health. Our Priority.',
  description:
    'ARFA Medical Store in Talbarai: premium medical and healthcare products with easy online ordering through WhatsApp.',

  // WhatsApp number WITHOUT +, spaces or dashes. 91 = India country code.
  whatsappNumber: '917205833972',
  // Number as shown to visitors
  phoneDisplay: '+91 72058 33972',
  phoneRaw: '+917205833972',

  address: {
    line1: '754135, Talbarai,',
    line2: 'Near Venketswar School.',
    pincode: '754135',
    locality: 'Talbarai',
    country: 'IN',
  },

  // EDIT THIS: open Google Maps, search your shop, tap Share, copy the link and paste it here.
  // Until you do, this link searches the address text instead of a pinned location.
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('ARFA Medical Store, Talbarai 754135, Near Venketswar School'),

  // EDIT THIS: paste your Google Maps share link here once you have it,
  // or leave it as is to use directions based on the address text.
  directionsLink:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('ARFA Medical Store, Talbarai 754135, Near Venketswar School'),

  // Only add hours here once you are sure of them. Leave empty to show nothing.
  openingHours: '',

  // Site URL, used for SEO. Update after you deploy.
  siteUrl: '',
};

export const CURRENCY = {
  symbol: '₹',
  locale: 'en-IN',
  code: 'INR',
};

// Shown on checkout. Edit wording if you wish.
export const ORDER_NOTICE =
  'Your order is NOT confirmed until you send the WhatsApp message and ARFA Medical Store confirms it. No payment is taken on this website.';
