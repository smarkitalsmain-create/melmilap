"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { type EnquiryState, submitEnquiry } from "@/app/actions/enquiry";
import { Check } from "@/components/ui/icons";
import { type FieldDef, type FormKind, consentField, forms, honeypotField } from "@/lib/forms/definitions";

const inputBase =
  "mt-2 block w-full rounded-2xl border-2 border-aubergine/25 bg-white px-4 py-3 text-base text-aubergine placeholder:text-plum/70 transition-colors focus:border-cobalt focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-cobalt aria-[invalid=true]:border-hibiscus-ink";

interface Props {
  kind: FormKind;
  campaign?: string;
  /** Approved fallback contact route shown if the destination fails. */
  fallbackEmail?: string | null;
}

export function EnquiryForm({ kind, campaign, fallbackEmail }: Props) {
  const def = forms[kind];
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    else if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[2rem] bg-leaf-ink p-8 text-white outline-none sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-leaf-ink">
          <Check className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold">Thank you. We’ve received it.</h2>
        <p className="mt-3 text-lg">Someone from the foundation will reply by email. We aim to respond within five working days.</p>
        <Link href="/" className="btn btn-cream mt-6">
          Back to the homepage
        </Link>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};
  const val = (n: string) => (typeof values[n] === "string" ? (values[n] as string) : undefined);

  return (
    <form action={action} noValidate className="space-y-6" aria-describedby="form-required-note">
      <input type="hidden" name="formKind" value={kind} />
      {campaign && <input type="hidden" name="campaign" value={campaign} />}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name={honeypotField} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status !== "idle" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className={`rounded-2xl border-2 p-5 outline-none ${state.status === "invalid" ? "border-hibiscus-ink bg-white" : "border-aubergine bg-mango-soft"}`}
        >
          <p className="font-bold">{state.message}</p>
          {state.status === "invalid" && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>
                  <a className="link-inline" href={`#${kind}-${field}`}>
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {(state.status === "failed" || state.status === "unavailable") && fallbackEmail && (
            <p className="mt-2">
              You can also email us at{" "}
              <a className="link-inline" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <p id="form-required-note" className="text-sm text-plum">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">as required</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {def.fields.map((f) => (
          <Field key={f.name} kind={kind} field={f} error={errors[f.name]} value={val(f.name)} checked={values[f.name]} />
        ))}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[0.95rem]">
          <input
            id={`${kind}-consent`}
            type="checkbox"
            name={consentField.name}
            value="yes"
            required
            defaultChecked={values.consent === "yes"}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${kind}-consent-error` : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-cobalt"
          />
          <span>
            {consentField.label} <span aria-hidden="true">*</span> See our{" "}
            <Link href="/privacy" className="link-inline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${kind}-consent-error`} className="mt-2 font-semibold text-hibiscus-ink">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending} aria-disabled={pending}>
        {pending ? "Sending…" : def.submitLabel}
      </button>
    </form>
  );
}

function Field({ kind, field: f, error, value, checked }: { kind: FormKind; field: FieldDef; error?: string; value?: string; checked?: string | string[] }) {
  const id = `${kind}-${f.name}`;
  const hintId = f.hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const span = f.width === "half" ? "" : "sm:col-span-2";
  const label = (
    <>
      {f.label}
      {f.required && <span aria-hidden="true"> *</span>}
    </>
  );
  const hint = f.hint && (
    <p id={hintId} className="mt-1 text-sm text-plum">
      {f.hint}
    </p>
  );
  const err = error && (
    <p id={errorId} className="mt-2 font-semibold text-hibiscus-ink">
      {error}
    </p>
  );

  if (f.type === "checkboxes") {
    const selected = Array.isArray(checked) ? checked : [];
    return (
      <fieldset id={id} tabIndex={-1} className={`${span} outline-none`} aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
        <legend className="font-semibold">{label}</legend>
        {hint}
        <div className="mt-3 flex flex-wrap gap-2.5">
          {f.options!.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-aubergine/25 bg-white px-4 py-2.5 has-[:checked]:border-cobalt has-[:checked]:bg-cobalt has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt"
            >
              <input type="checkbox" name={f.name} value={opt} defaultChecked={selected.includes(opt)} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  const common = {
    id,
    name: f.name,
    required: f.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    defaultValue: value,
    autoComplete: f.autoComplete,
    className: inputBase,
  };

  return (
    <div className={span}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {hint}
      {f.type === "textarea" ? (
        <textarea {...common} rows={5} maxLength={f.maxLength} />
      ) : f.type === "select" ? (
        <select {...common} defaultValue={value ?? ""}>
          <option value="" disabled>
            Choose one
          </option>
          {f.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input {...common} type={f.type} maxLength={f.maxLength} inputMode={f.type === "tel" ? "tel" : undefined} />
      )}
      {err}
    </div>
  );
}
