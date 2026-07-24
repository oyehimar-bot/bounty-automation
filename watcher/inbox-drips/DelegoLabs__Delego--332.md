# [Soroban/Permissions] Add Permission Inheritance Chain for Agent Hierarchies

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/332
- APPLY HERE: https://www.drips.network/wave/stellar/issues/e8315720-f0aa-4318-afa0-9cb0c21d247b
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-22T10:41:34.000Z
- Labels: contracts

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Feature

**Area**
Soroban / Permissions

**Complexity**
High

**Problem**
Permission model is flat. Agent hierarchies need parent agents delegating to child agents with sub-limits.

**Implementation Scope**
`contracts/permissions/src/lib.rs`

**Implementation Details**
Add parent_permission field to PermissionRecord. Add grant_child function bounded by parent limits. Modify execute_spend to deduct from both child and parent.

**Tests**
- Test child inherits parent limits.
- Test child spend deducts from parent.
- Test revoking parent revokes children.

**Acceptance Criteria**
- Child permissions reference parent.
- Child spending bounded by parent allowance.
- Parent revocation cascades to children.

**Verification**
- `cargo test --workspace` passes.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
