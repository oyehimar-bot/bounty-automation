# [Frontend] Add prefers-reduced-motion Media Query to Global Styles

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/403
- APPLY HERE: https://www.drips.network/wave/stellar/issues/68b21b3a-4d5d-4b39-bae8-65c961585883
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T06:08:16.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / Accessibility

**Complexity**
Trivial

**Problem**
The app uses Tailwind's `animate-pulse` and potential CSS animations but does not respect the `prefers-reduced-motion` user preference. Users with vestibular disorders or motion sensitivity will experience unwanted animations that can cause discomfort.

**Implementation Scope**
- `apps/frontend/styles/globals.css`

**Functions to Implement**
Add a `prefers-reduced-motion` media query that disables animations:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Tests**
- Manual: enable "Reduce motion" in OS accessibility settings and confirm animations stop.
- Automated: verify CSS contains the `prefers-reduced-motion` media query.

**Acceptance Criteria**
- All animations and transitions are reduced when the OS preference is set.
- Skeleton loaders stop pulsing.
- Page transitions are instant.
- No visual regression when motion is not reduced.

**Verification**
- `pnpm dev:web` starts without errors.
- CSS file contains the media query.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
