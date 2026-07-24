# Implement portfolio analytics aggregation service

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/320
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9f6af1e4-4cf3-4a68-9882-2139065d34d8
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:15:07.000Z
- Labels: enhancement, backend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Pre-compute portfolio analytics (total deposited, total withdrawn, net P&L, average entry price) for each address and cache results.

## Acceptance Criteria
- [ ] `GET /api/portfolio/:address/analytics` returns pre-computed stats
- [ ] Computed on first request, updated on new events
- [ ] Handles wallets with thousands of transactions efficiently
- [ ] P&L calculation accounts for varying entry prices (FIFO method)
- [ ] Background recalculation on new harvest events

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
