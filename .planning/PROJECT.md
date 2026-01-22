# PromptMarketing Website

## What This Is

A marketing website for PromptMarketing, an executing consultancy that helps brands become machine-readable and trusted by AI systems through "Relevance Engineering" (GEO). Built on an Astro template, customized with a "Scientific Forest" aesthetic—dark forest green palette with gold accents, tight serif headlines, and modern sans-serif body text.

## Core Value

**The site must function as proof-of-concept for Relevance Engineering**—it should look like it was built to be understood by AI, with perfect Schema.org implementation and machine-readable architecture.

## Requirements

### Validated

<!-- Existing capabilities from the Mizu Light template -->

- ✓ Astro 5 static site with 100/100 PageSpeed — existing
- ✓ Responsive design (mobile, tablet, desktop) — existing
- ✓ Light/dark mode support — existing
- ✓ SEO component with meta tags and Open Graph — existing
- ✓ Blog with Markdown content collections — existing
- ✓ Modular block-based page composition — existing
- ✓ Google Analytics integration ready — existing
- ✓ Sitemap generation — existing
- ✓ Netlify deployment configured — existing

### Active

<!-- Current scope: Transform template into PromptMarketing brand -->

**Branding & Visual Identity**
- [ ] Replace all "Mizu Light" branding with PromptMarketing
- [ ] Update color palette: forest green primary, lighter forest green secondary, gold accent
- [ ] Replace fonts: tight chic serif for H1/headings, modern rounded sans-serif for body
- [ ] Update logo and favicon with PromptMarketing mark
- [ ] Remove all template promotional content and links

**Content & Pages**
- [ ] Update site config (title, description, URLs) in `src/config/config.ts`
- [ ] Restructure navigation around three pillars: Prompt Intelligence, Relevance Engineering, Agentic Commerce
- [ ] Rewrite homepage with "Scientific Forest" messaging and "Priming vs Proving" framework
- [ ] Update all page copy to reflect PromptMarketing voice (scientific, radically honest, Dutch pragmatism)
- [ ] Create/update About page showing Amsterdam Clubhouse and "Gang of Super Specialists"

**Technical SEO & Machine Readability**
- [ ] Add llms.txt file at root for AI agent discoverability
- [ ] Implement comprehensive Schema.org markup (Organization, Service, Article)
- [ ] Update canonical URLs and site configuration for production domain

**CMS Integration**
- [ ] Integrate Sanity headless CMS for blog content
- [ ] Configure Sanity schema for blog posts (title, author, date, content, image)
- [ ] Connect Astro to Sanity for dynamic blog rendering
- [ ] Enable client self-service blog management

### Out of Scope

- Custom animations beyond existing template (Lottie, parallax) — keep what works, don't add complexity
- Multi-language support — English only for v1
- E-commerce functionality — this is a lead-gen site, not transactional
- Custom dashboard/login areas — static marketing site only
- PromptWatch API integration — future enhancement, not v1

## Context

**Template Base:** Mizu Light Astro Theme by Oxygenna
- Astro 5.16 + Tailwind CSS 4 + TypeScript
- Component structure: `src/components/blocks/` (sections), `src/components/ui/` (primitives)
- Styling via `src/styles/global.css` with Tailwind @theme customization
- Fonts in `public/fonts/`, currently Clash-Display and Clash-Grotesk

**Design Direction:** "The Scientific Forest"
- Dark, technical, expensive-feeling aesthetic
- Serif typography for strategic narrative (authority)
- Sans-serif for technical content (precision)
- No "SaaS blue" — differentiated positioning

**Client:** PromptMarketing
- Amsterdam-based "Clubhouse" office
- "Gang of Super Specialists" culture
- Three service pillars: Prompt Intelligence → Relevance Engineering → Agentic Commerce
- Voice: Engineers not gurus, data over opinion, radically honest

**Reference Documents:**
- `.planning/codebase/Website Brief_ The PromptMarketing Operating System.md`
- `.planning/codebase/PROMPTMARKETING CULTURE MANIFESTO.md`
- `.planning/codebase/Creative Brief_ The PromptMarketing Framework.md`

## Constraints

- **Tech Stack**: Astro + Tailwind + TypeScript (existing), add Sanity CMS
- **Performance**: Must maintain 100/100 PageSpeed scores
- **Deployment**: Netlify (already configured)
- **Timeline**: MVP customization before extensive feature work
- **Content**: Client will manage blog via Sanity; static pages managed in code

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Gold accent instead of Electric Lime | More premium/authoritative feel aligned with "expensive, engineered" positioning | — Pending |
| Sanity CMS for blog only | Client needs self-service for blog; static pages don't change frequently | — Pending |
| Keep existing template animations | Avoid scope creep; template animations work well | — Pending |
| Dark mode as primary | "Scientific Forest" aesthetic requires dark base | — Pending |

---
*Last updated: 2026-01-22 after initialization*
