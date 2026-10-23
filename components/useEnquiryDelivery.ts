'use client';
import { useEffect, useRef, useState } from 'react';
import { developments } from '@/lib/content';
import { emailDetails, validateSubmission, type EnquiryDraft } from '@/lib/enquiries/shared';

export function useEnquiryDelivery() {
  const [available, setAvailable] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [prepared, setPrepared] = useState<ReturnType<typeof emailDetails> | null>(null);
  const [website, setWebsite] = useState('');
  const startedAt = useRef(Date.now());
  const last = useRef({ signature: '', id: '' });
  const inFlight = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch('/api/enquiries', { cache: 'no-store', signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(data => setAvailable(data?.available === true))
      .catch(() => setAvailable(false)).finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  async function submit(draft: EnquiryDraft) {
    if (inFlight.current || reference) return;
    setError(''); setPrepared(null);
    const signature = JSON.stringify(draft);
    if (signature !== last.current.signature) last.current = { signature, id: crypto.randomUUID() };
    let enquiry;
    try {
      enquiry = validateSubmission({ ...draft, id: last.current.id, sourcePath: window.location.pathname, website, startedAt: startedAt.current }, developments.map(d => d.slug));
    } catch (e) { setError(e instanceof Error ? e.message : 'Please check your enquiry.'); return; }
    const details = emailDetails(enquiry, developments.find(d => d.slug === enquiry.interest)?.name || '');
    if (!available) { setPrepared(details); return; }
    inFlight.current = true; setSending(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(enquiry),
        signal: AbortSignal.timeout(55000),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.ok === true && data.reference === enquiry.id) {
        setReference(data.reference); return;
      }
      setError(typeof data?.message === 'string' ? data.message : 'We could not confirm your enquiry. Please retry or email us directly.');
      if (response.status === 503) setAvailable(false);
      setPrepared(details);
    } catch {
      setError('We could not confirm your enquiry. Your details remain below. Please retry or email us directly.');
      setPrepared(details);
    } finally { inFlight.current = false; setSending(false); }
  }
  return { available, sending, error, reference, prepared, website, setWebsite, submit };
}
