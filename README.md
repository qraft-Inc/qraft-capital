# Qraft Capital website

Marketing and lead-generation site for Qraft Capital (Rata Qraft Solutions Limited) and its two houses,
SystemMasters and CapitalMasters.

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, npm.

## Run

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run dev                  # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build && npm start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, two houses, “What are you trying to fix?”, illustrative example, steps, assessment picker (`#assessments`) |
| `/systemmasters` | SystemMasters landing page |
| `/capitalmasters` | CapitalMasters landing page |
| `/assessments/operations-automation` | Operations and Automation Assessment + enquiry form (`#enquire`) |
| `/assessments/financial-readiness` | Financial Readiness Assessment + enquiry form (`#enquire`) |
| `/about` | Qraft Capital, Enterprise Capital Development, relationship to Rata Qraft Solutions Limited |
| `/contact` | General enquiries / help choosing, via the embedded Tally form (`contactFormUrl` in `src/content/site.ts`) |
| `/privacy` | Draft notice. Returns 404 until `privacyPolicyApproved` is set to `true` |

## Where to edit things

| What | Where |
| --- | --- |
| Business details, contact links, house and assessment names, nav, form options | `src/content/site.ts` |
| Logos / wordmarks | `src/components/brand/Wordmark.tsx` (see `public/brand/README.md`), favicon `src/app/icon.svg`, social image `src/app/opengraph-image.tsx` |
| Colours, type, buttons | `src/app/globals.css` (`@theme` tokens) and `src/app/layout.tsx` (fonts) |
| Page copy | `src/app/**/page.tsx`; assessment copy is in each assessment `page.tsx` |
| Diagrams (workflow, cash-gap chart, hero) | `src/components/diagrams/Diagrams.tsx` |
| Enquiry form UI | `src/components/enquiry/EnquiryForm.tsx` |
| Validation rules | `src/lib/enquiry-schema.ts` |
| Server action (spam checks, rate limit) | `src/app/actions/enquiry.ts` |
| Lead delivery (SMTP) | `src/lib/lead-routing.ts` |
| SEO helpers, domain | `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| Analytics hook (inert until a tag manager is approved) | `src/lib/analytics.ts`, `src/components/analytics/ClickTracker.tsx` |

## Environment variables

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, absolute Open Graph URLs, sitemap entries, Organization structured data |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Sending enquiries |
| `LEAD_TO_EMAIL` | Verified inbox that receives enquiries |

Set them **before `npm run build`**: pages are prerendered, and the form's "connected" state is decided at
build time. The server action also re-checks at request time.

Until the SMTP and `LEAD_TO_EMAIL` values are set, the form shows “Online enquiries are not connected yet”
and is disabled. The server refuses submissions. A success message only appears after the SMTP server
accepts the message for `LEAD_TO_EMAIL`.

## Lead handling

The Contact page uses a Tally form: its notifications, storage and spam protection are configured in Tally. The two assessment pages use the built-in form below.


- Fields: name, organisation, email, optional phone/WhatsApp, enquiry type (SystemMasters / CapitalMasters / both / help me choose), optional team size, message.
- Recorded with each lead: source page, assessment page, reference (`QC-XXXXXX`), UTC time. Reply-To is the visitor.
- Spam protection: hidden honeypot field, a minimum time of 3 seconds before submitting, and an in-memory limit of 5 submissions per IP per 10 minutes. The rate limit is per server instance, so swap it for a shared store or a provider-level control if traffic grows.
- The form requires JavaScript to submit; the time check rejects posts without it.
- Server logs record only the reference and error message, never form content.

## Testing performed (2026-11-19)

`tsc`, ESLint and `next build` pass. No test suite exists yet. Browser checks with Playwright + Chrome on a production build:

- All pages at 320, 390 and 1440 px wide: no horizontal overflow, one `h1` each, unique titles and descriptions; internal links and anchors resolve.
- Homepage → assessment journeys for both houses. House header CTAs go to their own assessment.
- Server-side validation errors, focus management, inputs kept on errors, too-fast submission rejection, duplicate-click protection.
- Successful delivery to a local mock SMTP server (test recipient on the reserved `.invalid` domain); simulated provider rejection shows a retryable error and no success.
- Mobile menu: keyboard open/close, Escape, closes on navigation. The skip link and reduced-motion behaviour also work.
