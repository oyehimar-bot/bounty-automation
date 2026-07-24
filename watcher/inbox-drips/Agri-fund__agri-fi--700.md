# security(soroban): Reentrancy Guards on Settlement Methods

- Repo: Agri-fund/agri-fi
- GitHub: https://github.com/Agri-fund/agri-fi/issues/700
- APPLY HERE: https://www.drips.network/wave/stellar/issues/8103c5d9-f636-407c-b996-f627068127b1
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T14:56:58.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### security(soroban): Reentrancy Guards on Settlement Methods
* **Component:** Smart Contracts (Rust)
* **Detailed Description:** Prevent reentrancy vulnerabilities. If the contract calls external token transfers, malicious actors might attempt to trigger concurrent settlement calls before state updates are persisted.
* **Implementation Pointers:** Enforce Rust check-effects-interactions patterns in all transfer functions. Set state variables (like `is_settled = true`) before transferring assets.
* **Acceptance Criteria:**
  - Settlement state is locked before invoking external token transfers.
  - Concurrent calls to settle return error exceptions.
* **Priority/Complexity:** High / Medium

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue.

Plan:
- Audit the settlement functions in the Soroban contract that call external token transfers (`token::transfer` or similar) and identify where state is written after the transfer.
- Reorder each transfer function to follow check-effects-interactions: set state like `is_settled = true` before invoking any external token transfer.
- Add a reentrancy guard so concurrent calls to settle return an error instead of proceeding.
- Add tests covering a re-entrant settle attempt and a double-settle attempt, asserting both return errors.

One thing to confirm: the issue does not name the specific contract or method, so I'll match the exact file and function names once I'm in the code.

I'll wait for assignment before opening a PR.
