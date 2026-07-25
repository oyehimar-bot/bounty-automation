# Add SDK method for `setAdmin`

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/517
- APPLY HERE: https://www.drips.network/wave/stellar/issues/bd3cd29b-2e9f-4463-9d2d-0df9e307ddc6
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T09:08:33.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

The contract has `set_admin` but the SDK does not expose it.

**Why it matters:** Admin transfer is a critical governance operation.

**Acceptance Criteria:**
- [ ] Create `setAdmin(newAdmin)` admin method
- [ ] Add tests

**Relevant Files:** `contracts/invoice_liquidity/src/lib.rs:211-224`, `sdk/src/index.ts`

---


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: `contracts/invoice_liquidity/src/lib.rs` already exposes `set_admin`, but `sdk/src/index.ts` does not have a matching admin method.

Plan:
1. Confirm the `set_admin` contract interface in `contracts/invoice_liquidity/src/lib.rs` (around lines 211-224), including arguments and authorization expectations.
2. Add `setAdmin(newAdmin)` to `sdk/src/index.ts`, following the existing SDK admin method style and call pattern.
3. Add tests for the new SDK method, including a successful `setAdmin` call path and expected invocation behavior.
4. Verify exports and typings so `setAdmin` is available to SDK consumers.

I'll wait for assignment before opening a PR.
