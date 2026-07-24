# Implement Credential Privacy Levels

- Repo: ethos-protocol/ethos-contracts-backend
- GitHub: https://github.com/ethos-protocol/ethos-contracts-backend/issues/31
- APPLY HERE: https://www.drips.network/wave/stellar/issues/7ce78f1d-8867-4d95-a05d-4a249f687b9a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:27:51.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Priority:** High
**Estimated Time:** 2 hours

## Description
All credentials have the same visibility. Some credentials should be private (internal only), others public.

## Tasks
- Add `PrivacyLevel` enum: Public, Internal, Confidential
- Implement `set_credential_privacy(env, credential_id, level: PrivacyLevel)`
- Filter queries based on privacy level
- Add access control enforcement
- Add tests for privacy levels


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
