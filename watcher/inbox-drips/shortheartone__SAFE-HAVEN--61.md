# No confirmation dialog before locking tokens — easy to submit with wrong parameters

- Repo: shortheartone/SAFE-HAVEN
- GitHub: https://github.com/shortheartone/SAFE-HAVEN/issues/61
- APPLY HERE: https://www.drips.network/wave/stellar/issues/2c6668c0-1087-47c1-9e35-8aabe9d03e41
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T00:27:17.000Z
- Labels: enhancement, medium, frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Issue #56**

**File:** `frontend/src/pages/DepositPage.tsx`

**Description:**
The deposit form submits directly to `handleSubmit` with no intermediate confirmation step. For irreversible operations involving locked funds (especially with a high penalty BPS), a confirmation modal showing the final summary with a prominent warning ("Your tokens will be locked until [date]. Early exit incurs a [X]% penalty. This cannot be undone.") is standard practice in DeFi UIs.

**Fix:** Add a confirmation modal that appears before `buildDeposit` is called, showing a complete summary. Require the user to type "LOCK" or check a checkbox to confirm they understand the terms.

---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
