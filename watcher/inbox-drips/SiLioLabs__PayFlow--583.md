# ## Issue #77: Build Persistent Event Indexer with SQLite Storage

- Repo: SiLioLabs/PayFlow
- GitHub: https://github.com/SiLioLabs/PayFlow/issues/583
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c69d07e7-a70e-4865-b5c1-4f08acbad6f3
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T10:21:38.000Z
- Labels: backend, script

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Category:** Backend / Scripts
**Complexity:** High
**Points:** 200
**Branch:** `feat/event-indexer-sqlite`

### Background
`watch-events.ts` and `replay-events.ts` poll and replay contract events but do not persist them to a database. There is no queryable event history, making analytics, debugging, and off-chain reconciliation dependent on real-time polling.

### Problem
Contract events are ephemeral in the current tooling — they are logged to console but not stored. An indexer that persists events to a local SQLite database would enable powerful off-chain queries, reconciliation, and audit trails.

### Acceptance Criteria
- [ ] `scripts/indexer.ts` polls events every 10 seconds and upserts them into a SQLite database (`data/events.db`)
- [ ] Schema: `events(id, event_name, address, amount, ledger, timestamp, tx_hash, raw_data)`
- [ ] Start ledger is stored in DB; on restart, indexer resumes from last indexed ledger
- [ ] Duplicate events are handled idempotently (upsert on `tx_hash + event_name`)
- [ ] `scripts/query-events.ts` CLI provides basic queries: events by address, events by type, events in ledger range
- [ ] Uses `better-sqlite3` (synchronous, no extra dependencies)

### Implementation Guidelines
**Key files:** `scripts/indexer.ts` (new), `scripts/query-events.ts` (new)
**Approach:** Use `better-sqlite3` for synchronous SQLite access. On startup, read last indexed ledger from a `meta` table. Poll events from that ledger forward. Parse each event from `watch-events.ts` format and insert.
**Edge cases:** Ledger gap (RPC returns no events for a range — advance cursor anyway); schema migration needed (add a `schema_version` table); large initial sync from genesis (batch inserts, progress logging).
**Validation:** Run against testnet for 5 minutes, verify events accumulate in DB, verify resume works after restart

### PR Requirements
- TypeScript with strict types
- Error handling and graceful failure
- README or inline JSDoc for usage
- Configuration via environment variables


## Drafted application (paste into the Drips form after reviewing)

I'll take this one.

Plan:
1. Add `scripts/indexer.ts` using `better-sqlite3`: create the `events(id, event_name, address, amount, ledger, timestamp, tx_hash, raw_data)` schema plus `meta` and `schema_version` tables, and poll every 10 seconds.
2. Reuse the event parsing from `watch-events.ts`, then upsert with a unique constraint on `(tx_hash, event_name)` so duplicates are idempotent.
3. Store the last indexed ledger in `meta`; on startup read it and resume, advancing the cursor even when a ledger range returns no events.
4. Add `scripts/query-events.ts` CLI for queries by address, by event type, and by ledger range.
5. Handle initial sync from genesis with batched inserts and progress logging; read config (RPC URL, contract address, DB path) from environment variables, add JSDoc usage notes, and test against testnet for 5 minutes including a restart.

I'll wait for assignment before opening a PR.
