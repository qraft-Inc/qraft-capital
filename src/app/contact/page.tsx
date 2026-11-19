import Link from 'next/link';
import { assessments, contact, contactFormUrl } from '@/content/site';
import { Eyebrow } from '@/components/sections/Shared';
import { TallyEmbed } from '@/components/enquiry/TallyEmbed';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Qraft Capital | Help Choosing an Assessment',
  description:
    'Contact Qraft Capital with a general enquiry, or tell us about your challenge and we will help you choose between SystemMasters and CapitalMasters.',
  path: '/contact',
});

export default function ContactPage() {
  const direct = [
    contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { label: 'WhatsApp', value: 'Message us on WhatsApp', href: `https://wa.me/${contact.whatsapp}` },
    contact.linkedin && { label: 'LinkedIn', value: 'Qraft Capital on LinkedIn', href: contact.linkedin },
    contact.calendarUrl && { label: 'Book a call', value: 'Choose a time', href: contact.calendarUrl },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <>
      <section className="border-b border-line">
        <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display-xl mt-5 text-ink">Tell us what you are trying to fix.</h1>
            <p className="lede mt-6">
              Not sure whether you need help with systems, with finance or with both? Describe the situation and we will
              suggest where to start. General enquiries are welcome too.
            </p>
          </div>
          <div className="self-end lg:col-span-4 lg:col-start-9">
            <p className="label text-ink-muted">Already know what you need?</p>
            <ul className="mt-3 space-y-2">
              {Object.values(assessments).map((a) => (
                <li key={a.id}>
                  <Link href={`${a.href}#enquire`} className="arrow-link text-ink" data-track="assessment_cta_click" data-track-assessment={a.id}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            {(direct.length > 0 || contact.officeLocation) && (
              <dl className="mt-8 space-y-3 border-t border-line pt-6">
                {direct.map((d) => (
                  <div key={d.label}>
                    <dt className="label text-ink-muted">{d.label}</dt>
                    <dd>
                      <a className="link" href={d.href} rel="noopener">
                        {d.value}
                      </a>
                    </dd>
                  </div>
                ))}
                {contact.officeLocation && (
                  <div>
                    <dt className="label text-ink-muted">Office</dt>
                    <dd className="text-ink">{contact.officeLocation}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>
      </section>

      <section id="enquire" aria-labelledby="enquire-title" className="border-t border-line bg-paper-deep">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="enquire-title" className="display-md text-ink">
              Send an enquiry
            </h2>
            <p className="mt-4 text-ink-soft">
              A few sentences about your business and the challenge is enough. We will reply by email to suggest the
              right next step.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Please do not send bank statements, identity documents, passwords or confidential files through this form.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 sm:p-8 lg:col-span-8">
            <TallyEmbed src={contactFormUrl} title="Qraft Capital contact form" source="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}
