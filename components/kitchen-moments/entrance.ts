interface EntranceOptions {
  delay: number;
  load: boolean;
  compact: boolean;
  image: boolean;
}

// No persistent hidden styles: failed or missing APIs leave the HTML readable.
export function enhanceEntrance(element: HTMLElement, options: EntranceOptions, onReveal: () => void): () => void {
  let observer: IntersectionObserver | undefined;
  let animation: Animation | undefined;
  let played = false;
  const dispose = () => { observer?.disconnect(); animation?.cancel(); };

  if (typeof window === 'undefined' || typeof element.animate !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return dispose;

  const reveal = () => {
    if (played) return;
    played = true;
    onReveal();
    observer?.disconnect();
    try {
      animation = element.animate(
        options.image
          ? [{ clipPath: 'inset(8% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)' }]
          : [{ opacity: 0, transform: `translateY(${options.compact ? 12 : 28}px)` }, { opacity: 1, transform: 'none' }],
        { duration: options.image ? 950 : options.compact ? 450 : 850, delay: options.delay * 1000, easing: 'cubic-bezier(.25,.4,.25,1)', fill: 'backwards' },
      );
    } catch { /* The visible base styles remain intact. */ }
  };

  const bounds = element.getBoundingClientRect();
  if (options.load || (bounds.top <= window.innerHeight + 360 && bounds.bottom >= -360)) {
    reveal();
  } else if (typeof IntersectionObserver === 'function') {
    try {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      }, { rootMargin: '360px 0px', threshold: 0.01 });
      observer.observe(element);
    } catch { observer?.disconnect(); }
  }

  // Pause, preference changes and unmount remove any temporary animation fill.
  return dispose;
}
