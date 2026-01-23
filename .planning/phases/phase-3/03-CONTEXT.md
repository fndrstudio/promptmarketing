# Phase 3: Content & Pages - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning (plans need revision)

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
## Additional Context

The current Phase 3 plans (03-01, 03-02) were created before this discussion and need revision:

**03-01-PLAN.md issues:**
- Based on 3 pillars, should be 4 pillars
- Updates pricing.astro which should be deleted instead
- Doesn't handle the features → how-we-work rename

**03-02-PLAN.md:**
- About page creation is still valid
- May need minor adjustments for Layout doc structure

**New work needed:**
- Portfolio page creation (blog-style collection)
- Footer link cleanup (conditions removal, privacy redirect)
- Homepage content update for 4-pillar structure
- featuresData.json update for 4 pillars

</notes>

---

*Phase: 03-content-pages*
*Context gathered: 2026-01-23*
