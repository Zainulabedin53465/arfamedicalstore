import fs from 'node:fs';
const { PRODUCTS } = await import(process.cwd() + '/src/config/products.js');
const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const head = ['id', 'category', 'name', 'price', 'availability', 'image'];
const rows = PRODUCTS.map((p) => [
  p.id, p.category, p.name,
  p.price ?? '',
  p.availability === 'confirm' ? '' : p.availability,
  p.image || '',
]);
fs.writeFileSync('catalog.csv', [head, ...rows].map((r) => r.map(q).join(',')).join('\n') + '\n');
console.log('Wrote catalog.csv with', rows.length, 'products');
