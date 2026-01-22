# Codebase Structure

**Analysis Date:** 2026-01-22

## Directory Layout

```
prompt-marketing/
├── .claude/                    # Claude AI configuration
├── .netlify/                   # Netlify build output/config
├── .planning/                  # GSD planning documents
│   └── codebase/              # Codebase analysis docs
├── .vscode/                    # VS Code settings
├── public/                     # Static assets (served as-is)
│   ├── assets/                # Images used in content
│   ├── bgs/                   # Background pattern SVGs
│   ├── collections/           # Collection-specific assets
│   │   └── blog/              # Blog post images
│   └── fonts/                 # Custom font files
│       ├── clashdisplay/      # Clash Display variable font
│       └── clashgrotesk/      # Clash Grotesk variable font
├── src/                        # Source code
│   ├── assets/                # Imported/processed assets
│   │   ├── features/          # Feature section images
│   │   │   └── masonry/       # Masonry grid images
│   │   ├── hero/              # Hero section images
│   │   ├── logos/             # Brand/partner logos
│   │   └── steps/             # Onboarding step images
│   ├── components/            # Astro components
│   │   ├── blocks/            # Page section blocks
│   │   ├── scripts/           # Client-side scripts
│   │   └── ui/                # Base UI components
│   ├── config/                # TypeScript configuration
│   ├── content/               # Content collections
│   │   └── blog/              # Blog post markdown
│   ├── data/                  # Static data
│   │   └── json-files/        # JSON data files
│   ├── icons/                 # SVG icon files
│   ├── layouts/               # Page layouts
│   ├── pages/                 # Route pages
│   │   └── blog/              # Blog routes
│   └── styles/                # Global CSS
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## Directory Purposes

**`src/pages/`:**
- Purpose: File-based routing; each file becomes a route
- Contains: `.astro` page components, dynamic routes with `[...param]`
- Key files: `index.astro`, `pricing.astro`, `features.astro`, `contact.astro`, `404.astro`, `terms.astro`, `robots.txt.ts`

**`src/layouts/`:**
- Purpose: Page wrapper templates with common structure
- Contains: Layout components that wrap page content
- Key files: `Layout.astro` (main layout), `BlogLayout.astro` (blog post layout)

**`src/components/blocks/`:**
- Purpose: Reusable page sections organized by type
- Contains: Section-level components (hero, features, CTA, etc.)
- Subdirectories:
  - `hero/` - Hero section variants (`CenteredHeroCTA.astro`, `SimpleHeroBasic.astro`, etc.)
  - `features/` - Feature display blocks (`MasonryGrid.astro`, `StickyBasicFeatures.astro`)
  - `cta/` - Call-to-action blocks (`CTAPrimary.astro`)
  - `faq/` - FAQ sections (`StickyFaq.astro`)
  - `testimonials/` - Testimonial displays (`TestimonialMasonry.astro`)
  - `pricing/` - Pricing tables (`BasicTable.astro`)
  - `blog/` - Blog listing components (`PostCards.astro`)
  - `contact/` - Contact sections (`ContactInfoCards.astro`)
  - `brand/` - Brand/logo sections (`Marquee.astro`)
  - `head/` - Document head components (`Header.astro`, `partials/Seo.astro`)
  - `onboarding/` - Onboarding steps (`Steps.astro`)
  - `basic/` - Generic sticky sidebar blocks

**`src/components/ui/`:**
- Purpose: Atomic UI primitives and base components
- Contains: Button, Link, Tag, layout grid (Section, Row, Col), navigation, footer
- Key files: `Button.astro`, `Section.astro`, `Row.astro`, `Col.astro`, `NavigationBar.astro`, `Footer.astro`, `Header.astro`
- Subdirectories:
  - `cards/` - Card component variants (`Card.astro`, `PricingCard.astro`, `BlogCard.astro`, etc.)
  - `cards/partials/` - Card sub-components (`CardContainer.astro`, `CardHeader.astro`, `CardBody.astro`, `CardFooter.astro`)

**`src/components/scripts/`:**
- Purpose: Client-side JavaScript and analytics
- Contains: Theme scripts, analytics integrations
- Key files: `ThemeScripts.astro` (main scripts), `googleAnalytics.astro`, `googleTagManagerHead.astro`, `googleTagManagerBody.astro`, `googleSearchConsole.astro`

**`src/config/`:**
- Purpose: TypeScript configuration and data loaders
- Contains: Site config, navigation config with type definitions
- Key files: `config.ts` (site settings), `navigationBar.ts` (nav loader), `footerNavigation.ts` (footer loader), `socialLinks.ts`, `analytics.ts`

**`src/data/json-files/`:**
- Purpose: Static JSON data for components
- Contains: Navigation, footer, features, pricing, onboarding data
- Key files: `navigationBarData.json`, `footerNavigationData.json`, `featuresData.json`, `pricing.json`, `onboardingData.json`

**`src/content/blog/`:**
- Purpose: Markdown blog posts (Astro content collection)
- Contains: `.md` files with frontmatter (title, pubDate, author, description, image)
- Key files: `customer-feedback.md`, `hidden-habits.md`, `overlooked-challenges.md`, `blending-human-creativity.md`, `designing-dashboards.md`

**`src/icons/`:**
- Purpose: SVG icon library for astro-icon
- Contains: Individual `.svg` files (Heroicons-style)
- Pattern: Icon name matches filename (e.g., `check-circle.svg` used as `<Icon name="check-circle" />`)

**`src/styles/`:**
- Purpose: Global CSS and Tailwind configuration
- Contains: Base styles, typography, animations, custom utilities
- Key files: `global.css` (main stylesheet with @theme customizations)

**`src/assets/`:**
- Purpose: Images processed by Astro's image optimization
- Contains: Feature images, hero screenshots, logos, step illustrations
- Subdirectories: `features/masonry/`, `hero/`, `logos/`, `steps/`

**`public/`:**
- Purpose: Static assets served without processing
- Contains: Fonts, background patterns, favicon, OG images
- Key subdirectories: `fonts/`, `bgs/`, `assets/`, `collections/blog/`

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: Home page
- `src/pages/blog/[...id].astro`: Individual blog post
- `src/pages/blog/[...page].astro`: Blog listing with pagination
- `astro.config.mjs`: Build configuration

**Configuration:**
- `src/config/config.ts`: Site title, description, logo, mode settings
- `src/config/navigationBar.ts`: Navigation structure types and loader
- `src/config/footerNavigation.ts`: Footer links types and loader
- `src/content.config.ts`: Blog content collection schema

**Core Logic:**
- `src/layouts/Layout.astro`: Main page layout with navigation, footer, scripts
- `src/components/scripts/ThemeScripts.astro`: Theme switching, scroll animations, parallax, pricing toggle
- `src/styles/global.css`: Tailwind theme, typography, animations

**Testing:**
- No test files detected

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `NavigationBar.astro`, `BlogCard.astro`)
- Pages: kebab-case or index (e.g., `index.astro`, `pricing.astro`)
- JSON data: camelCase (e.g., `navigationBarData.json`)
- Config: camelCase (e.g., `config.ts`, `footerNavigation.ts`)
- Icons: kebab-case (e.g., `check-circle.svg`, `arrow-right.svg`)

**Directories:**
- Lowercase, hyphenated for multi-word (e.g., `json-files/`)
- Category-based grouping (e.g., `blocks/hero/`, `blocks/features/`)

**Component Props:**
- camelCase (e.g., `buttonText`, `buttonLink`, `spacerTop`)
- Boolean props use positive naming (e.g., `fullWidth`, `stickyCol`)

**CSS Classes:**
- BEM-like with double underscore and double hyphen (e.g., `header__menu`, `button--primary`)
- Tailwind utility classes for styling

## Where to Add New Code

**New Page:**
- Create file in `src/pages/` (filename becomes route)
- Import `Layout` from `../layouts/Layout.astro`
- Compose with blocks from `src/components/blocks/`
- Example: `src/pages/about.astro` creates `/about/` route

**New Block Component:**
- Create in `src/components/blocks/{category}/`
- Follow existing pattern: Section > Row > Col structure
- Import UI components from `../../ui/`
- Add to relevant page

**New UI Component:**
- Create in `src/components/ui/`
- For cards: `src/components/ui/cards/`
- Define Props type with TypeScript
- Use `@reference '../../styles/global.css'` for Tailwind in scoped styles

**New Blog Post:**
- Create `.md` file in `src/content/blog/`
- Include required frontmatter: `title`, `pubDate`, `author`, `description`
- Optional: `image`, `thumbnail`
- Filename becomes post slug

**New Icon:**
- Add `.svg` file to `src/icons/`
- Use with `<Icon name="filename-without-extension" />`

**New Data:**
- JSON data: Add to `src/data/json-files/`
- Create loader function in `src/config/` with TypeScript types
- Import and use in components

**New Styles:**
- Global: Add to `src/styles/global.css`
- Component-scoped: Use `<style>` block in `.astro` file
- Always reference global.css: `@reference '../../styles/global.css';`

## Special Directories

**`public/`:**
- Purpose: Static assets served at root URL
- Generated: No
- Committed: Yes
- Note: Files here bypass Astro processing; use for fonts, favicons, OG images

**`.netlify/`:**
- Purpose: Netlify deployment config
- Generated: Partially (v1 folder)
- Committed: Yes (config only)

**`node_modules/`:**
- Purpose: Dependencies
- Generated: Yes (npm install)
- Committed: No (in .gitignore)

**`dist/`:**
- Purpose: Build output
- Generated: Yes (astro build)
- Committed: No (in .gitignore)

**`.astro/`:**
- Purpose: Astro generated types
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-01-22*
