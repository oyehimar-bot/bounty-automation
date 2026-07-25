# bot: settleBatch marks all pools as success/failure based on tx outcome, discarding per-pool SettleResult

- Repo: chunks-labz/predinex-stellar
- GitHub: https://github.com/chunks-labz/predinex-stellar/issues/801
- APPLY HERE: https://www.drips.network/wave/stellar/issues/deee5920-8acc-4804-87b5-33194e013e4f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T18:30:10.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description

The contract's `settle_pools` function returns `Vec<SettleResult>` with one entry per pool indicating individual success/failure. However, the bot's `executor.ts` marks **all** pools in the batch with the same success status based on the transaction-level outcome. The per-pool return value is never decoded.

Consequences:
- If the transaction succeeds but one pool out of 20 fails on-chain (e.g., `PoolAlreadySettled`, `InvalidOutcome`), the bot reports all 20 as successful
- The webhook notification includes incorrect per-pool results
- The `persistentFailures` tracker deletes entries for actually-failed pools since they're reported as success

## Proposed Fix

Decode the `Vec<SettleResult>` from the simulation/post-transaction result and map each pool to its individual outcome.

## Acceptance Criteria

- [ ] Per-pool settlement results decoded from contract response
- [ ] Each pool marked with its individual success/failure status
- [ ] Webhook notifications reflect accurate per-pool results
- [ ] `persistentFailures` correctly tracks per-pool failures

## Affected Files

- `bot/src/executor.ts` (lines 241-267)

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
