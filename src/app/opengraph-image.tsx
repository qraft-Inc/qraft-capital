import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Qraft Capital: business systems and financial readiness, through SystemMasters and CapitalMasters';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), 'public/brand/qraft-capital-primary-full-colour.svg'));
  const logo = `data:image/svg+xml;base64,${svg.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f4ee',
          color: '#0f2537',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logo} alt="" width={233} height={120} />
        <div style={{ display: 'flex', fontSize: 84, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          Build a business ready to grow.
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 28, fontFamily: 'sans-serif' }}>
          {[
            ['SystemMasters', 'Business systems', '#1d4ed8'],
            ['CapitalMasters', 'Financial readiness', '#08704f'],
          ].map(([name, what, bg]) => (
            <div
              key={name}
              style={{ display: 'flex', flexShrink: 0, gap: 12, padding: '14px 24px', background: bg, color: '#fff', borderRadius: 8, whiteSpace: 'nowrap' }}
            >
              <span style={{ fontWeight: 700 }}>{name}</span>
              <span>{what}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
