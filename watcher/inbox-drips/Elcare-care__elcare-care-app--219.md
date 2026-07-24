# Collection NFT approval operator model: per-token and collection-level approvals with expiry and revocation

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/219
- APPLY HERE: https://www.drips.network/wave/stellar/issues/075c4c95-5540-4cdb-9eae-60dcb72180d8
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-18T18:10:12.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview

The ERC-721 collection contract supports basic `approve` and `transfer_from`, but lacks `setApprovalForAll` with expiry, per-token approval with time limits, and revocation events. This is critical for marketplace integration because the marketplace contract needs approval before it can transfer NFTs on behalf of sellers.

## Background

In `collection_nft_erc721/src/lib.rs`, the `approve` function sets a single approved address per token with no expiry. There is no `setApprovalForAll`. The marketplace `buy_listing` entry-point calls `transfer_from` which relies on the NFT contract approving the marketplace. This approval must be set by the seller before listing.

## Work to be Done

**Contract layer**

In `collection_nft_erc721/src/lib.rs`, add `set_approval_for_all(operator: Address, approved: bool, expires_at: Option<u64>)`. Add `is_approved_for_all(owner, operator): bool` that also checks expiry. Update `approve` to support an optional `expires_at` parameter. In `transfer_from`, check both per-token approval and approval-for-all, respecting expiry. Add `revoke_all_approvals(token_id)` callable by token owner.

In `events.rs` for the collection contract, emit `ApprovalSet`, `ApprovalForAllSet`, `ApprovalRevoked`.

**Frontend layer**

In `ListingForm.tsx`, before allowing listing creation, check if the marketplace contract has approval-for-all for the user's collection. If not, show a one-time "Approve Marketplace" step that calls `set_approval_for_all` with the marketplace contract address.

## Implementation Procedure

1. Add approval-for-all storage and functions.
2. Update `transfer_from` to check all approval paths.
3. Add expiry logic to both approval types.
4. Add event emitters and Rust tests.
5. Update the frontend listing form with the approval pre-check step.
6. Run all test suites.

## Acceptance Criteria

`set_approval_for_all` grants the operator permission to transfer all tokens. Expiry-based approvals stop working after the deadline. `transfer_from` respects both per-token and collection-level approvals. The listing form guides users through the marketplace approval step before they can list.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
