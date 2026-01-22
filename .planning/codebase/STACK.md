# Technology Stack

**Analysis Date:** 2026-01-22

## Languages

**Primary:**
- TypeScript ^5.9.3 - All source code, components, and configuration
- Astro - Page templates and components (`.astro` files)

**Secondary:**
- JavaScript - Client-side scripts (`src/components/scripts/post-slider.js`)
- CSS - Global styles with Tailwind (`src/styles/global.css`)
- Markdown/MDX - Blog content (`src/content/blog/*.md`)

## Runtime

**Environment:**
- Node.js (version not pinned, no `.nvmrc` or `.node-version` file detected)
- ESM modules (`"type": "module"` in package.json)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Astro ^5.16.6 - Static site generator and meta-framework
- React ^19.2.3 - Interactive components (via `@astrojs/react`)
- Preact (via `@astrojs/preact` ^4.1.3) - Lightweight alternative to React

**Styling:**
- Tailwind CSS ^4.1.18 - Utility-first CSS framework
- `@tailwindcss/vite` ^4.1.18 - Vite plugin for Tailwind
- `@tailwindcss/typography` ^0.5.19 - Typography plugin for prose styling

**Build/Dev:**
- Vite (bundled with Astro) - Build tool and dev server
- TypeScript ^5.9.3 - Type checking with strict configuration

## Key Dependencies

**Critical:**
- `astro` ^5.16.6 - Core framework, all pages and components built on this
- `tailwindcss` ^4.1.18 - Styling system used throughout
- `react` / `react-dom` ^19.2.3 - For interactive UI components

**Astro Integrations:**
- `@astrojs/netlify` ^6.6.3 - Netlify deployment adapter (active in config)
- `@astrojs/vercel` ^9.0.2 - Vercel deployment adapter (available, not active)
- `@astrojs/sitemap` ^3.6.0 - Automatic sitemap generation
- `@astrojs/markdoc` ^0.15.10 - Markdoc content format support
- `@astrojs/partytown` ^2.1.4 - Third-party script optimization (Google Analytics)
- `@astrojs/check` ^0.9.6 - Astro-specific TypeScript checking

**UI/Animation:**
- `astro-icon` ^1.1.5 - Icon component system
- `astro-integration-lottie` ^0.3.2 - Lottie animation support
- `astro-swiper` ^1.3.0 - Swiper carousel integration
- `lottie-web` ^5.13.0 - Lottie animation runtime
- `swiper` (via astro-swiper) - Carousel/slider functionality

**Utilities:**
- `sharp` ^0.34.5 - Image optimization

**Code Formatting:**
- `prettier` ^3.7.4 - Code formatter
- `prettier-plugin-astro` ^0.14.1 - Astro file formatting
- `prettier-plugin-tailwindcss` ^0.7.2 - Tailwind class sorting

**Analytics (installed but unused):**
- `@vercel/analytics` ^1.6.1 - Installed but not imported anywhere in codebase

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Extends: `astro/tsconfigs/strict`
- Strict null checks enabled
- JSX configured for React (`"jsx": "react-jsx"`)

**Astro:**
- Config: `astro.config.mjs`
- Site URL: `https://mizu-theme.netlify.app/`
- Adapter: Netlify (server-side rendering capable)
- Active integrations: icon, sitemap, lottie, partytown, react, markdoc

**Tailwind:**
- Config: `tailwind.config.mjs` (minimal, content path only)
- Primary config in: `src/styles/global.css` (Tailwind v4 CSS-based config)
- Custom theme with OKLCH colors (primary, neutral palettes)
- Custom fonts: Clash-Display (headings), Clash-Grotesk (body)

**Vite:**
- Config: `vite.config.ts`
- Tailwind plugin configured

**Prettier:**
- Config: `src/.prettierrc`
- Tabs for indentation
- Single quotes, no semicolons
- Print width: 100

## Platform Requirements

**Development:**
- Node.js (modern LTS recommended, 18+)
- npm for package management
- No database required (static site)

**Production:**
- Primary: Netlify (configured adapter)
- Alternative: Vercel (adapter available)
- Static hosting with optional serverless functions
- Generated sitemap at `/sitemap-index.xml`

## Build Commands

```bash
npm run dev        # Start development server
npm run build      # Type-check and build for production
npm run preview    # Preview production build locally
npm run astro      # Direct Astro CLI access
```

---

*Stack analysis: 2026-01-22*
