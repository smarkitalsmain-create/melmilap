import type { Metadata } from "next";
import { EnquirySection } from "@/components/forms/enquiry-section";
import { PageHero } from "@/components/ui/page-parts";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Contact Mel Milap Foundation." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello." intro="Questions, ideas or a story you think we should hear. We read everything." />
      <div className="container-site grid gap-12 pb-20 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <aside aria-label="Contact details" className="space-y-6 text-lg">
          {contact.email && (<div><h2 className="font-bold">Email</h2><a className="link-inline" href={`mailto:${contact.email}`}>{contact.email}</a></div>)}
          {contact.phone && (<div><h2 className="font-bold">Phone</h2><a className="link-inline" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></div>)}
          {contact.address && (<div><h2 className="font-bold">Address</h2><p>{contact.address}</p></div>)}
          {!contact.email && !contact.phone && (
            <p className="text-plum">Our email address and phone number will appear here once they’re confirmed.</p>
          )}
          <p className="text-plum">{contact.responseTime}</p>
          <p className="text-plum">Volunteering, partnership or institutional enquiry? The forms under Get Involved reach the right person faster.</p>
        </aside>
        <section aria-label="Contact form" className="rounded-[2rem] bg-paper p-6 sm:p-10">
          <EnquirySection kind="contact" />
        </section>
      </div>
    </>
  );
}
