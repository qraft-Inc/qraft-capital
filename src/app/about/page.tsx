import Link from 'next/link';
import { company, houses } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { EngagementSteps, Eyebrow } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Qraft Capital | Enterprise Capital Development',
  description:
    'Qraft Capital is the enterprise capital development arm of Rata Qraft Solutions Limited, helping growing businesses build operating systems and financial capacity.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-site py-14 sm:py-20">
          <Eyebrow>About Qraft Capital</Eyebrow>
          <h1 className="display-xl mt-5 max-w-4xl text-ink">Helping growing businesses build what they run on.</h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 text-lg text-ink-soft lg:col-span-7">
              <p>
                Qraft Capital is the enterprise capital development arm of {company.legalParent}. We work with founders,
                business owners and leadership teams who have reached the point where growth is limited less by demand
                and more by how the business runs and how it is financed.
              </p>
              <p>
                That usually shows up as everyday problems: routine work keeps returning to the founder, requests get
                stuck between teams, cash is tied up in unpaid invoices, or a new contract will require spending before
                the client pays. We help you fix the systems and the numbers behind those problems.
              </p>
            </div>
            <aside className="rounded-lg border border-line bg-white p-6 lg:col-span-4 lg:col-start-9" aria-labelledby="ecd-title">
              <h2 id="ecd-title" className="label text-ink-muted">What “Enterprise Capital Development” means</h2>
              <p className="mt-3 text-ink">{company.descriptorLine}</p>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="structure-title" className="bg-white">
        <div className="container-site py-16 sm:py-20">
          <h2 id="structure-title" className="display-lg text-ink">How we are organised</h2>
          <div className="mt-10 rounded-xl border border-line bg-paper p-6 sm:p-10">
            <div className="text-center">
              <p className="label text-ink-muted">Company</p>
              <p className="mt-2 font-display text-2xl text-ink">{company.legalParent}</p>
            </div>
            <div className="mx-auto h-8 w-px bg-ink/30" aria-hidden="true" />
            <div className="mx-auto max-w-md rounded-lg bg-ink p-5 text-center text-paper">
              <p className="label text-paper/70">{company.descriptor}</p>
              <p className="mt-2 font-display text-2xl">{company.brand}</p>
            </div>
            <div className="mx-auto h-8 w-px bg-ink/30" aria-hidden="true" />
            <ul className="grid gap-4 md:grid-cols-2">
              {Object.values(houses).map((h) => (
                <li key={h.id} className={`rounded-lg border-2 bg-white p-6 ${h.tone === 'cobalt' ? 'border-cobalt/30' : 'border-emerald/30'}`}>
                  <HouseWordmark house={h.id} />
                  <p className="mt-4 font-semibold text-ink">Builds {h.capitalType.toLowerCase()}</p>
                  <p className="mt-1 text-ink-soft">{h.summary}</p>
                  <Link href={h.href} className="arrow-link mt-4 text-ink">
                    Explore {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <h2 id="principles-title" className="display-lg text-ink lg:col-span-4">How we work with clients</h2>
          <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {[
              ['Scope before work', 'We agree the problem, the deliverables, the price and the timing before anything starts.'],
              ['Your workflows, your numbers', 'We work from how your business actually runs, not from a generic template.'],
              ['Built to hand over', 'Systems, models and documents are made for your team to keep using after we step back.'],
              ['Honest about fit', 'If an assessment is not the right next step, or another adviser would serve you better, we will say so.'],
            ].map(([t, d]) => (
              <div key={t} className="border-t-2 border-ink pt-4">
                <dt className="font-display text-xl text-ink">{t}</dt>
                <dd className="mt-2 text-ink-soft">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="start-title" className="bg-ink text-paper">
        <div className="container-site py-16 sm:py-20">
          <h2 id="start-title" className="display-lg">Getting started</h2>
          <div className="mt-10">
            <EngagementSteps dark />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#assessments" className="btn btn-on-ink" data-track="assessment_cta_click" data-track-assessment="about">
              Find the right assessment
            </Link>
            <Link href="/contact" className="btn btn-outline-on-ink">
              Ask us a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
