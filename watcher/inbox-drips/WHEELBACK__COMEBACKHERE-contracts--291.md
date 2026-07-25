# #100: Add CI matrix testing across pinned toolchain versions

- Repo: WHEELBACK/COMEBACKHERE-contracts
- GitHub: https://github.com/WHEELBACK/COMEBACKHERE-contracts/issues/291
- APPLY HERE: https://www.drips.network/wave/stellar/issues/53422198-31c5-4536-a832-ba476b560818
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T13:14:52.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Description
`rust-toolchain.toml` pins `1.95.0`; confirm CI only tests against that single version and consider (or explicitly reject and document) testing against the next stable release as an early-warning signal before the next mandatory bump.

### Requirements and context
Do not change the pinned toolchain itself — this is about adding an *additional*, non-blocking CI job, not altering what's required for merges.

### Suggested execution
```
git checkout -b ci/toolchain-matrix
```
- Files: `.github/workflows/test.yml`

### Test and commit
- [ ] Additional non-blocking CI job runs against a newer stable Rust as an early-warning signal
- [ ] Existing pinned-version job remains the required check
- [ ] `cargo test --all` passes locally against the pinned version

### Example commit message
```
ci: add non-blocking toolchain matrix job for early upgrade signals

Closes #100
```

### Guidelines
Timeframe: 48 hours.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Review `.github/workflows/test.yml` to confirm current CI runs only on the pinned toolchain from `rust-toolchain.toml` (`1.95.0`).
2. Update `.github/workflows/test.yml` to add an additional job that runs `cargo test --all` on the next stable Rust release as an early warning signal.
3. Configure that new job as non-blocking (allowed to fail), while keeping the pinned-version job as the required merge check.
4. Verify `cargo test --all` passes locally on the pinned toolchain and ensure workflow naming makes required vs non-blocking checks clear.

I'll wait for assignment before opening a PR.
