# Plan 3: Assets & Template Cleanup

**Phase:** 1 - Foundation & Branding
**Wave:** 2 (can run after Wave 1, but independent within wave)
**Requirements:** BRAND-04, BRAND-05

## Goal

Replace logo and favicon assets with PromptMarketing branding, and remove all Oxygenna/template promotional content and links from the codebase.

## Must Haves

**Truths (verifiable states):**
- Logo files display PromptMarketing mark (not Mizu)
- Favicon shows PromptMarketing icon in browser tab
- No Oxygenna links, credits, or promotional content remain
- No template purchase/demo links in footer or elsewhere

**Artifacts (files created/modified):**
- `public/logo-light.svg` - PromptMarketing logo (light mode)
- `public/logo-dark.svg` - PromptMarketing logo (dark mode)
- `public/favicon.svg` - PromptMarketing favicon
- `public/og.jpg` - Updated Open Graph image (optional, can be placeholder)

**Key Links (integration points):**
- Logo referenced in src/config/config.ts
- Favicon loaded in Layout.astro head
- OG image used for social sharing

## Tasks

<task id="3.1">
<type>edit</type>
<description>Replace logo and favicon assets</description>
<files>
- public/logo-light.svg
- public/logo-dark.svg
- public/favicon.svg
- public/og.jpg (optional)
</files>
<action>
1. Create/obtain PromptMarketing logo assets:
   - Logo for light backgrounds (dark logo mark)
   - Logo for dark backgrounds (light/white logo mark)
   - Favicon (simplified icon version)

2. Replace existing files:
   - public/logo-light.svg → PromptMarketing logo (light bg)
   - public/logo-dark.svg → PromptMarketing logo (dark bg)
   - public/favicon.svg → PromptMarketing icon

3. If logo assets not yet available:
   - Create placeholder text-based SVG with "PM" or "PromptMarketing"
   - Use forest green color from new palette

4. Update OG image (public/og.jpg) if needed:
   - Can remain placeholder until final branding complete
</action>
<verify>
- Logo displays in navigation bar (both light/dark modes)
- Favicon shows in browser tab
- No visual remnants of Mizu branding
</verify>
<done>PromptMarketing logo and favicon display throughout site</done>
</task>

<task id="3.2">
<type>edit</type>
<description>Remove Oxygenna and template promotional content</description>
<files>
- src/data/json-files/footerNavigationData.json
- src/components/ui/Footer.astro (if contains credits)
- src/pages/terms.astro (if contains template references)
- Any other files with Oxygenna references
</files>
<action>
1. Search for Oxygenna references:
   ```bash
   grep -ri "oxygenna" src/
   grep -ri "template by" src/
   grep -ri "theme by" src/
   grep -ri "themeforest" src/
   ```

2. Remove/replace:
   - Footer credits mentioning Oxygenna or template origin
   - Links to Oxygenna website or ThemeForest
   - "Powered by" or "Template by" text
   - Any purchase/demo links for the template

3. In footerNavigationData.json:
   - Update copyright to "© 2026 PromptMarketing"
   - Remove any template-related footer links
   - Update company address/info if present

4. In terms.astro:
   - Remove template-specific terms if present
   - Update to PromptMarketing terms (or placeholder)
</action>
<verify>
- `grep -ri "oxygenna" src/` returns zero matches
- `grep -ri "themeforest" src/` returns zero matches
- Footer shows clean PromptMarketing branding
- No external links to template marketplace
</verify>
<done>Zero template promotional content or Oxygenna references</done>
</task>

## Verification

```bash
# Verify no Oxygenna references
grep -ri "oxygenna" src/ && echo "FAIL" || echo "PASS: No Oxygenna"
grep -ri "themeforest" src/ && echo "FAIL" || echo "PASS: No ThemeForest"

# Verify logo files exist
ls -la public/logo-*.svg public/favicon.svg

# Build check
npm run build

# Visual verification
npm run dev
# Check: Navigation logo, favicon in tab, footer content
```

## Notes

- If final logo assets aren't available, create placeholder SVGs
- Placeholder logo can be simple text "PromptMarketing" in forest green
- OG image can be updated later in Phase 4 (SEO) if needed
- Preserve footer structure; only remove/replace branding content

## Placeholder Logo SVG (if needed)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
  <text x="10" y="28" font-family="serif" font-size="24" font-weight="600" fill="#2d5016">
    PromptMarketing
  </text>
</svg>
```

---
*Plan created: 2026-01-22*
