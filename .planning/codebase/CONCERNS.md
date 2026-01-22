# Codebase Concerns

**Analysis Date:** 2026-01-22

## Tech Debt

**TypeScript `any` Types:**
- Issue: Several files use `any` type instead of proper typing, bypassing TypeScript's type safety
- Files:
  - `src/components/scripts/postScripts.ts:9` - `(author: any, dateStr: any)`
  - `src/components/ui/NavigationBar.astro:39` - `navActions.map((action: any) => ...)`
  - `src/pages/blog/[...page].astro:16,20,31-32` - Multiple `any` usages in getStaticPaths and sorting
- Impact: Type errors may slip through, IDE autocomplete disabled, maintenance difficulty
- Fix approach: Define proper interfaces for blog post data, navigation actions, and date parameters

**@ts-ignore Comments in ThemeScripts.astro:**
- Issue: Four `@ts-ignore` comments suppressing TypeScript errors for custom element properties
- Files: `src/components/scripts/ThemeScripts.astro:522,532,536,541`
- Impact: Custom `_animRAF` property on HTMLElement bypasses type checking
- Fix approach: Extend HTMLElement interface or use a WeakMap to store animation frame IDs

**Duplicate Function Definition:**
- Issue: `formattedAuthorName` is defined in two places with identical implementation
- Files:
  - `src/components/scripts/postScripts.ts:2-6`
  - `src/layouts/BlogLayout.astro:27-31`
- Impact: Code duplication, maintenance burden, risk of divergence
- Fix approach: Export from single location (`postScripts.ts`) and import where needed

**Hardcoded Theme Site URL:**
- Issue: Site configuration contains original theme URL and branding, not customized for this project
- Files:
  - `src/config/config.ts:25-28` - Mizu Light theme title/description
  - `astro.config.mjs:13` - `site: "https://mizu-theme.netlify.app/"`
- Impact: SEO issues, incorrect canonical URLs, wrong branding in production
- Fix approach: Update config.ts and astro.config.mjs with actual site details

**Large Monolithic Script File:**
- Issue: ThemeScripts.astro contains 549 lines of client-side JavaScript in one file
- Files: `src/components/scripts/ThemeScripts.astro` (549 lines)
- Impact: Hard to maintain, test, and debug; blocks rendering
- Fix approach: Split into separate modules: theme-switcher.ts, scroll-animations.ts, pricing-toggle.ts, scrollspy.ts, etc.

## Known Bugs

**Duplicate Canonical Link Tag:**
- Symptoms: SEO component always outputs canonical link, then conditionally outputs another
- Files: `src/components/blocks/head/partials/Seo.astro:37-38`
- Trigger: On every page load, two `<link rel="canonical">` tags are rendered
- Workaround: None; this causes duplicate canonical warnings in SEO tools
- Fix: Remove line 37 (unconditional canonical) and keep only the conditional one

**Silent Video Play Failure:**
- Symptoms: Videos may fail to autoplay without any user feedback
- Files: `src/components/scripts/ThemeScripts.astro:284`
- Trigger: Browser autoplay policies block video; `.catch(() => {})` silently swallows error
- Workaround: None implemented
- Fix: Add user feedback or fallback behavior when autoplay fails

**Duplicate CSS Keyframe Definition:**
- Symptoms: `fadeInColorTransparentDark` keyframe defined twice in global.css
- Files: `src/styles/global.css:83-88` and `89-94`
- Trigger: Always present, second definition overwrites first
- Workaround: None needed, but indicates copy-paste error
- Fix: Remove duplicate keyframe definition (lines 89-94)

## Security Considerations

**No Input Sanitization on postSubtitle:**
- Risk: Function constructs HTML with potentially unsanitized author input
- Files: `src/components/scripts/postScripts.ts:20-21,25`
- Current mitigation: Author comes from controlled blog frontmatter
- Recommendations: Sanitize author string before inserting into HTML anchor tag; consider using template literals with proper escaping

**Environment Variable Exposure:**
- Risk: Google Analytics ID exposed via `import.meta.env.PUBLIC_GA_TRACKING_ID`
- Files: `src/config/analytics.ts:7`
- Current mitigation: This is intentional for client-side tracking (PUBLIC_ prefix)
- Recommendations: Ensure no sensitive env vars accidentally prefixed with PUBLIC_

**No Content Security Policy:**
- Risk: No CSP headers configured, vulnerable to XSS
- Files: No CSP configuration found
- Current mitigation: Astro's SSG output reduces attack surface
- Recommendations: Add CSP headers in netlify.toml or via Netlify headers file

## Performance Bottlenecks

**Large Client-Side JavaScript Bundle:**
- Problem: Multiple heavyweight client scripts loaded on every page
- Files:
  - `src/components/scripts/ThemeScripts.astro` (549 lines)
  - `lottie-web` (large animation library in package.json)
  - `swiper` (carousel library)
- Cause: All scripts bundled and executed regardless of page needs
- Improvement path: Lazy-load Lottie/Swiper only on pages that use them; code-split ThemeScripts

**Eager Image Glob Import:**
- Problem: All images under `/src/assets/` imported eagerly at build time
- Files: `src/components/blocks/onboarding/Steps.astro:54-57`
- Cause: `import.meta.glob(..., { eager: true })` loads all images into memory
- Improvement path: Use lazy import or filter glob pattern to only load needed images

**No Image Optimization Strategy:**
- Problem: Blog images passed as strings to Astro Image component
- Files: `src/layouts/BlogLayout.astro:61-68`
- Cause: Image paths come from frontmatter as strings, not imported assets
- Improvement path: Use Astro's getImage() for remote/string images or move to content collection images

## Fragile Areas

**Pricing Toggle Animation System:**
- Files: `src/components/scripts/ThemeScripts.astro:433-548`
- Why fragile: Relies on specific DOM structure (`.card--pricing-price__amount`, data attributes) and custom element properties (`el._animRAF`)
- Safe modification: Test thoroughly with pricing page; ensure data attributes match
- Test coverage: None - no automated tests exist

**Scrollspy/Stepper Navigation:**
- Files: `src/components/scripts/ThemeScripts.astro:294-429`
- Why fragile: Tightly coupled to DOM class names (`.stepper`, `.stepper__nav`, `.stepper__step`); uses magic number for header offset (212px)
- Safe modification: Update HEADER_OFFSET_PX if header height changes; maintain class naming
- Test coverage: None

**Theme Switching Logic:**
- Files: `src/components/scripts/ThemeScripts.astro:78-163`
- Why fragile: Multiple sources of truth (localStorage, system preference, forced modes via classes); re-initializes on multiple events
- Safe modification: Test all theme states (light, dark, auto) after changes
- Test coverage: None

## Scaling Limits

**Blog Pagination:**
- Current capacity: pageSize: 100 in `[...page].astro`
- Limit: All posts loaded into memory; sorting done client-side for each page
- Scaling path: Implement server-side pagination or reduce page size significantly

**JSON Data Files:**
- Current capacity: All navigation/footer/features data stored in JSON files
- Limit: No CMS integration; content updates require code deployment
- Scaling path: Integrate headless CMS (already have Markdoc support)

## Dependencies at Risk

**React Integration Complexity:**
- Risk: Both Preact and React listed in dependencies; potential conflicts
- Impact: `@astrojs/preact` and `@astrojs/react` both present in package.json
- Migration plan: Standardize on one React-like library; remove unused integration

**Outdated Theme Template:**
- Risk: Using "astro-oxygenna-theme" template; updates may diverge from customizations
- Impact: Difficult to merge upstream fixes/features
- Migration plan: Document all customizations; consider forking or removing theme dependency

## Missing Critical Features

**No Error Boundaries:**
- Problem: No React error boundaries for component failures
- Blocks: Graceful degradation when components crash

**No 500 Error Page:**
- Problem: Only 404.astro exists; no custom server error page
- Blocks: Poor UX on server errors (though SSG reduces this risk)

**No Analytics Fallback:**
- Problem: If GA tracking ID not set, empty script tags still rendered
- Blocks: Clean production without analytics configured

## Test Coverage Gaps

**Complete Absence of Tests:**
- What's not tested: Entire codebase - no test files found
- Files: No `*.test.*` or `*.spec.*` files exist; no test framework configured
- Risk: All changes are manual verification only; regressions undetected
- Priority: High

**Untested Client Scripts:**
- What's not tested: Theme switching, scroll animations, pricing toggle, scrollspy
- Files: `src/components/scripts/ThemeScripts.astro`
- Risk: Browser-specific bugs, race conditions, animation failures
- Priority: High

**Untested Data Transformations:**
- What's not tested: Blog post sorting, author name formatting, date formatting
- Files:
  - `src/pages/blog/[...page].astro:31-33`
  - `src/components/scripts/postScripts.ts`
  - `src/layouts/BlogLayout.astro:27-31`
- Risk: Incorrect date sorting, malformed author links
- Priority: Medium

---

*Concerns audit: 2026-01-22*
