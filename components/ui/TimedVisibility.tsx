'use client';

import { useEffect, useState, type ReactNode } from 'react';

const MAX_TIMEOUT_MS = 2_147_000_000;

interface TimedVisibilityProps {
  children: ReactNode;
  startsAt?: string;
  endsAt?: string;
}

function parseBoundary(value?: string) {
  if (!value) {
    return null;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function TimedVisibility({ children, startsAt, endsAt }: TimedVisibilityProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTimestamp = parseBoundary(startsAt);
    const endTimestamp = parseBoundary(endsAt);
    let timeoutId: number | undefined;

    const updateVisibility = () => {
      const now = Date.now();
      const hasNotStarted = startTimestamp !== null && now < startTimestamp;
      const hasEnded = endTimestamp !== null && now >= endTimestamp;

      setIsVisible(!hasNotStarted && !hasEnded);

      const nextBoundary = hasNotStarted
        ? startTimestamp
        : !hasEnded
          ? endTimestamp
          : null;

      if (nextBoundary !== null) {
        const delay = Math.min(Math.max(nextBoundary - now, 0) + 50, MAX_TIMEOUT_MS);
        timeoutId = window.setTimeout(updateVisibility, delay);
      }
    };

    updateVisibility();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [endsAt, startsAt]);

  return isVisible ? children : null;
}
