import type { MetadataRoute } from 'next';
import { privacyPolicyApproved } from '@/content/site';
import { siteUrl } from '@/lib/seo';

const routes = [
  '/',
  '/systemmasters',
  '/capitalmasters',
  '/assessments/operations-automation',
  '/assessments/financial-readiness',
  '/about',
  '/contact',
];

/** Entries are only produced once NEXT_PUBLIC_SITE_URL is set to the confirmed domain. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  return [...routes, ...(privacyPolicyApproved ? ['/privacy'] : [])].map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
