# Issue 44: Add stale-data indicators to listings, auctions, and offers

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/309
- APPLY HERE: https://www.drips.network/wave/stellar/issues/36e87354-95c4-436e-93f2-69feb8da21be
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T03:46:37.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


### Description
The frontend reads fast-changing chain state through the indexer. A listing may have sold, an auction may have ended, or an offer may have been accepted while a detail page remains open. The current user experience needs to explain data freshness and refresh automatically before allowing a sensitive action.

### Work To Be Done
Expose last indexed ledger and fetched time in client state, show a non-blocking stale indicator, and perform a fresh read or simulation before purchase, bid, offer acceptance, and cancellation. Handle SSE disconnects visibly.

### Implementation Procedure
1. Add freshness metadata to indexer client response types.
2. Define stale thresholds by resource type and network.
3. Add reusable stale banners and refresh controls.
4. Invoke authoritative preflight checks before submitting sensitive transactions.
5. Add tests for old data, disconnected SSE, refreshed state, and action rejection after state change.

### Acceptance Criteria
- Users can tell when a page is not current.
- Sensitive actions do not rely solely on an old cached response.
- Refreshing updates the detail view without losing form input unnecessarily.
- SSE failure and recovery are visible but not disruptive.
- Tests cover a resource changing while its page is open.




## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: detail views rely on cached indexer data without freshness metadata or mandatory preflight checks before sensitive writes.

Plan:
1. Extend indexer client response types to carry last indexed ledger and fetchedAt, then expose both in client state for listing, auction, and offer detail pages.
2. Add stale thresholds by resource type and network, and wire a reusable stale banner plus manual refresh control.
3. Update purchase, bid, offer acceptance, and cancellation submit handlers to run an authoritative fresh read or simulation before signing.
4. Surface SSE disconnect and recovery state in the UI, visible but non-blocking.
5. Add tests for stale data display, SSE disconnect/reconnect, refresh preserving form input, and rejection when chain state changes mid-session.

I'll wait for assignment before opening a PR.
