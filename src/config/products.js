// ============================================================
// ARFA MEDICAL STORE — Categories and product catalog
//
// HOW TO EDIT
//  1. PRICES: add  'product-id': 45  (rupees). Items without a price show
//     "Price on request". Only enter prices you have verified.
//  2. STOCK: add  'product-id': 'in_stock' | 'out_of_stock'.
//     Everything else shows "Confirm with store".
//  3. IMAGES: optional. Set image: 'https://...' on a product only if you
//     have the right to use that image. Otherwise a clean generated
//     illustration is used. Nothing is stored in this project.
//  4. rx: true marks prescription medicines. Review the flags yourself.
//
// Brand names are trademarks of their owners and appear only to identify
// products. Listing a product does not mean it is in stock.
// No strengths, dosages or medical claims are included on purpose.
// ============================================================

export const CATEGORIES = [
  { id: 'fever',     label: 'Fever & Pain Relief',    blurb: 'Tablets, balms and sprays',               icon: 'pill' },
  { id: 'cold',      label: 'Cold, Cough & Flu',      blurb: 'Syrups, lozenges and inhalers',           icon: 'wind' },
  { id: 'allergy',   label: 'Allergy Relief',         blurb: 'Antihistamines and soothing lotions',     icon: 'flower' },
  { id: 'digestion', label: 'Acidity & Digestion',    blurb: 'Antacids and digestive aids',             icon: 'stomach' },
  { id: 'ors',       label: 'ORS & Hydration',        blurb: 'Oral rehydration and glucose powders',    icon: 'drop' },
  { id: 'vitamins',  label: 'Vitamins & Minerals',    blurb: 'Supplements and wellness products',       icon: 'leaf' },
  { id: 'firstaid',  label: 'First Aid & Antiseptics',blurb: 'Bandages, dressings and antiseptics',     icon: 'cross' },
  { id: 'skin',      label: 'Skin Care & Ointments',  blurb: 'Creams, gels and everyday skin care',     icon: 'tube' },
  { id: 'eyeear',    label: 'Eye & Ear Care',         blurb: 'Drops, washes and eye pads',              icon: 'eye' },
  { id: 'baby',      label: 'Baby Care',              blurb: 'Gentle products for little ones',         icon: 'baby' },
  { id: 'hygiene',   label: 'Personal Hygiene',       blurb: 'Daily care and protection essentials',    icon: 'sparkle' },
  { id: 'monitor',   label: 'Health Monitoring',      blurb: 'Thermometers, BP and glucose supplies',   icon: 'pulse' },
  { id: 'equipment', label: 'Basic Medical Equipment',blurb: 'Home-care devices and supports',          icon: 'device' },
];

// ---------- EDIT THESE TWO LISTS ----------
export const PRICES = {
  // 'fp-01': 30,
};

export const STOCK = {
  // 'fp-01': 'in_stock',
};

// ---------- Short descriptions by product form ----------
const FORM_DESC = {
  strip:       'Tablets or capsules. Strength and pack size confirmed by the store.',
  syrup:       'Liquid medicine. Strength and bottle size confirmed by the store.',
  bottle:      'Bottle pack. Size confirmed by the store.',
  tube:        'Cream, gel or ointment tube. Size confirmed by the store.',
  jar:         'Jar pack. Size confirmed by the store.',
  spray:       'Spray pack. Size confirmed by the store.',
  sachet:      'Powder sachets. Pack size confirmed by the store.',
  drops:       'Drops bottle. Size confirmed by the store.',
  box:         'Boxed pack. Pack size confirmed by the store.',
  pack:        'Packaged item. Size and count confirmed by the store.',
  bandage:     'Bandage or dressing. Size confirmed by the store.',
  thermometer: 'Thermometer. Model confirmed by the store.',
  monitor:     'Health monitoring device. Model confirmed by the store.',
  device:      'Medical or home-care device. Model confirmed by the store.',
  mask:        'Protective mask. Type and pack size confirmed by the store.',
  soap:        'Soap bar. Variant confirmed by the store.',
  inhaler:     'Inhaler stick or device. Variant confirmed by the store.',
};

// P(id, name, category, form, { brand, desc, rx })
const P = (id, name, category, form, o = {}) => ({
  id, name, category, form,
  brand: o.brand || '',
  description: o.desc || FORM_DESC[form] || 'Details confirmed by the store.',
  rx: !!o.rx,
  unit: '',
  image: o.image || '',
  isSample: false,
});

const RAW = [
  // ---- Fever & Pain Relief ----
  P('fp-01', 'Paracetamol Tablets', 'fever', 'strip'),
  P('fp-02', 'Crocin (Paracetamol)', 'fever', 'strip', { brand: 'Crocin' }),
  P('fp-03', 'Dolo (Paracetamol)', 'fever', 'strip', { brand: 'Dolo' }),
  P('fp-04', 'Paracetamol Oral Suspension for Children', 'fever', 'syrup', { desc: 'Liquid paracetamol for children. Ask the pharmacist which product suits your child.' }),
  P('fp-05', 'Volini Pain Relief Gel', 'fever', 'tube', { brand: 'Volini' }),
  P('fp-06', 'Moov Pain Relief Spray', 'fever', 'spray', { brand: 'Moov' }),
  P('fp-07', 'Iodex Pain Balm', 'fever', 'jar', { brand: 'Iodex' }),
  P('fp-08', 'Zandu Balm', 'fever', 'jar', { brand: 'Zandu' }),
  P('fp-09', 'Amrutanjan Pain Balm', 'fever', 'jar', { brand: 'Amrutanjan' }),

  // ---- Cold, Cough & Flu ----
  P('cc-01', 'Vicks VapoRub', 'cold', 'jar', { brand: 'Vicks' }),
  P('cc-02', 'Vicks Inhaler', 'cold', 'inhaler', { brand: 'Vicks' }),
  P('cc-03', 'Strepsils Lozenges', 'cold', 'pack', { brand: 'Strepsils' }),
  P('cc-04', 'Herbal Cough Syrup', 'cold', 'syrup'),
  P('cc-05', 'Dabur Honitus Cough Syrup', 'cold', 'syrup', { brand: 'Dabur' }),
  P('cc-06', 'Herbal Throat Lozenges', 'cold', 'pack'),
  P('cc-07', 'Saline Nasal Drops', 'cold', 'drops'),
  P('cc-08', 'Betadine Gargle', 'cold', 'bottle', { brand: 'Betadine' }),
  P('cc-09', 'Cold and Flu Tablets', 'cold', 'strip', { desc: 'Combination cold and flu tablets. Ask the pharmacist which product is suitable.' }),

  // ---- Allergy Relief ----
  P('al-01', 'Cetzine (Cetirizine)', 'allergy', 'strip', { brand: 'Cetzine' }),
  P('al-02', 'Cetirizine Tablets', 'allergy', 'strip'),
  P('al-03', 'Levocetirizine Tablets', 'allergy', 'strip'),
  P('al-04', 'Loratadine Tablets', 'allergy', 'strip'),
  P('al-05', 'Cetirizine Syrup', 'allergy', 'syrup'),
  P('al-06', 'Calamine Lotion', 'allergy', 'bottle'),
  P('al-07', 'Saline Nasal Spray', 'allergy', 'spray'),

  // ---- Acidity & Digestion ----
  P('ad-01', 'Digene Antacid Tablets', 'digestion', 'strip', { brand: 'Digene' }),
  P('ad-02', 'Digene Antacid Gel', 'digestion', 'syrup', { brand: 'Digene' }),
  P('ad-03', 'Eno Fruit Salt', 'digestion', 'sachet', { brand: 'Eno' }),
  P('ad-04', 'Gelusil Antacid', 'digestion', 'strip', { brand: 'Gelusil' }),
  P('ad-05', 'Antacid Liquid', 'digestion', 'syrup'),
  P('ad-06', 'Pudin Hara', 'digestion', 'pack', { brand: 'Dabur' }),
  P('ad-07', 'Hajmola Digestive Tablets', 'digestion', 'jar', { brand: 'Hajmola' }),
  P('ad-08', 'Isabgol (Psyllium Husk)', 'digestion', 'jar'),

  // ---- ORS & Hydration ----
  P('or-01', 'ORS Powder Sachet', 'ors', 'sachet'),
  P('or-02', 'Electral ORS', 'ors', 'sachet', { brand: 'Electral' }),
  P('or-03', 'ORS Ready-to-Drink Liquid', 'ors', 'bottle'),
  P('or-04', 'Glucon-D Glucose Powder', 'ors', 'jar', { brand: 'Glucon-D' }),
  P('or-05', 'Enerzal Energy Drink Powder', 'ors', 'sachet', { brand: 'Enerzal' }),
  P('or-06', 'Glucose Powder', 'ors', 'jar'),

  // ---- Vitamins & Minerals ----
  P('vm-01', 'Limcee Vitamin C Chewable', 'vitamins', 'strip', { brand: 'Limcee' }),
  P('vm-02', 'Vitamin C Tablets', 'vitamins', 'strip'),
  P('vm-03', 'Zinc Supplement Tablets', 'vitamins', 'strip'),
  P('vm-04', 'Zincovit Multivitamin', 'vitamins', 'strip', { brand: 'Zincovit' }),
  P('vm-05', 'Becosules B-Complex Capsules', 'vitamins', 'strip', { brand: 'Becosules' }),
  P('vm-06', 'Vitamin D3 Supplement', 'vitamins', 'bottle'),
  P('vm-07', 'Shelcal Calcium Supplement', 'vitamins', 'strip', { brand: 'Shelcal' }),
  P('vm-08', 'Iron and Folic Acid Supplement', 'vitamins', 'strip'),
  P('vm-09', 'Omega-3 Capsules', 'vitamins', 'bottle'),
  P('vm-10', 'Protinex Protein Powder', 'vitamins', 'jar', { brand: 'Protinex' }),
  P('vm-11', 'Dabur Chyawanprash', 'vitamins', 'jar', { brand: 'Dabur' }),

  // ---- First Aid & Antiseptics ----
  P('fa-01', 'Band-Aid Adhesive Strips', 'firstaid', 'box', { brand: 'Band-Aid' }),
  P('fa-02', 'Crepe Bandage', 'firstaid', 'bandage'),
  P('fa-03', 'Gauze Roll', 'firstaid', 'bandage'),
  P('fa-04', 'Sterile Gauze Pads', 'firstaid', 'box'),
  P('fa-05', 'Absorbent Cotton Roll', 'firstaid', 'pack'),
  P('fa-06', 'Micropore Surgical Tape', 'firstaid', 'pack'),
  P('fa-07', 'Dettol Antiseptic Liquid', 'firstaid', 'bottle', { brand: 'Dettol' }),
  P('fa-08', 'Savlon Antiseptic Liquid', 'firstaid', 'bottle', { brand: 'Savlon' }),
  P('fa-09', 'Betadine Antiseptic Solution', 'firstaid', 'bottle', { brand: 'Betadine' }),
  P('fa-10', 'Savlon Antiseptic Cream', 'firstaid', 'tube', { brand: 'Savlon' }),
  P('fa-11', 'Surgical Spirit', 'firstaid', 'bottle'),
  P('fa-12', 'Burnol Cream', 'firstaid', 'tube', { brand: 'Burnol' }),
  P('fa-13', 'First Aid Kit', 'firstaid', 'box'),
  P('fa-14', 'Instant Cold Pack', 'firstaid', 'pack'),
  P('fa-15', 'Disposable Gloves', 'firstaid', 'box'),

  // ---- Skin Care & Ointments ----
  P('sk-01', 'Boroline Antiseptic Cream', 'skin', 'tube', { brand: 'Boroline' }),
  P('sk-02', 'Vaseline Petroleum Jelly', 'skin', 'jar', { brand: 'Vaseline' }),
  P('sk-03', 'Moisturizing Lotion', 'skin', 'bottle'),
  P('sk-04', 'Sunscreen Lotion', 'skin', 'bottle'),
  P('sk-05', 'Aloe Vera Gel', 'skin', 'tube'),
  P('sk-06', 'Lip Balm', 'skin', 'tube'),
  P('sk-07', 'Nycil Prickly Heat Powder', 'skin', 'jar', { brand: 'Nycil' }),
  P('sk-08', 'Anti-Dandruff Shampoo', 'skin', 'bottle'),

  // ---- Eye & Ear Care ----
  P('ee-01', 'Lubricating Eye Drops', 'eyeear', 'drops'),
  P('ee-02', 'Sterile Saline Eye Wash', 'eyeear', 'bottle'),
  P('ee-03', 'Medicated Eye Drops', 'eyeear', 'drops', { rx: true, desc: 'Prescription medicine. A valid prescription is required.' }),
  P('ee-04', 'Medicated Ear Drops', 'eyeear', 'drops', { rx: true, desc: 'Prescription medicine. A valid prescription is required.' }),
  P('ee-05', 'Sterile Eye Pads', 'eyeear', 'box'),
  P('ee-06', 'Contact Lens Solution', 'eyeear', 'bottle'),

  // ---- Baby Care ----
  P('bb-01', 'Pampers Baby Diapers', 'baby', 'pack', { brand: 'Pampers' }),
  P('bb-02', 'Baby Wipes', 'baby', 'pack'),
  P('bb-03', "Johnson's Baby Lotion", 'baby', 'bottle', { brand: "Johnson's" }),
  P('bb-04', 'Baby Powder', 'baby', 'jar'),
  P('bb-05', 'Baby Soap', 'baby', 'soap'),
  P('bb-06', 'Baby Shampoo', 'baby', 'bottle'),
  P('bb-07', 'Feeding Bottle', 'baby', 'bottle'),
  P('bb-08', 'Diaper Rash Cream', 'baby', 'tube'),
  P('bb-09', 'Baby Nasal Aspirator', 'baby', 'device'),
  P('bb-10', "Woodward's Gripe Water", 'baby', 'syrup', { brand: "Woodward's" }),

  // ---- Personal Hygiene ----
  P('ph-01', 'Hand Sanitizer', 'hygiene', 'bottle'),
  P('ph-02', 'Savlon Handwash', 'hygiene', 'bottle', { brand: 'Savlon' }),
  P('ph-03', 'Dettol Soap', 'hygiene', 'soap', { brand: 'Dettol' }),
  P('ph-04', 'Colgate Toothpaste', 'hygiene', 'tube', { brand: 'Colgate' }),
  P('ph-05', 'Toothbrush', 'hygiene', 'pack'),
  P('ph-06', 'Sanitary Pads', 'hygiene', 'pack'),
  P('ph-07', 'Surgical Face Masks', 'hygiene', 'mask'),
  P('ph-08', 'N95 Face Masks', 'hygiene', 'mask'),
  P('ph-09', 'Cotton Buds', 'hygiene', 'pack'),
  P('ph-10', 'Adult Diapers', 'hygiene', 'pack'),
  P('ph-11', 'Mouthwash', 'hygiene', 'bottle'),

  // ---- Health Monitoring ----
  P('hm-01', 'Digital Thermometer', 'monitor', 'thermometer'),
  P('hm-02', 'Infrared Thermometer', 'monitor', 'thermometer'),
  P('hm-03', 'Omron Digital BP Monitor', 'monitor', 'monitor', { brand: 'Omron' }),
  P('hm-04', 'Accu-Chek Glucometer', 'monitor', 'monitor', { brand: 'Accu-Chek' }),
  P('hm-05', 'OneTouch Glucometer', 'monitor', 'monitor', { brand: 'OneTouch' }),
  P('hm-06', 'Glucose Test Strips', 'monitor', 'box', { desc: 'Test strips must match your glucometer model. Tell the store your meter name.' }),
  P('hm-07', 'Lancets', 'monitor', 'box'),
  P('hm-08', 'Pulse Oximeter', 'monitor', 'device'),
  P('hm-09', 'Digital Weighing Scale', 'monitor', 'device'),
  P('hm-10', 'Pregnancy Test Kit', 'monitor', 'pack'),
  P('hm-11', 'Alcohol Swabs', 'monitor', 'box'),

  // ---- Basic Medical Equipment ----
  P('eq-01', 'Nebulizer', 'equipment', 'device'),
  P('eq-02', 'Steam Vaporizer', 'equipment', 'device'),
  P('eq-03', 'Hot Water Bag', 'equipment', 'pack'),
  P('eq-04', 'Electric Heating Pad', 'equipment', 'device'),
  P('eq-05', 'Walking Stick', 'equipment', 'device'),
  P('eq-06', 'Knee Support', 'equipment', 'pack'),
  P('eq-07', 'Back Support Belt', 'equipment', 'pack'),
  P('eq-08', 'Ankle or Wrist Support', 'equipment', 'pack'),
  P('eq-09', 'Medical Scissors and Tweezers', 'equipment', 'device'),
];

// Final product list: merges editable PRICES and STOCK.
export const PRODUCTS = RAW.map((p) => ({
  ...p,
  price: PRICES[p.id] ?? null,           // null = "Price on request"
  availability: STOCK[p.id] || 'confirm', // confirm | in_stock | out_of_stock
}));
