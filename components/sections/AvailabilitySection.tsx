'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/Motion';
import { MonthGrid } from '@/components/booking/MonthGrid';
import { BrandSelect } from '@/components/ui/BrandSelect';
import {
  addHours,
  formatLongDate,
  formatTime,
  getDayStatus,
  hourOptions,
} from '@/components/booking/calendar-utils';
import { getRecaptchaToken } from '@/components/ui/InquiryForm';
import { GuestCountField } from '@/components/booking/GuestCountField';
import {
  RENTAL_POLICY_TEXT,
  RENTAL_TYPES,
  minimumHoursFor,
  parseGuestCount,
  type RentalType,
} from '@/lib/booking/config';
import type { AvailabilityResponse } from '@/lib/booking/availability';
import { trackEvent, trackFormSubmit } from '@/lib/analytics';

type LoadState = 'loading' | 'ready' | 'error';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const source = 'rentals-availability-calendar';
const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';
const labelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';
const reveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const },
};

export function AvailabilitySection({ id }: { id?: string }) {
  const [rentalType, setRentalType] = useState<RentalType | ''>('');
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHours, setSelectedHours] = useState(1);
  const timesRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);
  const headingId = useId();

  useEffect(() => {
    if (!rentalType) return;
    let cancelled = false;

    fetch(`/api/availability?type=${rentalType}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Availability request failed');
        return (await response.json()) as AvailabilityResponse;
      })
      .then((data) => {
        if (cancelled) return;
        setAvailability(data);
        setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [rentalType]);

  const selectedTimes = availability && selectedDate ? availability.days[selectedDate] ?? [] : [];
  const selectedSlot = selectedTimes.find((slot) => slot.start === selectedTime);
  const rentalLabel = RENTAL_TYPES.find((type) => type.value === rentalType)?.label ?? '';
  function chooseType(type: RentalType) {
    if (type === rentalType) return;

    setRentalType(type);
    setAvailability(null);
    setLoadState('loading');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedHours(1);

    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent('form_start', { lead_type: 'rentals', form_source: source });
    }
  }

  function selectDate(date: string) {
    if (getDayStatus(availability, date) === 'unavailable') return;

    setSelectedDate(date);
    setSelectedTime('');
    setSelectedHours(1);

    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => timesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="py-16 sm:py-20 md:py-28 px-5 sm:px-6 md:px-10 bg-brand-forest scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
              Check Availability
            </p>
            <h2 id={headingId} className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
              Find an open date.
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base leading-[1.8] text-white/72">
              Choose a space, then a day to see the start times still open, and send
              us a request. Nothing is reserved until the team confirms with you
              personally.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div role="radiogroup" aria-label="Choose a space" className="mx-auto mb-6 md:mb-8 grid max-w-xl grid-cols-2 gap-2 sm:gap-3">
            {RENTAL_TYPES.map((type) => (
              <label key={type.value} className="relative">
                <input
                  type="radio"
                  name="availability-rental-type"
                  value={type.value}
                  checked={rentalType === type.value}
                  onChange={() => chooseType(type.value)}
                  className="peer sr-only"
                />
                <span
                  className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-lg border px-3 text-center font-body text-sm font-medium transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/60 sm:text-base ${
                    rentalType === type.value
                      ? 'border-brand-gold bg-brand-gold text-brand-forest'
                      : 'border-white/15 bg-brand-forest-mid/70 text-white hover:border-brand-gold/60 hover:text-brand-gold'
                  }`}
                >
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Calendar */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-brand-forest-mid/70 p-4 sm:p-6 md:p-8 shadow-xl shadow-black/10">
              {availability?.source === 'mock' && (
                <p className="mb-4 rounded-lg border border-brand-cognac/40 bg-brand-cognac/15 px-3 py-2 text-center font-body text-xs font-medium text-brand-cognac-light">
                  Sample data for local testing. These are not real bookings.
                </p>
              )}

              {!rentalType && (
                <div className="flex min-h-[320px] items-center justify-center text-center font-body text-sm text-white/60">
                  Choose the conference room or the entire building to see open dates.
                </div>
              )}

              {rentalType && loadState === 'loading' && (
                <div role="status" className="flex min-h-[320px] items-center justify-center font-body text-sm text-white/60">
                  Loading the calendar…
                </div>
              )}

              {loadState === 'error' && (
                <div role="alert" className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
                  <p className="max-w-sm font-body text-sm leading-relaxed text-white/75">
                    We could not load the calendar right now. Send an inquiry below and the
                    team will check dates for you.
                  </p>
                  <a
                    href="#rental-inquiry"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-gold/45 px-5 py-2.5 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/10"
                  >
                    Go to the inquiry form
                  </a>
                </div>
              )}

              {loadState === 'ready' && availability && (
                <MonthGrid
                  key={availability.type}
                  availability={availability}
                  selectedDate={selectedDate}
                  onSelect={selectDate}
                />
              )}
            </div>

            {/* Times and request */}
            <div ref={timesRef} className="lg:col-span-5 scroll-mt-24">
              <div className="rounded-2xl border border-white/10 bg-brand-forest-mid/70 p-5 sm:p-6 md:p-8 shadow-xl shadow-black/10">
                <div aria-live="polite">
                  {!selectedDate && (
                    <p className="font-body text-sm leading-relaxed text-white/65">
                      {rentalType
                        ? 'Pick a date on the calendar to see its open start times.'
                        : 'Choose a space above to get started.'}
                    </p>
                  )}

                  {selectedDate && selectedTimes.length === 0 && (
                    <div>
                      <p className="font-display text-xl text-white mb-2">{formatLongDate(selectedDate)}</p>
                      <p className="font-body text-sm leading-relaxed text-white/70">
                        This date is fully booked. Please choose another day.
                      </p>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {selectedDate && selectedTimes.length > 0 && (
                    <motion.div key={selectedDate} {...reveal}>
                      <fieldset>
                        <legend className="mb-1 font-display text-xl text-white">
                          {formatLongDate(selectedDate)}
                        </legend>
                        <p className="mb-4 font-body text-sm leading-relaxed text-white/65">
                          {rentalType === 'conference-room'
                            ? 'Choose a start time, then how long you need. Saturdays are limited to one two-hour block.'
                            : 'Private rentals begin at 2 PM or later, with a 3-hour minimum (4 hours for 26 or more guests). We will plan the length of your event when we follow up.'}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedTimes.map(({ start: time }) => (
                            <label key={time} className="relative">
                              <input
                                type="radio"
                                name="availability-start-time"
                                value={time}
                                checked={selectedTime === time}
                                onChange={() => {
                                  setSelectedTime(time);
                                  setSelectedHours(1);
                                }}
                                className="peer sr-only"
                              />
                              <span
                                className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border px-2 font-body text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/60 ${
                                  selectedTime === time
                                    ? 'border-brand-gold bg-brand-gold text-brand-forest'
                                    : 'border-white/15 text-white hover:border-brand-gold/60 hover:text-brand-gold'
                                }`}
                              >
                                {formatTime(time)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {selectedSlot?.maxHours && (
                        <div className="mt-4">
                          <BrandSelect
                            label="Length"
                            value={String(selectedHours)}
                            onChange={(next) => setSelectedHours(Number(next))}
                            options={hourOptions(selectedSlot).map((hours) => ({
                              value: String(hours),
                              label: `${hours} hour${hours === 1 ? '' : 's'}, until ${formatTime(addHours(selectedSlot.start, hours))}`,
                            }))}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {rentalType && selectedDate && selectedSlot && (
                    <motion.div key="request-form" {...reveal} className="mt-6 border-t border-white/10 pt-6">
                      <SlotRequestForm
                        rentalType={rentalType}
                        rentalLabel={rentalLabel}
                        date={selectedDate}
                        time={selectedSlot.start}
                        hours={selectedSlot.maxHours ? selectedHours : null}
                        freeHours={selectedSlot.freeHours}
                        onReset={() => {
                          setSelectedDate('');
                          setSelectedTime('');
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

type SlotRequestFormProps = {
  rentalType: RentalType;
  rentalLabel: string;
  date: string;
  time: string;
  /** Requested length in hours, or null when the end time is agreed later. */
  hours: number | null;
  /** Hours free from this start (entire building only), for the guest-count minimum. */
  freeHours?: number;
  onReset: () => void;
};

function SlotRequestForm({ rentalType, rentalLabel, date, time, hours, freeHours, onReset }: SlotRequestFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [startedAt] = useState(() => String(Date.now()));
  const timeLabel = hours ? `${formatTime(time)} to ${formatTime(addHours(time, hours))}` : formatTime(time);
  const slotLabel = `${rentalLabel}, ${formatLongDate(date)} at ${timeLabel}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const form = event.currentTarget;
    const payload: Record<string, FormDataEntryValue | string> = Object.fromEntries(new FormData(form).entries());

    // JAMIE (5 Nov): the guest count is required and sets the minimum length,
    // so check this start leaves that much time free.
    const guests = parseGuestCount(payload.guestCount);
    if (!guests) {
      setStatus('error');
      setError('Please add your estimated guest count as a number.');
      return;
    }
    const minimum = minimumHoursFor(rentalType, guests);
    if (minimum && freeHours !== undefined && freeHours < minimum) {
      setStatus('error');
      setError(
        `Groups of ${guests} need at least ${minimum} hours, and this start time has ${freeHours} hours open. Please choose an earlier time or another date.`,
      );
      return;
    }
    payload.eventDate = formatLongDate(date);
    payload.startTime = formatTime(time);
    payload.rentalSpace = rentalType;
    // Machine-readable copies, so the server can add the request to Manna's Teamup calendar.
    payload.requestedDate = date;
    payload.requestedTime = time;
    if (hours) payload.requestedHours = String(hours);

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
      trackFormSubmit('rentals', source);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      trackEvent('inquiry_error', { lead_type: 'rentals', form_source: source });
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 text-center">
        <p className="font-display text-2xl text-white mb-2">Request sent</p>
        <p className="font-body text-sm text-white/70 leading-relaxed">
          Thank you. We will follow up about {slotLabel} with next steps and our rental policies.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-gold/40 px-5 py-2.5 font-body text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold/10"
        >
          Choose another date
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="rounded-lg border border-brand-gold/35 bg-brand-gold/10 px-4 py-3 font-body text-sm text-white">
        <span className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85 mb-0.5">
          Your request
        </span>
        {slotLabel}
      </p>

      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="inquiryType" value="rentals" />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Email address" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone number" className={inputClass} />
        </label>
        <GuestCountField rentalType={rentalType} freeHours={freeHours} labelClass={labelClass} inputClass={inputClass} />
      </div>

      <label className="block">
        <span className={labelClass}>Anything we should know? (optional)</span>
        <textarea
          name="message"
          rows={3}
          className={`${inputClass} resize-none leading-relaxed`}
          placeholder="The kind of gathering, setup needs, food plans."
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-red-300/20 bg-red-500/10 px-4 py-3 font-body text-sm text-red-100">
          {error}
        </p>
      )}

      {/* POLICY: Jamie's rental policy wording goes in RENTAL_POLICY_TEXT (lib/booking/config.ts). */}
      {RENTAL_POLICY_TEXT && (
        <p className="whitespace-pre-line font-body text-xs leading-relaxed text-white/70">{RENTAL_POLICY_TEXT}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-gold px-6 py-3 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending request...' : 'Send request'}
      </button>
      <p className="font-body text-xs leading-relaxed text-white/55">
        This is a request, not a booking. Nothing is reserved or charged until the Manna team confirms with you personally.
      </p>
    </form>
  );
}
