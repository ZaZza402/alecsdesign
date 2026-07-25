# Copilot Editing Instructions for alecsdesign

Use these rules when editing this repository.

## Project Intent

- This is a client-focused web and design studio site, not a generic dev portfolio.
- The Designs section is showcase-first and hire-first.
- Public route naming is designs, not packs.

## Localization Rules (Critical)

- Never hardcode user-facing UI copy in components.
- All user-facing text must come from locale JSON files.
- Keep EN, IT, and RO in sync for every copy change.
- Common files:
  - src/locales/en/sections/contact.json
  - src/locales/it/sections/contact.json
  - src/locales/ro/sections/contact.json
  - src/locales/en/pages/packs.json
  - src/locales/it/pages/packs.json
  - src/locales/ro/pages/packs.json

## Routing and URL Rules

- Primary routes:
  - /designs
  - /designs/:slug
  - /it/designs
  - /it/designs/:slug
  - /ro/designs
  - /ro/designs/:slug
- Legacy /packs URLs are redirected in vercel.json. Do not remove redirects unless explicitly requested.
- Keep internal data/assets paths stable unless a full migration is requested:
  - data/packs/
  - public/images/packs/

## Contact Intake Behavior

- Designs CTA intentionally navigates to contact with query prefill:
  - /contact?service=designs
- This preselects the contact flow for design/redesign context.
- Service mapping and behavior are documented in:
  - docs/designs-contact-intake.md
- If changing this behavior, update:
  - src/pages/ContactPage.tsx
  - src/components/ui/ContactForm.tsx
  - all contact locale files (EN/IT/RO)

## SEO and AIO Rules

- Prefer shared SEO utility for page metadata:
  - src/utils/seo.tsx
- Keep canonical and hreflang behavior aligned with tests:
  - tests/routeMetadata.test.mjs
- Designs detail uses hybrid structured data (CreativeWork + Product when offer exists). Preserve this unless intentional change.
- Keep AI inventory docs updated when routes or positioning changes:
  - public/llms.txt
  - public/llms-full.txt

## Sitemap Rules

- Sitemap generation is script-driven:
  - scripts/generate-sitemap.mjs
- Design detail entries are dynamically discovered from data/packs/\*.json.
- If adding a new design JSON file with slug, it should be included automatically.

## Analytics Rules

- Use existing analytics helpers, do not invent ad-hoc tracking calls:
  - src/utils/analytics.ts
- Keep event names stable where possible to avoid breaking reporting continuity.

## Styling and UX Rules

- Preserve current editorial premium direction for Designs pages.
- Keep mobile behavior first-class (no desktop-only assumptions).
- Respect reduced-motion preferences.

## Validation Before Finishing

- Run build:
  - npm run build
- Run route metadata tests when routes/SEO logic changes:
  - node --test tests/routeMetadata.test.mjs
- If copy changed, verify EN/IT/RO parity before finalizing.
