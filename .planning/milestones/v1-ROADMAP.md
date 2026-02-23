# Milestone v1: Initial Release

**Status:** SHIPPED 2026-02-23
**Phases:** 1-5
**Total Plans:** 15

## Overview

Build the PromptMarketing brand website with "Scientific Forest" aesthetic, comprehensive Schema.org markup, and Sanity CMS integration for blog management.

## Phases

### Phase 1: Foundation & Branding

**Goal:** Establish PromptMarketing visual identity and remove all template branding
**Depends on:** None
**Plans:** 3 plans
**Completed:** 2026-01-22

Requirements: BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, CONTENT-01

Plans:
- [x] 01-01: Site config and color palette
- [x] 01-02: Typography and fonts
- [x] 01-03: Logo, favicon, and cleanup

Deliverables:
- Updated `src/styles/global.css` with forest green OKLCH color palette
- Playfair Display (headings) and Nunito (body) fonts in `public/fonts/`
- Updated `src/config/config.ts` with PromptMarketing config
- Updated `astro.config.mjs` with production URL
- Logo/favicon assets replaced

---

### Phase 2: Navigation & Homepage

**Goal:** Restructure site navigation and create compelling homepage with "Priming vs Proving" framework
**Depends on:** Phase 1
**Plans:** 2 plans
**Completed:** 2026-01-22

Requirements: CONTENT-02, CONTENT-03

Plans:
- [x] 02-01: Navigation restructure (About Us, How We Work, Portfolio, Blog)
- [x] 02-02: Homepage content rewrite with Scientific Forest messaging

Deliverables:
- Updated `src/data/json-files/navigationBarData.json`
- Updated `src/data/json-files/footerNavigationData.json`
- Rewritten `src/pages/index.astro` with hero, features, onboarding, and CTA

---

### Phase 3: Content & Pages

**Goal:** Update all page copy and create About page reflecting PromptMarketing voice
**Depends on:** Phase 2
**Plans:** 4 plans
**Completed:** 2026-01-23

Requirements: CONTENT-04, CONTENT-05

Plans:
- [x] 03-01: Convert Features to How We Work with 4-pillar structure
- [x] 03-02: Create About page with Amsterdam Clubhouse and team sections
- [x] 03-03: Create Portfolio page with case studies collection
- [x] 03-04: Homepage 4-pillar update and footer cleanup

Deliverables:
- How We Work page with 4 service pillars
- About page with team/culture content
- Portfolio page with content collection pattern
- Updated homepage and footer

---

### Phase 4: Technical SEO & Machine Readability

**Goal:** Implement llms.txt and comprehensive Schema.org markup as proof-of-concept for Relevance Engineering
**Depends on:** Phase 1
**Plans:** 3 plans
**Completed:** 2026-02-09

Requirements: SEO-01, SEO-02, SEO-03

Plans:
- [x] 04-01: Production domain config fixes and llms.txt creation
- [x] 04-02: Schema.org component library (Organization, WebSite, Service, BlogPosting)
- [x] 04-03: Schema integration into all pages

Deliverables:
- `public/llms.txt` with AI-readable site summary
- Schema.org Organization + WebSite markup in Layout
- Schema.org Service markup on How We Work page (4 pillars)
- Schema.org BlogPosting markup on blog posts
- Entity linking via @id pattern

---

### Phase 5: Sanity CMS Integration

**Goal:** Enable client self-service blog management through Sanity headless CMS
**Depends on:** Phase 4
**Plans:** 3 plans
**Completed:** 2026-02-23

Requirements: CMS-01, CMS-02, CMS-03, CMS-04

Plans:
- [x] 05-01: Sanity foundation (packages, config, schema, client utilities)
- [x] 05-02: Astro blog integration (rewrite pages, Portable Text, cleanup markdown)
- [x] 05-03: Studio deployment, sample content, webhook pipeline

Deliverables:
- Sanity project configuration (pbui2f8s)
- Blog post schema with Portable Text content
- Blog pages fetching from Sanity via GROQ
- PortableTextRenderer component
- Sanity Studio deployed at promptmarketing-blog.sanity.studio
- Vercel deploy hook + Sanity webhook for automatic rebuilds
- 5 sample blog posts seeded

---

## Milestone Summary

**Key Decisions:**
- Gold accent instead of Electric Lime (premium/authoritative feel)
- Sanity CMS for blog only (static pages in code)
- Dark mode as primary ("Scientific Forest" aesthetic)
- Consultancy navigation: About Us, How We Work, Portfolio, Blog
- Four-pillar service structure: Intelligence, Optimization, Commerce, Advertising
- Production domain: promptmarketing.com (not .ai)
- Organization schema type (not deprecated ProfessionalService)
- Entity linking via @id for cross-schema references
- Simple author string in blog schema (not Sanity reference)
- scheduledPublishing removed (not available in sanity v5.11.0)
- Studio hostname: promptmarketing-blog (promptmarketing was taken)

**Issues Resolved:**
- Duplicate canonical tag bug in Seo.astro
- scheduledPublishing subpath not available in sanity v5.11.0
- SANITY_API_TOKEN insufficient permissions (used MCP tools instead)
- BlogPostingSchema image URL handling for absolute Sanity CDN URLs

**Issues Deferred:**
- scheduledPublishing plugin (requires sanity package update or alternative approach)

**Technical Debt Incurred:**
- No scheduled publishing capability in Sanity Studio (basic publish works)
- React installed as peer dependency for Sanity but not added to Astro integrations

---

_For current project status, see .planning/ROADMAP.md_
