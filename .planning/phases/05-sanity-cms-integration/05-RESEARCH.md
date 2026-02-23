# Phase 5: Sanity CMS Integration - Research

**Researched:** 2026-02-23 (RE-RESEARCH — updates original 2026-02-09 findings)
**Domain:** Headless CMS integration with Astro static site
**Confidence:** HIGH

## Summary

This is an updated research document replacing the 2026-02-09 version. Since the last research, Sanity has released Studio v5 (requiring React 19.2), `@sanity/image-url` was bumped to v2.x with a breaking API change (named export `createImageUrlBuilder` replaces default import), and scheduled publishing moved to a built-in `defineConfig()` option (the separate plugin is deprecated).

The standard implementation uses `@sanity/astro` 3.x (current: 3.2.11), which provides the `sanity:client` virtual module. This virtual module API is unchanged and still valid. Rendering rich text uses `astro-portabletext` 0.13.0, which has the same `<PortableText value={...} />` API as previously documented.

The existing blog infrastructure uses plain `.md` files with Astro content collections — **not** markdoc format. The `@astrojs/markdoc` package is installed but appears unused for blog content (no `.mdoc` files exist). Removing markdoc from the project is safe and straightforward.

**Primary recommendation:** Install `@sanity/astro@^3.2.11`, `@sanity/client@^7.x`, `sanity@^5.x`, `astro-portabletext@^0.13.0`, `@sanity/image-url@^2.0.3`. Use `createImageUrlBuilder` (not default import). Use `scheduledPublishing: { enabled: true }` in `defineConfig()` (not the deprecated plugin). Embed nothing in Astro — Studio goes on `*.sanity.studio`.

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

## What Changed Since 2026-02-09

| Item | Previous Research | Current Reality | Impact |
|------|-------------------|-----------------|--------|
| `@sanity/astro` version | "4.x" | 3.2.11 (was always 3.x) | Original was wrong — package never had a v4 |
| `sanity` package | 3.x | 5.11.0 (v5 released Dec 16 2025) | Requires React 19.2 as peer dependency |
| `@sanity/client` | 6.x | 7.15.0 | Major version bump, `@sanity/astro` 3.x requires `^7.6.0` |
| `@sanity/image-url` | 1.x | 2.0.3 | **Breaking change**: named export `createImageUrlBuilder` replaces default export |
| Scheduled publishing | `@sanity/scheduled-publishing` plugin | Built-in `scheduledPublishing` in `defineConfig()` | Plugin deprecated; use native config |
| Blog file format | "uses markdoc" | Plain `.md` files (no `.mdoc` files exist) | Markdoc integration is installed but unused for blog |
| `astro-portabletext` | Latest | 0.13.0 | API unchanged, same usage |

---

## Standard Stack

The established libraries/tools for Sanity + Astro integration:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@sanity/astro` | 3.2.11 | Official Sanity integration for Astro | Provides `sanity:client` virtual module, Studio route injection, official support |
| `@sanity/client` | 7.15.0 | Sanity Content Lake client | Required peer dependency for `@sanity/astro` 3.x, GROQ query execution |
| `sanity` | 5.11.0 | Sanity Studio and CLI | Schema definition, Studio deployment, content management, scheduled publishing |
| `astro-portabletext` | 0.13.0 | Portable Text renderer for Astro | Astro-native component for rendering rich text, no React runtime needed |
| `@sanity/image-url` | 2.0.3 | Image URL builder | Handles crop/hotspot, generates optimized CDN URLs |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `react` + `react-dom` | 19.2.4 | React runtime | Required by `sanity` v5 (Studio) and `@sanity/astro` peer deps |
| `@astrojs/react` | 4.4.2 | React integration for Astro | Required to satisfy `@sanity/astro` peer deps when `sanity` v5 is used |
| `sanity-plugin-vercel-deploy` | Latest | Deploy button in Studio | Optional: trigger manual rebuilds from Studio UI |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `astro-portabletext` | `@portabletext/react` | React-specific, requires React runtime; not idiomatic for Astro |
| SSG + webhooks | Astro SSR + live queries | Requires persistent server, higher complexity, costs more; SSG is simpler for blog |
| Sanity-hosted Studio | Self-hosted Studio | Self-hosting requires server infrastructure, monitoring; hosted is free and managed |

**Installation:**

```bash
npm install @sanity/astro @sanity/client sanity astro-portabletext @sanity/image-url
npm install @astrojs/react react react-dom
```

**Note on React:** `sanity` v5 requires React 19.2 as a peer dependency. `@sanity/astro` 3.x also requires React as a peer. Installing `@astrojs/react` is required even though Studio is hosted externally — it satisfies the peer dependencies. React is NOT added to the Astro integration list (only needed for peer dep resolution and potential future use).

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   └── blog/
│       ├── [slug].astro          # Dynamic blog post pages (SSG)
│       └── [...page].astro       # Paginated blog index (SSG) — replaces existing [...page].astro
├── lib/
│   └── sanity/
│       ├── client.ts             # Sanity client instance (re-exports from sanity:client)
│       ├── queries.ts            # GROQ queries
│       └── imageBuilder.ts       # Image URL builder (uses createImageUrlBuilder)
├── schemas/
│   └── post.ts                   # Sanity schema definition
└── sanity.config.ts              # Studio configuration (project root, not src/)
```

**Note:** `sanity.config.ts` lives in project root per Sanity convention. `content.config.ts` remains for portfolio collection — only the blog collection is removed.

### Pattern 1: Sanity Client Configuration

**What:** Configure Sanity client from the virtual module
**When to use:** Required for all Sanity queries in Astro

```typescript
// src/lib/sanity/client.ts
// Source: https://raw.githubusercontent.com/sanity-io/sanity-astro/main/packages/sanity-astro/README.md
import { sanityClient } from 'sanity:client'

// For static builds — disable CDN to ensure fresh content at build time
export const client = sanityClient.withConfig({
  useCdn: false, // CRITICAL: false for SSG to avoid stale content
  perspective: 'published',
  apiVersion: '2025-02-19',
})

// For preview environment (separate Vercel deployment)
export const previewClient = sanityClient.withConfig({
  useCdn: false,
  perspective: 'drafts',
  token: import.meta.env.SANITY_READ_TOKEN,
  apiVersion: '2025-02-19',
})
```

### Pattern 2: GROQ Queries for Blog Posts

**What:** Fetch blog posts using GROQ query language
**When to use:** In `getStaticPaths()` and page components for SSG

```typescript
// src/lib/sanity/queries.ts
export const blogPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  author,
  category,
  "featuredImage": featuredImage.asset->{url, metadata { dimensions }},
  body
}`

export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  author,
  category,
  "featuredImage": featuredImage.asset->{url, metadata { dimensions }},
  body
}`
```

### Pattern 3: Portable Text Rendering

**What:** Render Sanity Portable Text as HTML using `astro-portabletext`
**When to use:** Rendering blog post body content

```astro
---
// src/pages/blog/[slug].astro
import { PortableText } from 'astro-portabletext'
import { client } from '@/lib/sanity/client'
import { blogPostBySlugQuery } from '@/lib/sanity/queries'
import BlogLayout from '@/layouts/BlogLayout.astro'

export async function getStaticPaths() {
  const posts = await client.fetch(blogPostsQuery)
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }))
}

const { post } = Astro.props
---

<BlogLayout frontmatter={{
  title: post.title,
  author: post.author,
  pubDate: new Date(post.publishedAt),
  image: post.featuredImage?.url,
}}>
  <PortableText value={post.body} />
</BlogLayout>
```

### Pattern 4: Image URL Builder — UPDATED API

**What:** Generate optimized image URLs with Sanity's CDN
**When to use:** Displaying featured images

```typescript
// src/lib/sanity/imageBuilder.ts
// Source: https://github.com/sanity-io/image-url/blob/main/CHANGELOG.md
// BREAKING CHANGE in v2: use named export createImageUrlBuilder, NOT default import
import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage:
// const imageUrl = urlFor(post.featuredImage).width(800).format('webp').url()
```

**WARNING:** The original research showed `import imageUrlBuilder from '@sanity/image-url'`. This is broken in v2. Use the named export `createImageUrlBuilder`.

### Pattern 5: Astro Config with Sanity Integration

**What:** Configure `@sanity/astro` in astro.config.mjs
**When to use:** Initial setup — replaces markdoc integration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://promptmarketing.com',
  integrations: [
    icon(),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false,
      perspective: 'published',
      apiVersion: '2025-02-19',
    }),
    // NOTE: @astrojs/react is NOT added here — it's only installed for peer dep resolution
    // Studio is hosted on *.sanity.studio, not embedded in this Astro site
  ],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
})
```

**Note:** Remove `markdoc()` from integrations. Remove `@astrojs/markdoc` from package.json after migration.

### Pattern 6: Sanity Config with Built-in Scheduled Publishing

**What:** Configure Sanity Studio with scheduled publishing (native, no plugin)
**When to use:** Initial studio setup — replaces the deprecated `@sanity/scheduled-publishing` plugin

```typescript
// sanity.config.ts (project root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Prompt Marketing Blog',
  projectId: 'pbui2f8s',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    // NO @sanity/scheduled-publishing import — it's deprecated
  ],

  // Scheduled publishing is now native in sanity v3.39.0+
  // sanity v5.11.0 includes this built-in
  scheduledPublishing: {
    enabled: true,
  },

  schema: {
    types: [postSchema],
  },
})
```

**WARNING:** Original research showed `import { scheduledPublishing } from '@sanity/scheduled-publishing'` and added it to `plugins`. This is the old approach. Do NOT use `@sanity/scheduled-publishing` — use the `scheduledPublishing` key in `defineConfig()`.

### Pattern 7: Schema Definition

**What:** Define content model for blog posts
**When to use:** Initial setup

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
      options: { source: 'title', maxLength: 96 },
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
          { title: 'AI Search & Discovery', value: 'ai-search' },
          { title: 'Content Strategy', value: 'content-strategy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
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
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    }),
  ],
})
```

### Pattern 8: TypeScript Type Declaration

**What:** Enable TypeScript support for `sanity:client` virtual module
**When to use:** After installing `@sanity/astro`

```typescript
// src/env.d.ts
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
```

**Known issue:** There is a reported issue (GitHub #135) where `@astrojs/check` fails to resolve `sanity:client` types in some configurations. If build fails with "Cannot find module 'sanity:client'", add `"@sanity/astro/module"` to `tsconfig.json` `types` array as fallback.

### Pattern 9: Webhook-Triggered Rebuilds

**What:** Automatic site rebuilds when content is published
**When to use:** Production deployment automation

```
Sanity Webhook Configuration:
- URL: [Vercel Deploy Hook URL from Vercel project settings]
- Trigger: Update
- Filter: _type == "post" && !(_id in path("drafts.**"))
- HTTP method: POST
```

**Key:** Filter `!(_id in path("drafts.**"))` prevents draft saves from triggering builds. Only fired on actual publish events.

### Pattern 10: Adapting BlogLayout for Sanity

**What:** The existing `BlogLayout.astro` uses `frontmatter.pubDate` (Date), `frontmatter.author` (string slug), `frontmatter.image` (local path). With Sanity these become `publishedAt` (ISO string), `author` (plain name string), `featuredImage.url` (Sanity CDN URL).

**Key differences:**
- `author` is now a plain string (e.g., "Arjan ter Huurne"), not a slug — remove slug-to-name conversion logic
- `pubDate` becomes `publishedAt` as ISO datetime string — wrap in `new Date()` when passing
- `image` is now a Sanity CDN URL, not a local path — use `urlFor()` from imageBuilder
- `description` field used in SEO (BlogPostingSchema) maps to Sanity's... there is no description field in the locked schema. Use the title for og:description or add a brief `seoDescription` field.

**Decision needed by planner:** The existing `BlogPostingSchema.astro` requires a `description` prop. The locked schema has no description/excerpt field. Options:
1. Add a `seoDescription` field to the schema (violates "no excerpt" constraint if treated as summary)
2. Generate description from body portable text (complex)
3. Use a static fallback description (simplest, acceptable for a small blog)

### Anti-Patterns to Avoid

- **Using `import imageUrlBuilder from '@sanity/image-url'`** (v2 removed default export — use `createImageUrlBuilder`)
- **Adding `scheduledPublishing()` to `plugins[]`** (plugin is deprecated — use `scheduledPublishing: { enabled: true }` at config root)
- **Setting `useCdn: true` for static builds** (results in stale content)
- **Missing `defined(slug.current)` filter** (causes undefined errors in `getStaticPaths`)
- **Fetching full documents without projection** (slow builds as content grows)
- **Adding `@astrojs/react` to integrations in astro.config.mjs** (Studio is externally hosted — React integration only needed for peer dep resolution if at all)

---

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich text storage | Custom markdown or HTML fields | Portable Text (Sanity's native format) | Structured JSON, versioned, sanitized, framework-agnostic output |
| Image optimization | Manual CDN or Astro Image for Sanity assets | `@sanity/image-url` with Sanity CDN | On-demand transforms, WebP conversion, hotspot crop, global CDN |
| Slug generation | Custom slugify function | Sanity's built-in `slug` field type | Handles uniqueness, source tracking, kebab-case normalization |
| Content validation | Runtime validation in Astro | Sanity schema validation rules | Studio-level validation, immediate feedback, prevents invalid saves |
| Draft management | Custom draft system | Sanity's native draft documents | Every document has `drafts.*` twin, Studio handles publish flow |
| Scheduled publishing | Cron jobs or custom schedulers | Native `scheduledPublishing` in `defineConfig()` | Built into Studio UI, timezone-aware, no server infrastructure |
| Webhook management | Custom webhook system | Sanity's built-in webhooks (sanity.io/manage) | Retry logic, payload customization, filter by document type |

---

## Common Pitfalls

### Pitfall 1: Wrong `@sanity/image-url` Import (v2 Breaking Change)

**What goes wrong:** Build fails with "does not provide an export named 'default'" or TypeScript errors.

**Why it happens:** `@sanity/image-url` v2 removed the default export. Old code `import imageUrlBuilder from '@sanity/image-url'` is broken.

**How to avoid:** Use the named export:
```typescript
// WRONG (v1 style):
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)

// CORRECT (v2):
import { createImageUrlBuilder } from '@sanity/image-url'
const builder = createImageUrlBuilder(client)
```

**Warning signs:** Build error "SyntaxError: The requested module '@sanity/image-url' does not provide an export named 'default'"

### Pitfall 2: Using Deprecated `@sanity/scheduled-publishing` Plugin

**What goes wrong:** Plugin import fails or shows deprecation warnings; Studio may not load correctly.

**Why it happens:** `@sanity/scheduled-publishing` was deprecated when scheduled publishing moved to `sanity` core in v3.39.0.

**How to avoid:** Use the native `defineConfig()` option:
```typescript
// WRONG:
import { scheduledPublishing } from '@sanity/scheduled-publishing'
defineConfig({ plugins: [scheduledPublishing()] })

// CORRECT (sanity v3.39.0+ / v5.x):
defineConfig({ scheduledPublishing: { enabled: true } })
```

### Pitfall 3: CDN Caching Causes Stale Content After Rebuild

**What goes wrong:** Site rebuilds but still shows old content.

**How to avoid:** Always set `useCdn: false` in both `astro.config.mjs` and `client.ts` for SSG builds.

### Pitfall 4: `sanity:client` TypeScript Resolution Failure with `@astrojs/check`

**What goes wrong:** Build fails during `astro check` with "Cannot find module 'sanity:client' or its corresponding type declarations."

**Why it happens:** Virtual module type resolution can fail when `@astrojs/check` is used (known issue, GitHub #135).

**How to avoid:** Ensure `src/env.d.ts` has the reference:
```typescript
/// <reference types="@sanity/astro/module" />
```
If still failing, add to `tsconfig.json`:
```json
{ "compilerOptions": { "types": ["@sanity/astro/module"] } }
```

**Warning signs:** `astro check` fails but `astro dev` and `astro build` work fine.

### Pitfall 5: `BlogLayout.astro` Props Mismatch

**What goes wrong:** `BlogLayout.astro` receives Sanity post data but expects the old content collection frontmatter shape.

**Why it happens:** Current `BlogLayout.astro` receives `frontmatter` with `pubDate` (Date), `author` (slug string like "arjan-ter-huurne"), `image` (local path string). Sanity returns `publishedAt` (ISO string), `author` (plain name), CDN URL.

**How to avoid:** When calling `BlogLayout.astro` from the Sanity-powered `[slug].astro`, transform data to match expected prop shape:
- Convert `publishedAt` string to `Date` for `pubDate`
- `author` is already a plain name — but the current layout does slug-to-name conversion; skip that step
- Use `urlFor(post.featuredImage).width(1920).format('webp').url()` for `image`

### Pitfall 6: Webhook Triggers Too Frequently

**What goes wrong:** Vercel builds trigger for every Studio draft save, not just publishes.

**How to avoid:** Set webhook filter: `_type == "post" && !(_id in path("drafts.**"))`

### Pitfall 7: Removing Blog Content Collection Breaks Portfolio

**What goes wrong:** Deleting `content.config.ts` removes the portfolio collection too.

**How to avoid:** Update `content.config.ts` to remove only the `blog` collection definition, keep `portfolio`. The blog collection references are replaced with Sanity queries. Portfolio remains as content collection.

---

## Code Examples

### Complete astro.config.mjs (Post-Migration)

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://promptmarketing.com',
  integrations: [
    icon(),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false,
      perspective: 'published',
      apiVersion: '2025-02-19',
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
})
```

### Complete sanity.config.ts

```typescript
// sanity.config.ts (project root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import postSchema from './schemas/post'

export default defineConfig({
  name: 'default',
  title: 'Prompt Marketing Blog',
  projectId: 'pbui2f8s',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  scheduledPublishing: { enabled: true },
  schema: { types: [postSchema] },
})
```

### Image Builder (v2 API)

```typescript
// src/lib/sanity/imageBuilder.ts
// Source: https://github.com/sanity-io/image-url — MIGRATE-v1-to-v2.md
import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

export const urlFor = (source: any) =>
  createImageUrlBuilder(sanityClient).image(source)

// Usage: urlFor(post.featuredImage).width(800).format('webp').url()
```

### Updated content.config.ts (Blog Collection Removed)

```typescript
// src/content.config.ts (after migration)
import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

// Blog collection removed — replaced by Sanity queries
// Portfolio collection remains unchanged

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/portfolio' }),
  schema: () =>
    z.object({
      title: z.string(),
      client: z.string(),
      pubDate: z.date(),
      description: z.string(),
      challenge: z.string(),
      solution: z.string(),
      results: z.array(z.string()),
      image: z.string().optional(),
      thumbnail: z.string().optional(),
    }),
})

export const collections = { portfolio }
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import imageUrlBuilder from '@sanity/image-url'` | `import { createImageUrlBuilder } from '@sanity/image-url'` | v2.0.0 (2024) | Breaking change — default export removed |
| `@sanity/scheduled-publishing` plugin | `scheduledPublishing: { enabled: true }` in `defineConfig()` | v3.39.0 (April 2024) | Plugin deprecated, use native config |
| `sanity` v3 → React 18 | `sanity` v5 → React 19.2 | December 2025 | Must install React 19.2 as peer dep |
| `@sanity/client` v6 | `@sanity/client` v7 | 2025 | `@sanity/astro` 3.x requires `^7.6.0` |
| `perspective: 'raw'` (pre-2025 default) | `perspective: 'published'` | February 2025 (API v2025-02-19) | Explicitly set perspective |
| `@sanity/block-content-to-react` | `astro-portabletext` | 2022 | Framework-native, no React needed |

**Deprecated/outdated:**
- **`@sanity/scheduled-publishing`**: Deprecated. Remove from `plugins`, use `scheduledPublishing: { enabled: true }` at config root.
- **Default import from `@sanity/image-url`**: Removed in v2. Use named export `createImageUrlBuilder`.
- **`@sanity/astro` "4.x"**: The original research was incorrect — the package version is 3.x and never released a v4.

---

## Open Questions

1. **`BlogPostingSchema.astro` description prop**
   - What we know: Current schema has no description field (locked decision: no excerpt). `BlogPostingSchema.astro` requires `description` for JSON-LD.
   - What's unclear: How to satisfy SEO schema requirement without an excerpt field.
   - Recommendation: Use a static fallback (e.g., site description) for posts without rich SEO descriptions. Alternatively, add a dedicated `seoDescription` field (short, separate from content body) — this is not an excerpt but an SEO meta field. The planner should decide whether this constitutes "excerpt" and thus violates the constraint, or is a distinct SEO-specific field.

2. **Route slug format change**
   - What we know: Current blog uses `[...id].astro` with Astro content collection IDs as paths (e.g., `/blog/agentic-commerce`). Sanity uses `[slug].astro` with explicit slug field.
   - What's unclear: Whether existing URLs need 301 redirects (content is placeholder so likely no).
   - Recommendation: Use `[slug].astro` for new route. No redirects needed since old posts are placeholders being removed.

3. **`@astrojs/react` in integrations**
   - What we know: `sanity` v5 and `@sanity/astro` require React as peer dep, but Studio is externally hosted.
   - What's unclear: Whether React needs to be in Astro integrations list (which would add React to the site bundle) or just installed as a package.
   - Recommendation: Install `@astrojs/react`, `react`, `react-dom` as packages but do NOT add `react()` to the `integrations` array in `astro.config.mjs`. This satisfies peer dep resolution without bundling React into the site.

---

## Sources

### Primary (HIGH confidence)

- [sanity-io/sanity-astro README](https://raw.githubusercontent.com/sanity-io/sanity-astro/main/packages/sanity-astro/README.md) — Virtual module API, configuration
- [Sanity Astro Quickstart](https://www.sanity.io/docs/astro-quickstart/displaying-content-in-an-astro-front-end) — Current official guide
- [Scheduled Publishing Moved to Core](https://www.sanity.io/docs/changelog/e6013ee5-8214-4e03-9593-f7b19124b8a3) — April 2024, v3.39.0
- [Sanity Studio v5 Blog Post](https://www.sanity.io/blog/sanity-studio-v5) — React 19.2 requirement, December 2025
- [@sanity/image-url CHANGELOG](https://github.com/sanity-io/image-url/blob/main/CHANGELOG.md) — v2 breaking changes (named export)
- [npm: @sanity/astro 3.2.11](https://www.npmjs.com) — Verified via `npm view`
- [npm: @sanity/image-url 2.0.3](https://www.npmjs.com) — Verified via `npm view`
- [npm: sanity 5.11.0](https://www.npmjs.com) — Verified via `npm view`

### Secondary (MEDIUM confidence)

- [Sanity guide: Build blog with Astro and Sanity](https://www.sanity.io/guides/sanity-astro-blog) — Integration patterns
- [GitHub issue #135: sanity:client type resolution](https://github.com/sanity-io/sanity-astro/issues/135) — Known TypeScript issue with @astrojs/check

### Tertiary (LOW confidence)

- Web searches for ecosystem patterns — corroborated with official docs where possible

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Verified via `npm view`, official documentation
- Architecture patterns: HIGH — Official documentation, verified API
- Breaking changes: HIGH — Official changelogs (image-url, scheduled-publishing, sanity v5)
- Pitfalls: HIGH (breaking changes), MEDIUM (blog layout adaptation)
- Open questions: LOW (require planner judgment)

**Research date:** 2026-02-23
**Valid until:** 2026-04-15 (Sanity ecosystem moving; check again before executing)

---

**Notes for planner:**

1. **`createImageUrlBuilder` is the only correct import** — Default import is gone in v2
2. **No `@sanity/scheduled-publishing` package** — Use native `scheduledPublishing` key in `defineConfig()`
3. **React must be installed** but does NOT need to be in Astro integrations array for this project
4. **Markdoc is effectively unused** for blog — no `.mdoc` files exist, removing it is safe
5. **Portfolio content collection stays** — only blog collection is removed from `content.config.ts`
6. **`BlogLayout.astro` needs prop adaptation** — `pubDate`→`publishedAt`, `author` slug logic removed, `image` becomes CDN URL
7. **`BlogPostingSchema.astro` needs a `description` source** — decision pending (planner resolves via open question above)
8. **Route changes from `[...id]` to `[slug]`** — safe since existing posts are placeholders
