# Project Structure Guide

This project is organized by responsibility so new files have an obvious home.

## Top-Level Directories

- `src/`: app source code (React + TypeScript)
- `api/`: Vercel serverless functions
- `data/`: source JSON content used by the app
- `public/`: static files served directly by Vite/Vercel
- `scripts/`: build and maintenance scripts
- `tests/`: test files

## Source Layout (`src/`)

- `components/`: reusable UI and layout building blocks
  - `components/layout/`: app shell components (header/footer)
  - `components/ui/`: shared UI elements used across pages/sections
  - `components/guides/`: shared guide-specific components
- `pages/`: route-level page components
- `sections/`: home-page sections
- `utils/`: helper functions and data utilities
- `locales/`: translation files for `en`, `it`, and `ro`

## Naming Rules

- React component files: `PascalCase.tsx`
- Utility/data files: `camelCase.ts`
- Co-located styles: same base name as component (`Component.tsx` + `Component.css`)
- Translation files: `camelCase.json`

## Import Rules

- Use barrel exports where available for readability:
  - `components/ui/index.ts`
  - `components/layout/index.ts`
  - `components/guides/index.ts`
  - `sections/index.ts`
  - `pages/index.ts`
- Keep dynamic imports direct to target files when route-level code splitting is desired.

## Placement Rules for New Code

- New route page: add to `src/pages/`
- Shared component reused by many areas: add to `src/components/ui/`
- Home-only content block: add to `src/sections/`
- Data loader/helper: add to `src/utils/`
- Guide-only shared layout/component: add to `src/components/guides/`

## Stability Notes

- Do not rename/move files in `public/` without checking all string asset paths.
- Do not move `public/site.webmanifest` or change sitemap paths without updating build/config scripts.

## Workflow Docs

- Repository Copilot guardrails for future edits:
  - [.github/copilot-instructions.md](.github/copilot-instructions.md)
