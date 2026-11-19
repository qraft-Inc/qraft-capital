import { notFound } from 'next/navigation';
import { company, contact, privacyPolicyApproved } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

/**
 * DRAFT privacy notice. Hidden (404) until `privacyPolicyApproved` is true in
 * src/content/site.ts. Before approving, confirm every [CONFIRM] item below
 * against the live setup and Uganda's Data Protection and Privacy Act, 2019.
 */
export const metadata = {
  ...pageMetadata({
    title: 'Privacy Notice | Qraft Capital',
    description: 'How Qraft Capital handles the information you share through this website.',
    path: '/privacy',
  }),
  robots: privacyPolicyApproved ? undefined : { index: false },
};

export default function PrivacyPage() {
  if (!privacyPolicyApproved) notFound();
  return (
    <section>
      <div className="container-site py-14 sm:py-20">
        <h1 className="display-lg text-ink">Privacy notice</h1>
        <div className="prose-measure mt-8 space-y-6 text-ink-soft">
          <p>
            This notice explains how {company.brand}, a business of {company.legalParent}, handles information you share
            through this website.
          </p>
          <h2 className="font-display text-2xl text-ink">What we collect</h2>
          <p>
            When you send an enquiry we collect your name, business or organisation name, email address, optional phone
            or WhatsApp number, optional team size, the type of enquiry and your message. We also record which page you
            sent it from. We do not ask for financial records, identity documents or passwords through this website.
          </p>
          <h2 className="font-display text-2xl text-ink">How we use it</h2>
          <p>
            We use this information only to reply to your enquiry, discuss your needs and, if you agree, prepare a
            proposal. Enquiries from the assessment pages are delivered by email to the Qraft Capital team. The form on our Contact page is provided by Tally, which stores submissions on our behalf. {/* [CONFIRM] provider, inbox and who has access */}
          </p>
          <h2 className="font-display text-2xl text-ink">How long we keep it</h2>
          <p>{/* [CONFIRM] retention period */}We keep enquiry information only as long as needed to respond and follow up.</p>
          <h2 className="font-display text-2xl text-ink">Your rights</h2>
          <p>
            You can ask to see, correct or delete the information you have shared with us.
            {contact.email ? (
              <>
                {' '}
                Email{' '}
                <a className="link text-ink" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                .
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
}
