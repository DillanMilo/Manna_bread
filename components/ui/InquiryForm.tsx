'use client';

import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

type InquiryType = 'catering' | 'rentals' | 'general' | 'employment';
type FieldName =
  | 'name'
  | 'email'
  | 'phone'
  | 'preferredContact'
  | 'eventDate'
  | 'guestCount'
  | 'eventLocation'
  | 'occasion'
  | 'serviceStyle'
  | 'rentalWindow'
  | 'cateringNeeds'
  | 'helpTopic'
  | 'roleInterest'
  | 'availability'
  | 'weeklyHours'
  | 'startDate'
  | 'experience';

type FieldConfig = {
  name: FieldName;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  autoComplete?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
};

type InquiryFormProps = {
  defaultType?: InquiryType;
  source?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type GrecaptchaEnterprise = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

type Grecaptcha = {
  enterprise?: GrecaptchaEnterprise;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';
const labelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';
const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
const recaptchaAction = 'manna_inquiry';
let recaptchaScriptPromise: Promise<void> | null = null;

const sharedFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Your name',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email address',
    type: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Phone number',
    type: 'tel',
    autoComplete: 'tel',
  },
  {
    name: 'preferredContact',
    label: 'Best reply',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'either', label: 'Either is fine' },
    ],
  },
];

const formContent: Record<
  InquiryType,
  {
    successTitle: string;
    successBody: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    fields: FieldConfig[];
  }
> = {
  catering: {
    successTitle: 'Catering inquiry sent',
    successBody: 'Thank you. We will follow up with menu guidance, timing, and next steps.',
    messageLabel: 'What should we know?',
    messagePlaceholder: 'Tell us about the gathering, menu ideas, timing, pickup or delivery needs, and anything guests need us to know.',
    submitLabel: 'Send catering inquiry',
    submittingLabel: 'Sending catering inquiry...',
    fields: [
      {
        name: 'occasion',
        label: 'Gathering',
        placeholder: 'Office breakfast, shower, church gathering',
      },
      {
        name: 'eventDate',
        label: 'Date',
        type: 'date',
        required: true,
      },
      {
        name: 'guestCount',
        label: 'Guests',
        placeholder: 'Estimated guest count',
      },
      {
        name: 'serviceStyle',
        label: 'Service',
        options: [
          { value: 'pickup', label: 'Pickup' },
          { value: 'delivery', label: 'Delivery' },
          { value: 'setup', label: 'Setup help' },
          { value: 'not-sure', label: 'Still deciding' },
        ],
      },
      {
        name: 'eventLocation',
        label: 'Location',
        placeholder: 'Where the food is headed',
      },
    ],
  },
  rentals: {
    successTitle: 'Rental inquiry sent',
    successBody: 'Thank you. We will check the calendar and follow up with availability.',
    messageLabel: 'What kind of gathering is it?',
    messagePlaceholder: 'Share the mood, setup needs, timing, food plans, and any details that would help us understand the day.',
    submitLabel: 'Send rental inquiry',
    submittingLabel: 'Sending rental inquiry...',
    fields: [
      {
        name: 'occasion',
        label: 'Gathering',
        placeholder: 'Dinner, shower, workshop, celebration',
      },
      {
        name: 'eventDate',
        label: 'Preferred date',
        type: 'date',
        required: true,
      },
      {
        name: 'rentalWindow',
        label: 'Time window',
        placeholder: 'Morning, evening, 5-9 PM',
      },
      {
        name: 'guestCount',
        label: 'Guests',
        placeholder: 'Estimated guest count',
      },
      {
        name: 'cateringNeeds',
        label: 'Food plans',
        options: [
          { value: 'manna-catering', label: 'Manna catering' },
          { value: 'outside-catering', label: 'Outside catering' },
          { value: 'mixed', label: 'A mix of both' },
          { value: 'not-sure', label: 'Still deciding' },
        ],
      },
    ],
  },
  general: {
    successTitle: 'Message sent',
    successBody: 'Thank you. We will follow up as soon as we can.',
    messageLabel: 'How can we help?',
    messagePlaceholder: 'Send a note about an order, a visit, a question, or anything you would like us to help with.',
    submitLabel: 'Send message',
    submittingLabel: 'Sending message...',
    fields: [
      {
        name: 'helpTopic',
        label: 'Topic',
        options: [
          { value: 'general', label: 'General question' },
          { value: 'menu-order', label: 'Menu or order' },
          { value: 'catering', label: 'Catering' },
          { value: 'rentals', label: 'Private rental' },
          { value: 'gift-cards-rewards', label: 'Gift cards or rewards' },
        ],
      },
    ],
  },
  employment: {
    successTitle: 'Application received',
    successBody: 'Thank you for taking the time to introduce yourself. The Manna team will be in touch if there is a fitting next step.',
    messageLabel: 'What draws you to Manna?',
    messagePlaceholder: 'Tell us a little about yourself, the way you like to work, and why Manna feels like a place you would enjoy contributing to.',
    submitLabel: 'Send application',
    submittingLabel: 'Sending application...',
    fields: [
      {
        name: 'roleInterest',
        label: 'Area of interest',
        options: [
          { value: 'front-of-house', label: 'Front of house' },
          { value: 'barista', label: 'Barista' },
          { value: 'bakery-pastry', label: 'Bakery or pastry' },
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'leadership', label: 'Leadership' },
          { value: 'where-needed', label: 'Wherever I am needed' },
        ],
      },
      {
        name: 'availability',
        label: 'Availability',
        placeholder: 'Days and times you can work',
        required: true,
      },
      {
        name: 'weeklyHours',
        label: 'Hours each week',
        options: [
          { value: 'under-15', label: 'Fewer than 15' },
          { value: '15-25', label: '15–25' },
          { value: '25-35', label: '25–35' },
          { value: '35-plus', label: '35 or more' },
          { value: 'flexible', label: 'Flexible' },
        ],
      },
      {
        name: 'startDate',
        label: 'Available to start',
        type: 'date',
      },
      {
        name: 'experience',
        label: 'Relevant experience',
        placeholder: 'A role, skill, or place you learned from',
      },
    ],
  },
};

export function InquiryForm({
  defaultType = 'general',
  source = 'website',
  compact = false,
  onSuccess,
}: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [startedAt] = useState(() => String(Date.now()));
  const hasTrackedStart = useRef(false);
  const content = formContent[defaultType];
  const fields = [...sharedFields, ...content.fields];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, FormDataEntryValue | string> = Object.fromEntries(formData.entries());
    const missingRequiredField = fields.find((field) => field.required && !String(payload[field.name] ?? '').trim());

    if (missingRequiredField) {
      setStatus('error');
      setError(`Please add ${missingRequiredField.label.toLowerCase()}.`);
      return;
    }

    try {
      const recaptchaToken = await getRecaptchaToken();

      if (recaptchaToken) {
        payload.recaptchaToken = recaptchaToken;
      }

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      form.reset();
      trackEvent('generate_lead', {
        lead_type: defaultType,
        form_source: source,
      });
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      trackEvent('inquiry_error', {
        lead_type: defaultType,
        form_source: source,
      });
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 text-center">
        <p className="font-display text-2xl text-white mb-2">{content.successTitle}</p>
        <p className="font-body text-sm text-white/70 leading-relaxed">
          {content.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-gold/40 px-5 py-2.5 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/10"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (hasTrackedStart.current) return;

        hasTrackedStart.current = true;
        trackEvent('form_start', {
          lead_type: defaultType,
          form_source: source,
        });
      }}
      className={compact ? 'space-y-3' : 'space-y-4'}
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="inquiryType" value={defaultType} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField key={field.name} field={field} />
        ))}
      </div>

      <label className="block">
        <span className={labelClass}>{content.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          className={`${inputClass} resize-none leading-relaxed`}
          placeholder={content.messagePlaceholder}
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-red-300/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-100">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-gold px-6 py-3 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? content.submittingLabel : content.submitLabel}
      </button>
    </form>
  );
}

function FormField({ field }: { field: FieldConfig }) {
  if (field.type === 'date') {
    return <DateField field={field} />;
  }

  if (field.options) {
    return (
      <label className="block">
        <span className={labelClass}>{field.label}</span>
        <select name={field.name} defaultValue={field.options[0]?.value} className={inputClass}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className={labelClass}>{field.label}</span>
      <input
        name={field.name}
        required={field.required}
        type={field.type ?? 'text'}
        autoComplete={field.autoComplete}
        className={inputClass}
        placeholder={field.placeholder}
      />
    </label>
  );
}

function DateField({ field }: { field: FieldConfig }) {
  const inputId = useId();
  const calendarId = `${inputId}-calendar`;
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedDate = selectedValue ? parseDateValue(selectedValue) : null;
  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function handleSelectDate(date: Date) {
    setSelectedValue(formatDateValue(date));
    setViewDate(startOfMonth(date));
    setIsOpen(false);
  }

  function showPreviousMonth() {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  function showNextMonth() {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  return (
    <div className="block">
      <label htmlFor={inputId} className={labelClass}>
        {field.label}
      </label>
      <div ref={wrapperRef} className="relative">
        <input
          id={inputId}
          name={field.name}
          required={field.required}
          type="text"
          readOnly
          inputMode="none"
          autoComplete={field.autoComplete}
          aria-haspopup="dialog"
          value={selectedDate ? formatDisplayDate(selectedDate) : ''}
          onClick={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsOpen((current) => !current);
            }
          }}
          className={`${inputClass} cursor-pointer pr-12`}
          placeholder="Select a date"
        />
        <button
          type="button"
          aria-label={`Open ${field.label.toLowerCase()} calendar`}
          aria-controls={isOpen ? calendarId : undefined}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="absolute right-2.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-brand-gold transition-colors hover:bg-white/8 hover:text-brand-cognac-light focus:outline-none focus:ring-2 focus:ring-brand-gold/60"
        >
          <CalendarDays aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.8} />
        </button>

        {isOpen && (
          <div
            id={calendarId}
            role="dialog"
            aria-label={`${field.label} calendar`}
            className="absolute left-0 top-full z-40 mt-2 w-full min-w-[280px] rounded-xl border border-brand-gold/25 bg-brand-forest p-3 shadow-2xl shadow-black/30"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                aria-label="Previous month"
                onClick={showPreviousMonth}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-brand-gold transition-colors hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-gold/60"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <p className="font-body text-sm font-semibold text-white">
                {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={showNextMonth}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-brand-gold transition-colors hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-gold/60"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1 text-center font-body text-[11px] font-semibold uppercase tracking-[1px] text-brand-gold/80">
              {weekdayLabels.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date) => {
                const dateValue = formatDateValue(date);
                const isSelected = selectedValue === dateValue;
                const isCurrentMonth = date.getMonth() === viewDate.getMonth();

                return (
                  <button
                    key={dateValue}
                    type="button"
                    onClick={() => handleSelectDate(date)}
                    className={[
                      'flex aspect-square items-center justify-center rounded-md font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/60',
                      isSelected
                        ? 'bg-brand-gold text-brand-forest'
                        : 'text-white hover:bg-white/8 hover:text-brand-gold',
                      isCurrentMonth ? '' : 'opacity-35',
                    ].join(' ')}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildCalendarDays(month: Date) {
  const firstDay = startOfMonth(month);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateValue(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDisplayDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function getRecaptchaToken() {
  if (!recaptchaSiteKey || typeof window === 'undefined') {
    return '';
  }

  await loadRecaptchaScript(recaptchaSiteKey);

  if (!window.grecaptcha?.enterprise) {
    throw new Error('The verification service did not load. Please try again.');
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.enterprise?.ready(() => {
      window.grecaptcha?.enterprise
        ?.execute(recaptchaSiteKey, { action: recaptchaAction })
        .then(resolve)
        .catch(() => reject(new Error('The verification service did not complete. Please try again.')));
    });
  });
}

function loadRecaptchaScript(siteKey: string) {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.grecaptcha?.enterprise) {
    return Promise.resolve();
  }

  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-manna-recaptcha="true"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('The verification service did not load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.mannaRecaptcha = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('The verification service did not load.')), { once: true });
    document.head.append(script);
  });

  return recaptchaScriptPromise;
}
