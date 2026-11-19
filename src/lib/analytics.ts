/**
 * Privacy-safe event helper. No analytics provider is installed yet, so this is
 * inert unless an approved tag manager defines `window.dataLayer` or `window.gtag`.
 *
 * Only send event names and non-personal context (page, assessment type).
 * Never pass form content, names, emails or phone numbers.
 */
type Props = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, props);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...props });
  } catch {
    /* never break the page for analytics */
  }
}
