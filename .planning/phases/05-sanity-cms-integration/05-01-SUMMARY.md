---
phase: 05-sanity-cms-integration
plan: 01
subsystem: cms
tags: [sanity, sanity-v5, astro, @sanity/astro, @sanity/client, @sanity/image-url, astro-portabletext, portable-text, groq]

# Dependency graph
requires:
  - phase: 04-technical-seo
    provides: BlogPostingSchema requiring seoDescription field on blog posts
provides:
  - Sanity project configuration (pbui2f8s, production dataset)
  - Blog post document schema with Portable Text content
  - Sanity client for GROQ queries
  - GROQ query constants for listing and single post retrieval
  - Image URL builder via urlFor
affects:
  - 05-02 (blog page integration - consumes client.ts, queries.ts, image.ts)
  - 05-03 (studio deployment - uses sanity.config.ts and sanity.cli.ts)

# Tech tracking
tech-stack:
  added:
    - "@sanity/astro@3.2.11 - Astro integration with /admin studio route"
    - "sanity@5.11.0 - Core Sanity Studio"
    - "@sanity/client@7.15.0 - GROQ query client"
    - "@sanity/image-url@2.0.3 - Image URL builder"
    - "astro-portabletext@0.13.0 - Render Portable Text in Astro"
    - "react@19.2.4, react-dom@19.2.4, @astrojs/react@4.4.2 - Peer deps for sanity v5"
  patterns:
    - "Named export createImageUrlBuilder (v2 API) - NOT default import"
    - "GROQ queries as exported string constants (not functions) in queries.ts"
    - "sanityClient created once in client.ts and imported by pages"
    - "scheduledPublishing() removed - not available as sanity/scheduled-publishing in v5.11.0"

key-files:
  created:
    - sanity.config.ts
    - sanity.cli.ts
    - schemas/blog-post.ts
    - schemas/index.ts
    - src/lib/sanity/client.ts
    - src/lib/sanity/queries.ts
    - src/lib/sanity/image.ts
  modified:
    - astro.config.mjs
    - package.json
    - src/env.d.ts

key-decisions:
  - "scheduledPublishing removed from sanity.config.ts - sanity/scheduled-publishing does not exist as a subpath export in v5.11.0"
  - "react/react-dom/@astrojs/react installed as peer deps but NOT added to Astro integrations array"
  - "seoDescription field added to blog post schema to satisfy BlogPostingSchema description requirement"
  - "Author is simple string field - NOT a reference to an Author document (per locked decisions)"
  - "Five predefined categories matching consultancy pillars"

patterns-established:
  - "src/lib/sanity/ directory holds client.ts, queries.ts, image.ts - import from here in pages"
  - "GROQ queries exported as named string constants for type-safe reuse"

# Metrics
duration: 3min
completed: 2026-02-23
---

# Phase 05 Plan 01: Sanity CMS Integration - Foundation Summary

**Sanity v5 installed with @sanity/astro integration, blog post Portable Text schema, and client utilities (GROQ queries + image URL builder) ready for Plan 02 blog page wiring**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-23T10:31:32Z
- **Completed:** 2026-02-23T10:35:29Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Sanity packages installed and Astro integration configured with project pbui2f8s
- Blog post schema defined with Portable Text content, predefined categories, and seoDescription field
- Client utilities (sanityClient, getAllPostsQuery, getPostBySlugQuery, urlFor) ready for import in Plan 02 pages
- markdoc removed as blog now moves entirely to Sanity CMS

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages and configure Sanity + Astro integration** - `a030cf4` (chore)
2. **Task 2: Create blog post schema and client utilities** - `b6c9657` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `sanity.config.ts` - Sanity project config (pbui2f8s, structureTool, blogPost schema)
- `sanity.cli.ts` - CLI config for `sanity` commands
- `schemas/blog-post.ts` - Blog post document schema with all fields
- `schemas/index.ts` - Schema barrel export
- `src/lib/sanity/client.ts` - createClient instance, exports sanityClient
- `src/lib/sanity/queries.ts` - getAllPostsQuery and getPostBySlugQuery GROQ strings
- `src/lib/sanity/image.ts` - urlFor builder using createImageUrlBuilder
- `astro.config.mjs` - Replaced markdoc() with sanity() integration
- `package.json` - Added 7 Sanity packages, removed @astrojs/markdoc
- `src/env.d.ts` - Added @sanity/astro/module reference

## Decisions Made

- **scheduledPublishing removed:** `sanity/scheduled-publishing` is not a valid subpath export in sanity v5.11.0. Removed from sanity.config.ts to fix type error.
- **React as peer dep only:** react/react-dom/@astrojs/react installed for sanity v5 dependency resolution but NOT added to Astro integrations array (per plan spec).
- **seoDescription field:** Added to blog post schema to satisfy the existing BlogPostingSchema component which requires a `description` prop for Google rich results.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed non-existent scheduledPublishing import**
- **Found during:** Task 1 (type check after creating sanity.config.ts)
- **Issue:** Plan specified `import { scheduledPublishing } from 'sanity/scheduled-publishing'` but this subpath does not exist in sanity v5.11.0 - causes TS error ts(2307)
- **Fix:** Removed scheduledPublishing import and plugin call from sanity.config.ts
- **Files modified:** sanity.config.ts
- **Verification:** `npx astro check` returned 0 errors after fix
- **Committed in:** a030cf4 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug - incorrect import path in plan)
**Impact on plan:** Fix necessary for build to succeed. Studio still works with structureTool() alone. Scheduled publishing can be added in Plan 03 via correct package if needed.

## Issues Encountered

None beyond the deviation above.

## User Setup Required

**External services require manual configuration.**

The `SANITY_API_TOKEN` environment variable needs to be set before Plan 02 can fetch data:

1. Go to [manage.sanity.io](https://manage.sanity.io) -> Project pbui2f8s -> API -> Tokens
2. Create a new "Read-only" API token
3. Add to `.env.local`: `SANITY_API_TOKEN=<token>`
4. Add to Vercel project environment variables

## Next Phase Readiness

- Plan 02 (blog page integration) can now import from `src/lib/sanity/` and use the GROQ queries
- Plan 03 (studio deployment) has sanity.config.ts and sanity.cli.ts ready
- Build passes: `npx astro build` completes successfully
- No blockers for Plan 02

---

*Phase: 05-sanity-cms-integration*
*Completed: 2026-02-23*

## Self-Check: PASSED
