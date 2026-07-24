# Indexer re-org rollback depth: configurable rollback depth, re-org event bus, and frontend chain-split notification

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/223
- APPLY HERE: https://www.drips.network/wave/stellar/issues/b858d647-17b2-4603-8777-939ce811ff89
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-18T18:11:30.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview

The indexer`s `poller.ts` detects ledger hash discontinuities and rolls back the database to the last known good ledger. However, the rollback depth is fixed and cannot be configured, there is no event emitted on the SSE stream to notify connected frontends that a re-org occurred, and the rollback logic does not validate that the rollback target ledger is actually reachable from the current tip. This issue hardens the re-org handling pipeline end to end.

## Background

In `indexer/src/poller.ts`, the re-org detection compares `lastLedgerHash` in `SyncState` against the hash returned by the RPC for the same sequence number. If they differ, a rollback function is called. The rollback deletes database rows for ledger sequences above the divergence point. There is no configurable `MAX_ROLLBACK_DEPTH` env variable, and the frontend receives no notification that state may have changed.

## Work to be Done

**Indexer layer**

In `poller.ts`, read `MAX_ROLLBACK_DEPTH` from environment config (default: 100 ledgers). If the detected re-org requires rolling back more than `MAX_ROLLBACK_DEPTH` ledgers, halt the poller, log a critical error, and emit a `CRITICAL_REORG` SSE event rather than attempting a potentially destructive deep rollback. Require a human operator to manually trigger recovery via a new `POST /admin/reorg-recovery` endpoint.

Add a `ReorgEvent` type to the SSE stream with fields: `type: "REORG"`, `from_ledger`, `to_ledger`, `timestamp`, `depth`.

In `reconciler.ts`, validate that the rollback target ledger exists in the database before issuing DELETE statements. If not found, treat it as a critical re-org.

In `config.ts`, add `MAX_ROLLBACK_DEPTH` and `REORG_HALT_ON_DEEP` configuration variables.

**Frontend layer**

In the application layout `src/app/layout.tsx`, subscribe to the SSE stream and listen for `REORG` events. When received, show a dismissible toast notification: "Blockchain reorganization detected — data is refreshing." Trigger a full page data reload after 3 seconds.

## Implementation Procedure

1. Add `MAX_ROLLBACK_DEPTH` to config and read it in `poller.ts`.
2. Implement the depth check and halt logic.
3. Add the `ReorgEvent` to the SSE emitter.
4. Update `reconciler.ts` with the pre-rollback target validation.
5. Add the admin recovery endpoint.
6. Write Vitest tests for deep re-org halt behavior.
7. Add the frontend toast notification.
8. Run all test suites.

## Acceptance Criteria

Re-orgs deeper than `MAX_ROLLBACK_DEPTH` halt the poller and emit a `CRITICAL_REORG` SSE event rather than executing a deep rollback. Shallow re-orgs execute normally and emit a `REORG` SSE event. The frontend shows a toast on re-org detection. The admin recovery endpoint allows manual rollback initiation. Existing re-org tests pass.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
