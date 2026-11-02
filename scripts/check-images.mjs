const { IMAGES } = await import(process.cwd() + '/src/config/catalogData.js');
const entries = Object.entries(IMAGES);
if (!entries.length) { console.log('No images set yet.'); process.exit(0); }

let bad = 0;
for (const [id, url] of entries) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    const type = res.headers.get('content-type') || '';
    const size = (await res.arrayBuffer()).byteLength;
    const kb = Math.round(size / 1024);
    const issues = [];
    if (!res.ok) issues.push('HTTP ' + res.status);
    if (!type.startsWith('image/')) issues.push('not an image (' + type + ')');
    if (size > 200 * 1024) issues.push(kb + ' KB is too heavy for mobile, use a smaller or WebP version');
    if (issues.length) { bad++; console.log('PROBLEM', id, '-', issues.join('; '), '\n   ', url); }
    else console.log('ok     ', id, kb + ' KB', type);
  } catch (e) {
    bad++; console.log('PROBLEM', id, '- unreachable:', e.message, '\n   ', url);
  }
}
console.log(bad ? `\n${bad} image(s) need attention.` : '\nAll images reachable and light.');
