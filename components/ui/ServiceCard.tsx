'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  linkText?: string;
  image: string;
  imagePosition?: string;
}

export function ServiceCard({
  title,
  description,
  href,
  linkText = 'Learn more',
  image,
  imagePosition = 'center',
}: ServiceCardProps) {
  return (
    <div className="bg-brand-forest-mid/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-white/10 w-full max-w-[360px] sm:max-w-none mx-auto">
      <div className="h-52 sm:h-48 md:h-52 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-4 sm:p-6 md:p-7">
        <h3 className="font-display text-xl sm:text-2xl text-white mb-1.5 sm:mb-3">{title}</h3>
        <p className="font-body text-sm md:text-base text-white/70 leading-relaxed mb-3 sm:mb-5">{description}</p>
        <Link href={href} className="font-body text-sm font-medium text-brand-gold hover:text-brand-cognac-light transition-colors inline-flex items-center gap-2 min-h-[44px] py-2 -my-2">
          {linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
