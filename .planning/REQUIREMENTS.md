# Requirements: PromptMarketing Website

**Defined:** 2026-01-22
**Core Value:** The site must function as proof-of-concept for Relevance Engineering, it should look like it was built to be understood by AI, with perfect Schema.org implementation and machine-readable architecture.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Branding & Visual Identity

- [x] **BRAND-01**: Replace all "Mizu Light" text with "PromptMarketing" across site
- [x] **BRAND-02**: Update color palette to forest green primary, lighter forest green secondary, gold accent
- [x] **BRAND-03**: Replace fonts with tight serif for H1/headings, modern rounded sans-serif for body
- [x] **BRAND-04**: Update logo and favicon with PromptMarketing mark
- [x] **BRAND-05**: Remove all Oxygenna/template promotional content and links

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

- [ ] **CMS-01**: Integrate Sanity headless CMS for blog content
- [ ] **CMS-02**: Configure Sanity schema for blog posts (title, author, date, content, image)
- [ ] **CMS-03**: Connect Astro to Sanity for dynamic blog rendering
- [ ] **CMS-04**: Enable client self-service blog management

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

(None ,  all requirements included in v1)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Custom animations | Keep existing template animations, avoid scope creep |
| Multi-language support | English only for v1 |
| E-commerce functionality | Lead-gen site only, not transactional |
| Custom dashboard/login areas | Static marketing site |
| PromptWatch API integration | Future enhancement, not v1 |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

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
| CMS-01 | 5 | Pending |
| CMS-02 | 5 | Pending |
| CMS-03 | 5 | Pending |
| CMS-04 | 5 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17 ✓
- Unmapped: 0

---
*Requirements defined: 2026-01-22*
*Last updated: 2026-02-09 after Phase 4 completion*
