import Link from 'next/link';
import { houses, assessments, company } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { HeroBoard } from '@/components/diagrams/Diagrams';
import { AssessmentPicker, EngagementSteps, Eyebrow } from '@/components/sections/Shared';
import { pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Qraft Capital | Business Systems and Financial Readiness',
  description:
    'Qraft Capital helps growing businesses build better systems, manage cash flow and prepare for funding. Find the right assessment through SystemMasters or CapitalMasters.',
  path: '/',
});

const problems = [
  {
    problem: 'Approvals take too long',
    detail: 'Purchase requests, quotes or payments wait days for a signature, and nobody is sure where they are stuck.',
    assessment: 'operations-automation' as const,
  },
  {
    problem: 'Too much work depends on the founder',
    detail: 'Staff wait for you to decide, check or chase, so you cannot step away without things slowing down.',
    assessment: 'operations-automation' as const,
  },
  {
    problem: 'You are unsure about cash flow',
    detail: 'Invoices are unpaid, suppliers want paying, and it is hard to see how much cash you will have next month.',
    assessment: 'financial-readiness' as const,
  },
  {
    problem: 'A funding conversation is coming',
    detail: 'A bank, investor or partner will ask for forecasts and documents, and you want to be ready before the meeting.',
    assessment: 'financial-readiness' as const,
  },
];

export default function HomePage() {
  const base = siteUrl();
  const orgJsonLd = base
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: company.brand,
        url: base,
        parentOrganization: { '@type': 'Organization', name: company.legalParent },
      }
    : null;

  return (
    <>
      {orgJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />}

      {/* 1. Hero */}
      <section className="overflow-hidden">
        <div className="container-site grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6 lg:pt-6">
            <Eyebrow>Business systems · Cash flow · Funding readiness</Eyebrow>
            <h1 className="display-xl mt-5 text-ink">Build a business ready to grow.</h1>
            <p className="lede mt-6">
              Qraft Capital helps growing businesses build better systems, manage cash flow and prepare for funding.
              Through SystemMasters and CapitalMasters, we help you improve how work gets done and understand what your
              next stage of growth will cost.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#assessments" className="btn btn-primary" data-track="assessment_cta_click" data-track-assessment="hero">
                Find the right assessment
              </Link>
              <Link href="#houses" className="btn btn-secondary">
                Explore our two houses
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroBoard />
          </div>
        </div>
      </section>

      {/* 2. Two houses */}
      <section id="houses" aria-labelledby="houses-title" className="border-t border-line bg-white">
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Two specialist houses</Eyebrow>
              <h2 id="houses-title" className="display-lg mt-4 text-ink">
                One business. Two kinds of capital.
              </h2>
            </div>
            <p className="lede self-end lg:col-span-6 lg:col-start-7">
              Growth needs systems your team can run and the cash to fund the next step. Each house focuses on one, and
              they work together when you need both.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {Object.values(houses).map((h) => {
              const c = h.tone === 'cobalt';
              return (
                <article key={h.id} className="relative flex flex-col bg-paper p-7 sm:p-10">
                  <div className={`absolute inset-x-0 top-0 h-1.5 ${c ? 'bg-cobalt' : 'bg-emerald'}`} aria-hidden="true" />
                  <h3>
                    <HouseWordmark house={h.id} size="lg" />
                  </h3>
                  <p className={`label mt-6 ${c ? 'text-cobalt' : 'text-emerald'}`}>Builds {h.capitalType.toLowerCase()}</p>
                  <p className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">{h.summary}</p>
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="label text-ink-muted">The problem</dt>
                      <dd className="mt-1.5 text-ink-soft">{h.problem}</dd>
                    </div>
                    <div>
                      <dt className="label text-ink-muted">For example</dt>
                      <dd className="mt-1.5 text-ink-soft">{h.example}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-8">
                    <Link href={h.href} className="arrow-link text-ink">
                      Explore {h.name}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. What are you trying to fix? */}
      <section aria-labelledby="fix-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="fix-title" className="display-lg text-ink">
              What are you trying to fix?
            </h2>
            <p className="mt-4 text-ink-soft">Pick the closest match. Each one leads to the assessment that fits it.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {problems.map((p) => {
              const a = assessments[p.assessment];
              const c = houses[a.house].tone === 'cobalt';
              return (
                <li key={p.problem}>
                  <Link
                    href={a.href}
                    className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                    data-track="assessment_cta_click"
                    data-track-assessment={a.id}
                  >
                    <span>
                      <span className="block font-display text-2xl text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {p.problem}
                      </span>
                      <span className="mt-1.5 block text-ink-soft">{p.detail}</span>
                    </span>
                    <span className={`label inline-flex items-center gap-2 whitespace-nowrap ${c ? 'text-cobalt' : 'text-emerald'}`}>
                      <span aria-hidden="true" className={`size-2 rounded-full ${c ? 'bg-cobalt' : 'bg-emerald'}`} />
                      {a.shortName}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Houses working together */}
      <section aria-labelledby="together-title" className="bg-ink text-paper">
        <div className="container-site py-16 sm:py-20">
          <p className="label inline-block rounded-sm border border-paper/30 px-2 py-1 text-paper/80">Illustrative example</p>
          <h2 id="together-title" className="display-lg mt-5 max-w-3xl">
            A services business wins a larger contract.
          </h2>
          <p className="mt-4 max-w-2xl text-paper/75">
            Good news, with two risks: the team could drop the ball between sales and delivery, and cash could run short
            before the client pays. Here is how the two houses would handle it.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-paper/15 md:grid-cols-2">
            <div className="bg-ink p-7 sm:p-9">
              <HouseWordmark house="systemmasters" invert endorsement={false} />
              <p className="label mt-5 text-paper/60">Makes sure the work gets done</p>
              <p className="mt-3 text-paper/85">
                Maps the handoff from sales to delivery, so everyone knows what was promised. Assigns an owner to each
                step, from kickoff to the final invoice, so nothing waits for the founder to chase it.
              </p>
            </div>
            <div className="bg-ink p-7 sm:p-9">
              <HouseWordmark house="capitalmasters" invert endorsement={false} />
              <p className="label mt-5 text-paper/60">Makes sure the cash holds up</p>
              <p className="mt-3 text-paper/85">
                Builds a cash-flow forecast around the deposit date, supplier costs and the client’s payment milestones,
                so you can see the gap and plan for it before you sign.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engagement sequence */}
      <section aria-labelledby="how-title" className="border-b border-line">
        <div className="container-site py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="how-title" className="display-lg mt-4 text-ink">
              Three steps to start.
            </h2>
          </div>
          <div className="mt-10">
            <EngagementSteps />
          </div>
        </div>
      </section>

      {/* 6. Assessment selection */}
      <section id="assessments" aria-labelledby="assessments-title" className="bg-paper-deep">
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Request an assessment</Eyebrow>
              <h2 id="assessments-title" className="display-lg mt-4 text-ink">
                Start with the problem that is costing you most.
              </h2>
            </div>
            <p className="self-end text-ink-soft lg:col-span-5">
              Each assessment is scoped with you before work begins. Price, timing and final deliverables depend on what
              we agree.
            </p>
          </div>
          <div className="mt-10">
            <AssessmentPicker headingLevel={3} />
          </div>
          <p className="mt-8 text-center text-ink-soft">
            Need both, or not sure which fits?{' '}
            <Link href="/contact" className="link text-ink">
              Help me choose
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
