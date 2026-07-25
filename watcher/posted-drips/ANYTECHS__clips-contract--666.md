# [Minting] Link Metadata to Newly Minted NFT

- Repo: ANYTECHS/clips-contract
- GitHub: https://github.com/ANYTECHS/clips-contract/issues/666
- APPLY HERE: https://www.drips.network/wave/stellar/issues/8b43504e-7d12-4bbc-93e7-e1a711245dc0
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T16:56:38.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Description

Associate the generated NFT with its corresponding metadata record immediately after minting.

Acceptance Criteria
Link metadata
Validate metadata exists
Prevent broken references
Add tests

Labels

contract
metadata
minting

## Drafted application (paste into the Drips form after reviewing)

Hi, I'd like to take this issue if it's open.

Plan:
- Confirm which minting function this applies to (the issue mentions "newly minted NFT" but not the contract or method name), so I can hook the metadata link at the right point.
- Add a metadata validation step that checks the record exists before linking, and reverts the mint or link if it does not.
- Store the association (token ID to metadata reference) and prevent broken references by rejecting empty or unresolved metadata.
- Add tests covering the happy path, minting with missing metadata, and duplicate or invalid references.

A couple of things I'd want to confirm first: where metadata records live (on-chain, IPFS, or a registry), and whether linking should block minting or run right after. Once that's clear I can finalize the approach.

I'll wait for assignment before opening a PR.
