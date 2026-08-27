"use client";

import { useState, type FormEvent } from "react";
import Magnetic from "./Magnetic";

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
  location: (v) => (v.trim().length >= 3 ? null : "Please tell us where the land is"),
  message: (v) => (v.trim().length === 0 || v.trim().length >= 10 ? null : "A little more detail helps (at least 10 characters)"),
};

/**
 * Landowner / partner enquiry form for the Land & Partnerships page.
 * Same floating-label & validation behaviour as EnquiryForm, with fields
 * tailored to land introductions (location, size, planning status,
 * preferred structure). Demo build: validated client-side, no network call.
 */
export default function LandEnquiryForm() {
  const [fields, setFields] = useState<Record<string, FieldState>>({
    name: initialField,
    email: initialField,
    phone: initialField,
    location: initialField,
    message: initialField,
  });
  const [role, setRole] = useState("");
  const [size, setSize] = useState("");
  const [planning, setPlanning] = useState("");
  const [structure, setStructure] = useState("");
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

  if (submitted) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border border-stone/20 px-8 py-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-paper">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M1 7.5L6.5 13L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="font-display text-3xl text-paper">Thank you — we'll be in touch.</h3>
        <p className="max-w-md text-stone/60">
          Your introduction has been received in confidence. Conor Rhatigan or a member of the land
          team will come back to you within two working days. For a direct conversation, call{" "}
          <a href="tel:+35316909590" className="underline decoration-terracotta underline-offset-4">
            +353 (0)1 690 9590
          </a>
          .
        </p>
      </div>
    );
  }

  const line = "border-stone/30";
  const floatingField = (
    key: "name" | "email" | "phone" | "location" | "message",
    label: string,
    type = "text",
    required = true
  ) => {
    const f = fields[key];
    const id = `land-${key}`;
    const isTextarea = key === "message";
    const shared = `peer w-full border-b bg-transparent pb-2 pt-6 text-paper outline-none transition-colors duration-300 focus:border-terracotta ${f.error ? "border-terracotta-deep" : line}`;
    return (
      <div className={`relative ${f.shake ? "field-shake" : ""}`}>
        {isTextarea ? (
          <textarea
            id={id}
            rows={4}
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
          className="pointer-events-none absolute left-0 top-6 origin-left text-sm uppercase tracking-[0.18em] text-stone/60 transition-all duration-300 peer-focus:top-0 peer-focus:scale-90 peer-focus:text-terracotta peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-90"
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

  const selectField = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    options: string[]
  ) => (
    <div>
      <label
        htmlFor={id}
        className="block whitespace-nowrap text-[12.6px] uppercase tracking-[0.18em] text-stone/60"
      >
        {label}
      </label>
      <div className="relative mt-2.5">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none truncate border-b bg-transparent pb-2 pr-8 pt-1 outline-none transition-colors duration-300 focus:border-terracotta ${line} ${value ? "text-paper" : "text-stone/50"}`}
        >
          <option value="" className="text-ink">
            Please select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone/60">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {floatingField("name", "Name")}
        {floatingField("email", "Email", "email")}
      </div>
      <div className="grid items-end gap-x-10 gap-y-8 sm:grid-cols-2">
        {floatingField("phone", "Phone", "tel", false)}
        {selectField("land-role", "I am", role, setRole, [
          "The landowner",
          "An agent or advisor acting for the owner",
          "A local authority or agency",
          "A potential capital / JV partner",
          "Other",
        ])}
      </div>
      {floatingField("location", "Land location (townland, road or Eircode)")}
      <div className="grid items-end gap-x-10 gap-y-8 md:grid-cols-3">
        {selectField("land-size", "Approximate size", size, setSize, [
          "Under 1 acre",
          "1–5 acres",
          "5–20 acres",
          "20+ acres",
          "Not sure",
        ])}
        {selectField("land-planning", "Planning status", planning, setPlanning, [
          "No planning history",
          "Pre-planning / feasibility",
          "Application lodged",
          "Permission granted",
          "Lapsed permission",
          "Not sure",
        ])}
        {selectField("land-structure", "Preferred structure", structure, setStructure, [
          "Option agreement",
          "Joint venture",
          "Outright purchase",
          "Public-sector partnership",
          "Open to guidance",
        ])}
      </div>
      {floatingField("message", "Anything else we should know?", "text", false)}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-sm text-xs text-stone/50">
          All introductions are treated in strict confidence and without obligation. Fields marked *
          are required.
        </p>
        <Magnetic>
          <button
            type="submit"
            data-cursor="Send"
            className="group inline-flex items-center gap-4 rounded-full bg-terracotta px-9 py-4 text-[13px] uppercase tracking-[0.2em] text-paper transition-colors duration-400 hover:bg-terracotta-deep"
          >
            Start the conversation
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform duration-400 group-hover:translate-x-1">
              <path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
