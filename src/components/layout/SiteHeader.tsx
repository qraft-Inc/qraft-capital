'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, assessmentCtaHref } from '@/content/site';
import { QraftLogo } from '@/components/brand/Wordmark';

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ctaHref = assessmentCtaHref(pathname);

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="Qraft Capital home">
          <QraftLogo height={44} priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="nav-link"
              data-tone={item.tone ?? undefined}
            >
              {item.tone && <span aria-hidden="true" className={`size-2 rounded-full ${item.tone === 'cobalt' ? 'bg-cobalt' : 'bg-emerald'}`} />}
              {item.label}
            </Link>
          ))}
          <Link href={ctaHref} className="btn btn-primary btn-sm ml-3" data-track="assessment_cta_click" data-track-assessment="header">
            Request an assessment
          </Link>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
            <span className={`h-0.5 bg-current transition-transform motion-reduce:transition-none ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-transform motion-reduce:transition-none ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </span>
          Menu
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <nav aria-label="Mobile" className="container-site flex flex-col py-3">
          <Link href="/" className="mobile-link" aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-link" aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.tone && <span aria-hidden="true" className={`size-2 rounded-full ${item.tone === 'cobalt' ? 'bg-cobalt' : 'bg-emerald'}`} />}
              {item.label}
            </Link>
          ))}
          <Link href={ctaHref} className="btn btn-primary mt-3" data-track="assessment_cta_click" data-track-assessment="header-mobile">
            Request an assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
