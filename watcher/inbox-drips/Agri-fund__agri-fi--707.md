# test(e2e): KYC Verification Flow Coverage

- Repo: Agri-fund/agri-fi
- GitHub: https://github.com/Agri-fund/agri-fi/issues/707
- APPLY HERE: https://www.drips.network/wave/stellar/issues/834fed72-d2c7-4df8-a6db-524258d04c70
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T15:00:13.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### test(e2e): KYC Verification Flow Coverage
* **Component:** DevOps (Testing)
* **Detailed Description:** Write E2E tests validating the full KYC upload and review flow.
* **Implementation Pointers:** Write Playwright scripts testing the KYC views.
* **Acceptance Criteria:**
  - Tests successfully execute KYC submissions and approvals.
  - Error states are handled and verified.

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue.

Plan:
- Add a Playwright spec covering the KYC upload flow: navigate to the KYC view, submit a document upload, and assert the submission succeeds.
- Extend the spec to cover the review path: approve a submitted KYC entry and verify the resulting approved state in the UI.
- Add error-state cases: invalid or missing file, failed upload, and rejected review, asserting the correct error messages render.
- Wire any needed test fixtures or mock data for KYC submissions so the flow runs without manual setup.

A few things I'd want to confirm before starting: the exact route/component names for the KYC upload and review views, and whether approvals go through a real API or should be mocked in the test.

I'll wait for assignment before opening a PR.
