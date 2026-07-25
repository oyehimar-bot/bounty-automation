# Create a local mock data generator for frontend development

- Repo: Kevin737866/-stellar-analytics-dashboard
- GitHub: https://github.com/Kevin737866/-stellar-analytics-dashboard/issues/267
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6d8944d5-0509-4681-b4b7-866759ae2691
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T18:41:06.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
Reduce dependency on live services during feature development.

## Suggested implementation notes
- Review the related service area in the monorepo.
- Define clear acceptance criteria before implementation.
- Add or update tests and documentation where appropriate.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Review the related service area in the monorepo and map where the frontend currently depends on live services.
2. Confirm and document acceptance criteria in the issue thread before coding (required datasets, payload shape, and how mock mode is enabled).
3. Implement a local mock data generator in that service area and wire frontend calls to use it in local development instead of live endpoints.
4. Add or update tests for mock payload structure and source switching, then update documentation with setup and usage steps.

I'll wait for assignment before opening a PR.
