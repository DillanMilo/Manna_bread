'use client';

import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  employmentApplicationFields,
  employmentApplicationSections,
  employmentRequiredFields,
  isEmploymentApplicationField,
  type EmploymentApplicationField,
} from '@/lib/employmentApplication';
import { trackEvent } from '@/lib/analytics';
import { getRecaptchaToken } from '@/components/ui/InquiryForm';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';
const labelClass =
  'mb-2 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';

export function EmploymentApplicationForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [startedAt, setStartedAt] = useState(() => String(Date.now()));
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedStart = useRef(false);
  const section = employmentApplicationSections[step];
  const isLastStep = step === employmentApplicationSections.length - 1;

  function validateFields(fields: readonly EmploymentApplicationField[]) {
    const form = formRef.current;
    if (!form) return false;

    const formData = new FormData(form);
    const missing = fields.find((field) => {
      if (!field.required) return false;

      return field.type === 'checkbox'
        ? formData.getAll(field.name).every((value) => !String(value).trim())
        : !String(formData.get(field.name) ?? '').trim();
    });

    const currentFieldset = form.querySelector<HTMLFieldSetElement>('fieldset:not([hidden])');
    const invalidControl = currentFieldset
      ? Array.from(currentFieldset.elements)
          .filter(
            (control): control is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
              control instanceof HTMLInputElement ||
              control instanceof HTMLSelectElement ||
              control instanceof HTMLTextAreaElement,
          )
          .some((control) => !control.checkValidity())
      : false;

    if (!missing && !invalidControl) {
      setError('');
      return true;
    }

    setStatus('error');
    setError(missing ? `Please complete “${missing.label}.”` : 'Please enter a valid value before continuing.');
    if (!missing) currentFieldset?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(':invalid')?.reportValidity();
    return false;
  }

  function goForward() {
    const currentFields = section.content.filter(isEmploymentApplicationField);
    if (!validateFields(currentFields)) return;

    setStatus('idle');
    setStep((current) => Math.min(current + 1, employmentApplicationSections.length - 1));
    document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goBack() {
    setStatus('idle');
    setError('');
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateFields(employmentRequiredFields)) return;

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setStatus('submitting');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const application: Record<string, string | string[]> = {};

    for (const field of employmentApplicationFields) {
      if (field.type === 'checkbox') {
        application[field.name] = formData.getAll(field.name).map(String);
      } else {
        application[field.name] = String(formData.get(field.name) ?? '');
      }
    }

    const fullName = String(formData.get('fullName') ?? '').trim();
    const payload: Record<string, unknown> = {
      inquiryType: 'employment',
      source: 'careers-page',
      startedAt,
      company: formData.get('company'),
      name: fullName,
      email: formData.get('email'),
      phone: formData.get('primaryPhone'),
      message: formData.get('whyManna') || 'Employment application submitted.',
      application,
    };

    try {
      const recaptchaToken = await getRecaptchaToken();
      if (recaptchaToken) payload.recaptchaToken = recaptchaToken;

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      form.reset();
      setStatus('success');
      trackEvent('generate_lead', { lead_type: 'employment', form_source: 'careers-page' });
    } catch (submissionError) {
      setStatus('error');
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.');
      trackEvent('inquiry_error', { lead_type: 'employment', form_source: 'careers-page' });
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-7 text-center">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-forest">
          <Check aria-hidden="true" className="h-6 w-6" />
        </span>
        <p className="mb-2 font-display text-2xl text-white">Application received</p>
        <p className="font-body text-sm leading-relaxed text-white/70">
          Thank you for taking the time to apply. The Manna team will be in touch if there is a fitting next step.
        </p>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setStartedAt(String(Date.now()));
            setStatus('idle');
          }}
          className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-gold/40 px-5 py-2.5 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/10"
        >
          Start another application
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (hasTrackedStart.current) return;
        hasTrackedStart.current = true;
        trackEvent('form_start', { lead_type: 'employment', form_source: 'careers-page' });
      }}
      className="space-y-7"
    >
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <div className="mb-3 flex items-center justify-between gap-4 font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-white/50">
          <span>Step {step + 1} of {employmentApplicationSections.length}</span>
          <span>{Math.round(((step + 1) / employmentApplicationSections.length) * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-brand-gold transition-[width] duration-300"
            style={{ width: `${((step + 1) / employmentApplicationSections.length) * 100}%` }}
          />
        </div>
      </div>

      <div>
        <p className="font-display text-2xl font-medium text-white sm:text-3xl">{section.title}</p>
        {section.description ? (
          <p className="mt-3 max-w-2xl whitespace-pre-line font-body text-sm leading-relaxed text-white/65">{section.description}</p>
        ) : null}
      </div>

      {employmentApplicationSections.map((applicationSection, sectionIndex) => (
        <fieldset
          key={applicationSection.id}
          hidden={sectionIndex !== step}
          aria-label={applicationSection.title}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {applicationSection.content.map((content, index) => {
            if (content.type === 'heading') {
              return (
                <h3 key={`${content.label}-${index}`} className="border-b border-brand-gold/25 pb-2 pt-4 font-display text-xl text-brand-gold sm:col-span-2">
                  {content.label}
                </h3>
              );
            }

            if (content.type === 'note') {
              return (
                <p key={`${content.label}-${index}`} className="whitespace-pre-line rounded-xl border border-brand-gold/20 bg-brand-gold/[0.06] p-4 font-body text-sm leading-relaxed text-white/70 sm:col-span-2">
                  {content.label}
                </p>
              );
            }

            return <ApplicationField key={content.name} field={content} />;
          })}
        </fieldset>
      ))}

      {status === 'error' ? (
        <p role="alert" className="rounded-lg border border-red-300/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || status === 'submitting'}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-body text-sm font-semibold text-white transition-colors hover:border-brand-gold/50 hover:text-brand-gold disabled:invisible"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-gold px-7 py-3 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'submitting' ? 'Sending application...' : 'Send application'}
          </button>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              goForward();
            }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-brand-gold px-7 py-3 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light"
          >
            Continue
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}

function ApplicationField({ field }: { field: EmploymentApplicationField }) {
  const isWide = field.type === 'textarea' || field.type === 'radio' || field.type === 'checkbox';

  if (field.type === 'textarea') {
    return (
      <label className="block sm:col-span-2">
        <span className={labelClass}>{field.label}{field.required ? ' *' : ''}</span>
        {field.helpText ? <span className="mb-2 block font-body text-xs leading-relaxed text-white/55">{field.helpText}</span> : null}
        <textarea name={field.name} required={field.required} rows={4} className={`${inputClass} resize-y leading-relaxed`} placeholder={field.placeholder} />
      </label>
    );
  }

  if (field.type === 'radio' || field.type === 'checkbox') {
    return (
      <div className={isWide ? 'sm:col-span-2' : ''}>
        <p className={labelClass}>{field.label}{field.required ? ' *' : ''}</p>
        {field.helpText ? <p className="mb-2 font-body text-xs leading-relaxed text-white/55">{field.helpText}</p> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options?.map((option) => (
            <label key={option} className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-white/12 bg-brand-forest/50 px-4 py-3 font-body text-sm text-white/80 transition-colors hover:border-brand-gold/35">
              <input
                name={field.name}
                value={option}
                type={field.type}
                required={field.type === 'radio' ? field.required : undefined}
                className="h-4 w-4 accent-[#C9A84C]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block">
        <span className={labelClass}>{field.label}</span>
        {field.helpText ? <span className="mb-2 block font-body text-xs leading-relaxed text-white/55">{field.helpText}</span> : null}
        <select name={field.name} defaultValue="" className={inputClass}>
          <option value="">Not available</option>
          {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className={labelClass}>{field.label}{field.required ? ' *' : ''}</span>
      {field.helpText ? <span className="mb-2 block font-body text-xs leading-relaxed text-white/55">{field.helpText}</span> : null}
      <input
        name={field.name}
        required={field.required}
        type={field.type}
        autoComplete={field.autoComplete}
        className={inputClass}
        placeholder={field.placeholder}
      />
    </label>
  );
}
