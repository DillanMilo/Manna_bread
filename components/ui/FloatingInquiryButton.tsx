'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/constants';
import { InquiryForm } from '@/components/ui/InquiryForm';

type FloatingInquiryButtonProps = {
  variant: 'catering' | 'rentals';
};

export function FloatingInquiryButton({ variant }: FloatingInquiryButtonProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setVisible(progress > 0.4 && progress < 0.92);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const label = variant === 'catering' ? 'Plan catering' : 'Ask about rentals';

  return (
    <>
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-4 right-4 z-50 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-gold px-5 py-3 font-body text-sm font-semibold text-brand-forest shadow-xl shadow-black/25 transition-colors hover:bg-brand-cognac-light sm:bottom-6 sm:right-6"
          >
            <span aria-hidden="true">+</span>
            {label}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-forest/75 px-4 pb-4 pt-20 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Inquiry form"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-brand-forest-mid p-5 shadow-2xl shadow-black/30 sm:p-6"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close inquiry form"
              >
                x
              </button>

              <div className="pr-12">
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-3">
                  Quick inquiry
                </p>
                <h2 className="font-display text-2xl text-white mb-2">
                  {variant === 'catering' ? 'Tell us about the spread.' : 'Tell us about the gathering.'}
                </h2>
                <p className="font-body text-sm text-white/65 leading-relaxed mb-5">
                  Prefer a direct route? Call {CONTACT.phone} or email {CONTACT.email}.
                </p>
              </div>

              <InquiryForm
                defaultType={variant}
                source={`${variant}-floating-inquiry`}
                compact
                onSuccess={() => setTimeout(() => setOpen(false), 1400)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
