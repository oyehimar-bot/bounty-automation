# Bid history cap enforcement and ring-buffer storage: prevent unbounded storage growth in high-activity auctions

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/222
- APPLY HERE: https://www.drips.network/wave/stellar/issues/bb4b0020-7a53-45bb-b4b0-27b27d4cd0b0
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-18T18:10:14.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview

The auction contract caps bid history at `BID_HISTORY_CAP` entries using a ring-buffer eviction, but the cap value is a compile-time constant that cannot be adjusted per auction. For high-frequency auctions with many small bids, even a cap of 50 entries creates meaningful storage overhead. This issue makes the cap configurable, verifies the ring-buffer logic is correct under all edge cases, and adds observability for storage-usage trends.

## Background

In `contract.rs`, `BID_HISTORY_CAP` is defined as a constant. The ring-buffer logic pushes to a Vec and removes the front element when the cap is exceeded. Using a Vec for this pattern causes O(n) removal because elements must shift. This is acceptable for small caps but should be documented and monitored.

## Work to be Done

**Contract layer**

Make `BID_HISTORY_CAP` a global admin-configurable parameter stored in instance storage with a default of 50 and a maximum of 200. Add `set_bid_history_cap(cap: u32)` admin function. Snapshot the cap into each `Auction` at creation time (add `bid_history_cap: u32` to the struct). The bid history ring-buffer uses the snapshotted cap, so changing the global does not affect in-progress auctions.

Write a detailed comment in `contract.rs` explaining the O(n) shift and why it is acceptable given the cap range.

Add a property-based test (`proptest`) that generates N random bids on an auction with cap C and asserts the stored bid count is always exactly `min(N, C)`.

**Indexer layer**

Add a Prometheus histogram `elcarehub_auction_bid_count` that tracks the distribution of bids per auction. Add `GET /auctions/:id/bids` endpoint returning the full bid history with pagination.

**Frontend layer**

In `src/app/auctions/[id]/page.tsx`, display the full bid history in a paginated table below the bidding panel. Show bidder address (truncated), amount, and timestamp.

## Implementation Procedure

1. Add admin configurable cap and snapshot into Auction struct.
2. Update ring-buffer logic to use snapshotted cap.
3. Write proptest for ring-buffer correctness.
4. Add the Prometheus histogram.
5. Add `GET /auctions/:id/bids` endpoint.
6. Build the bid history table in the frontend.
7. Run all test suites.

## Acceptance Criteria

The bid history cap is admin-configurable between 1 and 200. New auctions snapshot the current global cap. The ring-buffer never stores more than `bid_history_cap` entries for any auction. The Prometheus histogram tracks bid-count distribution. The auction detail page displays paginated bid history.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
