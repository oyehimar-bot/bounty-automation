# [Soroban/Escrow] Implement Escrow Compound Release with Interest Accrual

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/331
- APPLY HERE: https://www.drips.network/wave/stellar/issues/87c6e2fe-0d75-45b8-af46-48dfaa737c84
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-22T10:41:33.000Z
- Labels: contracts

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Feature

**Area**
Soroban / Escrow

**Complexity**
High

**Problem**
Escrowed funds sit idle. Long-held escrows have significant opportunity cost.

**Implementation Scope**
`contracts/escrow/src/lib.rs`

**Implementation Details**
Add optional yield_config to EscrowRecord referencing lending contract. Add set_yield_config admin function. Calculate yield on release based on time held.

**Tests**
- Test yield calculation for 30-day escrow.
- Test yield distribution on release.
- Test no yield config = zero yield.

**Acceptance Criteria**
- Optional yield accrual configurable per escrow.
- Yield calculated based on time held.
- Yield info included in release events.

**Verification**
- `cargo test --workspace` passes.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
