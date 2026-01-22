# Roadmap: PromptMarketing Website v1

**Created:** 2026-01-22
**Milestone:** v1 - Initial Release
**Total Phases:** 5
**Requirements Coverage:** 17/17 (100%)

## Overview

Transform the Mizu Light Astro template into the PromptMarketing brand website with "Scientific Forest" aesthetic, comprehensive Schema.org markup, and Sanity CMS integration for blog management.

## Phases

### Phase 1: Foundation & Branding ✓
**Status:** Complete (2026-01-22)
**Goal:** Establish PromptMarketing visual identity and remove all template branding
**Requirements:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, CONTENT-01

| ID | Requirement | Success Criteria |
|----|-------------|------------------|
| BRAND-01 | Replace all "Mizu Light" text with "PromptMarketing" | Zero occurrences of "Mizu Light", "Oxygenna", or template branding in codebase |
| BRAND-02 | Update color palette to forest green primary, lighter forest green secondary, gold accent | Tailwind @theme updated with new OKLCH colors; all pages render correctly |
| BRAND-03 | Replace fonts with tight serif for H1/headings, modern rounded sans-serif for body | New fonts installed in public/fonts/; global.css updated; typography renders correctly |
| BRAND-04 | Update logo and favicon with PromptMarketing mark | Logo SVG files updated; favicon configured; renders in nav and browser tab |
| BRAND-05 | Remove all Oxygenna/template promotional content and links | No template promotional links, credits, or branding remain |
| CONTENT-01 | Update site config (title, description, URLs) | config.ts and astro.config.mjs updated with PromptMarketing details |

**Deliverables:**
- Updated `src/styles/global.css` with new color palette
- New font files in `public/fonts/`
- Updated `src/config/config.ts` with PromptMarketing config
- Updated `astro.config.mjs` with production URL
- Logo/favicon assets replaced

---

### Phase 2: Navigation & Homepage ✓
**Status:** Complete (2026-01-22)
**Goal:** Restructure site navigation and create compelling homepage with "Priming vs Proving" framework
**Requirements:** CONTENT-02, CONTENT-03

| ID | Requirement | Success Criteria |
|----|-------------|------------------|
| CONTENT-02 | Restructure navigation: About Us, How We Work, Portfolio, Blog + Get Started CTA | navigationBarData.json updated; navigation renders new structure; mobile menu works |
| CONTENT-03 | Rewrite homepage with "Scientific Forest" messaging and "Priming vs Proving" framework | index.astro hero, features, and CTA sections updated; messaging aligns with brief |

**Deliverables:**
- Updated `src/data/json-files/navigationBarData.json`
- Updated `src/data/json-files/footerNavigationData.json`
- Rewritten `src/pages/index.astro` content
- Updated hero, features, and CTA block content

---

### Phase 3: Content & Pages
**Goal:** Update all page copy and create About page reflecting PromptMarketing voice
**Requirements:** CONTENT-04, CONTENT-05

| ID | Requirement | Success Criteria |
|----|-------------|------------------|
| CONTENT-04 | Update all page copy to reflect PromptMarketing voice (scientific, radically honest, Dutch pragmatism) | All static pages updated with new copy; consistent voice across site |
| CONTENT-05 | Create/update About page showing Amsterdam Clubhouse and "Gang of Super Specialists" | About page exists with team/culture content; aligns with manifesto |

**Deliverables:**
- Updated `src/pages/pricing.astro` content
- Updated `src/pages/features.astro` content
- Updated `src/pages/contact.astro` content
- New/updated `src/pages/about.astro`
- Updated FAQ content in components
- Updated CTA blocks across site

---

### Phase 4: Technical SEO & Machine Readability
**Goal:** Implement llms.txt and comprehensive Schema.org markup as proof-of-concept for Relevance Engineering
**Requirements:** SEO-01, SEO-02, SEO-03

| ID | Requirement | Success Criteria |
|----|-------------|------------------|
| SEO-01 | Add llms.txt file at root for AI agent discoverability | llms.txt exists at /llms.txt; accessible in production build |
| SEO-02 | Implement comprehensive Schema.org markup (Organization, Service, Article) | JSON-LD scripts in head; validates in Schema.org validator; covers all page types |
| SEO-03 | Update canonical URLs and site configuration for production domain | All canonical URLs point to production domain; sitemap generates correctly |

**Deliverables:**
- `public/llms.txt` with AI-readable site summary
- Schema.org Organization markup in Layout
- Schema.org Service markup on service pages
- Schema.org Article markup on blog posts
- Updated canonical URL configuration

---

### Phase 5: Sanity CMS Integration
**Goal:** Enable client self-service blog management through Sanity headless CMS
**Requirements:** CMS-01, CMS-02, CMS-03, CMS-04

| ID | Requirement | Success Criteria |
|----|-------------|------------------|
| CMS-01 | Integrate Sanity headless CMS for blog content | Sanity packages installed; sanity.config.ts created; studio accessible |
| CMS-02 | Configure Sanity schema for blog posts (title, author, date, content, image) | Blog post schema defined; fields match existing frontmatter structure |
| CMS-03 | Connect Astro to Sanity for dynamic blog rendering | Blog pages fetch from Sanity; posts render correctly; build succeeds |
| CMS-04 | Enable client self-service blog management | Sanity Studio deployed; client can create/edit/publish posts |

**Deliverables:**
- Sanity project configuration
- Blog post schema in Sanity
- Updated blog page components to fetch from Sanity
- GROQ queries for blog content
- Sanity Studio deployment configuration

---

## Requirement Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01 | 1 | Complete |
| BRAND-02 | 1 | Complete |
| BRAND-03 | 1 | Complete |
| BRAND-04 | 1 | Complete |
| BRAND-05 | 1 | Complete |
| CONTENT-01 | 1 | Complete |
| CONTENT-02 | 2 | Complete |
| CONTENT-03 | 2 | Complete |
| CONTENT-04 | 3 | Pending |
| CONTENT-05 | 3 | Pending |
| SEO-01 | 4 | Pending |
| SEO-02 | 4 | Pending |
| SEO-03 | 4 | Pending |
| CMS-01 | 5 | Pending |
| CMS-02 | 5 | Pending |
| CMS-03 | 5 | Pending |
| CMS-04 | 5 | Pending |

**Coverage Summary:**
- Phase 1: 6 requirements (Foundation)
- Phase 2: 2 requirements (Navigation/Homepage)
- Phase 3: 2 requirements (Content/Pages)
- Phase 4: 3 requirements (SEO)
- Phase 5: 4 requirements (CMS)
- **Total: 17/17 requirements covered (100%)**

---

## Dependencies

```
Phase 1 (Foundation) ──┬──> Phase 2 (Navigation/Homepage)
                       │
                       └──> Phase 4 (SEO) ──> Phase 5 (CMS)

Phase 2 ──> Phase 3 (Content/Pages)
```

- Phase 1 must complete first (colors, fonts, config needed by all other phases)
- Phase 2 and Phase 4 can run in parallel after Phase 1
- Phase 3 depends on Phase 2 (navigation structure informs page content)
- Phase 5 depends on Phase 4 (SEO patterns inform CMS schema)

---

*Roadmap created: 2026-01-22*
*Last updated: 2026-01-22 (Phase 2 complete)*
