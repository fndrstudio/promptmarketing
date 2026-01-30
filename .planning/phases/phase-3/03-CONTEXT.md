# Phase 3: Content & Pages - Context

**Gathered:** 2026-01-23
**Status:** Planning complete (4 plans created)

<vision>
## How This Should Work

The site should have a clean, functional structure that matches the Layout document. Pages should be purposeful - no orphaned template leftovers, no broken links.

**Page Structure:**
- **Homepage** - Hero with pitch, social proof, problem statement, 4-pillar solution overview, platform visual, CTA
- **How We Work** - Deep dive into the 4-step methodology (Intelligence, Optimization, Commerce, Advertising)
- **About Us** - Founder story, values, mission/vision
- **Case Studies/Portfolio** - Blog-style collection of client work (can be minimal initially)
- **Contact** - Consultation request, direct contact info
- **Blog** - Insights and thought leadership

**Navigation should work:**
- All nav links point to real pages
- No ghost pages sitting around unused
- Legal footer simplified (Terms/Privacy only, both point to same terms page)

</vision>

<essential>
## What Must Be Nailed

- **4 pillars, not 3**: Intelligence, Optimization, Commerce, Advertising (per Layout doc)
- **features.astro → How We Work**: Repurpose existing page rather than creating new
- **Portfolio uses blog pattern**: Duplicate blog collection structure for case studies
- **No broken links**: Every nav item must resolve to a real page
- **pricing.astro removed**: Delete the SaaS pricing page - doesn't fit consultancy model

</essential>

<specifics>
## Specific Ideas

**From Layout Document:**
- Hero: ~8 word title, 1-2 sentence pitch, primary + secondary buttons
- Social proof: logo slider with "Trusted by innovative brands"
- Problem section: "The Search Landscape has Changed" style framing
- 4 solution cards: Intelligence, Optimization, Commerce, Advertising
- Platform/dashboard visual section (can be placeholder for now)

**Footer changes:**
- Remove "Conditions" link
- Point both Terms and Privacy to /terms
- Keep newsletter signup component

**Page repurposing:**
- `features.astro` → rename to `how-we-work.astro`
- `pricing.astro` → delete
- Blog pattern → duplicate for Portfolio/Case Studies

</specifics>

<notes>
## Plans Created

Phase 3 now has 4 plans covering all requirements:

**03-01-PLAN.md: Features → How We Work + Delete Pricing**
- Rename features.astro to how-we-work.astro
- Delete pricing.astro (SaaS model doesn't fit)
- Update contact.astro content voice

**03-02-PLAN.md: Create About Page**
- Amsterdam Clubhouse section
- Gang of Super Specialists positioning
- Values and philosophy content

**03-03-PLAN.md: Create Portfolio Page**
- Blog-style content collection for case studies
- Portfolio listing and detail pages
- Placeholder case study content

**03-04-PLAN.md: Homepage 4-Pillar Update + Footer Cleanup**
- Update featuresData.json to 4 pillars (Intelligence, Optimization, Commerce, Advertising)
- Clean footer legal links (remove Conditions, point Privacy to /terms)
- Update hero/CTA messaging per Layout doc

**Wave Structure:**
- Wave 1: All 4 plans can run in parallel (no dependencies)

</notes>

---

*Phase: 03-content-pages*
*Context gathered: 2026-01-23*
