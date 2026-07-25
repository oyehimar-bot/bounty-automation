# #102: Verify Stellar CLI version pin in CI matches README

- Repo: WHEELBACK/COMEBACKHERE-contracts
- GitHub: https://github.com/WHEELBACK/COMEBACKHERE-contracts/issues/293
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c964894d-2cf2-4f32-9c95-c9efe30672ab
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T13:15:00.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Description
`README.md` pins Stellar CLI `20.0.0`; confirm CI actually installs and tests against that exact version rather than "latest," which could mask incompatibilities before they hit a contributor's local machine.

### Requirements and context
Check `.github/workflows/build.yml` and `scripts/check-tools.sh` for the actual installed version logic.

### Suggested execution
```
git checkout -b ci/pin-stellar-cli-version
```
- Files: `.github/workflows/build.yml`, `scripts/check-tools.sh`

### Test and commit
- [ ] CI installs the exact pinned Stellar CLI version from the README
- [ ] `scripts/check-tools.sh` fails clearly if a contributor's local CLI version mismatches
- [ ] `cargo test --all` passes

### Example commit message
```
ci: pin Stellar CLI version in CI to match README

Closes #102
```

### Guidelines
Timeframe: 24 hours.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: CI is installing Stellar CLI as latest in .github/workflows/build.yml, while README.md pins 20.0.0, so local and CI versions can drift.

Plan:
1. Review README.md, .github/workflows/build.yml, and scripts/check-tools.sh to confirm where the CLI version is defined today.
2. Update .github/workflows/build.yml to install Stellar CLI 20.0.0 explicitly, not latest.
3. Update scripts/check-tools.sh to check the local Stellar CLI version against 20.0.0 and fail with a clear mismatch message.
4. Run cargo test --all to confirm the pinned version works with the current test suite.

I'll wait for assignment before opening a PR.
