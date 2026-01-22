# External Integrations

**Analysis Date:** 2026-01-22

## APIs & External Services

**Analytics:**
- Google Analytics (GA4)
  - Implementation: `src/components/scripts/googleAnalytics.astro`
  - Config: `src/config/analytics.ts`
  - Measurement ID env var: `PUBLIC_GA_TRACKING_ID`
  - Uses Partytown for off-main-thread loading

- Google Tag Manager
  - Implementation: `src/components/scripts/googleTagManagerHead.astro`, `src/components/scripts/googleTagManagerBody.astro`
  - Config: `src/config/analytics.ts`
  - Container ID: Hardcoded empty string (not configured)

- Google Search Console
  - Implementation: `src/components/scripts/googleSearchConsole.astro`
  - Config: `src/config/analytics.ts`
  - Site verification: Hardcoded empty string (not configured)

- Vercel Analytics
  - Package installed: `@vercel/analytics` ^1.6.1
  - Status: NOT IMPLEMENTED (package unused in codebase)

## Data Storage

**Databases:**
- None - This is a static site

**File Storage:**
- Local filesystem only
- Blog content: `src/content/blog/*.md`
- Static assets: `public/` directory
- JSON data files: `src/data/json-files/`

**Caching:**
- Netlify CDN caching
- Asset caching configured: `Cache-Control: public, max-age=31536000, immutable` for `/_astro/*`
- Config: `.netlify/v1/config.json`

## Authentication & Identity

**Auth Provider:**
- None - Public static marketing site

## Content Management

**Blog System:**
- Astro Content Collections
- Schema: `src/content.config.ts`
- Fields: title, pubDate, author, description, image, thumbnail
- Loader: glob pattern for `.md` and `.mdx` files

**Static Data:**
- Navigation: `src/data/json-files/navigationBarData.json`
- Features: `src/data/json-files/featuresData.json`
- Pricing: `src/data/json-files/pricing.json`
- Footer: `src/data/json-files/footerNavigationData.json`
- Onboarding: `src/data/json-files/onboardingData.json`

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- None configured (static site)

**Performance:**
- Partytown integration for third-party scripts
- Config in `astro.config.mjs`:
  ```javascript
  partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })
  ```

## CI/CD & Deployment

**Hosting:**
- Primary: Netlify
  - Adapter: `@astrojs/netlify` ^6.6.3
  - Site URL: `https://mizu-theme.netlify.app/`
  - Config: `.netlify/v1/config.json`

- Alternative: Vercel
  - Adapter available: `@astrojs/vercel` ^9.0.2
  - Not currently active (Netlify adapter in use)

**CI Pipeline:**
- Not detected (no `.github/workflows/`, `.gitlab-ci.yml`, etc.)
- Likely using Netlify's built-in CI

**Build Output:**
- Directory: `dist/` (excluded in tsconfig)
- Static assets with hash-based cache busting

## Environment Configuration

**Required env vars:**
- `PUBLIC_GA_TRACKING_ID` - Google Analytics measurement ID (optional, for analytics)

**Optional env vars (for future use):**
- Google Tag Manager ID - Currently hardcoded empty in `src/config/analytics.ts`
- Google Site Verification - Currently hardcoded empty in `src/config/analytics.ts`

**Secrets location:**
- Environment variables (not committed)
- No `.env` files present in repository

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## SEO & Metadata

**Sitemap:**
- Auto-generated via `@astrojs/sitemap`
- Location: `/sitemap-index.xml`
- Reference: `<link rel="sitemap" href="/sitemap-index.xml" />` in `src/components/blocks/head/Header.astro`

**Robots.txt:**
- Dynamic generation: `src/pages/robots.txt.ts`

**SEO Component:**
- Implementation: `src/components/blocks/head/partials/Seo.astro`
- Features: title, description, og:image, canonical, noindex support

**Open Graph:**
- Default image: `/og.jpg`
- Configurable per page

## Third-Party Scripts

**Loaded via Partytown (off-main-thread):**
- Google Analytics gtag.js
- Google Tag Manager (if configured)

**Direct loading:**
- Custom theme scripts: `src/components/scripts/ThemeScripts.astro`
- Swiper CSS: Imported in Layout

## Fonts

**External:**
- None - All fonts self-hosted

**Self-hosted:**
- Clash-Display (headings): `public/fonts/clashdisplay/`
- Clash-Grotesk (body): `public/fonts/clashgrotesk/`
- Formats: woff2, woff, ttf, eot

## CDN & Assets

**Images:**
- Self-hosted in `public/` directory
- Optimized via Sharp during build
- Blog images: `public/collections/blog/`

**Icons:**
- SVG icons in `src/icons/`
- Managed via `astro-icon`

---

*Integration audit: 2026-01-22*
