import Link from "next/link";
import { contact } from "@/content/site";
import { getFormDestination } from "@/lib/config";
import type { FormKind } from "@/lib/forms/definitions";
import { EnquiryForm } from "./enquiry-form";

/**
 * Renders the form only when a destination is configured. Otherwise points
 * to an approved contact route, or says plainly that enquiries open soon.
 */
export function EnquirySection({ kind, campaign }: { kind: FormKind; campaign?: string }) {
  if (getFormDestination().kind === "none") {
    return (
      <div className="rounded-[2rem] border-2 border-dashed border-aubergine/40 bg-paper p-7 sm:p-9">
        <h2 className="font-display text-2xl font-bold">Online enquiries open soon</h2>
        {contact.email ? (
          <p className="mt-3 text-lg">
            Until our form is connected, please email{" "}
            <a className="link-inline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            and tell us how you’d like to help.
          </p>
        ) : (
          <p className="mt-3 text-lg">
            We’re setting up a secure way to receive messages. Please check back soon. In the meantime you can read about{" "}
            <Link className="link-inline" href="/our-work">
              our work
            </Link>
            .
          </p>
        )}
      </div>
    );
  }
  return <EnquiryForm kind={kind} campaign={campaign} fallbackEmail={contact.email} />;
}
