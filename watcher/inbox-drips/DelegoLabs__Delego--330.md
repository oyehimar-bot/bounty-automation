# [Soroban/DelegationRegistry] Add Delegation Expiry Sweep Mechanism

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/330
- APPLY HERE: https://www.drips.network/wave/stellar/issues/bb18aa27-820b-4309-ba01-6c4927240be0
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-22T10:41:31.000Z
- Labels: contracts

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Feature

**Area**
Soroban / DelegationRegistry

**Complexity**
Moderate

**Problem**
Expired delegations remain in last status. is_authorized checks expiry but status isn't updated to Expired.

**Implementation Scope**
`contracts/delegation_registry/src/lib.rs`

**Implementation Details**
Add sweep_expired function accepting vector of IDs, updating expired ones to Expired status. Emit DelegationExpiredEvent. Add get_expired_delegations getter. Callable by anyone.

**Tests**
- Test sweep updates expired delegations.
- Test sweep is no-op for non-expired.
- Test get_expired_delegations returns correct list.

**Acceptance Criteria**
- Anyone can sweep expired delegations.
- Gas-efficient for batch processing.
- Events emitted for each swept delegation.

**Verification**
- `cargo test --workspace` passes.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
