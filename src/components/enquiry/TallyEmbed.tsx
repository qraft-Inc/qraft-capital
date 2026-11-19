'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

/**
 * Embeds a Tally form using Tally's documented embed pattern (data-tally-src + embed.js),
 * which resizes the iframe to fit the form (dynamicHeight=1).
 * Submissions, notifications and spam protection are handled in Tally.
 */
export function TallyEmbed({ src, title, source }: { src: string; title: string; source: string }) {
  const load = () => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    } else {
      // Fallback if embed.js is blocked: load the form directly (fixed height, no auto-resize).
      document.querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])').forEach((el) => {
        el.src = el.dataset.tallySrc!;
      });
    }
  };

  useEffect(() => {
    // Re-initialise when returning to the page via client-side navigation.
    if (window.Tally) window.Tally.loadEmbeds();

    // Track successful Tally submissions without sending any form content.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://tally.so' || typeof e.data !== 'string') return;
      if (e.data.includes('Tally.FormSubmitted')) track('enquiry_submitted', { source, provider: 'tally' });
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [source]);

  return (
    <>
      <iframe
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height="600"
        title={title}
        className="block w-full border-0"
      />
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" onLoad={load} onError={load} />
    </>
  );
}
