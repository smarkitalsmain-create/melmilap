import type { Metadata } from "next";
import { EmptyState, PageHero, Section } from "@/components/ui/page-parts";
import { financialSummary } from "@/content/fundraising";
import { formatDate, formatINR, listDocuments, listUpdates, listUtilisation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Transparency",
  description: "Approved documents, dated programme updates and utilisation summaries from Mel Milap Foundation.",
};

const commitments = [
  "A dated update for every activity",
  "Funds raised, funds used and programme outcomes, each reported under its own label",
  "Expenditure, cause-wise allocations and beneficiary figures once supporting records are available",
  "Registration and governance documents, once approved",
]

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
        intro="Dated updates, with funds raised, funds used and programme outcomes reported separately. We publish figures once they are supported by records."
      />

      <Section tone="cobalt" labelledBy="figures-heading">
        <h2 id="figures-heading" className="display-md">At a glance</h2>
        <dl className="mt-8 grid gap-4 md:grid-cols-3">
          {[financialSummary.fundsRaised, financialSummary.fundsUsed, financialSummary.outcomes].map((f) => (
            <div key={f.label} className="rounded-[1.75rem] bg-white/10 p-6">
              <dt className="eyebrow text-mango">{f.label}</dt>
              <dd className="mt-3">
                {f.value ? (
                  <>
                    <span className="block font-display text-3xl font-bold">{f.value}</span>
                    {f.asOf && <span className="mt-1 block text-sm">As of {formatDate(f.asOf)}</span>}
                  </>
                ) : (
                  <span className="block text-lg">Published once supporting records are available.</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="commit-heading">
        <h2 id="commit-heading" className="display-md">What we publish</h2>
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
                  <p className="eyebrow text-plum">{u.kind === "fundraising" ? "Fundraising" : <time dateTime={u.date}>{formatDate(u.date)}</time>}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{u.title}</h3>
                  <div className="prose-reading mt-2">{u.body.map((p) => <p key={p}>{p}</p>)}</div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState title="Updates on their way"><p>Dated updates appear here as they are published.</p></EmptyState>
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
            <EmptyState title="Utilisation summaries to come"><p>Summaries of how funds were used appear here once supporting records are available.</p></EmptyState>
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
            <EmptyState title="Documents to come"><p>Approved registration, governance and policy documents are listed here once available.</p></EmptyState>
          )}
        </div>
      </Section>
    </>
  );
}
