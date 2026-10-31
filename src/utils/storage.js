// Safe localStorage wrapper. Falls back to memory if storage is blocked
// (private mode, strict browser settings, or Node during tests).
const PREFIX = 'arfa.';
const memory = new Map();

function getStore() {
  try {
    if (typeof localStorage === 'undefined') return null;
    const t = PREFIX + '__t';
    localStorage.setItem(t, '1');
    localStorage.removeItem(t);
    return localStorage;
  } catch {
    return null;
  }
}

export function load(key, fallback = null) {
  const store = getStore();
  try {
    const raw = store ? store.getItem(PREFIX + key) : memory.get(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  const json = JSON.stringify(value);
  const store = getStore();
  try {
    if (store) store.setItem(PREFIX + key, json);
    else memory.set(PREFIX + key, json);
  } catch {
    memory.set(PREFIX + key, json);
  }
}

export function remove(key) {
  const store = getStore();
  try { if (store) store.removeItem(PREFIX + key); } catch { /* ignore */ }
  memory.delete(PREFIX + key);
}
