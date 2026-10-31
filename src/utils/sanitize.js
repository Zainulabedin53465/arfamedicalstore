// ---------- Display safety ----------
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };

export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"'`]/g, (c) => ESC[c]);
}

// Remove control characters, collapse spaces, trim, limit length.
// keepNewlines: allow line breaks (for address and instructions).
export function cleanText(value, maxLen = 200, keepNewlines = false) {
  let s = String(value ?? '');
  s = s.replace(/\r\n?/g, '\n');
  s = keepNewlines
    ? s.replace(/[^\S\n]+/g, ' ').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    : s.replace(/\s+/g, ' ').replace(/[\u0000-\u001F\u007F]/g, '');
  if (keepNewlines) s = s.replace(/\n{3,}/g, '\n\n').replace(/ ?\n ?/g, '\n');
  return s.trim().slice(0, maxLen);
}

// ---------- Validators: return { ok, value, error } ----------
export function validateName(raw) {
  const value = cleanText(raw, 60);
  if (value.length < 2) return { ok: false, value, error: 'Please enter your full name.' };
  if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(value)) {
    return { ok: false, value, error: 'Name can contain only letters, spaces and . - \'' };
  }
  return { ok: true, value, error: '' };
}

// Accepts 10 digit Indian mobile numbers, with optional +91 / 91 / 0 prefix
export function validatePhone(raw) {
  let digits = String(raw ?? '').replace(/[\s\-().]/g, '');
  if (!/^\+?\d+$/.test(digits)) {
    return { ok: false, value: digits, error: 'Mobile number can contain only digits.' };
  }
  digits = digits.replace(/^\+/, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { ok: false, value: digits, error: 'Enter a valid 10 digit Indian mobile number.' };
  }
  return { ok: true, value: digits, error: '' };
}

export function validateAddress(raw) {
  const value = cleanText(raw, 250, true);
  if (value.length < 10) {
    return { ok: false, value, error: 'Please enter your full delivery address (at least 10 characters).' };
  }
  return { ok: true, value, error: '' };
}

// Optional field
export function validateInstructions(raw) {
  const value = cleanText(raw, 300, true);
  return { ok: true, value, error: '' };
}
