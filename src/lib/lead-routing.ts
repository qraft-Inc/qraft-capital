import 'server-only';
import nodemailer from 'nodemailer';
import { enquiryTypes } from '@/content/site';
import type { EnquiryFields } from './enquiry-schema';

/**
 * Lead routing via SMTP. Configure in the deployment environment (never in code):
 *
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS  – mail server credentials
 *   SMTP_FROM                                   – sender address (defaults to SMTP_USER)
 *   LEAD_TO_EMAIL                               – verified inbox that receives enquiries
 *   SMTP_SECURE                                 – "true" for port 465 (optional)
 *
 * If any required value is missing the form shows a clear "not connected yet" state
 * and the server refuses submissions. Nothing is faked.
 */
function readConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = (process.env.SMTP_FROM ?? user)?.trim();
  const to = process.env.LEAD_TO_EMAIL?.trim();
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  if (!host || !to || !from || !Number.isFinite(port)) return null;
  return { host, port, user, pass, from, to, secure };
}

export function isLeadRoutingConfigured(): boolean {
  return readConfig() !== null;
}

export type LeadMeta = { source: string; assessment: string; reference: string; receivedAt: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').slice(0, 140);

export class LeadDeliveryError extends Error {}

/** Resolves only when the SMTP server accepts the message for the configured recipient. */
export async function deliverLead(fields: EnquiryFields, meta: LeadMeta): Promise<void> {
  const cfg = readConfig();
  if (!cfg) throw new LeadDeliveryError('Lead routing is not configured');

  const typeLabel = enquiryTypes.find((t) => t.value === fields.enquiryType)?.label ?? fields.enquiryType;
  const rows: [string, string][] = [
    ['Reference', meta.reference],
    ['Name', fields.fullName],
    ['Organisation', fields.organisation],
    ['Email', fields.email],
    ['Phone / WhatsApp', fields.phone || '—'],
    ['Enquiry type', typeLabel],
    ['Team size', fields.teamSize || '—'],
    ['Assessment page', meta.assessment],
    ['Submitted from', meta.source],
    ['Received (UTC)', meta.receivedAt],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nWhat they want help with:\n${fields.message}\n`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#555;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join('')}</table><p style="font-family:Arial,sans-serif;font-size:14px;color:#555">What they want help with:</p><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(fields.message)}</p>`;

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.user && cfg.pass ? { user: cfg.user, pass: cfg.pass } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    const info = await transporter.sendMail({
      from: { name: 'Qraft Capital website', address: cfg.from },
      to: cfg.to,
      replyTo: { name: oneLine(fields.fullName), address: fields.email },
      subject: oneLine(`[Qraft Capital] ${typeLabel} enquiry: ${fields.organisation} (${meta.reference})`),
      text,
      html,
    });
    const accepted = ((info.accepted ?? []) as (string | { address: string })[]).map((a) =>
      (typeof a === 'string' ? a : a.address).toLowerCase(),
    );
    if (!accepted.includes(cfg.to.toLowerCase())) {
      throw new LeadDeliveryError('Recipient not accepted by mail server');
    }
  } catch (err) {
    // Log without personal data.
    console.error(`[lead-routing] delivery failed for ${meta.reference}:`, err instanceof Error ? err.message : 'unknown error');
    throw err instanceof LeadDeliveryError ? err : new LeadDeliveryError('SMTP delivery failed');
  }
}
