# Designs Contact Intake: Behavior and Editing Guide

This document explains why the contact form can look different when entered from the Designs section and how to safely edit that behavior.

## Why The UI Changes From Designs

When users click the Designs CTA, they are sent to:

- `/contact?service=designs` (EN)
- `/{lang}/contact?service=designs` (IT/RO)

The `service=designs` query param preconfigures the contact form for a design/redesign context. This improves conversion by removing one choice step and keeping the flow aligned with user intent.

## Current Behavior

- Contact page reads query param in [src/pages/ContactPage.tsx](src/pages/ContactPage.tsx).
- Param is passed to form as `preselectedService` prop.
- Form maps service values to internal `needs` values in [src/components/ui/ContactForm.tsx](src/components/ui/ContactForm.tsx):
  - `designs` -> `redesign`
- If preselected:
  - wizard starts at step 2
  - step 1 selection is already set
  - a contextual prefill note is shown

## Files Involved

- Intake routing and param handoff:
  - [src/pages/ContactPage.tsx](src/pages/ContactPage.tsx)
- Form behavior + service mapping:
  - [src/components/ui/ContactForm.tsx](src/components/ui/ContactForm.tsx)
- Form visuals for prefill note and feedback states:
  - [src/components/ui/ContactForm.css](src/components/ui/ContactForm.css)
- Localized copy (EN/IT/RO):
  - [src/locales/en/sections/contact.json](src/locales/en/sections/contact.json)
  - [src/locales/it/sections/contact.json](src/locales/it/sections/contact.json)
  - [src/locales/ro/sections/contact.json](src/locales/ro/sections/contact.json)

## How To Add Another Service Preset

1. Add a query param in the source CTA URL (example: `?service=branding`).
2. Extend `SERVICE_TO_NEEDS_MAP` in [src/components/ui/ContactForm.tsx](src/components/ui/ContactForm.tsx).
3. Add any required explanatory note text in all locale files.
4. Build and verify wizard starts at intended step.

## Copy Rules

- Do not hardcode user-facing text in components.
- Add or update strings in locale JSON files for EN/IT/RO.
- Keep terminology project-oriented (web + design), not website-only, unless intentionally specific.

## Analytics Hooks

Design funnel interactions are tracked in:

- [src/utils/analytics.ts](src/utils/analytics.ts)
- Used by:
  - [src/pages/PacksHub.tsx](src/pages/PacksHub.tsx)
  - [src/pages/packs/PackPage.tsx](src/pages/packs/PackPage.tsx)

Keep analytics labels stable if possible to preserve reporting continuity.
