# Issue 43: Add image and metadata moderation workflow

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/308
- APPLY HERE: https://www.drips.network/wave/stellar/issues/be2c4ea7-91ac-4c86-b6cd-057496467ad7
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T03:46:36.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


### Description
The application allows creators to upload artwork and metadata, but there is no documented moderation or abuse response path. An open upload endpoint can be used for prohibited content, malware-like files, misleading metadata, or spam. This is a product, security, and operational gap for a public marketplace.

### Work To Be Done
Define moderation states and review ownership for uploaded assets and collection metadata. Add content scanning hooks, report handling, quarantine behavior, and a policy for already-published IPFS content that cannot be deleted globally.

### Implementation Procedure
1. Define acceptable-content policy and moderation state model.
2. Add asynchronous scanning and a quarantine record before mint or publication where feasible.
3. Add report endpoint or admin workflow with audit trail.
4. Prevent blocked or pending content from being presented as verified artwork.
5. Document response, escalation, and takedown limitations for immutable or replicated content.

### Acceptance Criteria
- New assets have a visible moderation state before publication.
- Blocked assets cannot be minted or promoted through normal UI paths.
- Reports and decisions are auditable with actor and timestamp.
- Users can distinguish creator-provided content from platform verification.
- Policy and operational limitations are published in the repository documentation.




## Drafted application (paste into the Drips form after reviewing)

I’d like to take this issue.

Plan:
1. Likely root cause is that uploads can move toward publication without a moderation state model or clear review ownership.
2. Define moderation states (pending, approved, blocked, quarantined) and document policy, including limits for immutable or replicated IPFS content.
3. Add asynchronous scanning hooks on the upload endpoint and create a quarantine record before mint or publication where feasible.
4. Add a report endpoint or admin review workflow with an audit trail (actor, timestamp, decision, reason).
5. Update mint and UI presentation checks so pending or blocked assets and metadata are not shown as verified artwork.

I'll wait for assignment before opening a PR.
