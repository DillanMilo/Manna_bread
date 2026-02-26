'use client';

import { useEffect, useRef, useState } from 'react';

const MANNA_LOCATION = { lat: 30.0972, lng: -95.6161 };

// Warm, desaturated map style that matches the brand palette
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ saturation: -40 }, { lightness: 10 }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5D4037' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#FAF9F6' }, { lightness: 20 }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#B8C4B8' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{ color: '#F5F2ED' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#FFFFFF' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#B8C4B8' }, { lightness: 20 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [{ color: '#D4E5D0' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

const INFO_WINDOW_CONTENT = `
  <div style="
    font-family: 'Libre Franklin', sans-serif;
    padding: 8px 4px;
    max-width: 220px;
  ">
    <h3 style="
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 600;
      color: #3E2723;
      margin: 0 0 4px 0;
    ">Manna Bakery</h3>
    <p style="
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 13px;
      color: #C4956A;
      margin: 0 0 8px 0;
    ">Bread from Heaven</p>
    <p style="
      font-size: 13px;
      color: #2D2A26;
      margin: 0 0 6px 0;
      line-height: 1.5;
    ">306 Commerce St<br/>Tomball, TX 77375</p>
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Manna+Bread+from+Heaven,+306+Commerce+St,+Tomball,+TX+77375"
      target="_blank"
      rel="noopener noreferrer"
      style="
        display: inline-block;
        font-size: 12px;
        font-weight: 500;
        color: #C4956A;
        text-decoration: none;
        margin-top: 2px;
      "
    >Get Directions &rarr;</a>
  </div>
`;

export function MannaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError(true);
      return;
    }

    // Don't load the script if already present
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup only if we added it
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: MANNA_LOCATION,
      zoom: 15,
      styles: MAP_STYLES,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      gestureHandling: 'cooperative',
    });

    const marker = new google.maps.Marker({
      position: MANNA_LOCATION,
      map,
      title: 'Manna Bakery',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#C4956A',
        fillOpacity: 1,
        strokeColor: '#3E2723',
        strokeWeight: 2,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: INFO_WINDOW_CONTENT,
      pixelOffset: new google.maps.Size(0, -4),
    });

    // Open by default
    infoWindow.open(map, marker);

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }, [loaded]);

  if (error) {
    // Graceful fallback to the basic iframe embed
    return (
      <iframe
        src="https://www.google.com/maps?q=Manna+Bread+from+Heaven,+306+Commerce+St,+Tomball,+TX+77375&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Manna Bakery location"
        className="grayscale-[30%] contrast-[1.05]"
      />
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '100%' }}
    />
  );
}
