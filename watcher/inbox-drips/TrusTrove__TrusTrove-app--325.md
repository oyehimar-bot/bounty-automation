# [Medium] fix(indexer): listener/soroban.go cursor-advance can loop forever

- Repo: TrusTrove/TrusTrove-app
- GitHub: https://github.com/TrusTrove/TrusTrove-app/issues/325
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9da40c92-30b9-4bad-b26c-b5c8e2d05e9b
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-12T21:36:24.000Z
- Labels: bug, complexity:medium, indexer

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Context

The cursor-advance condition `res.Cursor != "" && len(res.Events) > 0` re-polls with the same cursor when the RPC returns matching events but does not advance the ledger. In pathological cases the loop never terminates.

## Where

- File: `indexer/listener/soroban.go`
- Line: 246

## Current Behavior

Simple non-empty condition, no equality check against the previous cursor.

## Expected Behavior

Advance only if the returned cursor is strictly greater than the previous one. Otherwise sleep briefly and retry.

## Proposed Approach

1. Record the previous cursor in the outer scope.
2. Compare and only re-enter the tight loop when it advanced.
3. Add a unit test with a fake RPC that returns the same cursor twice.

## Acceptance Criteria

- [ ] Test with a stalled-cursor RPC does not spin
- [ ] Live indexer still keeps up on testnet

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

I'd like to take this issue.

Plan:
1. Likely root cause: in `indexer/listener/soroban.go` (around line 246), the loop uses `res.Cursor != "" && len(res.Events) > 0` without checking cursor advancement, so repeated identical cursors can cause an endless tight poll.
2. Track the previous cursor in outer scope and only continue the fast re-poll path when `res.Cursor` is strictly greater than the previous value.
3. If the cursor is unchanged or lower, sleep briefly before retrying so it does not spin while waiting for ledger progress.
4. Add a unit test in `indexer` with a fake RPC that returns the same cursor twice, and assert the listener does not spin.
5. Run `cd indexer && go build -v ./...`, `go vet ./...`, `go test -v ./...`, and `gofmt -l .` before opening a PR with `Closes #325`.

I'll wait for assignment before opening a PR.
