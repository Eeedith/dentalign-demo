# Contributing to DentAlign

Thanks for helping improve the prototype.

## Local setup

1. Install Node.js `>=22.13.0`.
2. Run `npm install`.
3. Run `npm run dev` and open the printed local URL.

## Working agreement

- Create a focused branch such as `feature/recovery-check-in` or `fix/mobile-navigation`.
- Keep patient and clinician behavior synchronized when changing a shared workflow.
- Preserve the PT-01–PT-06 and DR-01–DR-06 screen identifiers.
- Use fictional data only. Never commit real patient information or credentials.
- Keep controls keyboard accessible and maintain clear focus states.
- Check desktop and mobile behavior for layout changes.

## Before opening a pull request

Run:

```bash
npm test
npm run lint
npm run build:pages
```

In the pull request, briefly explain what changed, why it helps, which screens are affected and which checks passed.
