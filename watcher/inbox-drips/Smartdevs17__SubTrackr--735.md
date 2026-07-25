# Build subscription metering with real-time usage tracking and alerts

- Repo: Smartdevs17/SubTrackr
- GitHub: https://github.com/Smartdevs17/SubTrackr/issues/735
- APPLY HERE: https://www.drips.network/wave/stellar/issues/a50c3d74-9fc1-4d42-8247-67e7bb05c463
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T17:49:31.000Z
- Labels: drips-wave, high, 200-points

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Context
Usage-based subscriptions need real-time metering.

## Current Limitation
Metering is basic with no real-time tracking.

## Expected Outcome
- Real-time usage tracking
- Usage alerts and notifications
- Usage analytics
- Usage-based billing integration

## Acceptance Criteria
- [ ] Real-time usage tracking per metric
- [ ] Usage alerts at configurable thresholds
- [ ] Usage analytics dashboard
- [ ] Usage-based billing integration
- [ ] Usage history and trends
- [ ] Usage API for queries
- [ ] Usage documentation

## Technical Scope
- `contracts/metering/src/` - Metering contract
- `app/stores/meteringStore.ts` - Metering store
- `backend/services/billing/metering.ts` - Metering service
- `app/screens/` - Usage dashboard

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Implement per-metric real-time usage recording in `contracts/metering/src/`, including meter events tied to tracked actions.
2. Extend `backend/services/billing/metering.ts` to process meter events, store usage history and trends, and expose a usage query API (metric, account, time range).
3. Update `app/stores/meteringStore.ts` to keep live usage state, configurable thresholds, and alert triggers for notifications.
4. Build `app/screens/` views for usage analytics: current usage, threshold status, alert feed, and trend charts.
5. Wire usage-based billing integration through the metering service, then document setup, API usage, thresholds, and alert behavior after confirming billing provider and notification channel.

I'll wait for assignment before opening a PR.
