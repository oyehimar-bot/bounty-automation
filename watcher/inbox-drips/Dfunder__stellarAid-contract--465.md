# Define DisputeRecord struct and storage

- Repo: Dfunder/stellarAid-contract
- GitHub: https://github.com/Dfunder/stellarAid-contract/issues/465
- APPLY HERE: https://www.drips.network/wave/stellar/issues/135f0ddc-1402-483b-90ad-3dc0f0e14d01
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T13:08:02.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Description:**
Create `contracts/dispute_arbiter/src/storage.rs`:
- `DisputeRecord` struct: commission_id (Bytes), opened_ledger (u32), auto_resolve_ledger (u32), status (DisputeStatus), resolution_note (Option<String>)
- `DisputeStatus` enum: Open, ResolvedForClient, ResolvedForArtist, PartiallyResolved, AutoResolved
- `DataKey` enum: `Dispute(Bytes)`, `EscrowContract`, `ConfigContract`

---

## Drafted application (paste into the Drips form after reviewing)

I'll take this one.

Plan:
- Create `contracts/dispute_arbiter/src/storage.rs` as specified.
- Define the `DisputeRecord` struct with `commission_id` (Bytes), `opened_ledger` (u32), `auto_resolve_ledger` (u32), `status` (DisputeStatus), and `resolution_note` (Option<String>), deriving `contracttype`.
- Define the `DisputeStatus` enum with variants Open, ResolvedForClient, ResolvedForArtist, PartiallyResolved, and AutoResolved.
- Define the `DataKey` enum with `Dispute(Bytes)`, `EscrowContract`, and `ConfigContract`.
- Wire the module into the crate (mod storage) and run `cargo build` / `cargo fmt` to confirm it compiles.

I'll wait for assignment before opening a PR.
