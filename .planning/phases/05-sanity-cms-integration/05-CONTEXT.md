# Phase 5: Sanity CMS Integration - Context

**Gathered:** 2026-02-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable client self-service blog management through Sanity headless CMS. Replace existing markdown blog with Sanity-powered content. Client can create, edit, schedule, and publish blog posts without developer involvement.

</domain>

<decisions>
## Implementation Decisions

### Blog Post Schema
- Simple text field for author (not separate Author documents)
- Predefined categories for SEO and clean URLs (Claude picks categories based on consultancy context)
- Featured image only — no inline images in post content
- Minimal fields: title, slug, date, author, featured image, content, category
- No excerpt field, no reading time — keep it simple

### Content Migration
- Existing markdown posts are placeholders, not real content
- Keep markdown as styling reference during development
- Remove markdown blog infrastructure completely after Sanity integration works
- Seed Sanity with 2-3 sample posts matching current styling for client handoff

### Studio Deployment
- Sanity-hosted studio at `*.sanity.studio` (free, managed, simplest for client)
- Existing Sanity project: `pbui2f8s`
- Access restricted to client team only (invite-based)

### Draft/Preview Workflow
- Manual preview button — click to preview before publish (not live preview)
- **Deployment: Vercel** — native Astro support, preview deployments, free tier
- Scheduled publishing enabled — client can set future publish dates
- Rebuild strategy: Claude's discretion (Vercel Deploy Hooks + Sanity webhooks)

### Claude's Discretion
- Specific category names for the blog
- Preview route implementation details
- Rebuild trigger configuration (depends on deployment platform)
- GROQ query structure and optimization
- Portable Text serialization approach

</decisions>

<specifics>
## Specific Ideas

- Client should see how the blog looks immediately after handoff — hence 2-3 sample posts
- "Cheapest/safest/easiest for client" is the guiding principle for infrastructure choices
- Sanity-hosted studio chosen specifically because it's free and Sanity manages uptime

</specifics>

<blockers>
## Blockers to Resolve

None — Vercel selected as deployment platform (2026-02-09)

</blockers>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-sanity-cms-integration*
*Context gathered: 2026-02-09*
