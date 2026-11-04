import type { AvailabilityResponse, OpenSlot } from '@/lib/booking/availability';

/* Shared by the full availability calendar and the mini one in the inquiry form.
   Dates are YYYY-MM-DD strings, handled in UTC to avoid timezone drift. */

export type DayStatus = 'open' | 'booked' | 'unavailable';
export type MonthKey = { year: number; month: number };

export const weekdays = [
  { short: 'Su', long: 'Sunday' },
  { short: 'Mo', long: 'Monday' },
  { short: 'Tu', long: 'Tuesday' },
  { short: 'We', long: 'Wednesday' },
  { short: 'Th', long: 'Thursday' },
  { short: 'Fr', long: 'Friday' },
  { short: 'Sa', long: 'Saturday' },
];

export const navButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-gold transition-colors hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent';

export function getDayStatus(availability: AvailabilityResponse | null, date: string): DayStatus {
  const times = availability?.days[date];
  if (!times) return 'unavailable';
  return times.length > 0 ? 'open' : 'booked';
}

export function dayClass(status: DayStatus, isSelected: boolean, compact = false) {
  const base = compact
    ? 'flex aspect-square w-full flex-col items-center justify-center rounded-md font-body text-xs sm:text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70'
    : 'flex aspect-square w-full flex-col items-center justify-center rounded-lg font-body text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70';

  if (isSelected) return `${base} bg-brand-gold text-brand-forest font-semibold`;
  if (status === 'open') return `${base} bg-white/5 text-white hover:bg-brand-gold/15 hover:text-brand-gold`;
  if (status === 'booked') return `${base} text-white/40 line-through hover:bg-white/5`;
  return `${base} cursor-default text-white/20`;
}

export function statusLabel(status: DayStatus) {
  if (status === 'open') return 'open';
  if (status === 'booked') return 'fully booked';
  return 'not available';
}

export function parseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function toDateString(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

export function shiftDays(date: string, amount: number) {
  const value = parseDate(date);
  return toDateString(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate() + amount);
}

export function shiftMonths(date: string, amount: number) {
  const value = parseDate(date);
  const lastDay = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + amount + 1, 0)).getUTCDate();
  return toDateString(value.getUTCFullYear(), value.getUTCMonth() + amount, Math.min(value.getUTCDate(), lastDay));
}

export function monthOf(date: string): MonthKey {
  const value = parseDate(date);
  return { year: value.getUTCFullYear(), month: value.getUTCMonth() };
}

export function addMonth(month: MonthKey, amount: number): MonthKey {
  const value = new Date(Date.UTC(month.year, month.month + amount, 1));
  return { year: value.getUTCFullYear(), month: value.getUTCMonth() };
}

export function compareMonths(a: MonthKey, b: MonthKey) {
  return a.year * 12 + a.month - (b.year * 12 + b.month);
}

export function clampDate(date: string, availability: AvailabilityResponse) {
  if (date < availability.firstDate) return availability.firstDate;
  if (date > availability.lastDate) return availability.lastDate;
  return date;
}

export function buildWeeks(month: MonthKey): Array<Array<string | null>> {
  const firstWeekday = new Date(Date.UTC(month.year, month.month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  const cells: Array<string | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => toDateString(month.year, month.month, index + 1)),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}

export function formatMonth(month: MonthKey) {
  return new Date(Date.UTC(month.year, month.month, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatLongDate(date: string) {
  return parseDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatShortDate(date: string) {
  return parseDate(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function hourOptions(slot: OpenSlot) {
  return Array.from({ length: slot.maxHours ?? 0 }, (_, index) => index + 1);
}

export function addHours(time: string, hours: number) {
  const [h, m] = time.split(':').map(Number);
  return `${String(h + hours).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}
