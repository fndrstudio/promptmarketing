# Phase 3 Plan 1: Features to How We Work + Delete Pricing Summary

**One-liner:** Replaced SaaS-style features/pricing pages with consultancy-focused how-we-work methodology page

---

## Metadata

```yaml
phase: 3
plan: 1
subsystem: content-pages
tags: [astro, pages, content, consultancy-voice]
dependency-graph:
  requires: [phase-2]
  provides: [how-we-work-page, removed-saas-pages]
  affects: [navigation, site-structure]
tech-stack:
  added: []
  patterns: [consultancy-voice, methodology-presentation]
key-files:
  created:
    - src/pages/how-we-work.astro
  modified:
    - src/pages/contact.astro
  deleted:
    - src/pages/features.astro
    - src/pages/pricing.astro
decisions:
  - id: saas-pages-removal
    choice: Delete both features.astro and pricing.astro
    reason: SaaS pricing model doesn't fit consultancy business
metrics:
  duration: ~5 minutes
  completed: 2026-01-23
```

---

## What Was Built

### Task 1: Created how-we-work.astro
Created new `/how-we-work` page with consultancy voice:
- SEO focused on "four-step methodology" and "AI systems"
- Hero: "Our Four-Step Solution" with systematic methodology messaging
- Uses StickyBasicFeatures component for service methodology display
- CTA: "Ready to Start?" pointing to /contact

**Commit:** `1559c1e` - feat(03-01): create how-we-work page with consultancy voice

### Task 2: Deleted features.astro
Removed old features page containing SaaS-style content:
- Original had "Launch and Grow", "Try it for free!" language
- CTA pointed to /pricing (which no longer exists)

**Commit:** `55e07fd` - chore(03-01): delete features.astro

### Task 3: Deleted pricing.astro
Removed SaaS pricing page:
- Contained tiered pricing table (doesn't fit consultancy model)
- Had "Simple, Fair Pricing", "cancel anytime" language
- Contact page now handles engagement inquiries

**Commit:** `824ea15` - chore(03-01): delete pricing.astro

### Task 4: Updated contact.astro
Updated content voice to scientific, audit-focused language:
- SEO: "Start a conversation about AI visibility"
- Hero: "Start With a Conversation" (removed "take-off" language)
- CTA: "Want to Join the Team?" with technical specialist messaging

**Commit:** `4754d16` - feat(03-01): update contact.astro with consultancy voice

---

## Verification Results

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| /how-we-work returns | 200 | 200 | PASS |
| /features returns | 404 | 404 | PASS |
| /pricing returns | 404 | 404 | PASS |
| "try it for free" language | Not found | Not found | PASS |
| "launch your" language | Not found | Not found | PASS |
| "startup" language | Not found | Not found | PASS |
| how-we-work CTA | /contact | /contact | PASS |
| contact CTA | /contact | /contact | PASS |

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Content Voice Changes

### Removed SaaS Language
- "Launch your next big idea today"
- "Try it for free!"
- "Join creators, teams, and startups"
- "Choose the plan that fits your workflow"
- "cancel anytime"
- "Got a question before take-off?"

### Added Consultancy Language
- "Our Four-Step Solution"
- "A systematic methodology for the AI-mediated market"
- "diagnose, architect, prepare, and amplify"
- "turning AI visibility from guesswork into engineering"
- "Book a consultation"
- "Start With a Conversation"
- "specialists who think differently about the intersection of AI, marketing, and technical architecture"

---

## Dependencies & Impact

### Navigation Impact
- `/how-we-work` route was already configured in navigation from Phase 2
- No navigation updates needed
- Removed pages (/features, /pricing) were not in navigation

### Future Work
- BasicFeatures component reads from featuresData.json (updated in 03-04-PLAN)
- pricing.json data file can remain (unused) or be cleaned up later

---

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| src/pages/how-we-work.astro | Created | +45 |
| src/pages/features.astro | Deleted | -41 |
| src/pages/pricing.astro | Deleted | -59 |
| src/pages/contact.astro | Modified | +7/-7 |

**Net change:** -55 lines (cleaned up SaaS content)

---

## Commits

1. `1559c1e` - feat(03-01): create how-we-work page with consultancy voice
2. `55e07fd` - chore(03-01): delete features.astro
3. `824ea15` - chore(03-01): delete pricing.astro
4. `4754d16` - feat(03-01): update contact.astro with consultancy voice
