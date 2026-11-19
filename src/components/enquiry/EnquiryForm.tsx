'use client';

import { useActionState, useEffect, useRef, startTransition, type FormEvent } from 'react';
import Link from 'next/link';
import { submitEnquiry } from '@/app/actions/enquiry';
import { enquiryTypes, teamSizes, type EnquiryType } from '@/content/site';
import type { EnquiryState, FieldName } from '@/lib/enquiry-schema';
import { track } from '@/lib/analytics';

type Props = {
  /** Pre-selected enquiry type. The visitor can change it. */
  defaultType: EnquiryType;
  /** Page path the form sits on; recorded with the lead. */
  source: string;
  /** Assessment page context, if any. */
  assessment?: 'operations-automation' | 'financial-readiness';
  /** Whether the server has a verified destination for leads. */
  configured: boolean;
  /** Optional verified email shown as an alternative if the form cannot be used. */
  fallbackEmail?: string | null;
  submitLabel?: string;
  messageLabel?: string;
  messageHint?: string;
};

const initialState: EnquiryState = { status: 'idle' };

export function EnquiryForm({
  defaultType,
  source,
  assessment,
  configured,
  fallbackEmail,
  submitLabel = 'Send enquiry',
  messageLabel = 'What would you like help with?',
  messageHint = 'Describe the problem or decision in a few sentences. For example: “Approvals for purchases take a week” or “We have a new contract and need to see whether cash will cover supplier costs.”',
}: Props) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const id = (name: string) => `${source.replace(/\W+/g, '') || 'home'}-${name}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === 'success') {
      successRef.current?.focus();
      track('enquiry_submitted', { source, assessment: assessment ?? 'none' });
    } else if (state.status === 'error') {
      const first = state.fieldErrors ? (Object.keys(state.fieldErrors)[0] as FieldName | undefined) : undefined;
      const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
      (el ?? summaryRef.current)?.focus();
    }
  }, [state, source, assessment]);

  // Submit via transition so React does not reset the fields: inputs survive a failed attempt.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const data = new FormData(e.currentTarget);
    data.set('startedAt', String(startedAt.current));
    startTransition(() => formAction(data));
  }

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="scroll-mt-24 rounded-lg border border-emerald/40 bg-emerald-soft p-6 sm:p-8 focus:outline-none"
      >
        <p className="label text-emerald-deep">Enquiry received</p>
        <h3 className="mt-2 font-display text-2xl text-ink">Thank you. We have your enquiry.</h3>
        <p className="mt-3 text-ink-soft">
          Your reference is <strong className="font-mono text-ink">{state.reference}</strong>. Qraft Capital will review
          what you shared and reply to the email address you gave us to discuss the priority and agree a scope. No work
          begins and nothing is charged until the scope is agreed.
        </p>
      </div>
    );
  }

  const errors = state.status === 'error' ? state.fieldErrors ?? {} : {};
  const fieldProps = (name: FieldName) => ({
    id: id(name),
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': [errors[name] ? id(`${name}-error`) : null, `${id(name)}-hint`].filter(Boolean).join(' ') || undefined,
  });
  const disabled = !configured;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
      aria-describedby={!configured ? id('not-configured') : undefined}
    >
      {!configured && (
        <div id={id('not-configured')} className="rounded-md border border-amber-700/30 bg-amber-50 p-4 text-sm text-amber-950" role="note">
          <strong>Online enquiries are not connected yet.</strong> This form will start accepting enquiries once a
          verified inbox is configured.
          {fallbackEmail ? (
            <>
              {' '}
              In the meantime, email{' '}
              <a className="link" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </>
          ) : null}
        </div>
      )}

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {state.status === 'error' && (
          <div className="rounded-md border border-danger/40 bg-danger-soft p-4 text-sm text-danger-deep">
            <p className="font-semibold">{state.message}</p>
            {state.fieldErrors && Object.keys(state.fieldErrors).length > 0 && (
              <ul className="mt-2 list-disc pl-5">
                {Object.entries(state.fieldErrors).map(([k, v]) => (
                  <li key={k}>
                    <a className="underline" href={`#${id(k)}`}>
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <fieldset disabled={disabled} className="space-y-6 disabled:opacity-60">
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="assessment" value={assessment ?? ''} />
        {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <fieldset>
          <legend className="field-label">What is your enquiry about?</legend>
          <p id={`${id('enquiryType')}-hint`} className="field-hint">
            We have pre-selected the best fit for this page. Change it if needed.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {enquiryTypes.map((t) => (
              <label
                key={t.value}
                className="group flex cursor-pointer items-start gap-3 rounded-md border border-line bg-paper px-4 py-3 has-[:checked]:border-ink has-[:checked]:bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cobalt"
              >
                <input
                  type="radio"
                  name="enquiryType"
                  value={t.value}
                  defaultChecked={t.value === defaultType}
                  className="mt-1 size-4 accent-ink"
                  required
                />
                <span>
                  <span className="block font-semibold text-ink">{t.label}</span>
                  <span className="block text-sm text-ink-muted">{t.hint}</span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id={id('enquiryType-error')} message={errors.enquiryType} />
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" htmlFor={id('fullName')} error={errors.fullName} errorId={id('fullName-error')}>
            <input {...fieldProps('fullName')} type="text" autoComplete="name" required maxLength={120} className="input" />
          </Field>
          <Field
            label="Business or organisation"
            htmlFor={id('organisation')}
            error={errors.organisation}
            errorId={id('organisation-error')}
          >
            <input {...fieldProps('organisation')} type="text" autoComplete="organization" required maxLength={160} className="input" />
          </Field>
          <Field label="Email address" htmlFor={id('email')} error={errors.email} errorId={id('email-error')}>
            <input {...fieldProps('email')} type="email" autoComplete="email" required maxLength={200} className="input" />
          </Field>
          <Field
            label="Phone or WhatsApp"
            optional
            htmlFor={id('phone')}
            error={errors.phone}
            errorId={id('phone-error')}
            hint="Include the country code, e.g. +256."
            hintId={`${id('phone')}-hint`}
          >
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" maxLength={40} className="input" />
          </Field>
        </div>

        <Field
          label="Team size"
          optional
          htmlFor={id('teamSize')}
          error={errors.teamSize}
          errorId={id('teamSize-error')}
          hint="Roughly how many people work in the business?"
          hintId={`${id('teamSize')}-hint`}
        >
          <select {...fieldProps('teamSize')} defaultValue="" className="input sm:max-w-xs">
            <option value="">Prefer not to say</option>
            {teamSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={messageLabel}
          htmlFor={id('message')}
          error={errors.message}
          errorId={id('message-error')}
          hint={messageHint}
          hintId={`${id('message')}-hint`}
        >
          <textarea {...fieldProps('message')} rows={5} required minLength={20} maxLength={2000} className="input" />
        </Field>

        <p className="text-sm text-ink-muted">
          Please do not send bank statements, identity documents, passwords or confidential files through this form. If
          we need documents later, we will agree a secure way to share them.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary" aria-disabled={pending || undefined} data-pending={pending || undefined}>
            {pending ? 'Sending…' : submitLabel}
          </button>
          <p className="text-sm text-ink-muted" aria-live="polite">
            {pending ? 'Sending your enquiry. Please keep this page open.' : 'We reply by email to discuss scope. No obligation.'}
          </p>
        </div>
      </fieldset>

      <p className="text-sm text-ink-muted">
        Not sure which option fits?{' '}
        <Link className="link" href="/contact">
          Ask us to help you choose
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  hint,
  hintId,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label} {optional && <span className="font-normal text-ink-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-danger-deep">
      <span aria-hidden="true">⚠ </span>
      {message}
    </p>
  );
}
