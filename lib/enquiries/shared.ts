/** Shared form limits and email formatting. No credentials belong in this module. */
export const CONTACT_EMAIL = 'info@winterbrook.ie';
export const CONTACT_PHONE = '+353 (0)1 690 9590';
export const MAX_MESSAGE = 6000;
export const OPTIONS = {
  role: ['The landowner', 'An agent or advisor acting for the owner', 'A local authority or agency', 'A potential capital / JV partner', 'Other'],
  size: ['Under 1 acre', '1–5 acres', '5–20 acres', '20+ acres', 'Not sure'],
  planning: ['No planning history', 'Pre-planning / feasibility', 'Application lodged', 'Permission granted', 'Lapsed permission', 'Not sure'],
  structure: ['Option agreement', 'Joint venture', 'Outright purchase', 'Public-sector partnership', 'Open to guidance'],
} as const;
export type EnquiryDraft = {
  kind: 'enquiry' | 'land'; name: string; email: string; phone: string; message: string;
  interest?: string; location?: string; role?: string; size?: string; planning?: string; structure?: string;
};
export type Submission = EnquiryDraft & { id: string; sourcePath: string; website: string; startedAt: number };
export const validEmail = (value: string) => value.length <= 254 && /^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]{2,}$/.test(value);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateSubmission(value: unknown, developmentSlugs: string[], now = Date.now()): Submission {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid enquiry.');
  const input = value as Record<string, unknown>;
  const text = (key: string, min: number, max: number, multiline = false) => {
    const raw = input[key] ?? '';
    if (typeof raw !== 'string') throw new Error(`Please check ${key}.`);
    const v = raw.trim();
    if (v.length < min || v.length > max || (multiline ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/ : /[\x00-\x1f\x7f]/).test(v)) throw new Error(`Please check ${key}.`);
    return v;
  };
  if (input.kind !== 'enquiry' && input.kind !== 'land') throw new Error('Invalid enquiry type.');
  const id = text('id', 36, 36);
  if (!UUID.test(id)) throw new Error('Please reload the form and try again.');
  const email = text('email', 3, 254);
  if (!validEmail(email)) throw new Error('Please enter a valid email address.');
  const phone = text('phone', 0, 40);
  if (phone && !/^[+\d][\d\s()-]{6,39}$/.test(phone)) throw new Error('Please check your phone number.');
  const message = text('message', input.kind === 'land' ? 0 : 10, MAX_MESSAGE, true);
  if (message && message.length < 10) throw new Error('Please use at least 10 characters in your message.');
  const website = text('website', 0, 300);
  if (website) throw new Error('Please email us directly to send this enquiry.');
  const startedAt = input.startedAt;
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt) || now - startedAt < 1500 || startedAt < now - 7 * 86400000) throw new Error('Please wait a moment and try again.');
  const sourcePath = text('sourcePath', 1, 500);
  if (!sourcePath.startsWith('/') || sourcePath.startsWith('//') || /[?#]/.test(sourcePath)) throw new Error('Invalid source page.');
  const base: Submission = { kind: input.kind, id, name: text('name', 2, 120), email, phone, message, website, startedAt, sourcePath };
  if (input.kind === 'enquiry') {
    const interest = text('interest', 0, 120);
    if (interest && !developmentSlugs.includes(interest)) throw new Error('Please choose a listed development.');
    return { ...base, interest };
  }
  const land: Submission = { ...base, location: text('location', 3, 300) };
  for (const key of ['role', 'size', 'planning', 'structure'] as const) {
    const v = text(key, 0, 120);
    if (v && !(OPTIONS[key] as readonly string[]).includes(v)) throw new Error(`Please check ${key}.`);
    land[key] = v;
  }
  return land;
}

export function emailDetails(draft: EnquiryDraft, developmentName = '') {
  const subject = draft.kind === 'land'
    ? `Winterbrook website — Land opportunity — ${draft.location || 'New introduction'}`
    : `Winterbrook website — ${developmentName ? `Property enquiry — ${developmentName}` : 'General enquiry'}`;
  const lines = [
    `Name: ${draft.name}`, `Email: ${draft.email}`, `Phone: ${draft.phone || 'Not provided'}`,
    ...(draft.kind === 'land' ? [
      `Land location: ${draft.location || ''}`, `Role: ${draft.role || 'Not specified'}`,
      `Approximate size: ${draft.size || 'Not specified'}`, `Planning status: ${draft.planning || 'Not specified'}`,
      `Preferred structure: ${draft.structure || 'Not specified'}`,
    ] : [`Development: ${developmentName || 'General enquiry'}`]),
    '', 'Message:', draft.message || 'No additional details provided.',
  ];
  return { subject: subject.replace(/[\r\n]/g, ' ').slice(0, 450), text: lines.join('\n') };
}
