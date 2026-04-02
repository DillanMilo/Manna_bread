'use client';

import { CONTACT } from '@/lib/constants';

const MANNA_LOCATION = {
  lat: 30.0972,
  lng: -95.6161,
};

const MAP_BOUNDS = {
  left: MANNA_LOCATION.lng - 0.0065,
  bottom: MANNA_LOCATION.lat - 0.0048,
  right: MANNA_LOCATION.lng + 0.0065,
  top: MANNA_LOCATION.lat + 0.0048,
};

const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BOUNDS.left}%2C${MAP_BOUNDS.bottom}%2C${MAP_BOUNDS.right}%2C${MAP_BOUNDS.top}&layer=mapnik&marker=${MANNA_LOCATION.lat}%2C${MANNA_LOCATION.lng}`;

export function MannaMap() {
  return (
    <div className="relative isolate h-full w-full min-h-[200px] overflow-hidden bg-brand-soft-cream sm:min-h-[280px] md:min-h-0">
      <iframe
        src={OSM_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        title="Manna Bakery location"
        className="absolute -left-[7%] -top-[5%] block h-[116%] w-[116%] grayscale-[15%] contrast-[1.02]"
      />
    </div>
  );
}

export function MapInfoCard() {
  return (
    <div className="pointer-events-auto w-full max-w-[140px] rounded-lg p-2 text-brand-charcoal shadow-[0_14px_35px_rgba(32,24,20,0.22)] ring-1 ring-brand-sage/20 backdrop-blur-sm sm:max-w-[180px] sm:rounded-xl sm:p-3 bg-brand-warm-white/96">
      <p className="font-display text-xs font-semibold leading-tight text-brand-walnut sm:text-base">
        Manna Bakery
      </p>
      <p className="mt-0.5 font-accent text-[10px] italic text-brand-cognac sm:mt-1 sm:text-sm">
        Bread from Heaven
      </p>
      <p className="mt-1.5 font-body text-[10px] leading-relaxed text-brand-charcoal/85 sm:mt-3 sm:text-sm">
        {CONTACT.address.street}
        <br />
        {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
      </p>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${CONTACT.mapQuery}`}
        target="_blank"
        rel="noreferrer"
        className="mt-1.5 inline-flex text-[10px] font-medium text-brand-cognac transition-colors hover:text-brand-walnut sm:mt-3 sm:text-sm"
      >
        Get Directions
      </a>
    </div>
  );
}
