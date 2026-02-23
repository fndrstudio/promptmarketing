# Requirements Archive: v1 Initial Release

**Archived:** 2026-02-23
**Status:** SHIPPED

This is the archived requirements specification for v1.
For current requirements, see `.planning/REQUIREMENTS.md` (created for next milestone).

---

**Defined:** 2026-01-22
**Core Value:** The site must function as proof-of-concept for Relevance Engineering, it should look like it was built to be understood by AI, with perfect Schema.org implementation and machine-readable architecture.

## v1 Requirements

### Branding & Visual Identity

- [x] **BRAND-01**: Establish PromptMarketing brand identity across site
- [x] **BRAND-02**: Update color palette to forest green primary, lighter forest green secondary, gold accent
- [x] **BRAND-03**: Replace fonts with tight serif for H1/headings, modern rounded sans-serif for body
- [x] **BRAND-04**: Update logo and favicon with PromptMarketing mark
- [x] **BRAND-05**: Clean promotional content and links

### Content & Pages

- [x] **CONTENT-01**: Update site config (title, description, URLs) in `src/config/config.ts`
- [x] **CONTENT-02**: Restructure navigation around three pillars: Prompt Intelligence, Relevance Engineering, Agentic Commerce
- [x] **CONTENT-03**: Rewrite homepage with "Scientific Forest" messaging and "Priming vs Proving" framework
- [x] **CONTENT-04**: Update all page copy to reflect PromptMarketing voice (scientific, radically honest, Dutch pragmatism)
- [x] **CONTENT-05**: Create/update About page showing Amsterdam Clubhouse and "Gang of Super Specialists"

### Technical SEO & Machine Readability

- [x] **SEO-01**: Add llms.txt file at root for AI agent discoverability
- [x] **SEO-02**: Implement comprehensive Schema.org markup (Organization, Service, Article)
- [x] **SEO-03**: Update canonical URLs and site configuration for production domain

### CMS Integration

- [x] **CMS-01**: Integrate Sanity headless CMS for blog content
- [x] **CMS-02**: Configure Sanity schema for blog posts (title, author, date, content, image)
- [x] **CMS-03**: Connect Astro to Sanity for dynamic blog rendering
- [x] **CMS-04**: Enable client self-service blog management

## Out of Scope

| Feature | Reason |
|---------|--------|
| Custom animations | Keep existing template animations, avoid scope creep |
| Multi-language support | English only for v1 |
| E-commerce functionality | Lead-gen site only, not transactional |
| Custom dashboard/login areas | Static marketing site |
| PromptWatch API integration | Future enhancement, not v1 |

## Traceability

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
| CONTENT-04 | 3 | Complete |
| CONTENT-05 | 3 | Complete |
| SEO-01 | 4 | Complete |
| SEO-02 | 4 | Complete |
| SEO-03 | 4 | Complete |
| CMS-01 | 5 | Complete |
| CMS-02 | 5 | Complete |
| CMS-03 | 5 | Complete |
| CMS-04 | 5 | Complete |

**Coverage:**
- v1 requirements: 17 total
- Shipped: 17 (100%)
- Adjusted: 0
- Dropped: 0

---

## Milestone Summary

**Shipped:** 17 of 17 v1 requirements
**Adjusted:** None — all requirements shipped as originally defined
**Dropped:** None

---
*Archived: 2026-02-23 as part of v1 milestone completion*
