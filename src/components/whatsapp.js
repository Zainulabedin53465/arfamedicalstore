import { STORE } from '../config/store.js';
import { formatINR } from '../utils/format.js';

// Builds the order text. All amounts come from the cart state,
// which takes prices from products.js (never from user input).
export function buildOrderMessage(customer, state) {
  const out = [];
  out.push(`NEW ORDER — ${STORE.name}`, '');
  out.push(`Customer Name: ${customer.name}`);
  out.push(`Mobile: +91 ${customer.phone}`);
  out.push(`Address: ${customer.address.replace(/\n+/g, ', ')}`);
  out.push('', 'ORDER DETAILS:', '');

  state.lines.forEach((l, i) => {
    out.push(
      `${i + 1}. ${l.name}`,
      `Quantity: ${l.qty}`,
      `Price: ${formatINR(l.price)}`,
      `Subtotal: ${formatINR(l.subtotal)}`,
      ''
    );
  });

  out.push(`TOTAL AMOUNT: ${formatINR(state.total)}`, '');
  out.push('Additional Instructions:', customer.instructions || 'None', '');
  out.push('Please confirm my order.');
  return out.join('\n');
}

export function buildWhatsAppURL(message) {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// A real link click works inside a user gesture on iOS and Android,
// where window.open() is often blocked.
export function openWhatsApp(url) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
