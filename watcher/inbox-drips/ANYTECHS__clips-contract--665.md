# [Minting] Assign NFT Creator During Mint

- Repo: ANYTECHS/clips-contract
- GitHub: https://github.com/ANYTECHS/clips-contract/issues/665
- APPLY HERE: https://www.drips.network/wave/stellar/issues/59fbc9f6-40a1-43a8-8870-c1dbd964cd72
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T16:56:17.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Description

Assign the original creator of the ClipCash clip as the NFT creator during the minting process. This information will be used for attribution and royalty distribution.

Acceptance Criteria
Save creator address
Prevent empty creator
Persist creator information
Add unit tests

Labels

contract
minting
ownership
priority:high

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue.

Plan:
- Add a `creator` address field to the NFT metadata/storage struct so each minted token records its original ClipCash creator.
- In the mint function, set the creator from the passed-in address and add a check that rejects an empty or zero address so minting fails when no creator is provided.
- Persist the creator alongside the token record so it stays available for later attribution and royalty distribution reads.
- Add unit tests covering: creator is saved correctly, minting reverts on an empty creator, and the stored value survives a mint-then-read.

One thing to confirm: whether the creator address is supplied as a mint parameter or derived from an existing clip record. I'll match whichever the contract already uses.

I'll wait for assignment before opening a PR.
