import Link from 'next/link';
import { assessments, houses, contact, type AssessmentId, type EnquiryType } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import { TallyEmbed } from '@/components/enquiry/TallyEmbed';
import { isLeadRoutingConfigured } from '@/lib/lead-routing';

export function Eyebrow({ children, tone }: { children: React.ReactNode; tone?: 'cobalt' | 'emerald' }) {
  const color = tone === 'cobalt' ? 'text-cobalt' : tone === 'emerald' ? 'text-emerald' : 'text-ink-muted';
  return <p className={`label ${color}`}>{children}</p>;
}

/** The two assessments side by side, with a "Help me choose" route to Contact. */
export function AssessmentPicker({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const details: Record<AssessmentId, { forWho: string; covers: string[] }> = {
    'operations-automation': {
      forWho: 'For you if work gets stuck between people, depends on a few individuals, or managers cannot see what is overdue.',
      covers: ['Priority workflows, tools and handoffs', 'Who owns each step, and where delays happen', 'What to fix or automate first'],
    },
    'financial-readiness': {
      forWho: 'For you if cash is hard to predict, a growth decision needs numbers behind it, or a funding conversation is coming.',
      covers: ['Cash visibility and reporting practices', 'Growth assumptions and what they cost', 'Readiness for a funding conversation'],
    },
  };
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {(Object.keys(assessments) as AssessmentId[]).map((id) => {
        const a = assessments[id];
        const h = houses[a.house];
        const c = h.tone === 'cobalt';
        return (
          <article
            key={id}
            className={`flex flex-col rounded-lg border-2 bg-white p-6 sm:p-8 ${c ? 'border-cobalt/25' : 'border-emerald/25'}`}
          >
            <div className={`h-1.5 w-14 ${c ? 'bg-cobalt' : 'bg-emerald'}`} aria-hidden="true" />
            <p className={`label mt-5 ${c ? 'text-cobalt' : 'text-emerald'}`}>{h.name} · {h.capitalType}</p>
            <H className="display-md mt-3 text-ink">{a.name}</H>
            <p className="mt-3 text-ink-soft">{details[id].forWho}</p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5 text-ink-soft">
              {details[id].covers.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 ${c ? 'bg-cobalt' : 'bg-emerald'}`} />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:gap-5">
              <Link
                href={a.href}
                className={`btn ${c ? 'btn-cobalt' : 'btn-emerald'}`}
                data-track="assessment_cta_click"
                data-track-assessment={id}
              >
                See what it covers<span className="sr-only">: {a.name}</span>
              </Link>
              <Link href={`${a.href}#enquire`} className="arrow-link text-ink" data-track="assessment_cta_click" data-track-assessment={id}>
                Request it now<span className="sr-only">: {a.name}</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function EngagementSteps({ dark = false }: { dark?: boolean }) {
  const steps = [
    {
      title: 'Share the challenge',
      text: 'Tell us what is slowing the business down or the decision you are facing. A few sentences is enough to start.',
    },
    {
      title: 'Agree the scope',
      text: 'We discuss the priority with you, confirm what is in and out of scope, and agree the price and timing before any work begins.',
    },
    {
      title: 'Begin the work',
      text: 'If it is the right fit, we start with an assessment or go straight to implementation. If it is not, we will say so.',
    },
  ];
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg md:grid-cols-3" style={{ background: dark ? 'rgb(247 244 238 / 0.15)' : 'var(--color-line)' }}>
      {steps.map((s, i) => (
        <li key={s.title} className={`p-6 sm:p-8 ${dark ? 'bg-ink' : 'bg-paper'}`}>
          <span className={`font-mono text-sm ${dark ? 'text-paper/60' : 'text-ink-muted'}`}>Step {i + 1}</span>
          <h3 className={`mt-3 font-display text-2xl ${dark ? 'text-paper' : 'text-ink'}`}>{s.title}</h3>
          <p className={`mt-2 ${dark ? 'text-paper/75' : 'text-ink-soft'}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Server wrapper: checks lead routing on the server and renders the reusable form. */
export function EnquirySection({
  id = 'enquire',
  title,
  intro,
  defaultType,
  source,
  assessment,
  submitLabel,
  aside,
  tallyUrl,
}: {
  id?: string;
  title: string;
  intro: string;
  defaultType: EnquiryType;
  source: string;
  assessment?: AssessmentId;
  submitLabel?: string;
  aside?: React.ReactNode;
  /** When set, embed this Tally form instead of the built-in form. */
  tallyUrl?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line bg-paper-deep">
      <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id={`${id}-title`} className="display-md text-ink">
            {title}
          </h2>
          <p className="mt-4 text-ink-soft">{intro}</p>
          {aside}
        </div>
        <div className="rounded-lg border border-line bg-white p-5 sm:p-8 lg:col-span-8">
          {tallyUrl ? (
            <TallyEmbed src={tallyUrl} title={title} source={source} />
          ) : (
            <EnquiryForm
              defaultType={defaultType}
              source={source}
              assessment={assessment}
              configured={isLeadRoutingConfigured()}
              fallbackEmail={contact.email}
              submitLabel={submitLabel}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export function HouseCtaBand({ house }: { house: 'systemmasters' | 'capitalmasters' }) {
  const h = houses[house];
  const a = assessments[h.assessment];
  return (
    <section className="bg-ink text-paper">
      <div className="container-site flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <HouseWordmark house={house} invert />
          <p className="mt-4 max-w-xl text-paper/80">{a.oneLine}</p>
        </div>
        <Link
          href={`${a.href}#enquire`}
          className="btn btn-on-ink shrink-0"
          data-track="assessment_cta_click"
          data-track-assessment={a.id}
        >
          {a.cta}
        </Link>
      </div>
    </section>
  );
}
