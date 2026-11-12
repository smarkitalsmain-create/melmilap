import type { Metadata } from "next";
import { EmptyState, PageHero, Section } from "@/components/ui/page-parts";
import { formatDate, formatINR, listDocuments, listUpdates, listUtilisation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Transparency",
  description: "Approved documents, dated programme updates and utilisation summaries from Mel Milap Foundation.",
};

const commitments = [
  "A dated update for every programme activity",
  "A utilisation summary for every campaign: what was received, what was spent and on what",
  "Registration and governance documents, once approved",
  "Annual reports and audited accounts as they become due",
];

export default function TransparencyPage() {
  const docs = listDocuments();
  const updates = listUpdates();
  const utilisation = listUtilisation();
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        tone="aubergine"
        title="Where it goes, in plain sight."
        intro="We’re a new foundation and haven’t delivered programmes yet, so this page is mostly empty for now. That’s deliberate: we only publish what’s approved and verified."
      />
      <Section labelledBy="commit-heading">
        <h2 id="commit-heading" className="display-md">What we will publish</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {commitments.map((c) => <li key={c} className="rounded-2xl bg-paper p-5 text-lg">{c}</li>)}
        </ul>
      </Section>

      <Section labelledBy="updates-heading" className="border-t border-aubergine/10">
        <h2 id="updates-heading" className="display-md">Programme updates</h2>
        <div className="mt-6">
          {updates.length ? (
            <ol className="space-y-8">
              {updates.map((u) => (
                <li key={u.slug} id={u.slug} className="scroll-mt-24">
                  <time dateTime={u.date} className="eyebrow text-plum">{formatDate(u.date)}</time>
                  <h3 className="mt-1 font-display text-2xl font-bold">{u.title}</h3>
                  <div className="prose-reading mt-2">{u.body.map((p) => <p key={p}>{p}</p>)}</div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState title="No updates yet"><p>Our first update will appear here, dated, when programme work begins.</p></EmptyState>
          )}
        </div>
      </Section>

      <Section labelledBy="util-heading" className="border-t border-aubergine/10">
        <h2 id="util-heading" className="display-md">Utilisation summaries</h2>
        <div className="mt-6">
          {utilisation.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left">
                <caption className="sr-only">Funds received and utilised by period</caption>
                <thead><tr className="border-b-2 border-aubergine"><th className="py-3">Period</th><th>Received</th><th>Utilised</th><th>Notes</th></tr></thead>
                <tbody>
                  {utilisation.map((u) => (
                    <tr key={u.slug} className="border-b border-aubergine/15 align-top">
                      <th scope="row" className="py-3 pr-4">{u.period}</th>
                      <td className="pr-4">{formatINR(u.receivedMinor)}</td>
                      <td className="pr-4">{formatINR(u.utilisedMinor)}</td>
                      <td>{u.notes}{u.documentHref && <> · <a className="link-inline" href={u.documentHref}>Document</a></>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="No funds received for programmes yet"><p>Summaries will appear after each campaign, showing what was received and how it was used.</p></EmptyState>
          )}
        </div>
      </Section>

      <Section labelledBy="docs-heading" className="border-t border-aubergine/10">
        <h2 id="docs-heading" className="display-md">Documents</h2>
        <div className="mt-6">
          {docs.length ? (
            <ul className="space-y-3">
              {docs.map((d) => (
                <li key={d.href}><a className="link-inline text-lg font-semibold" href={d.href}>{d.title}</a> <span className="text-plum">· {d.fileType} · {formatDate(d.date)}</span></li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Documents to come"><p>Approved registration, governance and policy documents will be listed here.</p></EmptyState>
          )}
        </div>
      </Section>
    </>
  );
}
