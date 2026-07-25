# feat(frontend): implement AlertBanner component with variants and dismiss animation

- Repo: Devdave-0x/stellar-trust-escrow
- GitHub: https://github.com/Devdave-0x/stellar-trust-escrow/issues/248
- APPLY HERE: https://www.drips.network/wave/stellar/issues/20b30825-a7ba-4e0f-97b0-4e50dada0e63
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T10:57:25.000Z
- Labels: enhancement, frontend, simple

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
The app needs a consistent way to show system messages: errors, warnings, info, and success — as dismissible banners at the top of content areas.

## Tasks
- [ ] Create an `AlertBanner` component accepting `variant: success|warning|error|info`, `title`, optional `description`, and `onDismiss`
- [ ] Each variant has a distinct icon, colour, and background
- [ ] `onDismiss` makes the banner dismissible; if omitted the banner is persistent
- [ ] Animate in from the top on mount; animate out on dismiss
- [ ] `role="alert"` on error/warning variants; `role="status"` on info/success
- [ ] Write tests: each variant renders correctly, dismiss fires callback, ARIA role correct


## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue.

Plan:
1. Add an `AlertBanner` component in the frontend with props: `variant` (`success|warning|error|info`), `title`, optional `description`, and optional `onDismiss`.
2. Implement variant-specific icon, color, and background styling, and apply ARIA roles exactly as specified: `role="alert"` for error and warning, `role="status"` for info and success.
3. Make dismiss behavior conditional on `onDismiss`, so the banner is persistent when it is omitted.
4. Add enter and exit animations from the top, including dismiss animation before callback completion.
5. Write tests to cover variant rendering, dismiss callback firing, and ARIA role correctness.

I'll wait for assignment before opening a PR.
