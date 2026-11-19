import Link from 'next/link';
import { assessments, houses, contact, type AssessmentId } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { EnquirySection } from '@/components/sections/Shared';

export type AssessmentContent = {
  headline: string;
  intro: string;
  forWho: string[];
  rightStart: string[];
  covers: { title: string; text: string }[];
  outputs: { title: string; text: string }[];
  messageExample: string;
};

export function AssessmentPage({ id, content }: { id: AssessmentId; content: AssessmentContent }) {
  const a = assessments[id];
  const h = houses[a.house];
  const c = h.tone === 'cobalt';
  const accentText = c ? 'text-cobalt' : 'text-emerald';
  const accentBg = c ? 'bg-cobalt' : 'bg-emerald';
  const other = Object.values(assessments).find((x) => x.id !== id)!;

  const next = [
    { title: 'We review your enquiry', text: 'Qraft Capital reads what you shared and replies by email, usually to arrange a short conversation.' },
    { title: 'We discuss the priority', text: 'We talk through the problem, what you have tried and what a good result would look like for you.' },
    { title: 'We agree the scope', text: 'You receive a proposed scope, with price, timing and deliverables. Work begins only when you agree.' },
  ];

  return (
    <>
      <section className="border-b border-line">
        <div className="container-site py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>
              </li>
              <li>
                <Link href={h.href} className="hover:underline">{h.name}</Link> <span aria-hidden="true">/</span>
              </li>
              <li aria-current="page" className="text-ink">{a.name}</li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <HouseWordmark house={h.id} size="sm" />
              <h1 className="display-xl mt-6 text-ink">{content.headline}</h1>
              <p className="lede mt-6">{content.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <a href="#enquire" className={`btn ${c ? 'btn-cobalt' : 'btn-emerald'}`} data-track="assessment_cta_click" data-track-assessment={id}>
                  Request an assessment
                </a>
                {contact.calendarUrl && (
                  <a href={contact.calendarUrl} className="arrow-link text-ink" rel="noopener">
                    Or book a call
                  </a>
                )}
              </div>
            </div>
            <div className="self-end rounded-lg border border-line bg-white p-6 lg:col-span-4">
              <p className="label text-ink-muted">At a glance</p>
              <dl className="mt-4 space-y-3 text-[0.95rem]">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink-muted">House</dt>
                  <dd className="text-right font-semibold text-ink">{h.name}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink-muted">Focus</dt>
                  <dd className="text-right font-semibold text-ink">{h.capitalType}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink-muted">Price and timing</dt>
                  <dd className="text-right font-semibold text-ink">Agreed at scoping</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">To start</dt>
                  <dd className="text-right font-semibold text-ink">Send a short enquiry</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="who-title" className="bg-white">
        <div className="container-site grid gap-10 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <h2 id="who-title" className="display-md text-ink">Who is it for?</h2>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {content.forWho.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 ${accentBg}`} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display-md text-ink">When is it the right starting point?</h2>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {content.rightStart.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 ${accentBg}`} />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-muted">
              Closer to {other.shortName.toLowerCase()}?{' '}
              <Link href={other.href} className="link text-ink">
                See the {other.name}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="covers-title" className="border-y border-line">
        <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <p className={`label ${accentText}`}>Scope</p>
            <h2 id="covers-title" className="display-md mt-3 text-ink">What it could cover</h2>
            <ol className="mt-6 space-y-5">
              {content.covers.map((x, i) => (
                <li key={x.title} className="grid grid-cols-[2.25rem_1fr] gap-2">
                  <span className={`font-mono text-sm ${accentText}`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{x.title}</h3>
                    <p className="mt-1 text-ink-soft">{x.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="ledger rounded-lg border border-line bg-white p-6 sm:p-8">
            <p className={`label ${accentText}`}>Possible outputs</p>
            <h2 className="display-md mt-3 text-ink">What you might receive</h2>
            <ul className="mt-6 space-y-4">
              {content.outputs.map((x) => (
                <li key={x.title} className="rounded-md border border-line bg-paper p-4">
                  <h3 className="font-semibold text-ink">{x.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-ink-soft">{x.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-muted">Outputs depend on the scope we agree with you.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="next-title">
        <div className="container-site py-16 sm:py-20">
          <h2 id="next-title" className="display-md text-ink">What happens next</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {next.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5">
                <span className="font-mono text-sm text-ink-muted">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EnquirySection
        title={`Request the ${a.name}`}
        intro="Tell us a little about the business and the problem. We will reply to discuss the priority and agree the scope. There is no obligation."
        defaultType={h.id}
        source={a.href}
        assessment={id}
        submitLabel="Request an assessment"
        tallyUrl={a.formUrl}
        aside={<p className="mt-6 rounded-md border border-line bg-white p-4 text-sm text-ink-soft"><strong className="text-ink">Helpful to include:</strong> {content.messageExample}</p>}
      />
    </>
  );
}
