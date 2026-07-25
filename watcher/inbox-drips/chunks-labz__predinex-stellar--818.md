# contract: dispute_pool has no time window — settled pools can be disputed indefinitely

- Repo: chunks-labz/predinex-stellar
- GitHub: https://github.com/chunks-labz/predinex-stellar/issues/818
- APPLY HERE: https://www.drips.network/wave/stellar/issues/e324b526-397e-43f9-80c5-f594893d5787
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T19:53:05.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description

`dispute_pool` allows the freeze admin to dispute any settled pool at any time — there is no expiration window. A pool settled weeks or months ago can still be disputed, which reverts the pool to `Disputed` status and blocks all pending winner claims via `claim_winnings` (the claim checks `pool.status == PoolStatus::Settled` and rejects `Disputed`).

The `set_cross_chain_dispute_window` only applies to cross-chain pool mirrors. Local pools have no equivalent time limit, meaning settlement finality can be retroactively broken at any point.

This creates a trust issue: bettors who have already claimed winnings have no guarantee that a late dispute won't invalidate their claims or freeze funds.

## Proposed Fix

Add a configurable dispute window that starts when the pool is settled:

```rust
// In dispute_pool:
let dispute_window = env.storage().persistent()
    .get::<_, u64>(&DataKey::DisputeWindow)
    .unwrap_or(DEFAULT_DISPUTE_WINDOW_SECS);

if env.ledger().timestamp() > settlement_time + dispute_window {
    return Err(ContractError::DisputeWindowExpired);
}
```

Store `settlement_time` in the `Pool` struct or in a dedicated storage key when the pool is settled.

## Acceptance Criteria

- [ ] Dispute window enforced — disputes rejected after window expires
- [ ] Dispute window configurable via admin function
- [ ] `settlement_time` recorded when pool is settled
- [ ] Tests for dispute window enforcement and expiry

## Affected Files

- `contracts/predinex/src/lib.rs` (dispute_pool, line 5862; settle_single_pool)

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: `dispute_pool` in `contracts/predinex/src/lib.rs` validates role and status, but local pools have no time check tied to settlement, so disputes stay open indefinitely.

Plan:
1. Update `settle_single_pool` to record `settlement_time` when a pool is marked `Settled` (in `Pool` or a dedicated storage key).
2. Add a local dispute window config in persistent storage (`DataKey::DisputeWindow`) with a safe default constant.
3. Update `dispute_pool` (around line 5862) to reject calls after `settlement_time + dispute_window`, returning `ContractError::DisputeWindowExpired`.
4. Add or wire an admin setter (similar to existing config setters like cross-chain window) to change the local dispute window.
5. Add tests for allowed dispute inside window, rejected dispute after expiry, and expected interaction with `claim_winnings`.

I'll wait for assignment before opening a PR.
