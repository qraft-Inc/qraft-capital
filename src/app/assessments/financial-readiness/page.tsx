import { AssessmentPage, type AssessmentContent } from '@/components/sections/AssessmentPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Financial Readiness Assessment | CapitalMasters',
  description:
    'Review your cash visibility, reporting, growth assumptions and readiness for funding conversations with CapitalMasters, and get a clear list of priority gaps and next actions.',
  path: '/assessments/financial-readiness',
});

const content: AssessmentContent = {
  headline: 'Financial Readiness Assessment',
  intro:
    'A structured review of how well you can see and plan your cash, how reliable your reporting is, what your growth plans assume and how prepared you are for a conversation with a funder.',
  forWho: [
    'Founders who find it hard to predict cash a month or two ahead.',
    'Businesses weighing a larger contract, new branch or major purchase.',
    'Teams expecting to speak with a bank, investor or development partner.',
  ],
  rightStart: [
    'You want to understand where you stand before building a full model or forecast.',
    'A funder has asked for information and you are not sure what is missing.',
    'You need to decide what financial work to do first, and in what order.',
  ],
  covers: [
    { title: 'Financial priorities', text: 'The decisions and goals that matter most over the next 6 to 18 months.' },
    { title: 'Cash visibility', text: 'How you track cash today, how far ahead you can see and how reliable it is.' },
    { title: 'Reporting practices', text: 'What records and reports you produce, how often and who uses them.' },
    { title: 'Growth assumptions', text: 'What your plans assume about sales, costs, margins and payment timing.' },
    { title: 'Funding conversation readiness', text: 'What a funder is likely to ask for, and what you have ready.' },
  ],
  outputs: [
    { title: 'Readiness summary', text: 'A plain-English view of where you stand today.' },
    { title: 'Priority gaps', text: 'The weaknesses most likely to hold back a decision or a funding conversation.' },
    { title: 'Information to gather', text: 'A checklist of records and documents to prepare, in priority order.' },
    { title: 'Next actions', text: 'Practical next steps, such as a cash-flow forecast or growth model, if they are needed.' },
  ],
  messageExample:
    'the decision or funding conversation ahead, how you track cash today and any deadline you are working to. Please do not attach financial statements.',
};

export default function Page() {
  return <AssessmentPage id="financial-readiness" content={content} />;
}
