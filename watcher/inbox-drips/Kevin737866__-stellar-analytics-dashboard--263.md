# Add flaky test reporting and quarantine workflow

- Repo: Kevin737866/-stellar-analytics-dashboard
- GitHub: https://github.com/Kevin737866/-stellar-analytics-dashboard/issues/263
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6bb06ad8-2952-485f-b023-582cfd7eeb24
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T18:41:02.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
Identify and isolate unstable tests instead of letting them block releases.

## Suggested implementation notes
- Review the related service area in the monorepo.
- Define clear acceptance criteria before implementation.
- Add or update tests and documentation where appropriate.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: nondeterministic tests (shared state, timing, or external dependency variance) are mixed into the required release test path, so flakes block merges.

Plan:
- Review the monorepo test and CI workflow for the related service area, confirm which suite currently gates releases, and list flaky candidates.
- Define acceptance criteria in the issue/PR notes: how a test is marked flaky, when it is quarantined, and release-gate behavior.
- Implement flaky test reporting in the existing CI pipeline so failures are surfaced separately from stable-suite failures.
- Add a quarantine workflow that moves flagged tests to a non-blocking path while keeping visibility.
- Update tests and docs to cover the reporting and quarantine flow.

I'll wait for assignment before opening a PR.
