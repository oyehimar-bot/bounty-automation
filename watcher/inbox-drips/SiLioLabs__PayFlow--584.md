# ## Issue #78: Implement Allowance Expiry Alert Script

- Repo: SiLioLabs/PayFlow
- GitHub: https://github.com/SiLioLabs/PayFlow/issues/584
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c434deb8-9771-4294-88b8-93d480c78b3f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T10:22:53.000Z
- Labels: backend, script

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Category:** Backend / Scripts
**Complexity:** High
**Points:** 200
**Branch:** `feat/allowance-expiry-alert`

### Background
`check-allowances.ts` checks current allowances but does not alert on upcoming expiries. Stellar token allowances have optional ledger-based expiry. Subscribers whose allowances are about to expire will have failed charges without advance warning.

### Problem
There is no proactive alerting for expiring token allowances. Keeper operators only discover expired allowances when `batch_charge` fails, at which point it's too late to notify the subscriber before the missed charge.

### Acceptance Criteria
- [ ] `scripts/alert-expiring-allowances.ts` queries all subscribers' allowances via `check-allowances.ts` logic
- [ ] Identifies subscribers whose allowance expires within `ALERT_WINDOW_LEDGERS` (configurable, default 17280 = ~24h)
- [ ] Outputs a report: `{ address, merchant, allowance_amount, expires_at_ledger, ledgers_remaining }`
- [ ] Supports webhook output: POST to `WEBHOOK_URL` with the report as JSON if configured
- [ ] Supports dry-run mode: prints report without sending webhook
- [ ] Exits with code 1 if any allowances are expiring soon (useful for CI alerting)

### Implementation Guidelines
**Key files:** `scripts/alert-expiring-allowances.ts` (new), `scripts/check-allowances.ts`
**Approach:** Reuse the allowance-checking logic from `check-allowances.ts`. Add expiry ledger comparison. Format report. Add `node-fetch` or native `fetch` for webhook delivery.
**Edge cases:** Allowance with no expiry set (skip — won't expire); subscriber unsubscribed but allowance still set (include or exclude based on subscription status); webhook returns non-2xx (log error, still exit 1).
**Validation:** Run against testnet with a short allowance expiry set manually, verify report is generated and webhook fires

### PR Requirements
- TypeScript with strict types
- Error handling and graceful failure
- README or inline JSDoc for usage
- Configuration via environment variables

---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
