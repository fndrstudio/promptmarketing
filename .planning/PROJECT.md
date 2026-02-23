# PromptMarketing Website

## What This Is

A marketing website for PromptMarketing, an executing consultancy that helps brands become machine-readable and trusted by AI systems through "Relevance Engineering" (GEO). Built on Astro with a "Scientific Forest" aesthetic, dark forest green palette with gold accents, tight serif headlines, modern sans-serif body text, comprehensive Schema.org structured data, and Sanity CMS-powered blog.

## Core Value

**The site must function as proof-of-concept for Relevance Engineering**, it should look like it was built to be understood by AI, with perfect Schema.org implementation and machine-readable architecture.

## Requirements

### Validated

- ✓ Astro 5 static site with 100/100 PageSpeed — existing
- ✓ Responsive design (mobile, tablet, desktop) — existing
- ✓ Light/dark mode support — existing
- ✓ SEO component with meta tags and Open Graph — existing
- ✓ Modular block-based page composition — existing
- ✓ Google Analytics integration ready — existing
- ✓ Sitemap generation — existing
- ✓ Forest green color palette with gold accents — v1
- ✓ Playfair Display (headings) + Nunito (body) typography — v1
- ✓ PromptMarketing logo and favicon — v1
- ✓ Template promotional content removed — v1
- ✓ Site config updated (title, description, URLs) — v1
- ✓ Consultancy navigation (About Us, How We Work, Portfolio, Blog) — v1
- ✓ Homepage with "Scientific Forest" messaging and "Priming vs Proving" framework — v1
- ✓ All page copy in PromptMarketing voice — v1
- ✓ About page with Amsterdam Clubhouse and team sections — v1
- ✓ llms.txt for AI agent discoverability — v1
- ✓ Schema.org markup (Organization, WebSite, Service, BlogPosting) — v1
- ✓ Canonical URLs for production domain — v1
- ✓ Sanity CMS for blog content — v1
- ✓ Blog post schema with Portable Text — v1
- ✓ Astro-Sanity dynamic blog rendering — v1
- ✓ Client self-service blog management via Sanity Studio — v1

### Active

(None — next milestone not yet defined)

### Out of Scope

- Custom animations beyond existing template (Lottie, parallax) — keep what works, don't add complexity
- Multi-language support — English only for v1
- E-commerce functionality — this is a lead-gen site, not transactional
- Custom dashboard/login areas — static marketing site only
- PromptWatch API integration — future enhancement

## Context

**Current State:** v1 shipped (2026-02-23)
- ~23,000 LOC across Astro/TypeScript/CSS/JSON
- 5 blog posts in Sanity CMS
- Sanity Studio deployed at promptmarketing-blog.sanity.studio
- Auto-rebuild pipeline: Sanity webhook → Vercel deploy hook
- Production: promptmarketing.com (Vercel)

**Tech Stack:** Astro 5.16 + Tailwind CSS 4 + TypeScript + Sanity v5
- Component structure: `src/components/blocks/` (sections), `src/components/ui/` (primitives)
- Styling via `src/styles/global.css` with Tailwind @theme customization
- Fonts: Playfair Display (headings), Nunito (body) in `public/fonts/`
- CMS: Sanity project pbui2f8s, dataset production
- Blog: Sanity → GROQ → Astro pages with PortableText rendering

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

- **Tech Stack**: Astro + Tailwind + TypeScript + Sanity CMS
- **Performance**: Must maintain 100/100 PageSpeed scores
- **Deployment**: Vercel (web), Sanity (CMS studio)
- **Content**: Client manages blog via Sanity Studio; static pages managed in code

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Gold accent instead of Electric Lime | More premium/authoritative feel aligned with "expensive, engineered" positioning | ✓ Good |
| Sanity CMS for blog only | Client needs self-service for blog; static pages don't change frequently | ✓ Good |
| Keep existing template animations | Avoid scope creep; template animations work well | ✓ Good |
| Dark mode as primary | "Scientific Forest" aesthetic requires dark base | ✓ Good |
| Consultancy nav structure | About Us, How We Work, Portfolio, Blog (no dropdowns) | ✓ Good |
| Four-pillar service structure | Intelligence/Optimization/Commerce/Advertising | ✓ Good |
| Production domain promptmarketing.com | Not .ai — simpler, more professional | ✓ Good |
| Organization schema (not ProfessionalService) | ProfessionalService deprecated in Schema.org | ✓ Good |
| Entity linking via @id | Cross-schema references between Organization, WebSite, Service | ✓ Good |
| Simple author string in blog schema | No Sanity reference type needed for small team | ✓ Good |
| Vercel deploy hook + Sanity webhook | Automatic rebuilds on content publish without manual intervention | ✓ Good |
| scheduledPublishing removed | Not available in sanity v5.11.0 — basic publish works | ⚠️ Revisit |

---
*Last updated: 2026-02-23 after v1 milestone*
