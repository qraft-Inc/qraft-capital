/**
 * Functional diagrams built in HTML/CSS. All are clearly labelled as illustrative:
 * they show how the work looks, not client results.
 */

/* ---------- Homepage hero: one business, two kinds of capital ---------- */
export function HeroBoard() {
  const flow = ['Enquiry logged', 'Owner assigned', 'Follow-up due', 'Manager view'];
  const weeks = [
    { w: 'Wk 1', v: 30, label: 'Deposit in' },
    { w: 'Wk 2', v: -55, label: 'Supplier costs' },
    { w: 'Wk 4', v: -35, label: 'Wages' },
    { w: 'Wk 6', v: -20, label: 'Wages' },
    { w: 'Wk 8', v: 70, label: 'Milestone paid' },
  ];
  return (
    <figure className="relative" aria-labelledby="hero-board-caption">
      <div className="ledger overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgb(15_27_45/0.35)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="label text-ink-muted">Growth plan · new contract</span>
          <span className="label rounded-sm bg-paper-deep px-2 py-1 text-ink-muted">Illustrative</span>
        </div>

        <div className="p-5 sm:p-6">
          <p className="label text-cobalt">SystemMasters · How the work moves</p>
          <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {flow.map((step, i) => (
              <li key={step} className="relative rounded-md border border-cobalt/30 bg-cobalt-soft px-3 py-2.5 text-sm font-medium text-ink">
                <span className="block font-mono text-[0.7rem] text-cobalt-deep">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-dashed border-line p-5 sm:p-6">
          <p className="label text-emerald">CapitalMasters · When the cash moves</p>
          <ul className="mt-4 grid grid-cols-5 items-center gap-2" style={{ height: '9rem' }}>
            {weeks.map((x) => (
              <li key={x.w} className="flex h-full flex-col items-center">
                <div className="relative w-full flex-1">
                  <div className="absolute inset-x-0 top-1/2 border-t border-ink/30" aria-hidden="true" />
                  <div
                    aria-hidden="true"
                    className={`absolute left-1/2 w-[55%] -translate-x-1/2 ${x.v > 0 ? 'rounded-t-[4px] bg-emerald' : 'rounded-b-[4px] bg-danger'}`}
                    style={x.v > 0 ? { bottom: '50%', height: `${(x.v / 70) * 48}%` } : { top: '50%', height: `${(-x.v / 70) * 48}%` }}
                  />
                </div>
                <span className="mt-1 font-mono text-[0.7rem] text-ink-muted">{x.w}</span>
                <span className="sr-only">
                  {x.label}: cash {x.v > 0 ? 'in' : 'out'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption id="hero-board-caption" className="mt-3 text-sm text-ink-muted">
        Illustrative: the same new contract seen two ways, as work that must flow between people and as cash that leaves
        before it comes back.
      </figcaption>
    </figure>
  );
}

/* ---------- SystemMasters: an enquiry moving through a system ---------- */
export function EnquiryWorkflow() {
  const stages = [
    {
      name: 'Enquiry arrives',
      what: 'A customer enquiry comes in by phone, WhatsApp, email or walk-in and is logged once, in one shared place.',
      owner: 'Front desk or sales',
      sees: 'New enquiries today, by channel',
    },
    {
      name: 'Owner assigned',
      what: 'A rule assigns it to a named person, based on the service or area, and sets a reply-by time.',
      owner: 'Named team member',
      sees: 'Who owns what, and their workload',
    },
    {
      name: 'Follow-up tracked',
      what: 'Reminders prompt the owner to follow up. Each call, quote and next step is recorded against the enquiry.',
      owner: 'Same owner, until closed',
      sees: 'Follow-ups due and overdue',
    },
    {
      name: 'Management view',
      what: 'A simple dashboard shows open enquiries, what is overdue and what has converted, without asking around.',
      owner: 'Manager or founder',
      sees: 'Pipeline, overdue items, outcomes',
    },
  ];
  return (
    <figure aria-labelledby="workflow-caption">
      <div className="flex items-center justify-between gap-4">
        <p className="label text-cobalt">Example workflow · Customer enquiry to management view</p>
        <span className="label hidden rounded-sm bg-white px-2 py-1 text-ink-muted sm:inline">Illustrative</span>
      </div>
      <ol className="mt-5 grid gap-4 lg:grid-cols-4">
        {stages.map((s, i) => (
          <li key={s.name} className="relative flex flex-col rounded-lg border border-cobalt/25 bg-white">
            <div className="flex items-center gap-3 border-b border-cobalt/15 bg-cobalt-soft px-4 py-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cobalt font-mono text-sm text-white" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="font-semibold text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.name}
              </h3>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 text-[0.95rem]">
              <p className="text-ink-soft">{s.what}</p>
              <dl className="mt-auto space-y-2 border-t border-line pt-3 text-sm">
                <div>
                  <dt className="label text-ink-muted">Owner</dt>
                  <dd className="mt-0.5 text-ink">{s.owner}</dd>
                </div>
                <div>
                  <dt className="label text-ink-muted">Manager can see</dt>
                  <dd className="mt-0.5 text-ink">{s.sees}</dd>
                </div>
              </dl>
            </div>
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-3.5 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-cobalt/30 bg-paper text-cobalt lg:grid"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption id="workflow-caption" className="mt-4 text-sm text-ink-muted">
        Illustrative example of a workflow SystemMasters could design and configure. Tools, steps and rules are agreed
        with each client.
      </figcaption>
    </figure>
  );
}

/* ---------- CapitalMasters: profitable contract, short of cash ---------- */
const cashPoints = [
  { period: 'Start', balance: 20, note: 'Cash in the bank before the contract' },
  { period: 'Month 1', balance: -16, note: '36 deposit in; 60 to suppliers and 12 wages out' },
  { period: 'Month 2', balance: -28, note: '12 wages out' },
  { period: 'Month 3', balance: -40, note: '12 wages out; work completed and invoiced' },
  { period: 'Month 4', balance: 44, note: 'Client pays the remaining 84' },
];

export function CashGapChart() {
  const max = 44;
  const trough = Math.min(...cashPoints.map((p) => p.balance));
  return (
    <figure aria-labelledby="cash-gap-title" className="rounded-lg border border-line bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 id="cash-gap-title" className="font-semibold text-ink">
            Cash balance at the end of each month, UGX millions
          </h3>
          <p className="mt-1 text-sm text-ink-muted">Contract worth 120, costs 96, profit 24. Client pays 30% upfront and 70% one month after completion.</p>
        </div>
        <span className="label rounded-sm bg-paper-deep px-2 py-1 text-ink-muted">Illustrative</span>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-4" role="list" aria-label="Cash balance by month">
        {cashPoints.map((p) => {
          const pos = p.balance >= 0;
          // Bars use at most 78% of each half so value labels never collide with the axis labels.
          const pct = (Math.abs(p.balance) / max) * 78;
          const labelled = p.balance === trough || p.period === 'Month 4' || p.period === 'Start';
          return (
            <div key={p.period} role="listitem" className="flex flex-col items-center" title={`${p.period}: ${p.balance}. ${p.note}`}>
              <span className="sr-only">
                {p.period}: {pos ? '' : 'minus '}
                {Math.abs(p.balance)} million. {p.note}.
              </span>
              {/* positive half */}
              <div className="relative flex h-24 w-full items-end justify-center sm:h-28" aria-hidden="true">
                {pos && (
                  <>
                    <div className="w-[60%] max-w-14 rounded-t-[4px] bg-emerald" style={{ height: `${pct}%` }} />
                    {labelled && (
                      <span className="absolute font-mono text-xs font-medium text-ink" style={{ bottom: `calc(${pct}% + 4px)` }}>
                        +{p.balance}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="h-0.5 w-full bg-ink" aria-hidden="true" />
              {/* negative half */}
              <div className="relative flex h-24 w-full items-start justify-center sm:h-28" aria-hidden="true">
                {!pos && (
                  <>
                    <div className="w-[60%] max-w-14 rounded-b-[4px] bg-danger" style={{ height: `${pct}%` }} />
                    {labelled && (
                      <span className="absolute font-mono text-xs font-semibold text-danger-deep" style={{ top: `calc(${pct}% + 4px)` }}>
                        {p.balance}
                      </span>
                    )}
                  </>
                )}
              </div>
              <span className="mt-1 text-center font-mono text-[0.7rem] text-ink-muted sm:text-xs" aria-hidden="true">
                {p.period}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-l-4 border-danger pl-4 text-ink">
        The contract makes a profit of 24, but the business needs about <strong>40 of extra cash</strong> in month 3 to keep
        paying suppliers and staff until the client pays.
      </p>

      <details className="mt-5 text-sm">
        <summary className="cursor-pointer font-semibold text-ink">Show the numbers as a table</summary>
        <table className="mt-3 w-full border-collapse text-left">
          <caption className="sr-only">Illustrative cash balance by month, UGX millions</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-3 font-semibold">Period</th>
              <th scope="col" className="py-2 pr-3 font-semibold">What happened</th>
              <th scope="col" className="py-2 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {cashPoints.map((p) => (
              <tr key={p.period} className="border-b border-line/70">
                <th scope="row" className="py-2 pr-3 font-normal">{p.period}</th>
                <td className="py-2 pr-3 text-ink-soft">{p.note}</td>
                <td className="py-2 text-right font-mono">{p.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <figcaption className="mt-4 text-sm text-ink-muted">
        Illustrative example with round numbers. It is not based on a client.
      </figcaption>
    </figure>
  );
}
