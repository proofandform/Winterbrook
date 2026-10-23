import { createHash, createHmac } from 'node:crypto';
import { get, put, BlobNotFoundError } from '@vercel/blob';
import { CONTACT_EMAIL, validEmail, emailDetails, type Submission } from './shared';

type Config = { apiKey: string; from: string; to: string[]; landTo: string[]; propertyTo: string[] };
type Email = { from: string; to: string[]; reply_to: string; subject: string; text: string };
type Saved = { id: string; createdAt: string; fingerprint: string; enquiry: Submission; email: Email };
export class EnquiryError extends Error { constructor(public status: number, message: string) { super(message); } }
const roots = () => `winterbrook-enquiries/${process.env.VERCEL_ENV === 'production' ? 'production' : 'preview'}`;
const addresses = (v: string | undefined) => {
  const list = (v || CONTACT_EMAIL).split(',').map(s => s.trim());
  return list.length <= 5 && list.every(validEmail) ? list : null;
};
/** Fail closed. The enable flag is set only after sender, storage and inbox tests. */
export function getDeliveryConfig(): Config | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
  const to = addresses(process.env.ENQUIRY_TO_EMAIL);
  const landTo = addresses(process.env.LAND_ENQUIRY_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL);
  const propertyTo = addresses(process.env.PROPERTY_ENQUIRY_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL);
  if (process.env.LEAD_FORMS_ENABLED !== 'true' || !apiKey || !from || !validEmail(from) || !/@(?:[a-z0-9-]+\.)*winterbrook\.ie$/i.test(from) || !process.env.BLOB_READ_WRITE_TOKEN || !to || !landTo || !propertyTo) return null;
  return { apiKey, from, to, landTo, propertyTo };
}
async function read<T>(path: string): Promise<{ data: T; etag: string } | null> {
  try {
    const result = await get(path, { access: 'private', useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error('Storage read failed');
    return { data: await new Response(result.stream).json() as T, etag: result.blob.etag };
  } catch (error) { if (error instanceof BlobNotFoundError) return null; throw error; }
}
const save = (path: string, data: unknown, etag?: string) => put(path, JSON.stringify(data), {
  access: 'private', addRandomSuffix: false, allowOverwrite: !!etag,
  ...(etag ? { ifMatch: etag } : {}), contentType: 'application/json',
});

/** Shared, conditional-write rate limit; no raw IP addresses are retained. */
export async function enforceRateLimit(ip: string, now = Date.now()) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new EnquiryError(503, 'Online enquiries are unavailable. Please email us directly.');
  const bucket = Math.floor(now / 900000);
  const digest = createHmac('sha256', token).update(`${bucket}:${ip}`).digest('hex');
  const path = `${roots()}/rate/${new Date(now).toISOString().slice(0, 10)}/${bucket}-${digest}.json`;
  for (let i = 0; i < 4; i++) {
    const existing = await read<{ count: number }>(path);
    if (existing && existing.data.count >= 5) throw new EnquiryError(429, 'Too many attempts. Please wait 15 minutes or email us directly.');
    try { await save(path, { count: (existing?.data.count || 0) + 1 }, existing?.etag); return; }
    catch (error) { if (i === 3) throw error; }
  }
}

export async function deliverEnquiry(enquiry: Submission, config: Config, developmentName: string) {
  const { id, startedAt: _startedAt, website: _website, ...content } = enquiry;
  const fingerprint = createHash('sha256').update(JSON.stringify(content)).digest('hex');
  const recordPath = `${roots()}/submissions/${id}.json`;
  const sentPath = `${roots()}/accepted/${id}.json`;
  const details = emailDetails(enquiry, developmentName);
  let saved = await read<Saved>(recordPath);
  if (!saved) {
    const record: Saved = {
      id, fingerprint, createdAt: new Date().toISOString(), enquiry,
      email: {
        from: `Winterbrook website <${config.from}>`,
        to: enquiry.kind === 'land' ? config.landTo : enquiry.interest ? config.propertyTo : config.to,
        reply_to: enquiry.email, subject: details.subject,
        text: `${details.text}\n\nSource: https://www.winterbrook.ie${enquiry.sourcePath}\nReference: ${id}\n`,
      },
    };
    try { await save(recordPath, record); saved = { data: record, etag: '' }; }
    catch (error) { saved = await read<Saved>(recordPath); if (!saved) throw error; }
  }
  if (saved.data.fingerprint !== fingerprint) throw new EnquiryError(409, 'The enquiry has changed. Please refresh the form before trying again.');
  if (await read(sentPath)) return { reference: id, duplicate: true };
  // Resend's deduplication window is 24h. Never blindly resend an ambiguous old attempt.
  if (Date.now() - Date.parse(saved.data.createdAt) > 23 * 3600000) throw new EnquiryError(409, 'This earlier enquiry needs a delivery check. Please email us with your reference.');
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `winterbrook-enquiry/${id}` },
        body: JSON.stringify(saved.data.email), signal: AbortSignal.timeout(8000), cache: 'no-store',
      });
      const result = await response.json().catch(() => ({})) as { id?: string };
      if (response.ok && typeof result.id === 'string' && result.id.length > 0) {
        try { await save(sentPath, { reference: id, providerId: result.id, acceptedAt: new Date().toISOString() }); }
        catch (error) { if (!(await read(sentPath))) throw error; }
        console.info(JSON.stringify({ event: 'enquiry_email_accepted', reference: id }));
        return { reference: id, duplicate: false };
      }
      console.warn(JSON.stringify({ event: 'enquiry_email_rejected', reference: id, status: response.status }));
      if (response.status < 500 && response.status !== 429 && response.status !== 409) break;
    } catch { console.warn(JSON.stringify({ event: 'enquiry_delivery_attempt_failed', reference: id, attempt: attempt + 1 })); }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
  }
  console.error(JSON.stringify({ event: 'enquiry_delivery_needs_review', reference: id }));
  throw new EnquiryError(502, 'We could not confirm that your notification was sent. Your details remain below. Please retry or email us directly.');
}
