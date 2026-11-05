'use client';

import { useId, useState } from 'react';
import { MAX_GUEST_COUNT, RENTAL_TYPE_RULES, minimumHoursFor, parseGuestCount, type RentalType } from '@/lib/booking/config';

type GuestCountFieldProps = {
  /** The space picked so far, or null before a date is chosen. */
  rentalType: RentalType | null;
  /** Hours open from the chosen start time (entire building), when known. */
  freeHours?: number;
  labelClass: string;
  inputClass: string;
};

/**
 * JAMIE (5 Nov): required estimated guest count for rental requests. It sets
 * the entire-building minimum (3 hours up to 25 guests, 4 hours for 26 or
 * more), so the hint under the field shows which minimum applies.
 */
export function GuestCountField({ rentalType, freeHours, labelClass, inputClass }: GuestCountFieldProps) {
  const [value, setValue] = useState('');
  const hintId = useId();
  const guests = parseGuestCount(value);
  const building = RENTAL_TYPE_RULES['entire-building'].minHours;
  const minimum = rentalType && guests ? minimumHoursFor(rentalType, guests) : null;
  const tooShort = minimum !== null && freeHours !== undefined && freeHours < minimum;

  let hint: string | null = null;
  if (minimum !== null) {
    hint = tooShort
      ? `Groups of ${guests} need at least ${minimum} hours, and this start time has ${freeHours} open. Please choose an earlier time or another date.`
      : `Minimum rental for ${guests} ${guests === 1 ? 'guest' : 'guests'}: ${minimum} hours.`;
  } else if (rentalType !== 'conference-room' && building) {
    hint = `Entire building minimum: ${building.upTo25Guests} hours, or ${building.over25Guests} for 26 or more guests.`;
  }

  return (
    <label className="block">
      <span className={labelClass}>Guests</span>
      <input
        name="guestCount"
        type="number"
        required
        min={1}
        max={MAX_GUEST_COUNT}
        step={1}
        inputMode="numeric"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby={hint ? hintId : undefined}
        placeholder="Estimated guest count"
        className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      {hint && (
        <span
          id={hintId}
          aria-live="polite"
          className={`mt-1.5 block font-body text-xs leading-relaxed ${tooShort ? 'text-brand-cognac-light' : 'text-white/55'}`}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
