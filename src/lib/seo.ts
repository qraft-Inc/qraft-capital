import type { Metadata } from 'next';

/**
 * Production domain. Set NEXT_PUBLIC_SITE_URL (e.g. https://www.example.com) once the
 * domain is confirmed. Until then canonical URLs, absolute Open Graph URLs and the
 * sitemap entries are left out rather than pointing at a guessed domain.
 */
export function siteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const base = siteUrl();
  return {
    title: { absolute: title },
    description,
    ...(base ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Qraft Capital',
      locale: 'en_GB',
      ...(base ? { url: path } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
