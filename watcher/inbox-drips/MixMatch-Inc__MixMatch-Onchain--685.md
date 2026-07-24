# session lifecycle: add regression coverage

- Repo: MixMatch-Inc/MixMatch-Onchain
- GitHub: https://github.com/MixMatch-Inc/MixMatch-Onchain/issues/685
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6dd1d83e-fa4b-4e66-a52b-41dacac61d2e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T14:45:04.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Sprint 1: Platform foundation

**Track:** session lifecycle
**Issue type:** add regression coverage

### Why
tighten the current auth-first monorepo so the team can build quickly without breaking the base workflow.

### Scope
Build the session lifecycle workstream with a focus on cover the happy path, expected edge cases, and any fragile integrations.

### Acceptance Criteria
- The change is scoped to the current repo architecture and can be worked on alongside the other sprint items.
- The implementation or documentation clearly reflects the current auth-first foundation instead of assuming future systems already exist.
- The output is small enough to land as one independently reviewable PR.

### Parallel Work
This issue is intentionally designed to run in parallel with other Sprint 1 items.

### Suggested Label
sprint-1

### Backlog Key
S1-003

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one.

Plan:
- Locate the current session lifecycle code (login, logout, token refresh, and session expiry paths) in the auth-first monorepo and confirm where the existing tests live before adding to them.
- Add regression tests for the happy path: creating a session on login and clearing it on logout.
- Add edge case tests: expired or invalid sessions, refresh behavior, and repeated login/logout cycles.
- Cover the fragile integration points where session state is read by other parts of the base workflow, so those do not silently break.
- Keep the change to test files only (plus small helpers if needed) so it lands as one independently reviewable PR alongside the other Sprint 1 items.

A couple of things I would confirm first: the test runner and framework in use, and whether you want these scoped to unit level or including integration coverage.

I'll wait for assignment before opening a PR.
