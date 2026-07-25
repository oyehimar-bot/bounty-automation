# Write unit tests for API key auth middleware

- Repo: FaveTeamz/workload-governor
- GitHub: https://github.com/FaveTeamz/workload-governor/issues/370
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9b58eb58-4ded-4b1f-af6e-c144a13ed8fd
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T11:17:26.000Z
- Labels: testing

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Add comprehensive unit tests for the API key authentication middleware covering all authentication outcomes: missing key, invalid key, valid key, expired key, and scope enforcement.

## Background
tests/api/api-key-auth.test.ts has partial coverage. The scope enforcement paths (read vs write vs admin) are not tested, nor is the key expiry path.

## Requirements
- Test: missing Authorization header returns 401
- Test: malformed header format returns 401
- Test: unknown key hash returns 403
- Test: expired key returns 401 with key_expired code
- Test: valid read-scoped key on write endpoint returns 403
- Test: valid admin-scoped key on admin endpoint succeeds
- Test: rate limit exceeded for key returns 429

## Acceptance Criteria
- [ ] All 7 test cases pass
- [ ] Tests mock DB key lookup (no real DB required)
- [ ] Scope enforcement tested for read, write, and admin scopes
- [ ] Expired key path uses controlled clock mock
- [ ] Tests run in under 10 seconds

## References
- tests/api/api-key-auth.test.ts
- src/middleware/api-key-auth.ts

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
- Review `tests/api/api-key-auth.test.ts` and map current coverage to the 7 required outcomes.
- Add tests for missing `Authorization` header, malformed header, unknown key hash, and expired key (`401` with `key_expired`), with mocked DB key lookup.
- Add a controlled clock mock so the expiry path in `src/middleware/api-key-auth.ts` is deterministic.
- Add scope enforcement tests for read, write, and admin scopes, including read key blocked on a write endpoint (`403`) and admin key allowed on an admin endpoint.
- Add the rate limit exceeded case (`429`) and keep execution focused to ensure this file runs under 10 seconds.

I'll wait for assignment before opening a PR.
