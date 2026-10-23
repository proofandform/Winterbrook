import { developments } from '@/lib/content';
import { CONTACT_EMAIL, validateSubmission } from '@/lib/enquiries/shared';
import { deliverEnquiry, enforceRateLimit, getDeliveryConfig, EnquiryError } from '@/lib/enquiries/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const reply = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

export async function GET() {
  return reply({ available: !!getDeliveryConfig(), fallbackEmail: CONTACT_EMAIL });
}
function permittedOrigin(request: Request) {
  const allowed = new Set(['https://www.winterbrook.ie', 'https://winterbrook.ie']);
  for (const value of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) if (value) allowed.add(`https://${value}`);
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    allowed.add('http://localhost:3000'); allowed.add('http://127.0.0.1:3000');
  }
  return allowed.has(request.headers.get('origin') || '');
}
async function boundedJson(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new EnquiryError(415, 'Invalid submission format.');
  if (Number(request.headers.get('content-length') || 0) > 24576) throw new EnquiryError(413, 'Your enquiry is too long. Please shorten it or email us.');
  const reader = request.body?.getReader();
  if (!reader) throw new EnquiryError(400, 'No enquiry was supplied.');
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 24576) { await reader.cancel(); throw new EnquiryError(413, 'Your enquiry is too long. Please shorten it or email us.'); }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown; }
  catch { throw new EnquiryError(400, 'Invalid enquiry.'); }
}
export async function POST(request: Request) {
  if (!permittedOrigin(request)) return reply({ ok: false, message: 'Please use the enquiry form on the Winterbrook website.' }, 403);
  const config = getDeliveryConfig();
  if (!config) return reply({ ok: false, message: 'Online sending is unavailable. Please use the email option below.', fallbackEmail: CONTACT_EMAIL }, 503);
  try {
    const raw = await boundedJson(request);
    let enquiry;
    try { enquiry = validateSubmission(raw, developments.map(d => d.slug)); }
    catch (error) { return reply({ ok: false, message: error instanceof Error ? error.message : 'Please check your enquiry.' }, 400); }
    const ip = process.env.VERCEL ? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() : 'local-test';
    if (!ip) return reply({ ok: false, message: 'Please email us directly to send this enquiry.' }, 503);
    await enforceRateLimit(ip);
    const result = await deliverEnquiry(enquiry, config, developments.find(d => d.slug === enquiry.interest)?.name || '');
    return reply({ ok: true, ...result });
  } catch (error) {
    if (error instanceof EnquiryError) return reply({ ok: false, message: error.message }, error.status);
    console.error(JSON.stringify({ event: 'enquiry_storage_or_delivery_unavailable' }));
    return reply({ ok: false, message: 'We could not submit your enquiry. Your details remain below. Please email us directly.' }, 503);
  }
}
