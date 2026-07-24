# Cancel button is shown as only option when vault is locked, even with `penalty_bps = 0`

- Repo: shortheartone/SAFE-HAVEN
- GitHub: https://github.com/shortheartone/SAFE-HAVEN/issues/64
- APPLY HERE: https://www.drips.network/wave/stellar/issues/b1088e99-da46-463f-915b-ff1b1f7a046e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T00:27:24.000Z
- Labels: bug, high, frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Issue #59**

**File:** `frontend/src/pages/WithdrawPage.tsx`

**Description:**
When a vault is locked (`!isUnlocked`), the UI shows only a "Cancel deposit" button. If `penalty_bps = 0` (no penalty), cancellation is free and the UX implication of the button label "Cancel deposit (0% penalty)" is fine. But the button style is `btn-danger` (red/warning color) regardless of penalty amount. A 0% penalty cancel with a danger-colored button is unnecessarily alarming and may cause users to hesitate or avoid a perfectly safe operation.

**Fix:** Use `btn-danger` only when `penaltyBps > 0`. Use `btn-secondary` or `btn-primary` for 0-penalty cancellations.

---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
