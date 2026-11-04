'use client';

import { useEffect, useState } from 'react';
import { MonthGrid } from '@/components/booking/MonthGrid';
import { addHours, formatLongDate, formatTime, hourOptions } from '@/components/booking/calendar-utils';
import { RENTAL_TYPES, type RentalType } from '@/lib/booking/config';
import type { AvailabilityResponse } from '@/lib/booking/availability';

export type PickedSlot = {
  rentalType: RentalType;
  date: string;
  time: string;
  /** Conference room length in hours; null when the end time is agreed later. */
  hours: number | null;
  /** Hours free from this start (entire building), for the guest-count minimum. */
  freeHours?: number;
};

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

const fieldLabelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';
const selectClass =
  'w-full rounded-lg border border-white/12 bg-brand-forest/70 px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-brand-gold/70';

/**
 * Compact version of the rentals availability calendar, for the inquiry
 * form. Same data and rules as the full calendar; hands the chosen slot
 * back instead of sending its own request.
 */
export function MiniAvailabilityPicker({
  initial,
  onConfirm,
  onCancel,
}: {
  initial?: PickedSlot | null;
  onConfirm: (slot: PickedSlot) => void;
  onCancel: () => void;
}) {
  const [rentalType, setRentalType] = useState<RentalType | ''>(initial?.rentalType ?? '');
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadState, setLoadState] = useState<LoadState>(initial ? 'loading' : 'idle');
  const [date, setDate] = useState(initial?.date ?? '');
  const [time, setTime] = useState(initial?.time ?? '');
  const [hours, setHours] = useState(initial?.hours ?? 1);

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

  const times = availability && date ? availability.days[date] ?? [] : [];
  const slot = times.find((item) => item.start === time);

  function chooseType(type: RentalType) {
    if (type === rentalType) return;
    setRentalType(type);
    setAvailability(null);
    setLoadState('loading');
    setDate('');
    setTime('');
    setHours(1);
  }

  return (
    <div className="rounded-xl border border-brand-gold/30 bg-brand-forest/60 p-3 sm:p-4">
      <div role="radiogroup" aria-label="Choose a space" className="mb-3 grid grid-cols-2 gap-2">
        {RENTAL_TYPES.map((type) => (
          <label key={type.value} className="relative">
            <input
              type="radio"
              name="mini-availability-rental-type"
              value={type.value}
              checked={rentalType === type.value}
              onChange={() => chooseType(type.value)}
              className="peer sr-only"
            />
            <span
              className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border px-2 text-center font-body text-sm font-medium transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/60 ${
                rentalType === type.value
                  ? 'border-brand-gold bg-brand-gold text-brand-forest'
                  : 'border-white/15 text-white hover:border-brand-gold/60 hover:text-brand-gold'
              }`}
            >
              {type.label}
            </span>
          </label>
        ))}
      </div>

      <div aria-live="polite">
        {!rentalType && (
          <p className="py-6 text-center font-body text-sm text-white/60">
            Choose the conference room or the entire building to see open dates.
          </p>
        )}
        {rentalType && loadState === 'loading' && (
          <p role="status" className="py-6 text-center font-body text-sm text-white/60">Loading the calendar…</p>
        )}
        {loadState === 'error' && (
          <p role="alert" className="py-6 text-center font-body text-sm text-white/70">
            We could not load the calendar right now. Add your preferred date in the message and the team will check it.
          </p>
        )}
      </div>

      {loadState === 'ready' && availability && (
        <>
          {availability.source === 'mock' && (
            <p className="mb-2 rounded-md border border-brand-cognac/40 bg-brand-cognac/15 px-2 py-1.5 text-center font-body text-[11px] font-medium text-brand-cognac-light">
              Sample data for local testing. These are not real bookings.
            </p>
          )}

          <MonthGrid
            key={availability.type}
            compact
            availability={availability}
            selectedDate={date}
            onSelect={(next) => {
              setDate(next);
              setTime('');
              setHours(1);
            }}
          />

          {date && (
            <fieldset className="mt-4 border-t border-white/10 pt-4">
              <legend className="mb-2 font-display text-base text-white">{formatLongDate(date)}</legend>
              {times.length === 0 ? (
                <p className="font-body text-sm text-white/70">This date is fully booked. Please choose another day.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {times.map(({ start }) => (
                    <label key={start} className="relative">
                      <input
                        type="radio"
                        name="mini-availability-start-time"
                        value={start}
                        checked={time === start}
                        onChange={() => {
                          setTime(start);
                          setHours(1);
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex min-h-[40px] cursor-pointer items-center justify-center rounded-lg border px-1 font-body text-xs transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/60 sm:text-sm ${
                          time === start
                            ? 'border-brand-gold bg-brand-gold text-brand-forest'
                            : 'border-white/15 text-white hover:border-brand-gold/60 hover:text-brand-gold'
                        }`}
                      >
                        {formatTime(start)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {slot?.maxHours && (
            <label className="mt-3 block">
              <span className={fieldLabelClass}>Length</span>
              <select value={hours} onChange={(event) => setHours(Number(event.target.value))} className={selectClass}>
                {hourOptions(slot).map((value) => (
                  <option key={value} value={value}>
                    {value} hour{value === 1 ? '' : 's'}, until {formatTime(addHours(slot.start, value))}
                  </option>
                ))}
              </select>
            </label>
          )}
        </>
      )}

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/15 px-4 py-2 font-body text-sm text-white/75 transition-colors hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!rentalType || !slot}
          onClick={() => {
            if (!rentalType || !slot) return;
            onConfirm({
              rentalType,
              date,
              time: slot.start,
              hours: slot.maxHours ? hours : null,
              freeHours: slot.freeHours,
            });
          }}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-gold px-5 py-2 font-body text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-cognac-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          Use this date and time
        </button>
      </div>
    </div>
  );
}
