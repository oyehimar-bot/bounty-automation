# top_up does not emit an event

- Repo: SoroWill/sorowill-contracts
- GitHub: https://github.com/SoroWill/sorowill-contracts/issues/1
- APPLY HERE: https://www.drips.network/wave/stellar/issues/053ac17e-b0a2-4cd7-9729-31c399fb5c98
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T12:57:58.000Z
- Labels: bug, High

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
Every other state-changing function in the contract emits an event (`will_created`, `check_in`, `will_triggered`, `emergency_checkin`, `will_cancelled`, `beneficiaries_updated`, `guardian_voted`, `inheritance_released`) — but `top_up` (`contracts/will/src/lib.rs`) silently updates `will.balance` with no corresponding event. Any off-chain indexer, the SDK, or the app relying on events to track a will's balance will miss top-ups entirely.

## Acceptance criteria
- Add a `top_up` event (e.g. `events::top_up(&env, will_id, &owner, amount, new_balance)`) in `events.rs`.
- Emit it from `WillContract::top_up` after the balance is updated.
- Add/extend a unit test in `test.rs` asserting the event is published with the correct topics/data.
- `cargo clippy --all-targets` stays zero-warnings.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
