import { z } from 'zod';
import { enquiryTypes, enquirySources, teamSizes } from '@/content/site';

const typeValues = enquiryTypes.map((t) => t.value) as [string, ...string[]];

/** Shared field rules. Runs on the server; the form mirrors the limits with HTML attributes. */
export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(120, 'Use 120 characters or fewer.'),
  organisation: z
    .string()
    .trim()
    .min(2, 'Enter your business or organisation name.')
    .max(160, 'Use 160 characters or fewer.'),
  email: z.string().trim().max(200, 'Use 200 characters or fewer.').pipe(z.email('Enter a valid email address, like name@business.co.ug.')),
  phone: z
    .string()
    .trim()
    .max(40, 'Use 40 characters or fewer.')
    .refine((v) => v === '' || /^\+?[0-9 ()-]{7,40}$/.test(v), 'Enter a phone or WhatsApp number using digits, spaces or +.'),
  enquiryType: z.enum(typeValues, { error: 'Choose what your enquiry is about.' }),
  teamSize: z
    .string()
    .trim()
    .refine((v) => v === '' || (teamSizes as readonly string[]).includes(v), 'Choose a team size from the list.'),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more: at least 20 characters.')
    .max(2000, 'Keep this to 2,000 characters or fewer.'),
});

export type EnquiryFields = z.infer<typeof enquirySchema>;
export type FieldName = keyof EnquiryFields;

export function normaliseSource(value: unknown): string {
  return typeof value === 'string' && (enquirySources as readonly string[]).includes(value) ? value : 'unknown';
}

export function normaliseAssessment(value: unknown): string {
  return value === 'operations-automation' || value === 'financial-readiness' ? value : 'none';
}

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'success'; reference: string }
  | {
      status: 'error';
      kind: 'validation' | 'retryable' | 'not-configured' | 'rate-limited';
      message: string;
      fieldErrors?: Partial<Record<FieldName, string>>;
    };
