# Implement `initialize` for DisputeArbiter

- Repo: Dfunder/stellarAid-contract
- GitHub: https://github.com/Dfunder/stellarAid-contract/issues/466
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6289ac92-8df6-4659-a6df-c42f5435894f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T13:08:29.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Description:**
```rust
pub fn initialize(env: Env, admin: Address, escrow_contract: Address, config_contract: Address, auto_resolve_ledgers: u32)
```
- Guard: revert if already initialized
- Store: admin, escrow_contract, config_contract, auto_resolve_ledgers
- Emit `Initialized` event

---

## Drafted application (paste into the Drips form after reviewing)

I'll take this one if it's available.

Plan:
1. Add the `initialize(env, admin, escrow_contract, config_contract, auto_resolve_ledgers)` function to the DisputeArbiter contract.
2. Add an initialization guard that reads the stored state and reverts if the contract is already initialized.
3. Write `admin`, `escrow_contract`, `config_contract`, and `auto_resolve_ledgers` to persistent storage under their respective keys (adding any storage key definitions if they don't exist yet).
4. Define and emit the `Initialized` event after the values are stored.
5. Add unit tests covering a successful initialization and the revert-on-double-initialize case.

One thing to confirm: whether the four values should be stored in instance or persistent storage, so I match the existing convention in the contract.

I'll wait for assignment before opening a PR.
