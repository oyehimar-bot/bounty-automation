# [Frontend] Introduce a typed API client layer

- Repo: Xoulomon/Scavenger
- GitHub: https://github.com/Xoulomon/Scavenger/issues/872
- APPLY HERE: https://www.drips.network/wave/stellar/issues/a55056ef-28b1-4f07-8456-f72326f8f301
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T08:30:43.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**
Components call fetch directly with ad-hoc types. Add a typed API client to centralize requests and error handling.

**Tasks:**
- Create `lib/apiClient.ts` with typed methods
- Replace direct fetch calls in 5 components
- Add tests with mocked responses

**Acceptance Criteria:**
- [ ] Typed client covers all endpoints
- [ ] Direct fetch calls removed
- [ ] Tested (unit)
- [ ] Code review passed
- [ ] Related tests passing

**Type**: Refactor
**Priority**: P1-High
**Estimated Effort**: 1-2 days
Related to: #7
---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
