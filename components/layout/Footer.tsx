import Link from 'next/link';
import { BRAND, CONTACT, SOCIAL, NAV_LINKS, TOAST } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-brand-walnut text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-1">
            <h4 className="font-display text-3xl font-medium mb-2">{BRAND.name.split(' ')[0]}</h4>
            <p className="font-accent text-lg italic opacity-80 mb-5">{BRAND.tagline}</p>
            <p className="font-accent text-sm italic opacity-60 leading-relaxed border-l-2 border-brand-cognac pl-4">
              &ldquo;Give us this day our daily bread.&rdquo;
            </p>
          </div>

          <div>
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-5">
              Explore
            </h5>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-5">
              Quick Links
            </h5>
            <div className="flex flex-col gap-3">
              <a href={TOAST.orderOnline} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Order Online
              </a>
              <a href={TOAST.giftCards} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Gift Cards
              </a>
              <a href={TOAST.rewards} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Rewards
              </a>
              <Link href="/contact" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h5 className="font-body text-xs font-semibold tracking-[1.5px] uppercase opacity-60 mb-5">
              Connect
            </h5>
            <div className="flex flex-col gap-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Instagram
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/80 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
            <div className="mt-6">
              <p className="font-body text-xs text-white/60 leading-relaxed">
                {CONTACT.address.street}<br />
                {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs opacity-50">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-body text-xs opacity-50">
            Website by <a href="https://www.dillanmilo.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">dillanmilo.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
