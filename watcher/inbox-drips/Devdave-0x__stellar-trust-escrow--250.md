# feat(frontend): add print stylesheet for escrow detail page hiding navigation and buttons

- Repo: Devdave-0x/stellar-trust-escrow
- GitHub: https://github.com/Devdave-0x/stellar-trust-escrow/issues/250
- APPLY HERE: https://www.drips.network/wave/stellar/issues/070f34d7-4b0f-4112-bbd2-a06b87694cf6
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T10:57:42.000Z
- Labels: enhancement, frontend, simple

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
The escrow detail page is the most important printable document on the platform. Without print styles, browser printing produces a broken layout.

## Tasks
- [ ] Add a `print.css` stylesheet imported only when `@media print` is active
- [ ] Hide: sidebar, navigation, action buttons, tooltips, skeleton loaders
- [ ] Show: full escrow title, all milestone details, party addresses, amounts, timestamps in a clean two-column layout
- [ ] Force black text on white background; remove background colours
- [ ] Add the platform logo and a "Printed from Stellar Trust Escrow" footer line
- [ ] Test by generating a PDF via Playwright's `page.pdf()` and checking that key fields are present


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Locate the escrow detail page component and confirm where styles are loaded, then add a dedicated print.css file and apply it only under @media print.
2. In print.css, hide sidebar, navigation, action buttons, tooltips, and skeleton loaders, while keeping the full escrow title, milestone details, party addresses, amounts, and timestamps in a clean two-column layout.
3. Add print rules to force black text on a white background and remove background colors.
4. Add the platform logo and a footer line: Printed from Stellar Trust Escrow.
5. Generate a PDF with Playwright page.pdf() and verify the key escrow fields are present.

I'll wait for assignment before opening a PR.
