# Implement Atomic Multi-Credential Release

- Repo: ethos-protocol/ethos-contracts-backend
- GitHub: https://github.com/ethos-protocol/ethos-contracts-backend/issues/25
- APPLY HERE: https://www.drips.network/wave/stellar/issues/ff327d66-d250-4b45-a8de-28e09e0446d4
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:27:06.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Priority:** High
**Estimated Time:** 3 hours

## Description
When multiple credentials need release simultaneously (e.g., batch graduation processing), releasing them one-by-one requires multiple transactions. Atomic multi-credential release would reduce transaction count and costs.

## Tasks
- Implement `atomic_release_credentials(env, credential_ids: Vec<u64>) -> Vec<bool>`
- Ensure all-or-nothing semantics
- Optimize gas usage for batch releases
- Add tests for partial failures and edge cases
- Document atomic guarantees


## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue if it's available.

Plan:
- Add `atomic_release_credentials(env, credential_ids: Vec<u64>) -> Vec<bool>` that iterates the given IDs and releases each credential.
- Enforce all-or-nothing semantics: if any single release fails, revert the whole batch so no partial state is committed.
- Reduce per-release overhead by batching the shared setup and storage reads rather than repeating them per credential.
- Add tests covering partial failures (one bad ID in the batch), empty input, duplicate IDs, and a fully successful batch.
- Document the atomic guarantee and the meaning of the returned `Vec<bool>`.

One thing worth confirming: on failure, should the return vector still be produced, or should the call revert entirely? I'll assume full revert unless you prefer otherwise.

I'll wait for assignment before opening a PR.
