# feat(frontend): build SplitButton component with primary action and dropdown of secondary options

- Repo: Devdave-0x/stellar-trust-escrow
- GitHub: https://github.com/Devdave-0x/stellar-trust-escrow/issues/249
- APPLY HERE: https://www.drips.network/wave/stellar/issues/fc772233-f4d2-4787-89a3-02f4e876f6fd
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T10:57:34.000Z
- Labels: enhancement, frontend, medium

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Some actions (e.g. Export CSV, Send Notification) have a primary action and secondary related options. A split button combines both without cluttering the UI.

## Tasks
- [ ] Create a `SplitButton` component: left side is the primary action button; right side is a small chevron that opens a dropdown of secondary options
- [ ] Dropdown closes on outside click, on Escape, and on option selection
- [ ] Primary and dropdown actions are both keyboard accessible
- [ ] The dropdown is positioned to stay within the viewport (flips upward if near the bottom of the page)
- [ ] Write tests: primary click fires, dropdown opens on chevron click, option fires, closes on outside click


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Build a reusable `SplitButton` component: left primary action button, right chevron trigger for a dropdown of secondary options.
2. Implement open/close logic so the dropdown closes on outside click, Escape, and option selection.
3. Make both primary and dropdown actions keyboard accessible, including trigger activation and focus flow for options.
4. Add viewport-aware dropdown positioning so it opens upward near the bottom and stays within the viewport.
5. Write tests for primary click firing, chevron click opening the menu, option callback firing, and outside click closing the menu.

I'll wait for assignment before opening a PR.
