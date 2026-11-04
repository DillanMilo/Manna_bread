'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/Motion';
import { getRecaptchaToken } from '@/components/ui/InquiryForm';
import { RENTAL_POLICY_TEXT, RENTAL_TYPES, type RentalType } from '@/lib/booking/config';
import type { AvailabilityResponse, OpenSlot } from '@/lib/booking/availability';
import { trackEvent, trackFormSubmit } from '@/lib/analytics';

type LoadState = 'loading' | 'ready' | 'error';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type DayStatus = 'open' | 'booked' | 'unavailable';
type MonthKey = { year: number; month: number };

const source = 'rentals-availability-calendar';
const weekdays = [
  { short: 'Su', long: 'Sunday' },
  { short: 'Mo', long: 'Monday' },
  { short: 'Tu', long: 'Tuesday' },
  { short: 'We', long: 'Wednesday' },
  { short: 'Th', long: 'Thursday' },
  { short: 'Fr', long: 'Friday' },
  { short: 'Sa', long: 'Saturday' },
];
const inputClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-gold/70';
const labelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';
const navButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-gold transition-colors hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent';
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
  const [viewMonth, setViewMonth] = useState<MonthKey | null>(null);
  const [focusedDate, setFocusedDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHours, setSelectedHours] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const timesRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocus = useRef(false);
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
        const firstOpen = Object.keys(data.days).find((date) => data.days[date].length > 0) ?? data.firstDate;
        setAvailability(data);
        setViewMonth(monthOf(data.firstDate));
        setFocusedDate(firstOpen);
        setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [rentalType]);

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)?.focus();
  }, [focusedDate, viewMonth]);

  const minMonth = availability ? monthOf(availability.firstDate) : null;
  const maxMonth = availability ? monthOf(availability.lastDate) : null;
  const selectedTimes = availability && selectedDate ? availability.days[selectedDate] ?? [] : [];
  const selectedSlot = selectedTimes.find((slot) => slot.start === selectedTime);
  const rentalLabel = RENTAL_TYPES.find((type) => type.value === rentalType)?.label ?? '';
  // Exactly one day in the visible month takes Tab focus (roving tabindex).
  const tabbableDate = availability && viewMonth && compareMonths(monthOf(focusedDate || availability.firstDate), viewMonth) === 0
    ? focusedDate
    : availability && viewMonth
      ? clampDate(toDateString(viewMonth.year, viewMonth.month, 1), availability)
      : '';

  function getDayStatus(date: string): DayStatus {
    const times = availability?.days[date];
    if (!times) return 'unavailable';
    return times.length > 0 ? 'open' : 'booked';
  }

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

  function showMonth(next: MonthKey) {
    if (!minMonth || !maxMonth || compareMonths(next, minMonth) < 0 || compareMonths(next, maxMonth) > 0) return;
    setViewMonth(next);
    setFocusedDate(clampDate(toDateString(next.year, next.month, 1), availability!));
  }

  function selectDate(date: string) {
    if (getDayStatus(date) === 'unavailable') return;

    setSelectedDate(date);
    setSelectedTime('');
    setSelectedHours(1);
    setFocusedDate(date);

    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => timesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  function moveFocus(date: string) {
    if (!availability || !minMonth || !maxMonth) return;
    const target = monthOf(date);
    if (compareMonths(target, minMonth) < 0 || compareMonths(target, maxMonth) > 0) return;

    shouldMoveFocus.current = true;
    setFocusedDate(date);
    setViewMonth(target);
  }

  function handleGridKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, date: string) {
    const weekday = parseDate(date).getUTCDay();
    const moves: Record<string, () => string> = {
      ArrowLeft: () => shiftDays(date, -1),
      ArrowRight: () => shiftDays(date, 1),
      ArrowUp: () => shiftDays(date, -7),
      ArrowDown: () => shiftDays(date, 7),
      Home: () => shiftDays(date, -weekday),
      End: () => shiftDays(date, 6 - weekday),
      PageUp: () => shiftMonths(date, -1),
      PageDown: () => shiftMonths(date, 1),
    };
    const move = moves[event.key];

    if (!move) return;
    event.preventDefault();
    moveFocus(move());
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

              {loadState === 'ready' && availability && viewMonth && minMonth && maxMonth && (
                <>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label="Previous month"
                      disabled={compareMonths(viewMonth, minMonth) <= 0}
                      onClick={() => showMonth(addMonth(viewMonth, -1))}
                      className={navButtonClass}
                    >
                      <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <p aria-live="polite" className="font-display text-xl sm:text-2xl text-white">
                      {formatMonth(viewMonth)}
                    </p>
                    <button
                      type="button"
                      aria-label="Next month"
                      disabled={compareMonths(viewMonth, maxMonth) >= 0}
                      onClick={() => showMonth(addMonth(viewMonth, 1))}
                      className={navButtonClass}
                    >
                      <ChevronRight aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <div ref={gridRef} role="grid" aria-label={`Rental availability, ${formatMonth(viewMonth)}`}>
                    <div role="row" className="mb-1 grid grid-cols-7 gap-1 sm:gap-1.5">
                      {weekdays.map((day) => (
                        <span
                          key={day.short}
                          role="columnheader"
                          aria-label={day.long}
                          className="py-1 text-center font-body text-[11px] font-semibold uppercase tracking-[1px] text-brand-gold/80"
                        >
                          {day.short}
                        </span>
                      ))}
                    </div>

                    {buildWeeks(viewMonth).map((week, weekIndex) => (
                      <div key={weekIndex} role="row" className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                        {week.map((date, dayIndex) => {
                          if (!date) {
                            return <span key={`empty-${dayIndex}`} role="gridcell" aria-hidden="true" />;
                          }

                          const status = getDayStatus(date);
                          const isSelected = date === selectedDate;

                          return (
                            <span key={date} role="gridcell" aria-selected={isSelected}>
                              <button
                                type="button"
                                data-date={date}
                                tabIndex={date === tabbableDate ? 0 : -1}
                                aria-disabled={status === 'unavailable'}
                                aria-label={`${formatLongDate(date)}, ${statusLabel(status)}`}
                                onClick={() => selectDate(date)}
                                onKeyDown={(event) => handleGridKeyDown(event, date)}
                                className={dayClass(status, isSelected)}
                              >
                                <span>{parseDate(date).getUTCDate()}</span>
                                {status === 'open' && (
                                  <span
                                    aria-hidden="true"
                                    className={`mt-1 h-1 w-1 rounded-full ${isSelected ? 'bg-brand-forest' : 'bg-brand-gold'}`}
                                  />
                                )}
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-xs text-white/65">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                      Open
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="line-through text-white/40">14</span>
                      Fully booked
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="text-white/25">14</span>
                      Not available
                    </span>
                  </div>
                </>
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
                            : 'Private rentals begin at 2 PM or later. We will plan the length of your event when we follow up.'}
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
                        <label className="mt-4 block">
                          <span className={labelClass}>Length</span>
                          <select
                            value={selectedHours}
                            onChange={(event) => setSelectedHours(Number(event.target.value))}
                            className={inputClass}
                          >
                            {hourOptions(selectedSlot).map((hours) => (
                              <option key={hours} value={hours}>
                                {hours} hour{hours === 1 ? '' : 's'}, until {formatTime(addHours(selectedSlot.start, hours))}
                              </option>
                            ))}
                          </select>
                        </label>
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
  onReset: () => void;
};

function SlotRequestForm({ rentalType, rentalLabel, date, time, hours, onReset }: SlotRequestFormProps) {
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
    payload.eventDate = formatLongDate(date);
    payload.startTime = formatTime(time);
    payload.rentalSpace = rentalType;
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
        <label className="block">
          <span className={labelClass}>Guests</span>
          <input name="guestCount" inputMode="numeric" placeholder="Estimated guest count" className={inputClass} />
        </label>
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

/* ─── helpers (dates are YYYY-MM-DD strings, handled in UTC to avoid timezone drift) ─── */

function dayClass(status: DayStatus, isSelected: boolean) {
  const base =
    'flex aspect-square w-full flex-col items-center justify-center rounded-lg font-body text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70';

  if (isSelected) return `${base} bg-brand-gold text-brand-forest font-semibold`;
  if (status === 'open') return `${base} bg-white/5 text-white hover:bg-brand-gold/15 hover:text-brand-gold`;
  if (status === 'booked') return `${base} text-white/40 line-through hover:bg-white/5`;
  return `${base} cursor-default text-white/20`;
}

function statusLabel(status: DayStatus) {
  if (status === 'open') return 'open';
  if (status === 'booked') return 'fully booked';
  return 'not available';
}

function parseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toDateString(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

function shiftDays(date: string, amount: number) {
  const value = parseDate(date);
  return toDateString(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate() + amount);
}

function shiftMonths(date: string, amount: number) {
  const value = parseDate(date);
  const lastDay = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + amount + 1, 0)).getUTCDate();
  return toDateString(value.getUTCFullYear(), value.getUTCMonth() + amount, Math.min(value.getUTCDate(), lastDay));
}

function monthOf(date: string): MonthKey {
  const value = parseDate(date);
  return { year: value.getUTCFullYear(), month: value.getUTCMonth() };
}

function addMonth(month: MonthKey, amount: number): MonthKey {
  const value = new Date(Date.UTC(month.year, month.month + amount, 1));
  return { year: value.getUTCFullYear(), month: value.getUTCMonth() };
}

function compareMonths(a: MonthKey, b: MonthKey) {
  return a.year * 12 + a.month - (b.year * 12 + b.month);
}

function clampDate(date: string, availability: AvailabilityResponse) {
  if (date < availability.firstDate) return availability.firstDate;
  if (date > availability.lastDate) return availability.lastDate;
  return date;
}

function buildWeeks(month: MonthKey): Array<Array<string | null>> {
  const firstWeekday = new Date(Date.UTC(month.year, month.month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  const cells: Array<string | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => toDateString(month.year, month.month, index + 1)),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}

function formatMonth(month: MonthKey) {
  return new Date(Date.UTC(month.year, month.month, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatLongDate(date: string) {
  return parseDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function hourOptions(slot: OpenSlot) {
  return Array.from({ length: slot.maxHours ?? 0 }, (_, index) => index + 1);
}

function addHours(time: string, hours: number) {
  const [h, m] = time.split(':').map(Number);
  return `${String(h + hours).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}
