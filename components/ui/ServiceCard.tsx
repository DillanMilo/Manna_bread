import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  linkText?: string;
  image?: string;
}

export function ServiceCard({ title, description, href, linkText = 'Learn more', image }: ServiceCardProps) {
  return (
    <div className="bg-brand-forest-mid/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-white/10">
      <div className="h-44 sm:h-48 md:h-52 relative bg-gradient-to-br from-brand-forest-mid to-brand-forest">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xs font-body tracking-wide">
            [ Service Photo ]
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 md:p-7">
        <h3 className="font-display text-xl sm:text-2xl text-white mb-2 sm:mb-3">{title}</h3>
        <p className="font-body text-base sm:text-sm md:text-base text-white/70 leading-relaxed mb-4 sm:mb-5">{description}</p>
        <Link href={href} className="font-body text-sm font-medium text-brand-gold hover:text-brand-cognac-light transition-colors inline-flex items-center gap-2 min-h-[44px] py-2 -my-2">
          {linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
