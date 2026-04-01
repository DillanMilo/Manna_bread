'use client';

import { CONTACT } from '@/lib/constants';

export function MannaMap() {
  return (
    <iframe
      src={`https://www.google.com/maps?q=${CONTACT.mapQuery}&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Manna Bakery location"
      className="block h-full w-full grayscale-[30%] contrast-[1.05] min-h-[280px] sm:min-h-[360px] md:min-h-0"
    />
  );
}
