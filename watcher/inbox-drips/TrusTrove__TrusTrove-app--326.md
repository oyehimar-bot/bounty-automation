# [Medium] fix(indexer): listener/handlers.go -- LogEvent failure risks double-apply on restart

- Repo: TrusTrove/TrusTrove-app
- GitHub: https://github.com/TrusTrove/TrusTrove-app/issues/326
- APPLY HERE: https://www.drips.network/wave/stellar/issues/61c6c18a-6d72-4ade-a495-d87971d9e07d
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-12T21:36:26.000Z
- Labels: bug, complexity:medium, indexer

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Context

The handler mutates the `invoices` row first, then calls `LogEvent`. If `LogEvent` fails the log line, the process may restart and re-process the same event, applying state changes twice.

## Where

- File: `indexer/listener/handlers.go`
- Line: 378

## Current Behavior

LogEvent failure logged but not returned -- event is considered processed.

## Expected Behavior

Wrap state-change + event-log in a transaction; roll back if log-insert fails, and let the listener retry the event.

## Proposed Approach

1. Extract handlers to accept a `pgx.Tx`.
2. Begin a tx, run the state change, insert into `events_log`, commit.
3. On error, roll back and return so the listener retries.

## Acceptance Criteria

- [ ] A simulated `events_log` insert failure leaves the invoice row unchanged
- [ ] Reprocessing after retry ends in the same final state

## Definition of Done

- PR links back with `Closes #<this-issue-number>`.
- CI is green (both `Verify TypeScript Frontend & SDK` and `Verify Go Indexer & API` jobs must pass).
- Local verification:

- `cd indexer && go build -v ./...` succeeds
- `cd indexer && go vet ./...` clean
- `cd indexer && go test -v ./...` green
- `cd indexer && gofmt -l .` prints nothing

## Contributor Tips

- Indexer lives in `indexer/` (Go 1.22, Postgres, subscribes to Soroban events).
- Run locally with `docker compose up -d db && cd indexer && go run .`
- Format with `gofmt -w .` and vet with `go vet ./...` before pushing.
- Test with `cd indexer && go test -v ./...`.
- HTTP handlers must accept `context.Context` and honor cancellation.

## Tech Stack

indexer

## How to Claim

Comment `.take` (or say you're working on it) and open a PR with `Closes #<this-issue-number>` in the description.

Difficulty: **Medium** (`complexity:medium`) -- used for Drips Wave point allocation.


## Drafted application (paste into the Drips form after reviewing)

I’d like to take this issue.

Likely root cause: `indexer/listener/handlers.go` mutates `invoices` before `LogEvent`, and when `LogEvent` fails without returning an error, the listener treats the event as processed, so a restart can apply it again.

Plan:
1. Update `indexer/listener/handlers.go` (around line 378) so invoice state change and `events_log` insert run in one database transaction.
2. Refactor the relevant listener handlers to accept and use `pgx.Tx` for both mutation and `LogEvent`.
3. Return the `LogEvent` error path so the transaction rolls back and the listener retries the event.
4. Add/adjust indexer tests to simulate `events_log` insert failure, confirm invoice row stays unchanged, and confirm retry reaches the same final state once.

I'll wait for assignment before opening a PR.
