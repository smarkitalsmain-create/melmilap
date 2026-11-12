"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { type DonateState, startDonation } from "@/app/actions/donate";
import { MAX_AMOUNT, MIN_AMOUNT, presetAmounts } from "@/lib/payments/donation";

const input =
  "mt-2 block w-full rounded-2xl border-2 border-aubergine/25 bg-white px-4 py-3 text-base focus:border-cobalt focus:outline-none aria-[invalid=true]:border-hibiscus-ink";

export function DonateForm({ campaigns, defaultCampaign, testMode }: { campaigns: { slug: string; title: string }[]; defaultCampaign?: string; testMode: boolean }) {
  const [state, action, pending] = useActionState<DonateState, FormData>(startDonation, { status: "idle" });
  // Radios stay uncontrolled: React resets forms after an action, and the
  // defaults below carry the visitor's last choice through that reset.
  const submittedPreset = state.values?.preset || String(presetAmounts[1]);
  const [preset, setPreset] = useState(submittedPreset);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setPreset(submittedPreset);
  }
  const alertRef = useRef<HTMLDivElement>(null);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status !== "idle") alertRef.current?.focus();
  }, [state]);

  return (
    <form action={action} noValidate className="space-y-7">
      {testMode && (
        <p className="rounded-2xl border-2 border-dashed border-cobalt bg-white p-4 font-semibold text-cobalt">
          Test mode: no real money will be charged.
        </p>
      )}
      {state.status !== "idle" && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-hibiscus-ink bg-white p-5 font-semibold outline-none">
          {state.message}
          {state.status === "invalid" && (
            <ul className="mt-2 list-disc pl-5 font-normal">
              {Object.entries(e).map(([k, m]) => <li key={k}><a className="link-inline" href={`#donate-${k === "amount" ? "custom" : k}`}>{m}</a></li>)}
            </ul>
          )}
        </div>
      )}

      <fieldset>
        <legend className="font-display text-2xl font-bold">Choose an amount</legend>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[...presetAmounts.map(String), "custom"].map((p) => (
            <label key={p} className="flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border-2 border-aubergine/25 bg-white px-3 text-lg font-bold has-[:checked]:border-aubergine has-[:checked]:bg-mango has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt">
              <input type="radio" name="preset" value={p} defaultChecked={submittedPreset === p} onChange={() => setPreset(p)} className="sr-only" />
              {p === "custom" ? "Other" : `₹${Number(p).toLocaleString("en-IN")}`}
            </label>
          ))}
        </div>
        <div className={preset === "custom" ? "mt-4" : "sr-only"}>
          <label htmlFor="donate-custom" className="font-semibold">Amount in rupees</label>
          <p id="donate-custom-hint" className="text-sm text-plum">Between ₹{MIN_AMOUNT} and ₹{MAX_AMOUNT.toLocaleString("en-IN")}.</p>
          <input id="donate-custom" name="customAmount" inputMode="numeric" defaultValue={v.customAmount} className={input}
            aria-invalid={e.amount ? true : undefined} aria-describedby={`donate-custom-hint${e.amount ? " donate-amount-error" : ""}`} tabIndex={preset === "custom" ? 0 : -1} />
        </div>
        {e.amount && <p id="donate-amount-error" className="mt-2 font-semibold text-hibiscus-ink">{e.amount}</p>}
      </fieldset>

      {campaigns.length > 0 && (
        <div>
          <label htmlFor="donate-campaign" className="font-semibold">Give to a campaign (optional)</label>
          <select id="donate-campaign" name="campaign" defaultValue={v.campaign ?? defaultCampaign ?? ""} className={input}>
            <option value="">Where it’s needed most</option>
            {campaigns.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {(["name", "email"] as const).map((f) => (
          <div key={f}>
            <label htmlFor={`donate-${f}`} className="font-semibold">{f === "name" ? "Full name" : "Email for your receipt"} <span aria-hidden="true">*</span></label>
            <input id={`donate-${f}`} name={f} type={f === "email" ? "email" : "text"} autoComplete={f} required defaultValue={v[f]} className={input}
              aria-invalid={e[f] ? true : undefined} aria-describedby={e[f] ? `donate-${f}-error` : undefined} />
            {e[f] && <p id={`donate-${f}-error`} className="mt-2 font-semibold text-hibiscus-ink">{e[f]}</p>}
          </div>
        ))}
      </div>

      <div>
        <button type="submit" className="btn btn-hibiscus" disabled={pending}>{pending ? "Opening secure payment…" : "Continue to secure payment"}</button>
        <p className="mt-3 text-sm text-plum">You’ll complete payment on our payment provider’s secure page. We never see your card or bank details.</p>
      </div>
    </form>
  );
}
