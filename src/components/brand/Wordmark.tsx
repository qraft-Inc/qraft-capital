/**
 * Brand marks.
 *
 * Qraft Capital uses the approved Primary logo (Qraft_Capital_Logo_Suite), stored in
 * /public/brand/ as SVG (used on the site) with matching PNGs:
 *   - full-colour: navy #0F2537 + amber #D99B26, for light backgrounds
 *   - white: for dark backgrounds (e.g. the navy footer)
 *   - black: single-colour, for monochrome uses
 *
 * SystemMasters and CapitalMasters still use typographic wordmarks until their
 * approved artwork is supplied.
 */
import Image from 'next/image';
import { houses, type HouseId } from '@/content/site';

const LOGO_RATIO = 1280 / 660; // Primary logo artboard

export function QraftLogo({
  variant = 'full-colour',
  height = 44,
  className = '',
  priority = false,
}: {
  variant?: 'full-colour' | 'white' | 'black';
  /** Rendered height in CSS pixels; width follows the logo's proportions. */
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/qraft-capital-primary-${variant}.svg`}
      alt="Qraft Capital"
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      priority={priority}
      unoptimized
      className={`block h-auto max-w-none ${className}`}
      style={{ height, width: 'auto' }}
    />
  );
}

/** House wordmark with the consistent “A Qraft Capital brand” endorsement. */
export function HouseWordmark({
  house,
  size = 'md',
  invert = false,
  endorsement = true,
}: {
  house: HouseId;
  size?: 'sm' | 'md' | 'lg';
  invert?: boolean;
  endorsement?: boolean;
}) {
  const h = houses[house];
  const [first, second] = h.id === 'systemmasters' ? ['System', 'Masters'] : ['Capital', 'Masters'];
  const text = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl sm:text-5xl' }[size];
  const tone = invert ? (h.tone === 'cobalt' ? 'text-cobalt-light' : 'text-emerald-light') : h.tone === 'cobalt' ? 'text-cobalt' : 'text-emerald';
  return (
    <span className="inline-flex flex-col">
      <span className={`font-display ${text} leading-none tracking-tight ${invert ? 'text-paper' : 'text-ink'}`}>
        <span className="font-semibold">{first}</span>
        <span className={tone}>{second}</span>
      </span>
      {endorsement && (
        <span className={`label mt-2 ${invert ? 'text-paper/70' : 'text-ink-muted'}`}>A Qraft Capital brand</span>
      )}
    </span>
  );
}
