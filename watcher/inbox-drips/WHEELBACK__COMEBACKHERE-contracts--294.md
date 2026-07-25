# #103: Add CI smoke test for `scripts/init-contracts.sh`

- Repo: WHEELBACK/COMEBACKHERE-contracts
- GitHub: https://github.com/WHEELBACK/COMEBACKHERE-contracts/issues/294
- APPLY HERE: https://www.drips.network/wave/stellar/issues/4d8bb6c9-1599-4bea-a146-f788ae60000e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:15:05.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Description
The local-testnet init script has no CI coverage — a change to any contract's `initialize` signature could silently break it for every new contributor without CI catching it first.

### Requirements and context
Run the script against a local Stellar testnet/standalone network in CI and assert successful deployment + initialization of all three contracts.

### Suggested execution
```
git checkout -b ci/init-contracts-smoke-test
```
- Files: new `.github/workflows/init-smoke-test.yml`

### Test and commit
- [ ] CI job runs `scripts/init-contracts.sh` against a local network and passes
- [ ] Job fails if any contract's `initialize` entrypoint changes incompatibly
- [ ] `cargo test --all` passes

### Example commit message
```
ci: add smoke test for init-contracts.sh against local testnet

Closes #103
```

### Guidelines
Timeframe: 48 hours.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause is missing CI coverage for `scripts/init-contracts.sh`, so incompatible `initialize` signature changes can slip in unnoticed.

Plan:
- Add `.github/workflows/init-smoke-test.yml` with a CI job that starts a local Stellar testnet/standalone network.
- In that job, run `scripts/init-contracts.sh` end to end and fail on any non-zero exit.
- Assert successful deployment and initialization of all three contracts by checking the script output and command success paths.
- Keep this as a smoke test specifically for `initialize` compatibility, so breaking entrypoint changes fail fast in CI.
- Run `cargo test --all` in CI as required and ensure it passes alongside the smoke test.

I'll wait for assignment before opening a PR.
