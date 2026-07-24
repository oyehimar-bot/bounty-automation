# session lifecycle: implement the core flow

- Repo: MixMatch-Inc/MixMatch-Onchain
- GitHub: https://github.com/MixMatch-Inc/MixMatch-Onchain/issues/684
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f6e06fdf-c6e2-4d9c-97e8-317a6c4871f4
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T14:45:03.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Sprint 1: Platform foundation

**Track:** session lifecycle
**Issue type:** implement the core flow

### Why
tighten the current auth-first monorepo so the team can build quickly without breaking the base workflow.

### Scope
Build the session lifecycle workstream with a focus on deliver the primary code path with the smallest useful end-to-end slice.

### Acceptance Criteria
- The change is scoped to the current repo architecture and can be worked on alongside the other sprint items.
- The implementation or documentation clearly reflects the current auth-first foundation instead of assuming future systems already exist.
- The output is small enough to land as one independently reviewable PR.

### Parallel Work
This issue is intentionally designed to run in parallel with other Sprint 1 items.

### Suggested Label
sprint-1

### Backlog Key
S1-002

## Drafted application (paste into the Drips form after reviewing)

Here's a draft you can review and post:

I'd be glad to take this one.

Plan:
- Add a minimal session lifecycle module that fits the current auth-first monorepo, reusing the existing auth layer rather than introducing new systems.
- Implement the smallest end-to-end path: create a session on login, read/validate it on request, and clear it on logout.
- Wire this into the existing auth entry points so it works alongside the current base workflow without changing it.
- Keep the change to one focused, independently reviewable PR labeled sprint-1 (S1-002).

A couple of things I'd want to confirm first: where session state should live (in-memory, cookie, or store) and whether there's a preferred pattern already used elsewhere in the repo, so I match existing conventions.

I'll wait for assignment before opening a PR.
