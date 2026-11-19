'use server';

import { headers } from 'next/headers';
import { randomBytes } from 'node:crypto';
import { enquirySchema, normaliseAssessment, normaliseSource, type EnquiryState, type FieldName } from '@/lib/enquiry-schema';
import { deliverLead, isLeadRoutingConfigured } from '@/lib/lead-routing';

/** Simple in-memory rate limit: 5 submissions per 10 minutes per IP, per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const MIN_FILL_MS = 3000;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  if (!isLeadRoutingConfigured()) {
    return {
      status: 'error',
      kind: 'not-configured',
      message: 'Online enquiries are not connected yet, so we could not send this. Please try again later.',
    };
  }

  // Spam checks: hidden honeypot field and a minimum time between page load and submit.
  const honeypot = String(formData.get('website') ?? '');
  const startedAt = Number(formData.get('startedAt') ?? 0);
  if (honeypot !== '' || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return {
      status: 'error',
      kind: 'retryable',
      message: 'We could not accept this submission. Please wait a few seconds and send it again.',
    };
  }

  const h = await headers();
  const ip = (h.get('x-forwarded-for')?.split(',')[0] ?? h.get('x-real-ip') ?? 'local').trim();
  if (rateLimited(ip)) {
    return {
      status: 'error',
      kind: 'rate-limited',
      message: 'We have received several enquiries from this connection. Please wait ten minutes and try again.',
    };
  }

  const parsed = enquirySchema.safeParse({
    fullName: formData.get('fullName') ?? '',
    organisation: formData.get('organisation') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    enquiryType: formData.get('enquiryType') ?? '',
    teamSize: formData.get('teamSize') ?? '',
    message: formData.get('message') ?? '',
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<FieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FieldName;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: 'error',
      kind: 'validation',
      message: 'Please check the highlighted fields.',
      fieldErrors,
    };
  }

  const reference = `QC-${randomBytes(3).toString('hex').toUpperCase()}`;
  try {
    await deliverLead(parsed.data, {
      source: normaliseSource(formData.get('source')),
      assessment: normaliseAssessment(formData.get('assessment')),
      reference,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return {
      status: 'error',
      kind: 'retryable',
      message: 'Your enquiry was not sent because of a problem on our side. Your answers are still here. Please try again in a moment.',
    };
  }

  return { status: 'success', reference };
}
