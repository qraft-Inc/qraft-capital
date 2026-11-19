'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Tracks clicks on any element with `data-track="event_name"` (and optional `data-track-assessment`). */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      track(el.dataset.track!, {
        assessment: el.dataset.trackAssessment ?? 'none',
        page: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
