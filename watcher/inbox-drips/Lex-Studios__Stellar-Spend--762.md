# [Frontend] Add accessibility audit and fixes for transaction forms

- Repo: Lex-Studios/Stellar-Spend
- GitHub: https://github.com/Lex-Studios/Stellar-Spend/issues/762
- APPLY HERE: https://www.drips.network/wave/stellar/issues/eadfeff2-13a2-47ae-bad2-0f7906aa210a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T08:55:18.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**
Per `ACCESSIBILITY.md`, forms should meet WCAG 2.1 AA; transaction/payment forms are the highest-risk area for missing labels, focus traps, and error announcements.

**Tasks:**
- Run axe-core against all transaction form flows
- Fix missing `aria-label`/`aria-describedby` on form fields
- Add focus management for modal/dialog flows

**Acceptance Criteria:**
- [ ] axe-core reports zero critical violations
- [ ] Manual screen-reader pass completed
- [ ] Tested: E2E (Playwright + axe)
- [ ] Code review passed

**Type**: Refactor
**Priority**: P1-High
**Estimated Effort**: 1-2 days
---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
