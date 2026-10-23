'use client';
import { useEffect, useState } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/enquiries/shared';
import type { useEnquiryDelivery } from './useEnquiryDelivery';

type Delivery = ReturnType<typeof useEnquiryDelivery>;
export default function EnquiryDeliveryNotice({ delivery, dark = false }: { delivery: Delivery; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const tone = dark ? 'border-stone/30 text-stone' : 'border-ink/20 text-ink';
  const data = delivery.prepared;
  const body = data ? `${data.subject}\n\n${data.text}` : '';
  const fullLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data?.subject || 'Winterbrook website enquiry')}&body=${encodeURIComponent(data?.text || '')}`;
  const tooLong = fullLink.length > 1800;
  useEffect(() => { setCopied(false); setCopyFailed(false); }, [body]);
  return <>
    {!delivery.available && <div className={`border-l-2 border-terracotta pl-4 text-sm leading-relaxed ${dark ? 'text-stone' : 'text-ink/80'}`} data-email-fallback>
      <p>Online sending is temporarily unavailable. Use these fields to prepare an email to <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or call <a className="whitespace-nowrap underline underline-offset-4" href="tel:+35316909590">{CONTACT_PHONE}</a>.</p>
      <p className="mt-2">Nothing is sent from this page. You must press Send in your email app.</p>
    </div>}
    <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="website" autoComplete="off" tabIndex={-1} value={delivery.website} onChange={e => delivery.setWebsite(e.target.value)} /></label></div>
    {delivery.error && <p role="alert" className={`border-l-2 border-terracotta pl-4 text-sm leading-relaxed ${dark ? 'text-paper' : 'text-ink'}`}>{delivery.error}</p>}
    {data && <section className={`min-w-0 space-y-4 border p-5 ${tone}`} aria-label="Email enquiry draft">
      <p className="text-sm" role="status">Your email draft is ready. It has not been sent.</p>
      {tooLong && <p className="text-sm">Your message is too long to safely prefill. Copy the full enquiry below, open your email app, paste it into the message and press Send.</p>}
      <textarea aria-label="Complete enquiry to copy" readOnly value={body} rows={8} className="w-full min-w-0 resize-y rounded border border-current/20 bg-transparent p-3 text-sm leading-relaxed" />
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <button type="button" className="underline underline-offset-4" onClick={async () => {
          try { await navigator.clipboard.writeText(body); setCopied(true); setCopyFailed(false); }
          catch { setCopied(false); setCopyFailed(true); }
        }}>{copied ? 'Enquiry copied' : 'Copy full enquiry'}</button>
        <a className="underline underline-offset-4" href={tooLong ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}` : fullLink}>Open email app</a>
      </div>
      {copyFailed && <p role="status" className="text-sm">Please select and copy the enquiry from the text box above.</p>}
      <p className="text-xs">No email app opens? Copy the enquiry and send it from your usual email service to {CONTACT_EMAIL}.</p>
    </section>}
    <noscript><p>Please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call {CONTACT_PHONE}. This form needs JavaScript.</p></noscript>
  </>;
}
