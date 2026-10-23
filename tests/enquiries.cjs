/** Run with `node tests/enquiries.cjs`. All storage and email requests are mocked. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { randomUUID } = require('node:crypto');
const store = new Map(); let writes = 0; let calls = []; let failures = []; let storageFail = false;
class BlobNotFoundError extends Error {}
const blob = {
  BlobNotFoundError,
  get: async (name, options) => {
    assert.equal(options.access, 'private'); assert.equal(options.useCache, false);
    if (storageFail) throw new Error('Simulated storage failure');
    const data = store.get(name); if (!data) return null;
    return { statusCode: 200, stream: new Response(data.text).body, blob: { etag: data.etag } };
  },
  put: async (name, text, options) => {
    assert.equal(options.access, 'private'); assert.equal(options.addRandomSuffix, false);
    if (storageFail) throw new Error('Simulated storage failure');
    const old = store.get(name);
    if (old && !options.allowOverwrite) throw new Error('Already exists');
    if (options.ifMatch && options.ifMatch !== old?.etag) throw new Error('Concurrent change');
    const etag = `etag-${++writes}`; store.set(name, { text, etag }); return { etag };
  },
};
const modules = new Map();
function load(filename) {
  filename = path.resolve(filename); if (modules.has(filename)) return modules.get(filename).exports;
  const mod = { exports: {} }; modules.set(filename, mod);
  const js = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const req = name => {
    if (name === '@vercel/blob') return blob;
    if (name === '@/lib/content') return { developments: [{ slug: 'test-development', name: 'Test Development' }] };
    if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
    if (name.startsWith('.')) return load(path.join(path.dirname(filename), name) + '.ts');
    return require(name);
  };
  new Function('require', 'module', 'exports', js)(req, mod, mod.exports); return mod.exports;
}
const shared = load('lib/enquiries/shared.ts');
const server = load('lib/enquiries/server.ts');
const route = load('app/api/enquiries/route.ts');
const originalFetch = global.fetch; const originalEnv = { ...process.env };
const envKeys = ['LEAD_FORMS_ENABLED', 'RESEND_API_KEY', 'ENQUIRY_FROM_EMAIL', 'BLOB_READ_WRITE_TOKEN', 'ENQUIRY_TO_EMAIL', 'LAND_ENQUIRY_TO_EMAIL', 'PROPERTY_ENQUIRY_TO_EMAIL', 'VERCEL', 'VERCEL_ENV'];
const base = () => ({ id: randomUUID(), kind: 'enquiry', name: 'Synthetic QA', email: 'qa@example.com', phone: '+353 12345678', message: 'Synthetic test only. Not a real enquiry.', interest: 'test-development', sourcePath: '/contact', website: '', startedAt: Date.now() - 5000 });
let passed = 0;
function ok(label) { passed++; console.log('PASS', label); }
(async () => { try {
  envKeys.forEach(k => delete process.env[k]);
  assert.equal(server.getDeliveryConfig(), null);
  assert.equal((await (await route.GET()).json()).available, false);
  assert.equal((await route.POST(new Request('https://www.winterbrook.ie/api/enquiries', { method: 'POST', headers: { origin: 'https://www.winterbrook.ie' } }))).status, 503);
  assert.equal(store.size, 0); ok('unconfigured endpoint cannot report success or store submissions');
  const normal = shared.validateSubmission({ ...base(), to: 'attacker@example.com' }, ['test-development']);
  assert.equal(normal.to, undefined);
  for (const patch of [{ name: 'X' }, { email: 'qa@example.com\r\nBcc: x@example.com' }, { message: 'x'.repeat(6001) }, { website: 'bot' }, { interest: 'invented' }, { startedAt: Date.now() }, { sourcePath: '//other.example/path' }, { id: 'not-a-uuid' }]) {
    assert.throws(() => shared.validateSubmission({ ...base(), ...patch }, ['test-development']));
  }
  const land = shared.validateSubmission({ ...base(), kind: 'land', location: 'Synthetic location', role: 'The landowner', size: '1–5 acres', planning: 'Permission granted', structure: 'Joint venture', message: '' }, ['test-development']);
  for (const value of ['Synthetic location', 'The landowner', '1–5 acres', 'Permission granted', 'Joint venture']) assert.ok(shared.emailDetails(land).text.includes(value));
  assert.throws(() => shared.validateSubmission({ ...land, role: 'Invalid value' }, [])); ok('validation, field coverage, header injection and recipient injection');
  Object.assign(process.env, { LEAD_FORMS_ENABLED: 'true', RESEND_API_KEY: 'mock-test-only', ENQUIRY_FROM_EMAIL: 'website@notifications.winterbrook.ie', BLOB_READ_WRITE_TOKEN: 'mock-test-storage-only' });
  const config = server.getDeliveryConfig(); assert.ok(config); assert.deepEqual(config.to, ['info@winterbrook.ie']);
  global.fetch = async (url, opts) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const packet = JSON.parse(opts.body); const id = opts.headers['Idempotency-Key'].split('/')[1];
    assert.ok(store.has(`winterbrook-enquiries/preview/submissions/${id}.json`), 'save before send');
    calls.push({ packet, key: opts.headers['Idempotency-Key'] });
    const status = failures.shift() || 200;
    return Response.json(status === 200 ? { id: `mock-email-${id}` } : { message: 'mock error' }, { status });
  };
  const result = await server.deliverEnquiry(normal, config, 'Test Development'); assert.equal(result.reference, normal.id);
  assert.equal(calls.length, 1); assert.equal(calls[0].packet.reply_to, 'qa@example.com'); assert.deepEqual(calls[0].packet.to, ['info@winterbrook.ie']);
  assert.ok(calls[0].packet.text.includes('/contact')); assert.ok(calls[0].packet.subject.includes('Test Development'));
  assert.equal((await server.deliverEnquiry(normal, config, 'Test Development')).duplicate, true); assert.equal(calls.length, 1);
  await assert.rejects(() => server.deliverEnquiry({ ...normal, message: 'Changed message, same reference.' }, config, ''), e => e.status === 409);
  ok('private backup before sending, destination, Reply-To and duplicate safety');
  failures = [500, 429, 200]; const retry = base(); const before = calls.length;
  await server.deliverEnquiry(retry, config, 'Test Development'); assert.equal(calls.length - before, 3);
  assert.equal(new Set(calls.slice(before).map(c => c.key)).size, 1); ok('transient retry uses one immutable idempotency key');
  failures = [403]; const rejected = base();
  await assert.rejects(() => server.deliverEnquiry(rejected, config, ''), e => e.status === 502);
  assert.ok(store.has(`winterbrook-enquiries/preview/submissions/${rejected.id}.json`));
  assert.ok(!store.has(`winterbrook-enquiries/preview/accepted/${rejected.id}.json`)); ok('provider rejection retains backup and never returns success');
  const n = calls.length; storageFail = true;
  await assert.rejects(() => server.deliverEnquiry(base(), config, '')); storageFail = false;
  assert.equal(calls.length, n); ok('storage failure prevents sending and false success');
  const time = 1792759000000;
  for (let i = 0; i < 5; i++) await server.enforceRateLimit('192.0.2.11', time);
  await assert.rejects(() => server.enforceRateLimit('192.0.2.11', time), e => e.status === 429);
  await server.enforceRateLimit('192.0.2.11', time + 900000);
  assert.ok(![...store.keys()].join('').includes('192.0.2.11')); ok('shared rate limit and no raw IP storage');
  const request = (body, extra = {}) => new Request('https://www.winterbrook.ie/api/enquiries', { method: 'POST', headers: { origin: 'https://www.winterbrook.ie', 'content-type': 'application/json', ...extra }, body });
  assert.equal((await route.POST(request('{}', { origin: 'https://attacker.example' }))).status, 403);
  assert.equal((await route.POST(request('not JSON'))).status, 400);
  assert.equal((await route.POST(request('{}', { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await route.POST(request('x'.repeat(24577)))).status, 413);
  assert.equal((await route.POST(request(JSON.stringify({ ...base(), name: '' })))).status, 400);
  const valid = await route.POST(request(JSON.stringify(base()))); assert.equal(valid.status, 200); assert.equal((await valid.json()).ok, true);
  ok('route origin checks, body limit, format, validation and accepted response');
  console.log(`ALL ${passed} TEST GROUPS PASSED. Provider and storage calls were mocked; no emails sent.`);
} finally { global.fetch = originalFetch; for (const key of envKeys) { if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key]; } } })().catch(e => { console.error(e); process.exit(1); });
