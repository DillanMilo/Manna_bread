import Link from 'next/link';
import { BRAND, CONTACT, SOCIAL, NAV_LINKS, TOAST } from '@/lib/constants';

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M13.8 22v-8h2.7l.4-3h-3.1v-1.9c0-.9.25-1.5 1.55-1.5H17V4.9c-.3-.04-1.3-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3V11H7.5v3h2.82v8h3.48Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-walnut text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1 text-left">
            <h4 className="font-display text-3xl font-medium mb-1 sm:mb-2">{BRAND.name.split(' ')[0]}</h4>
            <p className="font-accent text-base sm:text-lg italic opacity-80 mb-3 sm:mb-5">{BRAND.tagline}</p>
            <p className="font-accent text-xs sm:text-sm italic opacity-60 leading-relaxed border-l-2 border-brand-cognac pl-3 sm:pl-4 max-w-sm">
              &ldquo;Give us this day our daily bread.&rdquo;
              <span className="block mt-1 not-italic text-xs opacity-50">— Matthew 6:11</span>
            </p>
          </div>

          <div>
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-3 sm:mb-5">
              Explore
            </h5>
            <div className="flex flex-col gap-1 sm:gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/80 hover:text-white transition-colors py-1 inline-block sm:py-1.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-3 sm:mb-5">
              Quick Links
            </h5>
            <div className="flex flex-col gap-1 sm:gap-3">
              <a href={TOAST.orderOnline} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors py-1 inline-block sm:py-1.5">
                Order Online
              </a>
              <a href={TOAST.giftCards} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors py-1 inline-block sm:py-1.5">
                Gift Cards
              </a>
              <a href={TOAST.rewards} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors py-1 inline-block sm:py-1.5">
                Rewards
              </a>
              <Link href="/contact" className="font-body text-sm text-white/80 hover:text-white transition-colors py-1 inline-block sm:py-1.5">
                Contact
              </Link>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-3 sm:mb-5">
              Connect
            </h5>
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 md:block">
              <div className="flex gap-5 md:flex-col md:gap-3">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 py-1 font-body text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-walnut sm:py-1.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-cognac/50 bg-white/[0.04] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-gold group-hover:bg-brand-gold/10">
                    <InstagramIcon />
                  </span>
                  <span>Instagram</span>
                </a>
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 py-1 font-body text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-walnut sm:py-1.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-cognac/50 bg-white/[0.04] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-gold group-hover:bg-brand-gold/10">
                    <FacebookIcon />
                  </span>
                  <span>Facebook</span>
                </a>
              </div>
              <div className="md:mt-6">
                <p className="font-body text-xs text-white/60 leading-relaxed">
                  {CONTACT.address.street}<br />
                  {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <p className="font-body text-[11px] sm:text-xs opacity-50">
            &copy; {new Date().getFullYear()} Manna Bread From Heaven. All rights reserved.
          </p>
          <p className="font-body text-[11px] sm:text-xs opacity-50">
            Website by <a href="https://www.dillanmilo.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">dillanmilo.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
