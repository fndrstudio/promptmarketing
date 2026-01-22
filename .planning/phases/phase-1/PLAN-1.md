# Plan 1: Config & Branding Text

**Phase:** 1 - Foundation & Branding
**Wave:** 1 (no dependencies)
**Requirements:** CONTENT-01, BRAND-01

## Goal

Update site configuration and replace all "Mizu Light" template branding text with "PromptMarketing" identity across the codebase.

## Must Haves

**Truths (verifiable states):**
- `src/config/config.ts` contains "PromptMarketing" title and description
- `astro.config.mjs` site URL updated for production
- Zero occurrences of "Mizu Light" in src/ directory
- Zero occurrences of "Mizu" in page content

**Artifacts (files created/modified):**
- `src/config/config.ts` - Site config with PromptMarketing branding
- `astro.config.mjs` - Production site URL

**Key Links (integration points):**
- Config feeds into Layout.astro meta tags
- Site URL affects canonical URLs and sitemap

## Tasks

<task id="1.1">
<type>edit</type>
<description>Update site configuration with PromptMarketing identity</description>
<files>
- src/config/config.ts
- astro.config.mjs
</files>
<action>
1. In `src/config/config.ts`:
   - Change siteTitle to "PromptMarketing | Operationalizing Machine Trust"
   - Change siteDescription to "Empower your brand through Relevance Engineering. We architect the knowledge layers that ensure brands are understood, trusted, and successfully represented by AI systems."
   - Update logo.alt to "PromptMarketing logo"

2. In `astro.config.mjs`:
   - Update site URL to production domain (placeholder: "https://promptmarketing.ai/")
</action>
<verify>
- `npm run build` succeeds
- Site title appears correctly in development
</verify>
<done>Config files updated with PromptMarketing branding</done>
</task>

<task id="1.2">
<type>edit</type>
<description>Replace all Mizu Light branding text in source files</description>
<files>
- src/pages/index.astro
- src/pages/pricing.astro
- src/pages/features.astro
- src/pages/contact.astro
- src/pages/terms.astro
- src/pages/blog/[...page].astro
- src/components/blocks/hero/CenteredHeroCTA.astro
- src/components/blocks/hero/BasicHeroSplitImageCTA.astro
- src/components/blocks/features/MasonryGrid.astro
- src/components/blocks/faq/StickyFaq.astro
- src/components/blocks/contact/ContactInfoCards.astro
- src/components/ui/NotificationToast.astro
- src/data/json-files/footerNavigationData.json
</files>
<action>
1. Search and replace all instances of:
   - "Mizu Light" → "PromptMarketing"
   - "Mizu" → "PromptMarketing" (in brand contexts)
   - Update any taglines/descriptions to align with PromptMarketing messaging

2. In footerNavigationData.json:
   - Update copyright text to "PromptMarketing"
   - Update any template-specific footer links
</action>
<verify>
- `grep -r "Mizu" src/` returns zero matches
- All pages render without errors
- Footer displays "PromptMarketing" copyright
</verify>
<done>Zero "Mizu" or "Mizu Light" references in codebase</done>
</task>

## Verification

```bash
# Verify no Mizu branding remains
grep -ri "mizu" src/ && echo "FAIL: Mizu found" || echo "PASS: No Mizu found"

# Verify config updated
grep -q "PromptMarketing" src/config/config.ts && echo "PASS: Config updated"

# Build check
npm run build
```

## Notes

- Keep logo references pointing to existing files (PLAN-3 handles asset replacement)
- Preserve template structure; only change branding text
- Production URL may need final domain confirmation later

---
*Plan created: 2026-01-22*
