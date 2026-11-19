import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ClickTracker } from '@/components/analytics/ClickTracker';
import { siteUrl } from '@/lib/seo';

const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'], axes: ['opsz'] });
const plexSans = IBM_Plex_Sans({ variable: '--font-plex-sans', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const plexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500'] });

const base = siteUrl();

export const metadata: Metadata = {
  ...(base ? { metadataBase: new URL(base) } : {}),
  title: {
    default: 'Qraft Capital | Business Systems and Financial Readiness',
    template: '%s | Qraft Capital',
  },
  description:
    'Qraft Capital helps growing businesses in Uganda build better systems, manage cash flow and prepare for funding, through SystemMasters and CapitalMasters.',
  applicationName: 'Qraft Capital',
  openGraph: { siteName: 'Qraft Capital', locale: 'en_GB', type: 'website' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0f2537',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-ink px-4 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <ClickTracker />
      </body>
    </html>
  );
}
