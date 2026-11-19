import Link from 'next/link';
import { company, contact, houses, assessments, privacyPolicyApproved } from '@/content/site';
import { QraftLogo, HouseWordmark } from '@/components/brand/Wordmark';

export function SiteFooter() {
  const hasContact = contact.email || contact.whatsapp || contact.linkedin || contact.officeLocation;
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <QraftLogo variant="white" height={72} />
          <p className="mt-5 max-w-sm text-paper/75">
            {company.descriptor}. Helping growing businesses build better systems, manage cash flow and prepare for funding.
          </p>
          <p className="mt-4 text-sm text-paper/60">A business of {company.legalParent}.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
          <div>
            <h2 className="label text-paper/60">Our houses</h2>
            <ul className="mt-4 space-y-4">
              {Object.values(houses).map((h) => (
                <li key={h.id}>
                  <Link href={h.href} className="inline-block rounded-sm hover:opacity-85">
                    <HouseWordmark house={h.id} size="sm" invert endorsement={false} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label text-paper/60">Assessments</h2>
            <ul className="mt-4 space-y-3 text-paper/85">
              {Object.values(assessments).map((a) => (
                <li key={a.id}>
                  <Link className="footer-link" href={a.href}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label text-paper/60">Company</h2>
            <ul className="mt-4 space-y-3 text-paper/85">
              <li>
                <Link className="footer-link" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footer-link" href="/contact">
                  Contact
                </Link>
              </li>
              {privacyPolicyApproved && (
                <li>
                  <Link className="footer-link" href="/privacy">
                    Privacy notice
                  </Link>
                </li>
              )}
            </ul>
            {hasContact && (
              <ul className="mt-6 space-y-2 text-sm text-paper/75">
                {contact.email && (
                  <li>
                    <a className="footer-link" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.whatsapp && (
                  <li>
                    <a className="footer-link" href={`https://wa.me/${contact.whatsapp}`} rel="noopener">
                      WhatsApp
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a className="footer-link" href={contact.linkedin} rel="noopener">
                      LinkedIn
                    </a>
                  </li>
                )}
                {contact.officeLocation && <li>{contact.officeLocation}</li>}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {company.legalParent}. {company.brand}, SystemMasters and CapitalMasters are brands of {company.legalParent}.
          </p>
          <p>CapitalMasters provides education, financial systems and readiness advisory. It is not a lender, fund or investment manager.</p>
        </div>
      </div>
    </footer>
  );
}
