import { PRODUCTS } from '../config/products.js';
import { load, save } from './storage.js';
import { roundMoney } from './format.js';

const KEY = 'cart.v1';
export const MAX_QTY = 99;

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
const listeners = new Set();

function clampQty(n) {
  n = Math.floor(Number(n));
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_QTY, Math.max(1, n));
}

// Only ids and quantities are stored. Prices ALWAYS come from products.js,
// so edited or tampered storage can never change what a customer is charged.
function hydrate() {
  const raw = load(KEY, []);
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const out = [];
  for (const r of raw) {
    if (r && byId.has(r.id) && !seen.has(r.id)) {
      seen.add(r.id);
      out.push({ id: r.id, qty: clampQty(r.qty) });
    }
  }
  return out;
}

let items = hydrate();

function commit() {
  save(KEY, items);
  const state = getState();
  listeners.forEach((fn) => fn(state));
}

export function getState() {
  const lines = items.map(({ id, qty }) => {
    const p = byId.get(id);
    return {
      id,
      name: p.name,
      unit: p.unit || '',
      price: p.price ?? null,
      qty,
      subtotal: p.price == null ? null : roundMoney(p.price * qty),
      isSample: !!p.isSample,
    };
  });
  const total = roundMoney(lines.reduce((sum, l) => sum + (l.subtotal ?? 0), 0));
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const unpriced = lines.filter((l) => l.price == null).length;
  return { lines, total, count, unpriced };
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function addItem(id, qty = 1) {
  if (!byId.has(id)) return false;
  const found = items.find((i) => i.id === id);
  if (found) found.qty = clampQty(found.qty + qty);
  else items.push({ id, qty: clampQty(qty) });
  commit();
  return true;
}

export function setQty(id, qty) {
  const found = items.find((i) => i.id === id);
  if (!found) return;
  found.qty = clampQty(qty);
  commit();
}

export function increment(id) {
  const found = items.find((i) => i.id === id);
  if (found) setQty(id, found.qty + 1);
}

export function decrement(id) {
  const found = items.find((i) => i.id === id);
  if (!found) return;
  if (found.qty <= 1) removeItem(id);
  else setQty(id, found.qty - 1);
}

export function removeItem(id) {
  items = items.filter((i) => i.id !== id);
  commit();
}

export function clearCart() {
  items = [];
  commit();
}
