# Implement optimistic concurrency check using a version field on stream updates

- Repo: SoroStream/sorostream-contracts
- GitHub: https://github.com/SoroStream/sorostream-contracts/issues/236
- APPLY HERE: https://www.drips.network/wave/stellar/issues/b932b6d1-0973-432a-9db3-20ebc16d88b9
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T14:14:04.000Z
- Labels: enhancement, complexity: high

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview
Concurrent modifications to the same stream (e.g. a top_up and a cancel racing) can produce inconsistent state. An optimistic concurrency check using a version field detects and rejects stale writes.

## Problem
Two callers submitting competing transactions for the same stream in the same ledger can produce unpredictable results depending on transaction ordering. There is no mechanism to detect or reject stale updates.

## Proposed Solution
- Add a `version: u32` field to the stream storage entry, incremented on every write
- Accept an optional `expected_version: Option<u32>` parameter in write instructions
- Reject with `StreamError::VersionConflict` if the stored version does not match the expected version
- Return the new version in write instruction responses

## Acceptance Criteria
- [ ] Write with correct expected version succeeds and increments version
- [ ] Write with incorrect expected version is rejected with `VersionConflict`
- [ ] Omitting expected version bypasses the check (backwards compatible)
- [ ] Version is returned in `get_stream` response
- [ ] Tests simulate concurrent modification and verify the conflict error

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
