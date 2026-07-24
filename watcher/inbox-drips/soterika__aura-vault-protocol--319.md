# Add API gateway middleware for request/response logging

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/319
- APPLY HERE: https://www.drips.network/wave/stellar/issues/82444be6-2c6e-498d-bbce-57f719f59199
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:15:05.000Z
- Labels: backend, monitoring

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Log every API request and response with enough detail to reconstruct issues from logs alone.

## Acceptance Criteria
- [ ] Log fields: timestamp, correlationId, method, path, statusCode, durationMs, requestBodyHash, responseSize
- [ ] Request body logged at DEBUG level (not in production by default)
- [ ] Sensitive fields (passwords, tokens) never logged
- [ ] Error responses include full stack trace in logs (not in response body)
- [ ] Log format compatible with Loki label extraction

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
