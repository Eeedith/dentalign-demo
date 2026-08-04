---
title: DentAlign Demo
emoji: 🦷
colorFrom: blue
colorTo: teal
sdk: static
app_build_command: npm run build:pages
app_file: dist-pages/index.html
pinned: false
---

# DentAlign Interactive Prototype

DentAlign is an interactive patient–clinician dental care prototype covering the full journey from treatment explanation to recovery follow-up.

**Live demo:** https://dentalign-interactive-prototype.ustinchoen.chatgpt.site/

## What is included

- 12 connected screens: PT-01–PT-06 for patients and DR-01–DR-06 for clinicians
- treatment explanation, shared decision-making and plan confirmation
- chairside communication and pause/help signals
- recovery plans, check-ins, concern reporting and clinician replies
- paired patient/clinician navigation, shared update history and demo progress
- responsive desktop and mobile layouts
- device-local demo state persistence and one-click reset

All patient and clinical data in this repository is fictional and intended only for product prototyping.

## Getting started

Requirements: Node.js `>=22.13.0` and npm.

```bash
git clone https://github.com/Eeedith/dentalign-demo.git
cd dentalign-demo
npm install
npm run dev
```

The development server prints the local URL after startup.

## Useful commands

```bash
npm run dev          # start local development
npm run build        # build the vinext/Cloudflare version
npm run build:pages  # build the static GitHub Pages version
npm test             # build and run project checks
npm run lint         # run ESLint
```

## Project structure

- `app/page.tsx` — screens, state and interaction logic
- `app/globals.css` — visual system and responsive behavior
- `public/assets/` — avatars and supporting images
- `static-app/` and `vite.pages.config.ts` — static GitHub Pages entry
- `tests/` — rendered output and source-level checks
- `.openai/hosting.json` — OpenAI Sites project metadata

## Collaboration

Please create a short-lived branch, keep each pull request focused, and include the checks you ran. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and product conventions.

## Current scope

This is a front-end prototype. Authentication, real patient records, clinic integrations, server-side persistence and production clinical governance are intentionally not implemented yet.
