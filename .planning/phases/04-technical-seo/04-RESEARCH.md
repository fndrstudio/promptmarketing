# Phase 4: Technical SEO & Machine Readability - Research

**Researched:** 2026-02-09
**Domain:** llms.txt specification, Schema.org structured data, Astro SEO implementation
**Confidence:** HIGH

## Summary

This phase implements three technical SEO requirements: llms.txt for AI agent discoverability, comprehensive Schema.org markup (Organization, Service, Article), and production domain configuration. The research covers the llms.txt specification, Schema.org best practices for consulting services, and Astro-specific implementation patterns.

The standard approach is:
1. Create a static `llms.txt` file in `public/` following the official specification
2. Use `astro-seo-schema` package with TypeScript support for JSON-LD generation
3. Update `astro.config.mjs` site configuration for production domain

**Primary recommendation:** Implement Schema.org via a dedicated component architecture (separate components per schema type) using `astro-seo-schema` for type-safe JSON-LD generation, with llms.txt as a hand-crafted Markdown file in `public/`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Domain: promptmarketing.com
- All canonical URLs point to https://promptmarketing.com
- Sitemap generates with production URLs
- Organization founding year: 2026
- Location: Amsterdam, Netherlands
- Social profiles: LinkedIn only (company page URL TBD)
- Organization type: ProfessionalService or ConsultingAgency

### Claude's Discretion
- **llms.txt content**: Tone, structure, what services/capabilities to emphasize. Should reflect "Scientific Forest" voice - precise, technical, no guru language
- **llms.txt format**: Follow llms.txt specification, include navigation guidance for AI agents
- **Service schema**: How to structure the 4 pillars (Prompt Intelligence, Relevance Engineering, Agentic Commerce, AI Advertising) as Service types
- **Article schema**: Author info, dates, categories for blog posts - follow standard patterns
- **Schema.org coverage**: Which schemas on which pages, level of detail
- **Technical implementation**: JSON-LD placement, validation approach

### Deferred Ideas (OUT OF SCOPE)
None - discussion stayed within phase scope
</user_constraints>

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro-seo-schema | 5.1.0 | Type-safe JSON-LD generation | Official Astro integration, TypeScript support via schema-dts |
| schema-dts | latest | TypeScript definitions for Schema.org | Powers astro-seo-schema type checking |
| @astrojs/sitemap | (already installed) | Sitemap generation | Uses site config for production URLs |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Rich Results Test | n/a | Schema validation | Pre-deployment validation |
| Schema.org Validator | n/a | Full Schema.org validation | Development testing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| astro-seo-schema | Manual JSON.stringify | Less type safety, more boilerplate |
| Dedicated components | Inline in Layout | Harder to maintain, less reusable |

**Installation:**
```bash
npm install schema-dts astro-seo-schema
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── seo/                     # NEW: Schema.org components
│       ├── OrganizationSchema.astro
│       ├── WebSiteSchema.astro
│       ├── ServiceSchema.astro
│       ├── ArticleSchema.astro
│       └── BreadcrumbSchema.astro
├── config/
│   └── config.ts                # Update with organization data
public/
├── llms.txt                     # NEW: AI agent discoverability file
└── robots.txt                   # NEW: AI crawler directives (optional)
```

### Pattern 1: Component-Based Schema Architecture
**What:** Separate Astro components for each Schema.org type
**When to use:** Always - provides clean separation, reusability, and type safety
**Example:**
```astro
---
// src/components/seo/OrganizationSchema.astro
import { Schema } from 'astro-seo-schema';
import { configData } from '../../config/config';

const siteUrl = 'https://promptmarketing.com';
---

<Schema
  item={{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PromptMarketing',
    url: siteUrl,
    logo: `${siteUrl}/pm-logo-dark.png`,
    foundingDate: '2026',
    description: configData.siteDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressCountry: 'Netherlands'
    },
    sameAs: [
      // LinkedIn URL when available
    ]
  }}
/>
```

### Pattern 2: Layout Slot Injection
**What:** Use named slots in Layout.astro for schema injection
**When to use:** For page-specific schemas that need frontmatter data
**Example:**
```astro
<!-- In Layout.astro <head> -->
<slot name="structured-data" />

<!-- In page component -->
<Layout>
  <ArticleSchema slot="structured-data" {...frontmatter} />
</Layout>
```

### Pattern 3: Global vs Page-Specific Schemas
**What:** Organization/WebSite schemas on homepage only; Article schemas on blog posts
**When to use:** Follow Google's guidance - organization markup on homepage/about, not every page
**Example placement:**
- Homepage (`index.astro`): Organization, WebSite
- About page: Organization (can duplicate)
- Blog posts: Article/BlogPosting
- Service pages: Service schemas
- All pages: BreadcrumbList (optional)

### Anti-Patterns to Avoid
- **Duplicate canonical tags:** Current Seo.astro has two `<link rel="canonical">` tags (lines 37-38) - must fix
- **Organization schema on every page:** Google recommends homepage/about only
- **Missing publisher on Article:** Google requires publisher with logo for Article schemas
- **Hardcoded URLs:** Use site config variable, not string literals

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD escaping | Manual JSON.stringify | astro-seo-schema | Handles escaping, type checking |
| Schema type definitions | Custom TypeScript types | schema-dts | Complete Schema.org types |
| Sitemap URL generation | Custom script | @astrojs/sitemap | Already installed, uses site config |
| Schema validation | Manual testing | Rich Results Test | Official Google tool |

**Key insight:** Schema.org has hundreds of types and properties. Using `schema-dts` provides TypeScript autocompletion and catches errors at build time rather than after deployment.

## Common Pitfalls

### Pitfall 1: Incorrect Organization Type Selection
**What goes wrong:** Using deprecated `ProfessionalService` or non-existent `ConsultingAgency`
**Why it happens:** `ProfessionalService` was deprecated; `ConsultingAgency` doesn't exist in Schema.org
**How to avoid:** Use `Organization` as the base type. The `@type` can be an array: `["Organization", "LocalBusiness"]` if needed
**Warning signs:** Schema validator warnings about unknown types

### Pitfall 2: Missing Site Config for Canonical URLs
**What goes wrong:** Canonical URLs use localhost or wrong domain
**Why it happens:** Astro uses `site` in astro.config.mjs for URL generation; currently set to `https://promptmarketing.ai/`
**How to avoid:** Update astro.config.mjs `site` to `https://promptmarketing.com`
**Warning signs:** `Astro.url` returns wrong domain in builds

### Pitfall 3: Duplicate Canonical Tags
**What goes wrong:** Multiple canonical tags confuse search engines
**Why it happens:** Current Seo.astro has unconditional canonical (line 37) AND conditional (line 38)
**How to avoid:** Remove the duplicate, keep one conditional canonical
**Warning signs:** HTML shows two `<link rel="canonical">` in head

### Pitfall 4: llms.txt Not Accessible at Root
**What goes wrong:** AI agents can't find llms.txt at `/llms.txt`
**Why it happens:** File placed wrong location or with wrong name
**How to avoid:** Place file at `public/llms.txt` - Astro serves public files at root
**Warning signs:** 404 when accessing `/llms.txt` in production

### Pitfall 5: Article Schema Without Publisher
**What goes wrong:** Google doesn't recognize article as valid for rich results
**Why it happens:** Publisher organization with logo is required for Google rich results
**How to avoid:** Always include publisher object with `@type: "Organization"`, name, and logo
**Warning signs:** Rich Results Test shows "missing field: publisher"

### Pitfall 6: Service Schema Not Connected to Organization
**What goes wrong:** Services appear orphaned, not attributed to company
**Why it happens:** Service schema missing `provider` reference to Organization
**How to avoid:** Use `provider` property linking to Organization or use `@id` references
**Warning signs:** Services don't appear connected to brand in knowledge graph

## Code Examples

Verified patterns from official sources:

### Organization Schema (for homepage)
```astro
---
// Source: Google Search Central + Schema.org
import { Schema } from 'astro-seo-schema';

const siteUrl = 'https://promptmarketing.com';
---

<Schema
  item={{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'PromptMarketing',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/pm-logo-dark.png`,
      width: '200',
      height: '60'
    },
    description: 'Operationalizing Machine Trust through Relevance Engineering',
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL'
    },
    sameAs: [
      // LinkedIn company URL when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${siteUrl}/contact`
    }
  }}
/>
```

### Service Schema (for 4 pillars)
```astro
---
// Source: Schema.org Service type
import { Schema } from 'astro-seo-schema';

interface Props {
  name: string;
  description: string;
  serviceType: string;
}

const { name, description, serviceType } = Astro.props;
const siteUrl = 'https://promptmarketing.com';
---

<Schema
  item={{
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    serviceType: serviceType,
    provider: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    }
  }}
/>
```

### Article/BlogPosting Schema (for blog posts)
```astro
---
// Source: Google Article structured data guide
import { Schema } from 'astro-seo-schema';

interface Props {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  image: string;
}

const { title, description, pubDate, author, image } = Astro.props;
const siteUrl = 'https://promptmarketing.com';
const pageUrl = Astro.url.href;
---

<Schema
  item={{
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: [
      `${siteUrl}${image}`
    ],
    datePublished: pubDate.toISOString(),
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'PromptMarketing',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/pm-logo-dark.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    }
  }}
/>
```

### WebSite Schema (for homepage)
```astro
---
// Source: Schema.org WebSite type
import { Schema } from 'astro-seo-schema';

const siteUrl = 'https://promptmarketing.com';
---

<Schema
  item={{
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'PromptMarketing',
    url: siteUrl,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`
    }
  }}
/>
```

### llms.txt Example Structure
```markdown
# PromptMarketing

> Relevance Engineering consultancy specializing in AI discoverability and machine trust. We help brands become understood, preferred, and selected by AI systems.

PromptMarketing operationalizes Machine Trust through four practice areas: Prompt Intelligence, Relevance Engineering, Agentic Commerce, and AI Advertising.

## Services

- [Prompt Intelligence](/how-we-work): Measurement and research services including Competitive Visibility, AI Selection Rate analysis, and LLM Brand Sentiment
- [Relevance Engineering](/how-we-work): Technical optimization including SXO, Entity Optimization, and Content Authority Signals
- [Agentic Commerce](/how-we-work): Preparation for AI-driven transactions including Agent Optimization and Protocol Setup
- [AI Advertising](/how-we-work): Generative Engine Advertising strategy and insights

## Company

- [About Us](/about): Our approach to Relevance Engineering
- [How We Work](/how-we-work): Our systematic four-phase process
- [Contact](/contact): Request a GEO Readiness Audit

## Content

- [Blog](/blog): Insights on AI marketing and machine trust
- [Portfolio](/portfolio): Case studies and client results

## Optional

- [Privacy Policy](/privacy): Data handling practices
- [Terms of Service](/terms): Service agreement
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Microdata/RDFa | JSON-LD | 2020+ | Google prefers JSON-LD, easier maintenance |
| ProfessionalService | Organization + Service | Deprecated | Use Organization as base type |
| robots.txt only | llms.txt + robots.txt | 2024-2025 | AI agents need additional discoverability |
| Manual sitemap | @astrojs/sitemap | n/a | Automatic generation from routes |

**Deprecated/outdated:**
- `ProfessionalService`: Deprecated in Schema.org due to confusion with Service type
- Microdata format: Still valid but JSON-LD strongly preferred
- Single canonical implementation: Use site config, not hardcoded URLs

## llms.txt Specification Details

### File Requirements (Source: llmstxt.org)
- **Location:** `/llms.txt` at domain root (place in `public/llms.txt`)
- **Format:** Markdown
- **Case sensitivity:** Filename is case-sensitive, use lowercase

### Required Structure
1. **H1 Heading** (required): Project/site name
2. **Blockquote** (optional): Brief summary
3. **Body content** (optional): Paragraphs, lists (no headings)
4. **H2 Sections** (optional): File lists with links

### Link Format
```markdown
- [Link Title](https://example.com/path): Description of the resource
```

### Optional Section
An H2 section titled "Optional" indicates resources that can be omitted for shorter context.

### Best Practices
- Use concise, clear language
- Avoid jargon without explanation
- Include descriptions with links
- Test with actual LLMs to verify effectiveness

## Schema Coverage Recommendation

| Page | Schema Types | Rationale |
|------|--------------|-----------|
| Homepage | Organization, WebSite | Google recommends org schema on homepage |
| About | Organization | Reinforces company information |
| How We Work | Service (x4 pillars) | Documents service offerings |
| Blog listing | (none needed) | Collection page, not content |
| Blog post | BlogPosting | Individual articles need Article schema |
| Portfolio listing | (none needed) | Collection page |
| Case study | Article or CaseStudy | Detailed content pieces |
| Contact | ContactPage (optional) | Minor SEO benefit |

## Open Questions

Things that couldn't be fully resolved:

1. **LinkedIn Company URL**
   - What we know: User specified LinkedIn only for sameAs
   - What's unclear: Exact URL not provided (marked TBD)
   - Recommendation: Add placeholder, update when URL available

2. **Case Study Schema Type**
   - What we know: Portfolio items are detailed case studies
   - What's unclear: Whether to use Article, BlogPosting, or custom
   - Recommendation: Use Article with appropriate category

3. **Author Entity Links**
   - What we know: Blog posts have author names in frontmatter
   - What's unclear: Whether authors have profile pages or URLs
   - Recommendation: Use Person with name only, add URLs if profiles exist

## Sources

### Primary (HIGH confidence)
- [llmstxt.org](https://llmstxt.org/) - Official llms.txt specification
- [Schema.org Organization](https://schema.org/Organization) - Organization type definition
- [Schema.org Service](https://schema.org/Service) - Service type definition
- [Google Search Central - Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) - Google's implementation guide
- [Google Search Central - Article](https://developers.google.com/search/docs/appearance/structured-data/article) - Article schema requirements
- [Astro Sitemap Integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Sitemap configuration
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) - Site config documentation

### Secondary (MEDIUM confidence)
- [astro-seo-schema GitHub](https://github.com/codiume/orbit/tree/main/packages/astro-seo-schema) - Package documentation
- [Stephen Lunt - Astro Structured Data](https://stephen-lunt.dev/blog/astro-structured-data/) - Implementation patterns
- [Mintlify llms.txt guide](https://www.mintlify.com/docs/ai/llmstxt) - Format examples

### Tertiary (LOW confidence)
- Various web search results on llms.txt adoption (844,000+ sites as of late 2025)
- Community discussions on Schema.org type selection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Astro integration, verified documentation
- Architecture: HIGH - Patterns from official docs and established tutorials
- Pitfalls: HIGH - Identified from actual codebase analysis and official requirements
- llms.txt: MEDIUM - Specification is proposed standard, not yet officially adopted by major AI providers

**Research date:** 2026-02-09
**Valid until:** 60 days (Schema.org and llms.txt are stable specifications)
