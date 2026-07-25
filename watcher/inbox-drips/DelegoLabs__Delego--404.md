# [Frontend] Add Focus-Visible Outline Styles for Keyboard Navigation

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/404
- APPLY HERE: https://www.drips.network/wave/stellar/issues/dfa3da31-0a31-4594-9e2f-14a41fb830ab
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T06:08:18.000Z
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
There are no focus-visible styles defined in `apps/frontend/styles/globals.css`. Keyboard-only users cannot see which element is currently focused. Browser defaults are often removed by CSS resets, leaving keyboard users with no visible focus indicator.

**Implementation Scope**
- `apps/frontend/styles/globals.css`

**Functions to Implement**
Add focus-visible outline styles:
```css
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 4px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

**Tests**
- Manual: press Tab through the page and confirm blue outline appears on focused elements.
- Manual: click an element and confirm no outline appears (mouse users unaffected).

**Acceptance Criteria**
- Keyboard focus shows a visible 2px blue outline on all interactive elements.
- Mouse clicks do not show focus outlines.
- Outline is visible on buttons, links, and form inputs.
- Outline does not overlap with existing borders or shadows.

**Verification**
- `pnpm dev:web` starts without errors.
- Tab navigation shows visible focus indicators.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: global/reset styles in apps/frontend/styles/globals.css are removing or not defining focus indicators, so keyboard focus is not visible.

Plan:
1. Update apps/frontend/styles/globals.css with a :focus-visible rule using a 2px #2563eb outline, 2px outline-offset, and 4px border-radius.
2. Add :focus:not(:focus-visible) in the same file so mouse-triggered focus does not show outlines.
3. Run pnpm dev:web to confirm the app starts without errors.
4. Manually test Tab navigation across buttons, links, and form inputs to confirm the blue outline appears and does not clash with borders or shadows.
5. Manually click interactive elements to confirm no outline appears for mouse users.

I'll wait for assignment before opening a PR.
