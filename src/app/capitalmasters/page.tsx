import Link from 'next/link';
import { assessments } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { CashGapChart } from '@/components/diagrams/Diagrams';
import { Eyebrow, HouseCtaBand } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'CapitalMasters | Cash Flow and Funding Readiness | Qraft Capital',
  description:
    'CapitalMasters, a Qraft Capital brand, helps founders forecast cash flow, understand the economics of growth and prepare the numbers and documents funders ask for.',
  path: '/capitalmasters',
});

const problems = [
  { title: 'Cash gets tight between invoices and collections', text: 'Sales look healthy, but money is tied up in unpaid invoices while bills keep coming.' },
  { title: 'Unsure whether a bigger contract pays', text: 'You can see the contract value, but not what it really costs to deliver or when the cash arrives.' },
  { title: 'Forecasts and documents are thin', text: 'A bank, investor or partner wants forecasts and supporting documents you do not yet have in good shape.' },
];

const services = [
  { name: 'Financial readiness assessment', text: 'A review of your cash visibility, reporting, growth plans and readiness for funding conversations.' },
  { name: 'Cash-flow forecasting', text: 'A week-by-week or month-by-month view of cash in and out, built around how your customers actually pay.' },
  { name: 'Financial modelling', text: 'A model of the business you can update, showing how sales, costs and timing affect results.' },
  { name: 'Unit economics and scenario planning', text: 'What each customer, product or contract earns, and what happens if prices, volumes or payment terms change.' },
  { name: 'Investor-readiness documentation', text: 'Help preparing the financial summaries and supporting documents funders commonly ask for.' },
  { name: 'Advisory', text: 'Ongoing support for financial decisions as the business grows, where agreed.' },
];

const outputs = [
  {
    name: 'A cash-flow forecast',
    text: 'Shows when cash comes in and goes out, where the tight weeks are and how much cover you need.',
    sample: ['Opening balance', 'Receipts by customer', 'Supplier and payroll payments', 'Closing balance by week'],
  },
  {
    name: 'A “what must be true” growth model',
    text: 'Shows the prices, volumes, margins and payment terms an expansion needs to work, so you can test them.',
    sample: ['Revenue drivers', 'Cost to deliver', 'Working capital needed', 'Break-even point'],
  },
  {
    name: 'A prioritised documentation checklist',
    text: 'Lists what a funder is likely to ask for, what you have, what is missing and what to prepare first.',
    sample: ['Management accounts', 'Forecast and assumptions', 'Key contracts', 'Gaps, ranked by priority'],
  },
];

export default function CapitalMastersPage() {
  const a = assessments['financial-readiness'];
  return (
    <>
      <section className="border-b border-line">
        <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HouseWordmark house="capitalmasters" size="md" />
            <p className="label mt-8 text-emerald">Financial capital</p>
            <h1 className="display-xl mt-4 text-ink">Know what growth will cost and how to finance it.</h1>
            <p className="lede mt-6">
              CapitalMasters helps founders get clear on cash flow, understand the economics of their business and
              prepare the numbers and documents funders ask for.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`${a.href}#enquire`} className="btn btn-emerald" data-track="assessment_cta_click" data-track-assessment={a.id}>
                {a.cta}
              </Link>
              <Link href="#cash-gap" className="btn btn-secondary">
                See an example
              </Link>
            </div>
          </div>
          <aside className="self-end rounded-lg border border-emerald/25 bg-emerald-soft p-6 lg:col-span-4 lg:col-start-9" aria-labelledby="cm-problems">
            <h2 id="cm-problems" className="label text-emerald-deep">Problems we help address</h2>
            <ul className="mt-4 space-y-4">
              {problems.map((p) => (
                <li key={p.title}>
                  <p className="font-semibold text-ink">{p.title}</p>
                  <p className="text-[0.95rem] text-ink-soft">{p.text}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="cash-gap" aria-labelledby="cash-gap-heading" className="ledger border-b border-line bg-paper-deep">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="emerald">Illustrative example</Eyebrow>
            <h2 id="cash-gap-heading" className="display-lg mt-4 text-ink">
              Profitable on paper, short of cash in practice.
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft">
              <p>
                A business wins a contract worth UGX 120 million. Delivering it costs 96 million, so it should earn 24
                million in profit.
              </p>
              <p>
                But suppliers want paying in the first month, staff are paid monthly, and the client pays most of the
                contract one month after the work is finished. For three months more cash goes out than comes in.
              </p>
              <p>
                A cash-flow forecast shows this gap <em>before</em> you sign, so you can negotiate a bigger deposit,
                stage the supplier payments or arrange finance in good time.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <CashGapChart />
          </div>
        </div>
      </section>

      <section aria-labelledby="cm-services-title" className="border-b border-line bg-white">
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="cm-services-title" className="display-lg text-ink lg:col-span-5">
              Work we can scope with you
            </h2>
            <p className="lede self-end lg:col-span-6 lg:col-start-7">
              Education, financial systems and readiness advisory, scoped to the decision in front of you.
            </p>
          </div>
          <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.name} className="border-b border-line py-6">
                <dt className="flex items-baseline gap-3 font-display text-xl text-ink">
                  <span className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, '0')}</span>
                  {s.name}
                </dt>
                <dd className="mt-2 text-ink-soft">{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="outputs-title" className="border-b border-line">
        <div className="container-site py-16 sm:py-20">
          <Eyebrow tone="emerald">Examples of outputs</Eyebrow>
          <h2 id="outputs-title" className="display-lg mt-4 max-w-2xl text-ink">
            Things you can use in the next decision.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {outputs.map((o) => (
              <article key={o.name} className="flex flex-col rounded-lg border border-line bg-white">
                <div className="border-b border-line p-6">
                  <h3 className="font-display text-2xl text-ink">{o.name}</h3>
                  <p className="mt-2 text-ink-soft">{o.text}</p>
                </div>
                <div className="ledger flex-1 p-6">
                  <p className="label text-ink-muted">Typically includes</p>
                  <ul className="mt-3 space-y-2 font-mono text-sm text-ink">
                    {o.sample.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 border-b border-dashed border-line pb-2">
                        <span aria-hidden="true" className="size-1.5 bg-emerald" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-muted">Final outputs depend on the scope we agree with you.</p>
        </div>
      </section>

      <section aria-labelledby="scope-note-title" className="bg-white">
        <div className="container-site py-12">
          <div className="max-w-3xl rounded-lg border border-line bg-paper p-6">
            <h2 id="scope-note-title" className="font-semibold text-ink">
              What CapitalMasters is, and is not
            </h2>
            <p className="mt-2 text-ink-soft">
              CapitalMasters provides education, financial systems and readiness advisory. We help you prepare,
              document and decide. We are not a lender, fund or investment manager. We do not raise money from the
              public, and we cannot guarantee that any funder will say yes.
            </p>
          </div>
        </div>
      </section>

      <HouseCtaBand house="capitalmasters" />
    </>
  );
}
