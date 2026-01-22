# Architecture

**Analysis Date:** 2026-01-22

## Pattern Overview

**Overall:** Component-Based Static Site Architecture (Astro)

**Key Characteristics:**
- File-based routing with Astro pages
- Hierarchical component composition (Layout > Blocks > UI)
- JSON-driven data layer for dynamic content
- Content collections for Markdown/MDX blog posts
- Client-side hydration for interactive features only

## Layers

**Pages Layer:**
- Purpose: Define routes and page-level content/SEO data
- Location: `src/pages/`
- Contains: Astro page components with frontmatter data
- Depends on: Layouts, Blocks, Content Collections
- Used by: Astro router (file-based routing)

**Layouts Layer:**
- Purpose: Provide consistent page structure with header/footer
- Location: `src/layouts/`
- Contains: `Layout.astro` (main), `BlogLayout.astro` (blog posts)
- Depends on: UI components, Scripts, Styles
- Used by: Pages

**Blocks Layer:**
- Purpose: Reusable page sections with specific purposes
- Location: `src/components/blocks/`
- Contains: Hero, Features, CTA, FAQ, Pricing, Blog, Contact sections
- Depends on: UI components, Data files
- Used by: Pages, Layouts

**UI Layer:**
- Purpose: Atomic/base components for building blocks
- Location: `src/components/ui/`
- Contains: Button, Section, Row, Col, Card variants, NavigationBar, Footer
- Depends on: Styles, Icons
- Used by: Blocks, Layouts

**Data Layer:**
- Purpose: Centralized configuration and content data
- Location: `src/config/` (TypeScript configs), `src/data/json-files/` (JSON data)
- Contains: Site config, navigation, footer, features, pricing, onboarding data
- Depends on: None
- Used by: Blocks, UI components

**Content Layer:**
- Purpose: Markdown content for blog posts
- Location: `src/content/blog/`
- Contains: `.md` files with frontmatter schema
- Depends on: `src/content.config.ts` schema definition
- Used by: Blog pages via Astro content collections

**Scripts Layer:**
- Purpose: Client-side interactivity and analytics
- Location: `src/components/scripts/`
- Contains: Theme switching, scroll animations, modals, menu toggle, analytics
- Depends on: None (standalone JavaScript)
- Used by: Layouts (injected into pages)

## Data Flow

**Page Rendering Flow:**

1. Astro router matches URL to page file in `src/pages/`
2. Page imports and configures Layout with SEO data
3. Page composes Blocks with page-specific content props
4. Blocks fetch data from JSON files or receive props
5. Blocks render using UI components
6. Layout wraps everything with header, footer, and global scripts
7. Astro outputs static HTML with hydrated client scripts

**Content Collection Flow (Blog):**

1. Markdown files in `src/content/blog/` define posts
2. `src/content.config.ts` defines schema (title, pubDate, author, description, image)
3. Dynamic routes `[...id].astro` and `[...page].astro` query collection
4. `getCollection('blog')` fetches all posts
5. `render(entry)` converts Markdown to HTML
6. `BlogLayout.astro` wraps content with hero and CTA

**Navigation Data Flow:**

1. `src/data/json-files/navigationBarData.json` defines nav structure
2. `src/config/navigationBar.ts` provides typed async loader function
3. `NavigationBar.astro` calls `getNavigationBarData()` at build time
4. Component renders navigation with active state detection

**State Management:**
- No client-side state management library
- localStorage for theme preference (`theme: auto|light|dark`)
- localStorage for billing cycle preference (`billingCycle: annually|monthly`)
- DOM class toggling for UI state (menu open, theme mode)

## Key Abstractions

**Section/Row/Col Grid System:**
- Purpose: 12-column responsive grid layout
- Examples: `src/components/ui/Section.astro`, `src/components/ui/Row.astro`, `src/components/ui/Col.astro`
- Pattern: Section contains Rows, Rows contain Cols with span props
- Usage:
```astro
<Section>
  <Row>
    <Col span="8">Main content</Col>
    <Col span="4">Sidebar</Col>
  </Row>
</Section>
```

**Card System:**
- Purpose: Consistent card styling with variants
- Examples: `src/components/ui/cards/Card.astro`, `PricingCard.astro`, `BlogCard.astro`, `FeatureImageCard.astro`
- Pattern: Base card with partials (CardContainer, CardHeader, CardBody, CardFooter)
- Location: `src/components/ui/cards/`

**DecorationBorder:**
- Purpose: Dashed/solid decorative borders on sections
- Examples: `src/components/ui/DecorationBorder.astro`
- Pattern: Used in Section, Row, and individual blocks for visual styling

**Header Component (Block):**
- Purpose: Reusable title/subtitle/text header for sections
- Examples: `src/components/ui/Header.astro`
- Pattern: Centered or aligned text with consistent typography

## Entry Points

**Main Page Entry:**
- Location: `src/pages/index.astro`
- Triggers: Root URL `/`
- Responsibilities: Home page with hero, brand marquee, features, testimonials, FAQ, CTA

**Blog List Entry:**
- Location: `src/pages/blog/[...page].astro`
- Triggers: `/blog/`, `/blog/2/`, etc.
- Responsibilities: Paginated blog post listing

**Blog Post Entry:**
- Location: `src/pages/blog/[...id].astro`
- Triggers: `/blog/{post-id}/`
- Responsibilities: Individual blog post rendering with `getStaticPaths()`

**Static Pages:**
- `src/pages/pricing.astro` - Pricing table page
- `src/pages/features.astro` - Features detail page
- `src/pages/contact.astro` - Contact information
- `src/pages/terms.astro` - Terms page
- `src/pages/404.astro` - Not found page

**Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `npm run build` or `npm run dev`
- Responsibilities: Configure integrations (React, Markdoc, Partytown, Sitemap), Tailwind, Netlify adapter

## Error Handling

**Strategy:** Minimal client-side error handling; static site relies on build-time validation

**Patterns:**
- Astro Check runs during build (`astro check && astro build`)
- TypeScript strict mode enabled
- Content collection schema validation with Zod
- Client scripts use try/catch sparingly (e.g., video autoplay fallback)

## Cross-Cutting Concerns

**Logging:** Console-based in client scripts; no structured logging

**Validation:**
- TypeScript for component props
- Zod schema for content collections in `src/content.config.ts`
- Form validation handled by HTML5 attributes

**Authentication:** None (static marketing site)

**Theming:**
- Dark/light mode via `dark` class on `<html>`
- System preference detection with manual override
- CSS custom properties for colors in `src/styles/global.css`
- Theme state persisted in localStorage

**Scroll Animations:**
- IntersectionObserver-based reveal animations
- Configurable via `scroll-animation` class on html
- Parallax effects on `.parallax` containers

---

*Architecture analysis: 2026-01-22*
