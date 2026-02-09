# Phase 5: Sanity CMS Integration - Research

**Researched:** 2026-02-09
**Domain:** Headless CMS integration with Astro static site
**Confidence:** HIGH

## Summary

Sanity CMS integrates with Astro through the official `@sanity/astro` package, providing a headless CMS solution for blog content management. The standard implementation replaces Astro's content collections with dynamic queries to Sanity's Content Lake using GROQ (Sanity's query language). Content is stored as Portable Text (JSON-based rich text format) and rendered using `astro-portabletext`.

The architecture supports both static site generation (SSG) and server-side rendering (SSR). For this project, we'll use SSG with webhook-triggered rebuilds: when content is published in Sanity Studio, a webhook triggers a Vercel Deploy Hook, rebuilding the entire site with fresh content. This approach is simpler than SSR and leverages Vercel's CDN for optimal performance.

Sanity Studio can be hosted by Sanity at no cost (`*.sanity.studio`), eliminating infrastructure concerns for the client. Preview functionality requires a separate preview environment that uses the `drafts` perspective to show unpublished changes. Scheduled publishing is available through Sanity's native "Scheduled Drafts" feature.

**Primary recommendation:** Use `@sanity/astro` 4.x with `astro-portabletext` for rendering, deploy Studio to Sanity's hosted platform, configure Vercel Deploy Hooks for automatic rebuilds on publish, and implement preview via separate Vercel deployment with `perspective: 'drafts'`.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Blog Post Schema:**
- Simple text field for author (not separate Author documents)
- Predefined categories for SEO and clean URLs (Claude picks categories based on consultancy context)
- Featured image only — no inline images in post content
- Minimal fields: title, slug, date, author, featured image, content, category
- No excerpt field, no reading time — keep it simple

**Content Migration:**
- Existing markdown posts are placeholders, not real content
- Keep markdown as styling reference during development
- Remove markdown blog infrastructure completely after Sanity integration works
- Seed Sanity with 2-3 sample posts matching current styling for client handoff

**Studio Deployment:**
- Sanity-hosted studio at `*.sanity.studio` (free, managed, simplest for client)
- Existing Sanity project: `pbui2f8s`
- Access restricted to client team only (invite-based)

**Draft/Preview Workflow:**
- Manual preview button — click to preview before publish (not live preview)
- Deployment: Vercel — native Astro support, preview deployments, free tier
- Scheduled publishing enabled — client can set future publish dates
- Rebuild strategy: Claude's discretion (Vercel Deploy Hooks + Sanity webhooks)

### Claude's Discretion

- Specific category names for the blog
- Preview route implementation details
- Rebuild trigger configuration (depends on deployment platform)
- GROQ query structure and optimization
- Portable Text serialization approach

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

---

## Standard Stack

The established libraries/tools for Sanity + Astro integration:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@sanity/astro` | 4.x | Official Sanity integration for Astro | Provides sanityClient, Studio embedding, official support |
| `@sanity/client` | 6.x | Sanity Content Lake client | Required peer dependency, GROQ query execution |
| `sanity` | 3.x | Sanity Studio and CLI | Schema definition, Studio deployment, content management |
| `astro-portabletext` | Latest | Portable Text renderer for Astro | Astro-native component for rendering rich text, official recommendation |
| `@sanity/image-url` | 1.x | Image URL builder | Handles crop/hotspot, generates optimized CDN URLs |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@astrojs/react` | 4.x | React integration for Astro | Required if embedding Studio in Astro site |
| `groq` | Latest | GROQ syntax highlighting (dev) | TypeScript type safety for queries |
| `sanity-plugin-vercel-deploy` | Latest | Deploy button in Studio | Trigger manual rebuilds from Studio UI |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `astro-portabletext` | `@portabletext/react` | React-specific, requires React runtime; not idiomatic for Astro |
| SSG + webhooks | Astro SSR + live queries | Requires server, higher complexity, costs more; SSG is simpler for blog |
| Sanity-hosted Studio | Self-hosted Studio | Self-hosting requires server infrastructure, monitoring; hosted is free and managed |

**Installation:**

```bash
npm install @sanity/astro @sanity/client sanity astro-portabletext @sanity/image-url
```

**If embedding Studio in Astro (optional):**
```bash
npm install @astrojs/react react react-dom
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   └── blog/
│       ├── [slug].astro          # Dynamic blog post pages (SSG)
│       └── [...page].astro       # Paginated blog index (SSG)
├── lib/
│   └── sanity/
│       ├── client.ts             # Sanity client configuration
│       ├── queries.ts            # GROQ queries
│       ├── portabletext.ts       # Portable Text component config
│       └── imageBuilder.ts       # Image URL builder instance
├── schemas/
│   └── post.ts                   # Sanity schema definitions
├── env.d.ts                      # TypeScript types for Sanity
└── sanity.config.ts              # Studio configuration (project root)
```

**Note:** `sanity.config.ts` lives in project root, not `src/`, per Sanity convention.

### Pattern 1: Sanity Client Configuration

**What:** Configure Sanity client with project credentials and CDN settings
**When to use:** Required for all Sanity queries in Astro

**Example:**
```typescript
// src/lib/sanity/client.ts
import { sanityClient } from 'sanity:client'
import { useCdn } from '@sanity/client'

// For static builds, disable CDN to ensure fresh content at build time
export const client = sanityClient.withConfig({
  useCdn: false, // CRITICAL: false for SSG to avoid stale content
  perspective: 'published', // Only show published content on production
})

// For preview environment (separate deployment)
export const previewClient = sanityClient.withConfig({
  useCdn: false, // CRITICAL: drafts perspective requires useCdn: false
  perspective: 'drafts', // Show draft content for preview
  token: import.meta.env.SANITY_READ_TOKEN, // Required for drafts
})
```

### Pattern 2: GROQ Queries for Blog Posts

**What:** Fetch blog posts using GROQ query language
**When to use:** In `getStaticPaths()` and page components for SSG

**Example:**
```typescript
// src/lib/sanity/queries.ts
export const blogPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  author,
  category,
  "imageUrl": featuredImage.asset->url,
  body
}`

export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  author,
  category,
  "imageUrl": featuredImage.asset->url,
  body
}`

// Usage in Astro page
import { client } from '@/lib/sanity/client'
import { blogPostsQuery } from '@/lib/sanity/queries'

export async function getStaticPaths() {
  const posts = await client.fetch(blogPostsQuery)
  return posts.map((post) => ({
    params: { slug: post.slug.current },
    props: { post },
  }))
}
```

### Pattern 3: Portable Text Rendering

**What:** Render Sanity's Portable Text rich content as HTML
**When to use:** Rendering blog post body content

**Example:**
```astro
---
// src/pages/blog/[slug].astro
import { PortableText } from 'astro-portabletext'
import { client } from '@/lib/sanity/client'
import { blogPostBySlugQuery } from '@/lib/sanity/queries'

const { slug } = Astro.params
const post = await client.fetch(blogPostBySlugQuery, { slug })
---

<Layout>
  <h1>{post.title}</h1>
  <PortableText value={post.body} />
</Layout>
```

### Pattern 4: Image Optimization

**What:** Generate optimized image URLs with Sanity's CDN
**When to use:** Displaying featured images and image assets

**Example:**
```typescript
// src/lib/sanity/imageBuilder.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in component
import { urlFor } from '@/lib/sanity/imageBuilder'

const imageUrl = urlFor(post.featuredImage)
  .width(800)
  .height(600)
  .format('webp')
  .url()
```

### Pattern 5: Webhook-Triggered Rebuilds

**What:** Automatic site rebuilds when content is published
**When to use:** Production deployment automation

**Setup:**
1. **Create Vercel Deploy Hook** (in Vercel project settings):
   - Navigate to Settings → Git → Deploy Hooks
   - Name: "Sanity Content Publish"
   - Branch: main
   - Copy generated URL (e.g., `https://api.vercel.com/v1/integrations/deploy/...`)

2. **Configure Sanity Webhook** (in Sanity project settings):
   - Navigate to API → Webhooks
   - URL: [Vercel Deploy Hook URL]
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"` (only trigger on blog posts)
   - HTTP method: POST

**Alternative:** Install `sanity-plugin-vercel-deploy` for manual deploy button in Studio UI.

### Pattern 6: Preview Environment

**What:** Separate Vercel deployment for previewing draft content
**When to use:** Allow clients to preview posts before publishing

**Setup:**
```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'

const isPreview = import.meta.env.PUBLIC_PREVIEW_MODE === 'true'

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false,
      perspective: isPreview ? 'drafts' : 'published',
      token: isPreview ? import.meta.env.SANITY_READ_TOKEN : undefined,
    }),
  ],
})
```

**Vercel Environment Variables:**
- Production: `PUBLIC_PREVIEW_MODE=false`
- Preview: `PUBLIC_PREVIEW_MODE=true`, `SANITY_READ_TOKEN=[read token]`

### Pattern 7: Sanity Schema Definition

**What:** Define content model for blog posts
**When to use:** Initial setup and schema modifications

**Example:**
```typescript
// schemas/post.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Strategy', value: 'ai-strategy' },
          { title: 'Prompt Engineering', value: 'prompt-engineering' },
          { title: 'Marketing Automation', value: 'marketing-automation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true, // Enable focal point selection
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
})
```

### Anti-Patterns to Avoid

- **Using `useCdn: true` for static builds:** Results in stale content when site rebuilds. SSG must use `useCdn: false` to fetch fresh content at build time.
- **Querying without `defined(slug.current)` filter:** Returns posts without slugs, causing build errors. Always filter for defined slugs.
- **Fetching full document trees without projection:** GROQ returns entire documents including all nested data. Use `{ field1, field2 }` projection to limit payload size.
- **Not setting `studioHost` in CI/CD:** Deployment fails without configured hostname. Set in `sanity.cli.ts` or via environment variable.
- **Using `@portabletext/react` in Astro:** Requires React runtime unnecessarily. Use `astro-portabletext` instead.
- **Embedding Studio in production Astro site:** Adds React to production bundle. Host Studio separately on `*.sanity.studio`.

---

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich text storage | Custom markdown or HTML storage | Portable Text (Sanity's native format) | Portable Text is structured JSON, versioned, supports custom blocks, has sanitization built-in, and serializes to any output format |
| Image optimization | Custom image processing pipeline | `@sanity/image-url` + Sanity's CDN | Sanity provides on-demand transforms, automatic WebP conversion, hotspot/crop handling, global CDN, and LQIP/blurhash generation |
| Slug generation | Custom slugification logic | Sanity's built-in `slug` field type | Handles uniqueness validation, source field tracking, custom slugify function, and kebab-case normalization |
| Content validation | Manual validation in code | Sanity schema validation rules | Schema validation runs in Studio, provides immediate feedback, prevents invalid content from being saved |
| Draft management | Custom draft system | Sanity's native draft documents | Every document has corresponding `drafts.*` document, Studio UI handles draft/publish flow, perspectives API abstracts query logic |
| Scheduled publishing | Custom cron jobs | Sanity's Scheduled Drafts feature | Built into Studio UI, handles timezone complexity, API-driven scheduling, no server infrastructure required |
| Webhook management | Custom webhook system | Sanity's built-in webhooks | Configurable via UI, retry logic included, payload customization, filter by document type/field changes |

**Key insight:** Sanity is a fully-featured CMS platform, not just a content API. Every feature above is battle-tested across thousands of production sites. Custom implementations introduce edge cases, maintenance burden, and security risks that the platform already solves.

---

## Common Pitfalls

### Pitfall 1: CDN Caching Causes Stale Content After Rebuild

**What goes wrong:** Site rebuilds but still shows old content because Sanity client uses CDN cache.

**Why it happens:** Default `useCdn: true` serves cached responses. CDN cache TTL can be several minutes, so fresh builds fetch stale data.

**How to avoid:** Always set `useCdn: false` for static site generation (SSG) builds. Only use `useCdn: true` for client-side queries or SSR in production (not applicable for this project).

**Warning signs:**
- Content updates in Studio but doesn't appear after Vercel deployment
- Rebuild logs show "success" but site content is old
- Content eventually updates after 5-10 minutes

**Fix:**
```typescript
// astro.config.mjs
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false, // CRITICAL for SSG
    }),
  ],
})
```

### Pitfall 2: Studio 404 on Page Refresh When Embedded

**What goes wrong:** Embedding Sanity Studio at `/studio` route in Astro causes 404 errors on refresh for Studio sub-routes like `/studio/structure`.

**Why it happens:** Studio is a single-page application (SPA) that handles routing client-side. Astro's SSG generates static HTML files, so `/studio/structure` doesn't exist as a file. On initial navigation from `/studio`, client-side routing works, but refresh tries to load `/studio/structure.html` which doesn't exist.

**How to avoid:** Don't embed Studio in production Astro site. Use Sanity's hosted Studio (`*.sanity.studio`) instead. This is already decided in user constraints (Sanity-hosted studio).

**Warning signs:**
- Studio works on initial load
- Navigation within Studio works
- Refresh on any Studio sub-route returns 404

**Note:** This pitfall is avoided by deployment decision (Sanity-hosted). Documenting for awareness.

### Pitfall 3: Draft Content Requires Authentication Token

**What goes wrong:** Preview environment returns 401 errors or shows empty results when trying to fetch draft content.

**Why it happens:** Draft documents require authenticated API requests. The `drafts` perspective cannot be used with anonymous requests or CDN caching.

**How to avoid:**
1. Generate a read token in Sanity project settings (API → Tokens)
2. Add token to Vercel preview environment variables: `SANITY_READ_TOKEN`
3. Configure preview client with token and `useCdn: false`
4. Never commit tokens to version control

**Warning signs:**
- Preview environment shows no draft content
- Console errors: "Insufficient permissions"
- Published content works, drafts don't

**Fix:**
```typescript
// Preview environment only
export const previewClient = sanityClient.withConfig({
  useCdn: false, // Required for drafts
  perspective: 'drafts',
  token: import.meta.env.SANITY_READ_TOKEN, // Env var
})
```

### Pitfall 4: GROQ Query Over-Fetching Slows Builds

**What goes wrong:** Build times increase significantly as content grows, eventually timing out.

**Why it happens:** Querying without projections returns entire document trees, including all nested references and arrays. Large documents with many fields cause excessive data transfer and JSON parsing overhead.

**How to avoid:** Always use GROQ projections to fetch only required fields. Use specific field selection `{ field1, field2 }` instead of returning full documents.

**Warning signs:**
- Build time increases with each new post
- Network tab shows large response payloads (>1MB)
- Build logs show slow query times

**Fix:**
```typescript
// Bad: Over-fetching
const posts = await client.fetch(`*[_type == "post"]`)

// Good: Projection
const posts = await client.fetch(`*[_type == "post"] {
  _id,
  title,
  slug,
  publishedAt,
  "imageUrl": featuredImage.asset->url
}`)
```

### Pitfall 5: Missing `defined()` Filter Causes Build Failures

**What goes wrong:** Build fails with error "Cannot read property 'current' of undefined" when generating blog post paths.

**Why it happens:** Sanity documents can exist without required fields during editing (drafts). If a post doesn't have a slug yet, `slug.current` is undefined, causing runtime errors in `getStaticPaths()`.

**How to avoid:** Always filter for `defined(slug.current)` in queries that generate static paths. This ensures only posts with valid slugs are included.

**Warning signs:**
- Build succeeds locally (testing with complete posts)
- Production build fails
- Error references undefined property access

**Fix:**
```typescript
// Bad: Missing defined() filter
const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`)

// Good: Filter for defined slugs
const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`)
```

### Pitfall 6: Environment Variables Not Available in `astro.config.mjs`

**What goes wrong:** Sanity configuration reads `undefined` for `projectId` or `dataset` from environment variables.

**Why it happens:** Astro's `astro.config.mjs` runs in Node.js before Astro's environment variable injection. Standard `import.meta.env` doesn't work. Must use `process.env` instead.

**How to avoid:** Use `process.env` for configuration values in `astro.config.mjs`, not `import.meta.env`.

**Warning signs:**
- `projectId` shows as undefined in errors
- Sanity client initialization fails
- Works locally (hardcoded values) but fails in CI/CD

**Fix:**
```javascript
// Bad: Won't work in astro.config.mjs
import.meta.env.PUBLIC_SANITY_PROJECT_ID

// Good: Use process.env
process.env.PUBLIC_SANITY_PROJECT_ID
```

### Pitfall 7: Webhook Triggers Too Frequently

**What goes wrong:** Vercel builds trigger for every Studio edit, not just publishes. Client saves draft → webhook fires → wasted build minutes.

**Why it happens:** Default webhook configuration triggers on all document mutations, including draft saves. Auto-save in Studio can trigger dozens of webhooks per editing session.

**How to avoid:** Configure webhook filter to only trigger on published documents: `_type == "post" && !(_id in path("drafts.**"))`

**Warning signs:**
- Build queue constantly active
- Vercel usage limits reached quickly
- Multiple builds for single post edit

**Fix:**
```
// Sanity webhook configuration
Trigger on: Update
Filter: _type == "post" && !(_id in path("drafts.**"))
```

---

## Code Examples

Verified patterns from official sources:

### Complete Sanity + Astro Blog Setup

```typescript
// astro.config.mjs
// Source: https://github.com/sanity-io/sanity-astro
import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://promptmarketing.com',
  integrations: [
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false,
      perspective: 'published',
      apiVersion: '2025-02-19', // Latest API version
    }),
  ],
  adapter: vercel(),
})
```

```typescript
// src/env.d.ts
// Source: https://www.sanity.io/plugins/sanity-astro
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
```

```typescript
// sanity.config.ts (project root)
// Source: https://www.sanity.io/docs/studio/deployment
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { schemas } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Prompt Marketing Blog',
  projectId: 'pbui2f8s',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    scheduledPublishing(),
  ],

  schema: {
    types: schemas,
  },

  // Optional: if embedding Studio in Astro (not recommended)
  // basePath: '/studio',
})
```

```typescript
// src/pages/blog/[slug].astro
// Source: https://developers.netlify.com/guides/how-to-use-sanity-portable-text-with-astro/
---
import { sanityClient } from 'sanity:client'
import { PortableText } from 'astro-portabletext'
import Layout from '@/layouts/BlogLayout.astro'

export async function getStaticPaths() {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      author,
      category,
      featuredImage,
      body
    }`
  )

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }))
}

const { post } = Astro.props
---

<Layout
  title={post.title}
  description={post.excerpt}
  image={post.featuredImage}
>
  <article>
    <h1>{post.title}</h1>
    <time datetime={post.publishedAt}>
      {new Date(post.publishedAt).toLocaleDateString()}
    </time>
    <PortableText value={post.body} />
  </article>
</Layout>
```

```typescript
// src/lib/sanity/portabletext.ts
// Source: https://www.sanity.io/plugins/astro-portabletext
import { PortableText } from 'astro-portabletext'

// Custom component mapping (optional)
export const components = {
  type: {
    // Custom block types
  },
  mark: {
    // Custom marks (like links)
    link: ({ value, children }) => {
      const href = value?.href || '#'
      return `<a href="${href}" target="_blank" rel="noopener">${children}</a>`
    },
  },
  block: {
    // Custom block styles
    h2: ({ children }) => `<h2 class="text-3xl font-bold">${children}</h2>`,
    blockquote: ({ children }) => `<blockquote class="border-l-4 pl-4 italic">${children}</blockquote>`,
  },
}
```

### Image URL Generation

```typescript
// src/lib/sanity/imageBuilder.ts
// Source: https://www.sanity.io/docs/apis-and-sdks/presenting-images
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage example:
// const url = urlFor(post.featuredImage).width(800).format('webp').url()
```

### Scheduled Publishing Setup

```bash
# Install scheduled publishing plugin
npm install @sanity/scheduled-publishing
```

```typescript
// sanity.config.ts
// Source: https://www.sanity.io/docs/user-guides/content-releases
import { scheduledPublishing } from '@sanity/scheduled-publishing'

export default defineConfig({
  // ...
  plugins: [
    scheduledPublishing(),
  ],
})
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@sanity/block-content-to-react` | `@portabletext/react` (React) or `astro-portabletext` (Astro) | 2022 | Portable Text ecosystem standardized with framework-specific renderers |
| Scheduled publishing plugin | Scheduled Drafts + Content Releases | October 2025 | Native scheduling in Studio UI, deprecated separate plugin |
| Studio v2 | Studio v3 | 2023 | New plugin API, improved performance, React 18 support |
| `perspective: 'raw'` (default) | `perspective: 'published'` (default) | February 2025 (API v2025-02-19) | Must explicitly set perspective for drafts or published content |
| Manual webhook configuration | Vercel Deploy plugin in Studio | 2024 | One-click deploy button in Studio UI, manual trigger option |
| Content migrations via scripts | `sanity migration` CLI commands | 2024 | Structured migration workflow with dry-run, validation, rollback |

**Deprecated/outdated:**
- **@sanity/block-content-to-react** (deprecated 2022): Use `@portabletext/react` or framework-specific renderers
- **Scheduled publishing plugin** (deprecated October 2025): Use Scheduled Drafts feature (built-in)
- **Studio v2** (end of life): Upgrade to Studio v3 for continued support
- **`raw` perspective as default** (changed February 2025): Explicitly set `perspective: 'published'` or `'drafts'`

---

## Open Questions

Things that couldn't be fully resolved:

1. **Scheduled Drafts vs. Content Releases**
   - What we know: Scheduled Drafts schedules individual documents; Content Releases schedules grouped changes
   - What's unclear: Whether client needs Content Releases for coordinated multi-post launches
   - Recommendation: Start with Scheduled Drafts (simpler), evaluate Content Releases if client needs batch scheduling

2. **Preview Button UX Implementation**
   - What we know: Preview environment can use `drafts` perspective; Sanity has Presentation tool for preview links
   - What's unclear: Whether to implement preview button as: (a) Studio plugin linking to preview URL, (b) Sanity Presentation tool, or (c) custom preview route
   - Recommendation: Use Sanity Presentation tool (built-in) with preview environment URL configured. Provides side-by-side editing experience.

3. **Category List Management**
   - What we know: User wants predefined categories (not documents); Claude picks categories based on consultancy context
   - What's unclear: Whether to allow client to add categories later (requires schema update) or lock list completely
   - Recommendation: Start with fixed list in schema; if client needs new categories, add via schema update (rare operation, acceptable manual process)

---

## Sources

### Primary (HIGH confidence)

- [Sanity + Astro Official Guide](https://docs.astro.build/en/guides/cms/sanity/) - Setup and configuration
- [Sanity Astro Integration Plugin](https://www.sanity.io/plugins/sanity-astro) - Official @sanity/astro documentation
- [Sanity Astro GitHub Repository](https://github.com/sanity-io/sanity-astro) - README and examples
- [Sanity Studio Deployment](https://www.sanity.io/docs/studio/deployment) - Hosted Studio setup
- [Sanity Perspectives Documentation](https://www.sanity.io/docs/content-lake/perspectives) - Draft vs. published content
- [Vercel Deploy Hooks](https://vercel.com/docs/deploy-hooks) - Webhook-triggered rebuilds
- [High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq) - Query optimization
- [Sanity Image Optimization](https://www.sanity.io/docs/apis-and-sdks/presenting-images) - Image URL builder

### Secondary (MEDIUM confidence)

- [Sanity Portable Text with Astro - Netlify Guide](https://developers.netlify.com/guides/how-to-use-sanity-portable-text-with-astro/) - Portable Text rendering patterns
- [Sanity Blog Guide](https://www.sanity.io/docs/developer-guides/sanity-astro-blog) - Blog-specific implementation
- [Sanity Content Migrations](https://www.sanity.io/docs/content-lake/schema-and-content-migrations) - Migration best practices
- [Sanity Scheduled Publishing](https://www.sanity.io/docs/studio/scheduled-publishing) - Scheduling documentation
- [Sanity Taxonomy Patterns](https://www.sanity.io/guides/parent-child-taxonomy) - Category/tag schema patterns

### Tertiary (LOW confidence - for awareness)

- Various blog posts and tutorials referenced in web searches - Implementation patterns and gotchas

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official packages, verified versions, established ecosystem
- Architecture patterns: HIGH - Official documentation, GitHub examples, verified implementations
- Pitfalls: MEDIUM-HIGH - Mix of official docs (CDN caching, auth) and community issues (Studio routing)
- Preview implementation: MEDIUM - Multiple approaches exist, official Presentation tool vs. custom

**Research date:** 2026-02-09
**Valid until:** 2026-03-31 (Sanity ecosystem stable; Astro releases frequently but backwards compatible)

---

**Notes for planner:**

1. **User constraints section is MANDATORY** - Contains locked decisions from CONTEXT.md that must be honored
2. **Sanity-hosted Studio is locked decision** - Don't plan for embedding Studio in Astro site
3. **Minimal schema is locked decision** - Simple author text field, predefined categories, no excerpt/reading time
4. **SSG + webhooks is locked decision** - Vercel Deploy Hooks + Sanity webhooks for rebuilds
5. **Preview button is locked decision** - Manual preview (not live), use drafts perspective
6. **Markdown removal is locked decision** - Phase includes removing content collections after Sanity works
7. **Sample posts required** - Seed Sanity with 2-3 posts matching current styling for handoff
