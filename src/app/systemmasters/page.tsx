import Link from 'next/link';
import { assessments } from '@/content/site';
import { HouseWordmark } from '@/components/brand/Wordmark';
import { EnquiryWorkflow } from '@/components/diagrams/Diagrams';
import { Eyebrow, HouseCtaBand } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'SystemMasters | Workflows, SOPs and Automation | Qraft Capital',
  description:
    'SystemMasters, a Qraft Capital brand, helps growing businesses fix slow approvals and missed handoffs with clear workflows, owners, SOPs, automation and dashboards.',
  path: '/systemmasters',
});

const problems = [
  { title: 'Slow approvals', text: 'Requests wait for a signature and no one can say where they are.' },
  { title: 'Inconsistent handoffs', text: 'Work changes hands between sales, operations and finance, and details get lost.' },
  { title: 'Repetitive admin', text: 'Staff re-type the same information, chase the same updates and build the same reports by hand.' },
  { title: 'Scattered information', text: 'Customer and job details sit across WhatsApp chats, spreadsheets, email and notebooks.' },
  { title: 'No view of overdue work', text: 'Managers find out something is late when a customer complains.' },
];

const services = [
  { name: 'Operations assessment', text: 'A structured review of your priority workflows to find bottlenecks and decide what to fix first.' },
  { name: 'Process mapping', text: 'A clear picture of each step, who does it and where work waits, agreed with the people who do it.' },
  { name: 'SOPs and playbooks', text: 'Written procedures your team can follow and new staff can learn from, without asking the founder.' },
  { name: 'Workflow automation', text: 'Reminders, assignments, forms and approvals set up in tools you already use or new ones that fit.' },
  { name: 'Performance dashboards', text: 'A simple management view of what is open, overdue and completed.' },
  { name: 'Staff enablement', text: 'Training and support so your team uses the new system day to day.' },
];

const modes = [
  {
    name: 'Do it yourself',
    tag: 'You build',
    text: 'Training, templates and practical tools you apply in your own business.',
    get: ['Workshops or guided sessions', 'Process, SOP and checklist templates', 'Tool set-up guides'],
  },
  {
    name: 'Do it with you',
    tag: 'We build together',
    text: 'Guided design and implementation using your actual workflows, people and tools.',
    get: ['Working sessions with your team', 'Workflows designed on your real cases', 'Coaching while you roll it out'],
  },
  {
    name: 'Do it for you',
    tag: 'We build, you run',
    text: 'Scoped system design, configuration, rollout and handover, with ongoing support where agreed.',
    get: ['System design and configuration', 'Rollout and staff training', 'Handover documents, with support if agreed'],
  },
];

const measures = [
  'Approval turnaround time',
  'Missed or late handoffs',
  'Follow-up completion rate',
  'Time spent on routine admin',
  'Overdue items per owner',
  'Time for a new hire to work independently',
];

export default function SystemMastersPage() {
  const a = assessments['operations-automation'];
  return (
    <>
      <section className="border-b border-line">
        <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HouseWordmark house="systemmasters" size="md" />
            <p className="label mt-8 text-cobalt">Operational capital</p>
            <h1 className="display-xl mt-4 text-ink">Build systems your team can run.</h1>
            <p className="lede mt-6">
              When approvals get stuck, work depends on a few people, or managers can’t see what’s overdue, SystemMasters
              helps you redesign the workflow, set clear responsibilities and put the right tools in place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`${a.href}#enquire`} className="btn btn-cobalt" data-track="assessment_cta_click" data-track-assessment={a.id}>
                {a.cta}
              </Link>
              <Link href="#workflow" className="btn btn-secondary">
                See an example
              </Link>
            </div>
          </div>
          <aside className="self-end rounded-lg border border-cobalt/25 bg-cobalt-soft p-6 lg:col-span-4 lg:col-start-9" aria-labelledby="sm-problems">
            <h2 id="sm-problems" className="label text-cobalt-deep">Problems we help address</h2>
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

      <section id="workflow" aria-labelledby="workflow-title" className="ledger border-b border-line bg-paper-deep">
        <div className="container-site py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="cobalt">What a system looks like</Eyebrow>
            <h2 id="workflow-title" className="display-lg mt-4 text-ink">
              From a new enquiry to a manager’s view, without chasing.
            </h2>
          </div>
          <div className="mt-10">
            <EnquiryWorkflow />
          </div>
        </div>
      </section>

      <section aria-labelledby="services-title" className="border-b border-line bg-white">
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="services-title" className="display-lg text-ink lg:col-span-5">
              Work we can scope with you
            </h2>
            <p className="lede self-end lg:col-span-6 lg:col-start-7">
              Start with one workflow or a wider review. We agree what is included before any work begins.
            </p>
          </div>
          <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.name} className="border-b border-line py-6">
                <dt className="flex items-baseline gap-3 font-display text-xl text-ink">
                  <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  {s.name}
                </dt>
                <dd className="mt-2 text-ink-soft">{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="modes-title" className="border-b border-line">
        <div className="container-site py-16 sm:py-20">
          <Eyebrow tone="cobalt">Delivery options</Eyebrow>
          <h2 id="modes-title" className="display-lg mt-4 max-w-2xl text-ink">
            Choose how much of the work you want to hand over.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {modes.map((m, i) => (
              <article key={m.name} className="flex flex-col rounded-lg border border-line bg-white p-6">
                <div className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className={`h-1.5 flex-1 rounded-full ${d <= i ? 'bg-cobalt' : 'bg-cobalt-soft'}`} />
                  ))}
                </div>
                <p className="label mt-5 text-cobalt">{m.tag}</p>
                <h3 className="mt-2 font-display text-2xl text-ink">{m.name}</h3>
                <p className="mt-2 text-ink-soft">{m.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[0.95rem] text-ink-soft">
                  {m.get.map((g) => (
                    <li key={g} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-cobalt">✓</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="measure-title" className="bg-white">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="cobalt">Seeing the difference</Eyebrow>
            <h2 id="measure-title" className="display-md mt-4 text-ink">
              What you can measure once a system is in use
            </h2>
            <p className="mt-4 text-ink-soft">
              A working system records what happens, so you can track progress instead of relying on impressions. We
              agree which measures matter to you during scoping. We do not promise specific numbers in advance.
            </p>
          </div>
          <ul className="grid gap-3 self-center sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {measures.map((m) => (
              <li key={m} className="flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3.5 text-ink">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-cobalt" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HouseCtaBand house="systemmasters" />
    </>
  );
}
