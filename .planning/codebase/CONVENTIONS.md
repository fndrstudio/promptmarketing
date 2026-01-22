# Coding Conventions

**Analysis Date:** 2025-01-22

## Naming Patterns

**Files:**
- Astro components: PascalCase (e.g., `Button.astro`, `NavigationBar.astro`, `CenteredHeroCTA.astro`)
- TypeScript config files: camelCase (e.g., `navigationBar.ts`, `socialLinks.ts`, `config.ts`)
- JSON data files: camelCase (e.g., `featuresData.json`, `navigationBarData.json`)
- Markdown content: kebab-case (e.g., `blending-human-creativity.md`)
- CSS files: kebab-case (e.g., `global.css`)

**Functions:**
- camelCase for all functions (e.g., `getNavigationBarData()`, `isActivePath()`, `formattedAuthorName()`)
- Async functions prefixed with `get` for data fetching (e.g., `getFooterNavigationData()`)

**Variables:**
- camelCase for all variables (e.g., `heroData`, `navigationBarData`, `savedNavActions`)
- SCREAMING_SNAKE_CASE for constants in scripts (e.g., `ACTIVE_CLASS`, `HEADER_OFFSET_PX`)

**Types:**
- PascalCase for interfaces and types (e.g., `Props`, `NavItem`, `Config`, `Logo`)
- Type definitions co-located within files, not in separate type files

**CSS Classes:**
- BEM-like naming with double underscores for elements: `.header__menu`, `.card__header`, `.faq__item__title`
- Double dashes for modifiers: `.button--primary`, `.header--sticky`, `.card--transparent`
- Tailwind utility classes used extensively alongside custom classes

## Code Style

**Formatting:**
- Prettier v3.7.4 with plugins:
  - `prettier-plugin-astro` for Astro files
  - `prettier-plugin-tailwindcss` for Tailwind class sorting
- Tab indentation (observed in files)
- Single quotes for strings in TypeScript
- No trailing commas after last property

**Linting:**
- No ESLint configuration present
- TypeScript strict mode enabled via `astro/tsconfigs/strict`
- `strictNullChecks: true` enforced

**TypeScript Configuration:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

## Import Organization

**Order in Astro Components:**
1. Component imports (UI components, layouts)
2. Icon/asset imports
3. Data/config imports
4. Type definitions

**Example pattern from `src/layouts/Layout.astro`:**
```astro
---
// Components
import NavigationBar from '../components/ui/NavigationBar.astro'
import Main from '../components/ui/Main.astro'
import Footer from '../components/ui/Footer.astro'
import Header from '../components/blocks/head/Header.astro'
// Scripts
import Scripts from '../components/scripts/ThemeScripts.astro'
import GoogleTagManager from '../components/scripts/googleTagManagerBody.astro'
// Styles
import '../styles/global.css'
// Data
import { configData } from '../config/config'
// External CSS
import 'swiper/css'
import 'swiper/css/autoplay'
---
```

**Path Aliases:**
- No path aliases configured
- Use relative paths with `../` navigation

## Astro Component Structure

**Standard Component Pattern:**
```astro
---
// [Component Name]
// ------------
// Description: [Purpose description]
// Properties:
// - [Prop]: [Description]

// Components
// - UI
import ComponentA from './ComponentA.astro'

// Content
// - Props
type Props = {
	propA?: string
	propB?: 'option1' | 'option2'
}
const { propA = 'default', propB = 'option1' } = Astro.props
---

<div class="component">
	<slot />
</div>

<style>
	@reference '../../styles/global.css';
	.component {
		@apply [tailwind classes];
	}
</style>
```

**Key Conventions:**
- Always include a descriptive header comment with component name, description, and properties
- Use `type Props` instead of `interface Props`
- Destructure props with defaults in a single line
- Use `class:list` for conditional class binding
- Reference global CSS with `@reference` directive in scoped styles

## Error Handling

**Patterns:**
- Minimal explicit error handling in components
- Optional chaining used for safety (e.g., `item.submenu?.map()`)
- Nullish coalescing for defaults (e.g., `decorationType ?? decoration ?? 'all'`)
- No try-catch blocks observed in component logic

**Validation:**
- Zod schema validation for content collections in `src/content.config.ts`
- TypeScript strict mode provides compile-time type checking

## Logging

**Framework:** Browser console (no logging library)

**Patterns:**
- No structured logging observed
- Debug code should use `console.log()` and be removed before commit
- No server-side logging infrastructure

## Comments

**When to Comment:**
- Always include header comment block for Astro components
- Use `// - Category` to organize import sections
- JSX comments use `{/* Comment */}` syntax

**Component Header Pattern:**
```astro
// Button
// ------------
// Description: Interactive button element with various types, styles, and sizes.
// Properties:
// - Type: button type (link, button, submit, reset)
// - Size: button size (lg, base, sm)
```

**No JSDoc/TSDoc:**
- Type annotations via TypeScript `type Props` instead of JSDoc

## Function Design

**Size:** Keep functions small and focused. Most component logic is 5-20 lines.

**Parameters:**
- Use object destructuring with defaults for component props
- Boolean parameters should default to `false`

**Return Values:**
- Astro components return JSX templates
- Helper functions return typed values (strings, arrays, objects)
- Use early returns for guard clauses

## Module Design

**Exports:**
- Named exports for types and functions in `.ts` files
- Default exports avoided in config files (use named exports)
- Single responsibility per config file

**Example from `src/config/navigationBar.ts`:**
```typescript
export interface NavItem {
	name: string
	link: string
	submenu?: NavSubItem[]
}

export async function getNavigationBarData() {
	const { default: data } = await import('../data/json-files/navigationBarData.json')
	return data as NavData
}
```

**Barrel Files:**
- Not used in this codebase
- Import directly from source files

## CSS/Styling Conventions

**Tailwind Usage:**
- Use Tailwind classes directly in templates
- Custom classes defined in scoped `<style>` blocks
- Global styles in `src/styles/global.css`
- Dark mode via `.dark` class with custom variant: `@custom-variant dark (&:where(.dark, .dark *))`

**Custom Theme:**
- Colors defined with OKLCH color space
- Custom fonts: `Clash-Display` (headings), `Clash-Grotesk` (body)
- Custom animations defined in `@theme` block

**Responsive Design:**
- Mobile-first approach
- Breakpoints: `md:` (tablet), `lg:` (desktop)
- Use `lg:` prefix for desktop-specific styles

## Data Patterns

**Static Data:**
- Store in JSON files under `src/data/json-files/`
- Load via async `import()` in config helper functions
- Type cast results after import

**Content Collections:**
- Use Astro content collections for blog posts
- Define schema with Zod in `src/content.config.ts`
- Store markdown in `src/content/[collection]/`

---

*Convention analysis: 2025-01-22*
