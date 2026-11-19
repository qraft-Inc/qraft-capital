import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section>
      <div className="container-site py-24">
        <p className="label text-ink-muted">404</p>
        <h1 className="display-lg mt-4 text-ink">We could not find that page.</h1>
        <p className="lede mt-4">It may have moved. These are good places to start:</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Go to the homepage</Link>
          <Link href="/#assessments" className="btn btn-secondary">Find the right assessment</Link>
        </div>
      </div>
    </section>
  );
}
