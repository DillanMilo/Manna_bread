'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { AvailabilityResponse } from '@/lib/booking/availability';
import {
  addMonth,
  buildWeeks,
  clampDate,
  compareMonths,
  dayClass,
  formatLongDate,
  formatMonth,
  getDayStatus,
  monthOf,
  navButtonClass,
  type MonthKey,
  parseDate,
  shiftDays,
  shiftMonths,
  statusLabel,
  toDateString,
  weekdays,
} from '@/components/booking/calendar-utils';

type MonthGridProps = {
  availability: AvailabilityResponse;
  selectedDate: string;
  onSelect: (date: string) => void;
  /** Smaller version for the inquiry form. */
  compact?: boolean;
};

/**
 * Month view of open, fully booked and unavailable dates, with keyboard
 * navigation (arrows, Home/End, PageUp/PageDown). Remount it (key) when
 * the availability data changes.
 */
export function MonthGrid({ availability, selectedDate, onSelect, compact = false }: MonthGridProps) {
  const [viewMonth, setViewMonth] = useState<MonthKey>(() => monthOf(availability.firstDate));
  const [focusedDate, setFocusedDate] = useState(
    () => Object.keys(availability.days).find((date) => availability.days[date].length > 0) ?? availability.firstDate,
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocus = useRef(false);

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)?.focus();
  }, [focusedDate, viewMonth]);

  const minMonth = monthOf(availability.firstDate);
  const maxMonth = monthOf(availability.lastDate);
  // Exactly one day in the visible month takes Tab focus (roving tabindex).
  const tabbableDate = compareMonths(monthOf(focusedDate), viewMonth) === 0
    ? focusedDate
    : clampDate(toDateString(viewMonth.year, viewMonth.month, 1), availability);

  function showMonth(next: MonthKey) {
    if (compareMonths(next, minMonth) < 0 || compareMonths(next, maxMonth) > 0) return;
    setViewMonth(next);
    setFocusedDate(clampDate(toDateString(next.year, next.month, 1), availability));
  }

  function selectDate(date: string) {
    if (getDayStatus(availability, date) === 'unavailable') return;
    setFocusedDate(date);
    onSelect(date);
  }

  function moveFocus(date: string) {
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

  const gap = compact ? 'gap-1' : 'gap-1 sm:gap-1.5';

  return (
    <>
      <div className={`${compact ? 'mb-2' : 'mb-4'} flex items-center justify-between gap-2`}>
        <button
          type="button"
          aria-label="Previous month"
          disabled={compareMonths(viewMonth, minMonth) <= 0}
          onClick={() => showMonth(addMonth(viewMonth, -1))}
          className={navButtonClass}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <p aria-live="polite" className={`font-display text-white ${compact ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
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
        <div role="row" className={`mb-1 grid grid-cols-7 ${gap}`}>
          {weekdays.map((day) => (
            <span
              key={day.short}
              role="columnheader"
              aria-label={day.long}
              className={`text-center font-body font-semibold uppercase text-brand-gold/80 ${
                compact ? 'py-0.5 text-[10px] tracking-[0.5px]' : 'py-1 text-[11px] tracking-[1px]'
              }`}
            >
              {day.short}
            </span>
          ))}
        </div>

        {buildWeeks(viewMonth).map((week, weekIndex) => (
          <div key={weekIndex} role="row" className={`grid grid-cols-7 ${gap} ${compact ? 'mb-1' : 'mb-1 sm:mb-1.5'}`}>
            {week.map((date, dayIndex) => {
              if (!date) {
                return <span key={`empty-${dayIndex}`} role="gridcell" aria-hidden="true" />;
              }

              const status = getDayStatus(availability, date);
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
                    className={dayClass(status, isSelected, compact)}
                  >
                    <span>{parseDate(date).getUTCDate()}</span>
                    {status === 'open' && (
                      <span
                        aria-hidden="true"
                        className={`${compact ? 'mt-0.5' : 'mt-1'} h-1 w-1 rounded-full ${isSelected ? 'bg-brand-forest' : 'bg-brand-gold'}`}
                      />
                    )}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-white/65 ${
          compact ? 'mt-3 text-[11px]' : 'mt-5 text-xs'
        }`}
      >
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
  );
}
