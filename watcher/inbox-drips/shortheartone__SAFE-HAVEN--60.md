# Form does not reset after wallet disconnection mid-flow

- Repo: shortheartone/SAFE-HAVEN
- GitHub: https://github.com/shortheartone/SAFE-HAVEN/issues/60
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f0b6e854-ac42-466d-9206-e4c15671f27c
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-23T00:27:14.000Z
- Labels: bug, medium, frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Issue #55**

**File:** `frontend/src/pages/DepositPage.tsx`

**Description:**
If a user disconnects their wallet mid-deposit (e.g., Freighter session expires), `wallet` becomes `null` but the form fields retain their values. The "not connected" fallback renders the empty-state card, but on reconnect the old form state is restored. If the user reconnects as a different address, the pending deposit form data (amount, date, penalty) from the previous session is confusingly still populated.

**Fix:** Clear form state when `wallet` becomes `null` via a `useEffect` that watches `wallet?.address`.

---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
