# Implement Credential Nesting for Derived Credentials

- Repo: ethos-protocol/ethos-contracts-backend
- GitHub: https://github.com/ethos-protocol/ethos-contracts-backend/issues/27
- APPLY HERE: https://www.drips.network/wave/stellar/issues/ff7b0cbd-d210-4a40-83b9-5c4fe58c8bfc
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:27:21.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Priority:** High
**Estimated Time:** 3 hours

## Description
A credential cannot reference parent credentials. Credential hierarchies (e.g., certificate based on degree) are not supported.

## Tasks
- Add parent credential references to credential structure
- Implement `create_derived_credential(env, parent_id: u64, ...) -> u64`
- Validate parent credential validity before issuing derived credential
- Add recursive validation
- Add tests for credential chains


## Drafted application (paste into the Drips form after reviewing)

Emmanuel here, happy to take this one.

Plan:
- Extend the credential struct to hold an optional parent reference (parent_id: u64), stored so hierarchies like certificate-based-on-degree can be represented.
- Add `create_derived_credential(env, parent_id: u64, ...) -> u64` that reads the parent, issues the child, and records the link back to parent_id.
- Before issuing, validate the parent exists and is currently valid (not revoked or expired), and reject if it is not.
- Add recursive validation that walks the parent chain so a derived credential is only valid when every ancestor is valid, with guarding against cycles.
- Add tests covering multi-level chains, an invalid or missing parent, and a revoked ancestor.

I'll wait for assignment before opening a PR.
