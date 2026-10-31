import { CURRENCY } from '../config/store.js';

// Round to 2 decimals to avoid floating point errors (e.g. 0.1 + 0.2)
export function roundMoney(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

// 1234.5 -> "₹1,234.50", 120 -> "₹120"
export function formatINR(amount) {
  const value = roundMoney(amount);
  const hasPaise = Math.abs(value % 1) > 0;
  const text = new Intl.NumberFormat(CURRENCY.locale, {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
  return CURRENCY.symbol + text;
}
