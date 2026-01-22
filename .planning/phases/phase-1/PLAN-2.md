# Plan 2: Visual Identity - Colors & Fonts

**Phase:** 1 - Foundation & Branding
**Wave:** 1 (no dependencies)
**Requirements:** BRAND-02, BRAND-03

## Goal

Transform the visual identity from Mizu Light's orange/neutral palette to PromptMarketing's "Scientific Forest" aesthetic with forest green colors and new typography.

## Must Haves

**Truths (verifiable states):**
- Primary color palette is forest green (dark, scientific feel)
- Secondary color is lighter forest green
- Accent color is gold
- H1/headings use tight serif typeface
- Body text uses modern rounded sans-serif

**Artifacts (files created/modified):**
- `src/styles/global.css` - Updated @theme colors and font definitions
- `public/fonts/` - New font files (serif + sans-serif)

**Key Links (integration points):**
- Colors used via Tailwind utilities (primary-*, neutral-*)
- Fonts referenced in --font-headings and --font-body CSS variables
- All components inherit from global.css theme

## Tasks

<task id="2.1">
<type>edit</type>
<description>Update Tailwind color palette to forest green + gold</description>
<files>
- src/styles/global.css
</files>
<action>
Update the @theme block color definitions:

1. Replace primary palette with forest green (OKLCH):
   - primary-50: very light forest green
   - primary-100-400: lighter forest green variations (secondary)
   - primary-500-700: core forest green (primary)
   - primary-800-950: deep forest green

2. Add gold accent colors (use primary for now, or add --color-accent-*):
   - Consider: accent-400/500/600 for gold highlights

3. Suggested forest green OKLCH values:
   - Primary forest: oklch(35% 0.1 145) to oklch(45% 0.12 145)
   - Light forest: oklch(85% 0.05 145) to oklch(65% 0.08 145)
   - Gold accent: oklch(75% 0.15 85) range

4. Update neutral palette if needed for dark "Obsidian Forest" aesthetic
</action>
<verify>
- `npm run dev` shows forest green as primary color
- Buttons, links, and accents display new colors
- Dark mode still functions correctly
</verify>
<done>Color palette displays forest green primary with gold accents</done>
</task>

<task id="2.2">
<type>edit</type>
<description>Replace fonts with tight serif (headings) and rounded sans-serif (body)</description>
<files>
- src/styles/global.css
- public/fonts/ (new font files)
</files>
<action>
1. Select and download fonts:
   - Headings: Tight serif (suggestions: Playfair Display, Cormorant, Libre Baskerville)
   - Body: Modern rounded sans-serif (suggestions: Nunito, Quicksand, Varela Round)

2. Add font files to public/fonts/:
   - Create directories for each font family
   - Include woff2, woff, ttf formats for browser compatibility

3. Update global.css @font-face declarations:
   - Replace Clash-Display with new serif font
   - Replace Clash-Grotesk with new sans-serif font

4. Update @theme font variables:
   - --font-headings: 'NewSerifFont', serif
   - --font-body: 'NewSansFont', sans-serif

5. Verify typography rules (h1-h6, body) still apply correctly
</action>
<verify>
- Headings display in tight serif font
- Body text displays in rounded sans-serif
- Font weights render correctly (variable font support)
- No FOUT (flash of unstyled text) issues
</verify>
<done>New typography system with serif headings and sans-serif body</done>
</task>

## Verification

```bash
# Build and check for CSS errors
npm run build

# Visual verification (manual)
npm run dev
# Check: Homepage hero heading (serif), body paragraphs (sans-serif)
# Check: Primary buttons show forest green
# Check: Links and accents show new colors
```

## Notes

- Current fonts (Clash-Display, Clash-Grotesk) can be removed after verification
- OKLCH color space maintains consistency with existing setup
- Consider keeping animation keyframes unchanged
- Gold accent may be added as custom color or utilize existing accent slot
- Font selection should consider: licensing (free for commercial use), variable font support

## Font Recommendations

**Serif (Headings) - Tight/Editorial:**
- Playfair Display (Google Fonts, variable)
- Cormorant (Google Fonts, variable)
- Source Serif Pro (Adobe, open source)

**Sans-Serif (Body) - Modern/Rounded:**
- Nunito (Google Fonts, variable, rounded)
- Quicksand (Google Fonts, variable, geometric rounded)
- DM Sans (Google Fonts, variable, clean modern)

---
*Plan created: 2026-01-22*
