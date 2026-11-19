/**
 * Central site configuration and reusable copy.
 *
 * EDIT HERE FIRST. Business details, navigation, house and offer names live in
 * this file so they can be changed in one place.
 *
 * Rule: only add contact details, links or claims that are verified and approved
 * for publication. Anything left as `null` is hidden from the site automatically.
 */

export const company = {
  brand: 'Qraft Capital',
  legalParent: 'Rata Qraft Solutions Limited',
  descriptor: 'Enterprise Capital Development',
  /** One-line explanation of "Enterprise Capital Development" used on About and in the footer. */
  descriptorLine:
    'Enterprise capital development means building the two things a growing business runs on: systems your team can operate, and the financial capacity to fund the next stage.',
} as const;

/**
 * Public contact details. Leave as null until verified for Qraft Capital.
 * Each one appears on the Contact page and footer only when set.
 *
 * - email: shown as a mailto link, e.g. 'hello@example.com'
 * - whatsapp: digits only in international format, e.g. '2567XXXXXXXX'
 * - linkedin: full https URL to the company page
 * - calendarUrl: full https URL to a live booking page. When set, assessment pages
 *   may add "Book a call" alongside "Request an assessment".
 * - officeLocation: e.g. 'Kampala, Uganda'. Only publish once verified.
 */
export const contact: {
  email: string | null;
  whatsapp: string | null;
  linkedin: string | null;
  calendarUrl: string | null;
  officeLocation: string | null;
} = {
  email: null,
  whatsapp: null,
  linkedin: null,
  calendarUrl: null,
  officeLocation: null,
};

/**
 * Contact page form (Tally). Submissions, notifications and storage are configured in Tally.
 * The assessment pages still use the built-in form and SMTP lead routing.
 */
export const contactFormUrl =
  'https://tally.so/embed/M1a4zE?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

/**
 * Publish /privacy only after the notice has been reviewed against the live
 * enquiry setup (destination inbox, provider, retention, data-request contact).
 * While false, the route returns 404 and is excluded from the footer and sitemap.
 */
export const privacyPolicyApproved = false;

export type HouseId = 'systemmasters' | 'capitalmasters';
export type AssessmentId = 'operations-automation' | 'financial-readiness';

export const houses: Record<
  HouseId,
  {
    id: HouseId;
    name: string;
    capitalType: string;
    href: string;
    assessment: AssessmentId;
    /** Tailwind token suffix: `cobalt` or `emerald` */
    tone: 'cobalt' | 'emerald';
    summary: string;
    problem: string;
    example: string;
  }
> = {
  systemmasters: {
    id: 'systemmasters',
    name: 'SystemMasters',
    capitalType: 'Operational capital',
    href: '/systemmasters',
    assessment: 'operations-automation',
    tone: 'cobalt',
    summary: 'Systems your team can run without you in every decision.',
    problem:
      'Approvals stall, handoffs get missed and routine work keeps landing back on the founder’s desk.',
    example:
      'Every new customer enquiry is logged in one place, assigned to a named owner and followed up on time, and managers can see what is overdue.',
  },
  capitalmasters: {
    id: 'capitalmasters',
    name: 'CapitalMasters',
    capitalType: 'Financial capital',
    href: '/capitalmasters',
    assessment: 'financial-readiness',
    tone: 'emerald',
    summary: 'Clear numbers for growth decisions and funding conversations.',
    problem:
      'Cash is tied up in unpaid invoices, and it is hard to tell whether the next contract will strengthen the business or stretch it.',
    example:
      'Before signing a larger contract, you can see week by week when cash goes out to suppliers, when the client’s payments come in and how big the gap is.',
  },
};

export const assessments: Record<
  AssessmentId,
  {
    id: AssessmentId;
    name: string;
    shortName: string;
    house: HouseId;
    href: string;
    cta: string;
    oneLine: string;
    /** Optional Tally embed URL. When set, it replaces the built-in enquiry form on the assessment page. */
    formUrl?: string;
  }
> = {
  'operations-automation': {
    id: 'operations-automation',
    name: 'Operations and Automation Assessment',
    shortName: 'Operations assessment',
    house: 'systemmasters',
    href: '/assessments/operations-automation',
    cta: 'Request an Operations and Automation Assessment',
    oneLine: 'Review one or more priority workflows to find where work gets stuck and what to fix first.',
    formUrl: 'https://tally.so/embed/yX4Qyd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  },
  'financial-readiness': {
    id: 'financial-readiness',
    name: 'Financial Readiness Assessment',
    shortName: 'Financial readiness',
    house: 'capitalmasters',
    href: '/assessments/financial-readiness',
    cta: 'Request a Financial Readiness Assessment',
    oneLine: 'Review your cash visibility, reporting and growth assumptions, and how ready you are for a funding conversation.',
    formUrl: 'https://tally.so/embed/Dqp8AR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  },
};

export const nav = [
  { label: 'SystemMasters', href: '/systemmasters', tone: 'cobalt' as const },
  { label: 'CapitalMasters', href: '/capitalmasters', tone: 'emerald' as const },
  { label: 'About', href: '/about', tone: null },
  { label: 'Contact', href: '/contact', tone: null },
];

/** Where "Request an assessment" points from each part of the site. */
export function assessmentCtaHref(pathname: string): string {
  if (pathname.startsWith('/systemmasters') || pathname.startsWith('/assessments/operations-automation')) {
    return `${assessments['operations-automation'].href}#enquire`;
  }
  if (pathname.startsWith('/capitalmasters') || pathname.startsWith('/assessments/financial-readiness')) {
    return `${assessments['financial-readiness'].href}#enquire`;
  }
  return '/#assessments';
}

/** Enquiry form options. Values are what the server accepts and records. */
export const enquiryTypes = [
  { value: 'systemmasters', label: 'SystemMasters', hint: 'Workflows, ownership, automation' },
  { value: 'capitalmasters', label: 'CapitalMasters', hint: 'Cash flow, models, funding readiness' },
  { value: 'both', label: 'Both houses', hint: 'Systems and finance together' },
  { value: 'help', label: 'Help me choose', hint: 'Not sure where to start' },
] as const;
export type EnquiryType = (typeof enquiryTypes)[number]['value'];

export const teamSizes = ['Just me', '2–10 people', '11–50 people', '51–200 people', 'More than 200'] as const;

/** Pages the form may be submitted from. Anything else is recorded as "unknown". */
export const enquirySources = [
  '/',
  '/systemmasters',
  '/capitalmasters',
  '/assessments/operations-automation',
  '/assessments/financial-readiness',
  '/about',
  '/contact',
] as const;
