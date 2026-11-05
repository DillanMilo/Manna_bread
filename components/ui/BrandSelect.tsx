'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

export type BrandSelectOption = { value: string; label: string };

type BrandSelectProps = {
  label: string;
  options: BrandSelectOption[];
  /** Form field name; a hidden input carries the value when set. */
  name?: string;
  defaultValue?: string;
  /** Controlled use: pass value and onChange together. */
  value?: string;
  onChange?: (value: string) => void;
};

const labelClass = 'mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-gold/85';

/**
 * Manna-styled dropdown (replaces the browser's native select menu).
 * Keyboard: Up/Down/Home/End move, Enter or Space picks, Escape closes,
 * and typing a letter jumps to the matching option.
 */
export function BrandSelect({ label, options, name, defaultValue, value, onChange }: BrandSelectProps) {
  const [innerValue, setInnerValue] = useState(defaultValue ?? options[0]?.value ?? '');
  const selectedValue = value ?? innerValue;
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === selectedValue));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    if (value === undefined) setInnerValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function openList() {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;

    if (event.key === 'Escape' && open) {
      // Keep Escape from also closing the inquiry pop-up around this field.
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }

    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    const moves: Record<string, number> = {
      ArrowDown: Math.min(activeIndex + 1, last),
      ArrowUp: Math.max(activeIndex - 1, 0),
      Home: 0,
      End: last,
    };

    if (event.key in moves) {
      event.preventDefault();
      setActiveIndex(moves[event.key]);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(activeIndex);
      return;
    }

    if (event.key.length === 1) {
      const match = options.findIndex((option) => option.label.toLowerCase().startsWith(event.key.toLowerCase()));
      if (match >= 0) setActiveIndex(match);
    }
  }

  return (
    <div ref={rootRef} className="relative block">
      <span id={labelId} className={labelClass}>{label}</span>
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border bg-brand-forest/70 px-4 py-3 text-left font-body text-base text-white outline-none sm:text-sm transition-colors focus-visible:border-brand-gold/70 ${
          open ? 'border-brand-gold/70' : 'border-white/12 hover:border-brand-gold/40'
        }`}
      >
        <span className="truncate">{options[selectedIndex]?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-brand-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.8}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-64 overflow-y-auto rounded-lg border border-brand-gold/30 bg-brand-forest-mid py-1.5 shadow-xl shadow-black/30"
          >
            {options.map((option, index) => {
              const isSelected = index === selectedIndex;
              const isActive = index === activeIndex;

              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-3 px-4 py-2.5 font-body text-base sm:min-h-0 sm:text-sm transition-colors ${
                    isActive ? 'bg-brand-gold/15 text-brand-gold' : isSelected ? 'text-brand-gold' : 'text-white/85'
                  }`}
                >
                  {option.label}
                  {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-gold" strokeWidth={2} />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
