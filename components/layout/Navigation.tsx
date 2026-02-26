'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, TOAST } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-warm-white/90 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-brand-warm-white border-b border-black/5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative block h-12 w-auto shrink-0">
            <Image
              src="/images/Bread from Heaven.PNG"
              alt="Manna — Cafe and Bakery, Bread from Heaven"
              height={48}
              width={86}
              className="h-full w-auto object-contain rounded-sm"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.4 * i + 0.6, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Link
                  href={link.href}
                  className="font-body text-[13px] font-medium text-brand-olive hover:text-brand-walnut transition-colors tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-cognac transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.4 * NAV_LINKS.length + 0.6, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <a
              href={TOAST.signIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-olive hover:text-brand-walnut transition-colors"
              aria-label="Sign In"
              title="Sign In"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </a>
            <a
              href={TOAST.cart}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-olive hover:text-brand-walnut transition-colors"
              aria-label="Cart"
              title="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </a>
            <Button href={TOAST.orderOnline} external variant="primary" size="sm" className="shadow-[0_0_16px_rgba(196,149,106,0.4)]">
              Order Online
            </Button>
          </motion.div>

          <button
            className="md:hidden p-2 text-brand-walnut"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden border-t border-black/5"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="py-6">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className="font-body text-base text-brand-olive hover:text-brand-walnut transition-colors py-3 block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    className="pt-4 flex flex-col gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="flex gap-3">
                      <a
                        href={TOAST.signIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-body font-medium text-brand-walnut border-[1.5px] border-brand-walnut rounded-lg hover:bg-brand-walnut hover:text-brand-warm-white transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Sign In
                      </a>
                      <a
                        href={TOAST.cart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-body font-medium text-brand-walnut border-[1.5px] border-brand-walnut rounded-lg hover:bg-brand-walnut hover:text-brand-warm-white transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Cart
                      </a>
                    </div>
                    <Button href={TOAST.orderOnline} external variant="primary" className="w-full">
                      Order Online
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
