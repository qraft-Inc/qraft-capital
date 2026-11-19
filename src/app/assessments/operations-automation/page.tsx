import { AssessmentPage, type AssessmentContent } from '@/components/sections/AssessmentPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Operations and Automation Assessment | SystemMasters',
  description:
    'Review your priority workflows, tools, owners and handoffs with SystemMasters. Find the bottlenecks, decide what to fix or automate first, and get a practical plan.',
  path: '/assessments/operations-automation',
});

const content: AssessmentContent = {
  headline: 'Operations and Automation Assessment',
  intro:
    'A focused review of one or more workflows that matter most to your business: how work moves, who owns each step, which tools are involved and where it gets stuck. You come away knowing what to fix first.',
  forWho: [
    'Founders and managers who are pulled into routine decisions and follow-ups.',
    'Teams where requests stall between sales, operations and finance.',
    'Businesses running on WhatsApp chats, spreadsheets and memory, and starting to feel the strain.',
  ],
  rightStart: [
    'You know something is slow or unreliable, but not exactly where or why.',
    'You are considering new software or automation and want to be sure it fixes the right problem.',
    'You are hiring or growing and need processes new staff can follow.',
  ],
  covers: [
    { title: 'Priority workflows', text: 'One or more workflows you choose, such as enquiry to sale, purchase approval or job delivery.' },
    { title: 'Tools in use', text: 'The apps, spreadsheets, forms and messaging channels the work passes through.' },
    { title: 'Responsibilities', text: 'Who does each step, who decides and who is accountable when it is late.' },
    { title: 'Handoffs and delays', text: 'Where work waits, gets re-entered or falls between people.' },
  ],
  outputs: [
    { title: 'Workflow map', text: 'A clear diagram of each reviewed workflow, as it runs today.' },
    { title: 'List of bottlenecks', text: 'The specific points where work waits, repeats or is lost, and why.' },
    { title: 'Prioritised improvements', text: 'What to change, in order of impact and effort, including what could be automated.' },
    { title: 'Suggested implementation plan', text: 'Practical next steps, with the option to do it yourself, with us or by us.' },
  ],
  messageExample:
    'which workflow is causing the most trouble, roughly how many people are involved and which tools you use today.',
};

export default function Page() {
  return <AssessmentPage id="operations-automation" content={content} />;
}
