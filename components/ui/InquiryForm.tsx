'use client';

import { useState } from 'react';

type InquiryType = 'catering' | 'rentals' | 'general';

type InquiryFormProps = {
  defaultType?: InquiryType;
  source?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';

export function InquiryForm({
  defaultType = 'general',
  source = 'website',
  compact = false,
  onSuccess,
}: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

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
      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 text-center">
        <p className="font-display text-2xl text-white mb-2">Inquiry sent</p>
        <p className="font-body text-sm text-white/70 leading-relaxed">
          Thank you. We&apos;ll follow up as soon as we can.
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
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="sr-only">Name</span>
          <input name="name" required className={inputClass} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" required type="email" className={inputClass} placeholder="Email address" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="sr-only">Phone</span>
          <input name="phone" type="tel" className={inputClass} placeholder="Phone number" />
        </label>
        <label className="block">
          <span className="sr-only">Inquiry type</span>
          <select name="inquiryType" defaultValue={defaultType} className={inputClass}>
            <option value="catering">Catering</option>
            <option value="rentals">Private rental</option>
            <option value="general">General question</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="sr-only">Event date</span>
          <input name="eventDate" className={inputClass} placeholder="Event date" />
        </label>
        <label className="block">
          <span className="sr-only">Guest count</span>
          <input name="guestCount" className={inputClass} placeholder="Guest count" />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          className={`${inputClass} resize-none leading-relaxed`}
          placeholder="Tell us what you are planning"
        />
      </label>

      {status === 'error' && (
        <p className="rounded-lg border border-red-300/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-100">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-gold px-6 py-3 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending...' : 'Send inquiry'}
      </button>
    </form>
  );
}
