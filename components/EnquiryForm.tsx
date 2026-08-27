"use client";

import { useState, type FormEvent } from "react";
import { developments } from "@/lib/content";
import Magnetic from "./Magnetic";
import DaftCta from "./DaftCta";

interface FieldState {
  value: string;
  error: string | null;
  shake: boolean;
}

const initialField: FieldState = { value: "", error: null, shake: false };

const validators: Record<string, (v: string) => string | null> = {
  name: (v) => (v.trim().length >= 2 ? null : "Please enter your name"),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Please enter a valid email address",
  phone: (v) =>
    v.trim() === "" || /^[+\d][\d\s()-]{6,}$/.test(v.trim())
      ? null
      : "Please enter a valid phone number",
  message: (v) => (v.trim().length >= 10 ? null : "Tell us a little more (at least 10 characters)"),
};

/**
 * Enquiry form with floating labels, inline validation (shake on error,
 * tick on success) and a clear success state. `development` pre-selects the
 * scheme on detail pages. Demo build: submission is validated client-side
 * and confirmed without a network call.
 */
export default function EnquiryForm({
  development,
  dark = false,
  showDaftCta = true,
}: {
  development?: string;
  dark?: boolean;
  /** Suppress the contextual Daft CTA where the page already renders one. */
  showDaftCta?: boolean;
}) {
  const [fields, setFields] = useState<Record<string, FieldState>>({
    name: initialField,
    email: initialField,
    phone: initialField,
    message: initialField,
  });
  const [interest, setInterest] = useState(development ?? "");
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: string, patch: Partial<FieldState>) =>
    setFields((f) => ({ ...f, [key]: { ...f[key], ...patch } }));

  const validateField = (key: string) => {
    const error = validators[key](fields[key].value);
    setField(key, { error, shake: !!error });
    if (error) setTimeout(() => setField(key, { shake: false }), 450);
    return !error;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const results = Object.keys(validators).map((k) => validateField(k));
    if (results.every(Boolean)) setSubmitted(true);
  };

  const tone = dark
    ? { text: "text-paper", sub: "text-stone/60", line: "border-stone/30", focusLine: "focus:border-terracotta" }
    : { text: "text-ink", sub: "text-mist", line: "border-ink/25", focusLine: "focus:border-terracotta" };

  if (submitted) {
    return (
      <div
        role="status"
        className={`flex flex-col items-start gap-4 border px-8 py-12 ${dark ? "border-stone/20" : "border-ink/10"}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-paper">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M1 7.5L6.5 13L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className={`font-display text-3xl ${tone.text}`}>Thank you — we’ve got it.</h3>
        <p className={`max-w-md ${tone.sub}`}>
          Your enquiry{interest ? ` about ${developments.find((d) => d.slug === interest)?.name ?? "our homes"}` : ""} has
          been received. A member of the Winterbrook team will be in touch shortly. For anything urgent, call{" "}
          <a href="tel:+35316909590" className="underline decoration-terracotta underline-offset-4">
            +353 (0)1 690 9590
          </a>
          .
        </p>
      </div>
    );
  }

  const floatingField = (
    key: "name" | "email" | "phone" | "message",
    label: string,
    type = "text",
    required = true
  ) => {
    const f = fields[key];
    const id = `enquiry-${key}`;
    const isTextarea = key === "message";
    const shared = `peer w-full border-b bg-transparent pb-2 pt-6 outline-none transition-colors duration-300 ${tone.text} ${f.error ? "border-terracotta-deep" : tone.line} ${tone.focusLine}`;
    return (
      <div className={`relative ${f.shake ? "field-shake" : ""}`}>
        {isTextarea ? (
          <textarea
            id={id}
            rows={4}
            required={required}
            value={f.value}
            aria-invalid={!!f.error}
            aria-describedby={f.error ? `${id}-error` : undefined}
            onChange={(e) => setField(key, { value: e.target.value, error: null })}
            onBlur={() => f.value && validateField(key)}
            className={`${shared} resize-none`}
            placeholder=" "
          />
        ) : (
          <input
            id={id}
            type={type}
            required={required}
            value={f.value}
            aria-invalid={!!f.error}
            aria-describedby={f.error ? `${id}-error` : undefined}
            onChange={(e) => setField(key, { value: e.target.value, error: null })}
            onBlur={() => f.value && validateField(key)}
            className={shared}
            placeholder=" "
          />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 top-6 origin-left text-sm uppercase tracking-[0.18em] transition-all duration-300 ${tone.sub} peer-focus:top-0 peer-focus:scale-90 peer-focus:text-terracotta peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-90`}
        >
          {label}
          {required ? " *" : ""}
        </label>
        {f.error && (
          <p id={`${id}-error`} className="mt-2 text-xs text-terracotta-deep" role="alert">
            {f.error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {floatingField("name", "Name")}
        {floatingField("email", "Email", "email")}
      </div>
      <div className="grid items-end gap-8 sm:grid-cols-2">
        {floatingField("phone", "Phone", "tel", false)}
        <div>
          <label
            htmlFor="enquiry-interest"
            className={`block whitespace-nowrap text-[12.6px] uppercase tracking-[0.18em] ${tone.sub}`}
          >
            Development of interest
          </label>
          <div className="relative mt-2.5">
            <select
              id="enquiry-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className={`w-full appearance-none truncate border-b bg-transparent pb-2 pr-8 pt-1 outline-none transition-colors duration-300 ${tone.text} ${tone.line} ${tone.focusLine}`}
            >
              <option value="">General enquiry</option>
              {developments.map((d) => (
                <option key={d.slug} value={d.slug} className="text-ink">
                  {d.name} — {d.location}
                </option>
              ))}
            </select>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              aria-hidden="true"
              className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 ${tone.sub}`}
            >
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      {showDaftCta &&
        (() => {
          const selected = developments.find((d) => d.slug === interest);
          if (!selected?.daftUrl) return null;
          return <DaftCta dev={selected} location="contact_page" dark={dark} className="-mt-2" />;
        })()}
      {floatingField("message", "Message")}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className={`text-xs ${tone.sub}`}>
          By submitting you agree to our privacy policy. Fields marked * are required.
        </p>
        <Magnetic>
          <button
            type="submit"
            data-cursor="Send"
            className="group inline-flex items-center gap-4 rounded-full bg-terracotta px-9 py-4 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta-deep"
          >
            Send enquiry
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform duration-400 group-hover:translate-x-1">
              <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
