# Testing Patterns

**Analysis Date:** 2025-01-22

## Test Framework

**Runner:**
- Not configured
- No test framework installed (no Jest, Vitest, or Playwright in dependencies)

**Assertion Library:**
- None installed

**Run Commands:**
```bash
# No test commands available in package.json
npm run dev              # Development server
npm run build            # Build with type checking (astro check && astro build)
npm run preview          # Preview production build
```

## Test File Organization

**Location:**
- No test files exist in the codebase
- No `__tests__/` directories
- No `.test.ts`, `.spec.ts`, or `.test.tsx` files

**Recommended Structure (if adding tests):**
```
src/
├── components/
│   └── ui/
│       ├── Button.astro
│       └── Button.test.ts    # Co-located unit tests
├── config/
│   └── navigationBar.ts
│   └── navigationBar.test.ts
└── __tests__/                 # Integration tests
    └── integration/
```

## Test Structure

**No existing patterns to reference.**

**Recommended Pattern for Astro Components:**
```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import Button from './Button.astro'

describe('Button', () => {
  it('renders with default props', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Button, {
      slots: { default: 'Click me' }
    })
    expect(result).toContain('button')
    expect(result).toContain('Click me')
  })

  it('renders as link when link prop provided', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Button, {
      props: { link: '/about' },
      slots: { default: 'About' }
    })
    expect(result).toContain('<a href="/about"')
  })
})
```

## Mocking

**Framework:** None installed

**Recommended Approach (Vitest):**
```typescript
import { vi, describe, it, expect } from 'vitest'

// Mock JSON imports
vi.mock('../data/json-files/navigationBarData.json', () => ({
  default: {
    logo: { src: '/logo.svg', alt: 'Test' },
    navItems: [],
    navActions: []
  }
}))

// Mock config functions
vi.mock('../config/navigationBar', () => ({
  getNavigationBarData: vi.fn().mockResolvedValue({
    logo: { src: '/logo.svg' },
    navItems: [],
    navActions: []
  })
}))
```

**What to Mock:**
- JSON data file imports
- External API calls (none currently exist)
- Environment variables (`import.meta.env`)

**What NOT to Mock:**
- Astro's built-in components
- Tailwind CSS classes (test rendered output instead)
- Static utility functions

## Fixtures and Factories

**Test Data:**
- No fixtures directory exists
- JSON data files in `src/data/json-files/` could serve as fixture sources

**Recommended Fixture Location:**
```
src/
└── __fixtures__/
    ├── navigationBar.ts
    ├── features.ts
    └── blog-posts.ts
```

**Recommended Pattern:**
```typescript
// src/__fixtures__/navigationBar.ts
import type { NavData } from '../config/navigationBar'

export const mockNavData: NavData = {
  logo: {
    src: '/logo-light.svg',
    srcDark: '/logo-dark.svg',
    alt: 'Test Logo',
    text: 'Test Site'
  },
  navItems: [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' }
  ],
  navActions: [
    { name: 'Get Started', link: '/signup' }
  ]
}
```

## Coverage

**Requirements:** None enforced (no test infrastructure)

**Recommended Setup:**
```bash
# In package.json scripts
"test": "vitest",
"test:coverage": "vitest --coverage"
```

**View Coverage:**
```bash
# After setup
npm run test:coverage
# Opens coverage/index.html in browser
```

## Test Types

**Unit Tests:**
- Not present
- Recommended scope: Helper functions, config loaders, utility functions
- Target files: `src/config/*.ts`, `src/components/scripts/postScripts.ts`

**Integration Tests:**
- Not present
- Recommended scope: Page renders, component composition
- Focus on: Layout rendering, navigation behavior, content loading

**E2E Tests:**
- Not present
- Recommended framework: Playwright
- Focus on: User flows (navigation, theme switching, mobile menu)

**Visual Regression Tests:**
- Not present
- Consider for: Hero sections, card layouts, dark mode consistency

## Common Patterns

**Build Verification:**
The only automated check is TypeScript type checking via `astro check`:
```bash
npm run build  # Runs: astro check && astro build
```

This validates:
- TypeScript types are correct
- Astro component props match their types
- Content collection schemas are valid

**Type Checking as Testing:**
```typescript
// Type errors will fail the build
const props: Props = {
  type: 'invalid'  // Error: Type '"invalid"' is not assignable
}
```

## Recommended Test Setup

**Step 1: Install Vitest**
```bash
npm install -D vitest @vitest/coverage-v8
```

**Step 2: Create vitest.config.ts**
```typescript
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

**Step 3: Add to package.json**
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest --coverage"
  }
}
```

**Step 4: Create first test**
```typescript
// src/config/navigationBar.test.ts
import { describe, it, expect } from 'vitest'
import { getNavigationBarData } from './navigationBar'

describe('getNavigationBarData', () => {
  it('returns navigation data with required fields', async () => {
    const data = await getNavigationBarData()
    expect(data).toHaveProperty('logo')
    expect(data).toHaveProperty('navItems')
    expect(data).toHaveProperty('navActions')
  })
})
```

## Priority Testing Areas

**High Priority (Core Functionality):**
1. `src/config/navigationBar.ts` - Navigation data loading
2. `src/config/config.ts` - Site configuration
3. `src/content.config.ts` - Content schema validation
4. `src/components/scripts/postScripts.ts` - Post formatting utilities

**Medium Priority (UI Logic):**
1. Theme switching logic in `ThemeScripts.astro`
2. Mobile menu toggle behavior
3. Pricing toggle with animation

**Lower Priority (Static Components):**
1. Static Astro components with minimal logic
2. Layout components
3. Block components

---

*Testing analysis: 2025-01-22*
