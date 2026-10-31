// ============================================================
// ARFA MEDICAL STORE — Categories and products
//
// ALL PRODUCTS BELOW ARE SAMPLE DATA.
// Names, prices and stock are placeholders, not real medicines.
// Replace them with your real items. Keep `isSample: true` until you do,
// then set it to false (or delete the line) for each real product.
//
// Product fields:
//   id        unique text, no spaces (example: 'p-101')
//   name      product name shown to customers
//   category  must match a category id below
//   price     number in rupees (example: 120 or 49.5)
//   unit      short description of the pack, optional (example: 'Strip of 10')
//   image     path inside /public/images, or '' to use the built-in icon
//   isSample  true = shows a "Sample" badge
// ============================================================

export const CATEGORIES = [
  { id: 'medicines',   label: 'Medicines',            blurb: 'Prescription and over-the-counter items',  icon: 'pill' },
  { id: 'healthcare',  label: 'Healthcare Products',  blurb: 'Everyday health and monitoring needs',     icon: 'heart' },
  { id: 'personal',    label: 'Personal Care',        blurb: 'Hygiene and daily care essentials',        icon: 'sparkle' },
  { id: 'firstaid',    label: 'First Aid',            blurb: 'Be ready for small emergencies',           icon: 'cross' },
  { id: 'baby',        label: 'Baby Care',            blurb: 'Gentle products for little ones',          icon: 'baby' },
  { id: 'equipment',   label: 'Medical Equipment',    blurb: 'Devices and home-care equipment',          icon: 'device' },
  { id: 'wellness',    label: 'Vitamins & Wellness',  blurb: 'Supplements and wellness support',         icon: 'leaf' },
];

export const PRODUCTS = [
  { id: 'p-101', name: 'Sample Medicine A',        category: 'medicines',  price: 50,  unit: 'Sample pack',  image: '', isSample: true },
  { id: 'p-102', name: 'Sample Medicine B',        category: 'medicines',  price: 120, unit: 'Sample pack',  image: '', isSample: true },
  { id: 'p-201', name: 'Sample Health Monitor',    category: 'healthcare', price: 800, unit: '1 piece',      image: '', isSample: true },
  { id: 'p-301', name: 'Sample Hand Wash',         category: 'personal',   price: 90,  unit: '1 bottle',     image: '', isSample: true },
  { id: 'p-401', name: 'Sample First Aid Kit',     category: 'firstaid',   price: 350, unit: '1 kit',        image: '', isSample: true },
  { id: 'p-501', name: 'Sample Baby Care Item',    category: 'baby',       price: 180, unit: '1 pack',       image: '', isSample: true },
  { id: 'p-601', name: 'Sample Equipment Item',    category: 'equipment',  price: 1500, unit: '1 piece',     image: '', isSample: true },
  { id: 'p-701', name: 'Sample Wellness Product',  category: 'wellness',   price: 250, unit: '1 bottle',     image: '', isSample: true },
];
