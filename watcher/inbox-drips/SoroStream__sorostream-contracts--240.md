# Fix cancel_stream not emitting CancelledStream event when recipient claimable is zero

- Repo: SoroStream/sorostream-contracts
- GitHub: https://github.com/SoroStream/sorostream-contracts/issues/240
- APPLY HERE: https://www.drips.network/wave/stellar/issues/fb35137e-0626-4f95-93d2-9edbd23ee930
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T14:14:13.000Z
- Labels: bug, complexity: high

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview
When a stream is cancelled before any withdrawal has been made by the recipient, the `CancelledStream` event is emitted but without the recipient amount field set correctly.

## Problem
The `CancelledStream` event emits `recipient_amount: 0` correctly, but the event is not emitted at all in some code paths (specifically when the claimable amount is exactly zero at cancel time). This breaks event-driven indexers.

## Proposed Solution
- Remove the conditional guard that skips event emission when `claimable == 0`
- Always emit `CancelledStream { stream_id, sender_refund, recipient_amount }` regardless of amounts
- Add a test to verify event emission on zero-claimable cancel
- Update the event schema documentation to reflect guaranteed emission

## Acceptance Criteria
- [ ] `CancelledStream` is emitted for every call to `cancel_stream` without exception
- [ ] `recipient_amount` field is `0` when no amount was claimable
- [ ] `sender_refund` field equals the full deposit when cancelled before cliff
- [ ] Existing cancel tests still pass
- [ ] New test verifies event emission on zero-claimable cancel

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
