'use client';

import { useState } from 'react';

type InquiryType = 'catering' | 'rentals' | 'general';
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
  | 'helpTopic';

type FieldConfig = {
  name: FieldName;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
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

const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';
const labelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';

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
        placeholder: 'Date or timing',
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
        placeholder: 'Date or date range',
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
};

export function InquiryForm({
  defaultType = 'general',
  source = 'website',
  compact = false,
  onSuccess,
}: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const content = formContent[defaultType];
  const fields = [...sharedFields, ...content.fields];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
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
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
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
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="inquiryType" value={defaultType} />
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
