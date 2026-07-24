# Batch results are keyed by derived name, so same-named contracts overwrite each other

- Repo: ShippedLabs/soroban-upgrade-safeguard
- GitHub: https://github.com/ShippedLabs/soroban-upgrade-safeguard/issues/116
- APPLY HERE: https://www.drips.network/wave/stellar/issues/dbe55607-854b-4af2-94d8-25ffb27f7992
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-22T20:08:15.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem

Batch mode in `src/main.rs` collects results into a `BTreeMap` keyed by
`contract_name`, which is taken from the manifest's optional `name` or otherwise
derived from the new WASM file's basename.

Nothing guarantees that key is unique. Two pairs comparing `token.wasm` in
different directories both derive the name `token.wasm`, and the second `insert`
silently replaces the first. The pair is still compared and its progress line is
still printed, so the run looks complete, but its report is gone from the output.

`total_pairs` is computed from the input list rather than the results map, so the
JSON output actively contradicts itself: it claims a pair count higher than the
number of entries in `results`. A pair with critical findings can be dropped this
way while `overall_safe` still correctly reports false, leaving the user with a
failure they cannot locate.

## Expected behaviour

Every compared pair should appear in the output. A name collision should either
be disambiguated automatically or rejected with a clear error, but never resolved
by silently discarding a result.

## Suggested approach

Detect the collision when inserting. Disambiguating with the relative path is
friendlier than failing, since duplicate basenames across directories are normal.
For manifest entries with an explicit duplicate `name`, an error is more
appropriate because the user wrote the name deliberately. Make sure `total_pairs`
and the number of rendered results agree in every case.

## Acceptance criteria

- [ ] Two pairs whose derived names collide both appear in the output, in all
      three formats.
- [ ] Two manifest entries with the same explicit `name` produce a clear error
      rather than a silently dropped result.
- [ ] `total_pairs` always matches the number of results actually reported.
- [ ] A test in `tests/batch_tests.rs` covers a directory scan with duplicate
      basenames.

## Getting started

Fork this repository, clone your fork, and add this repo as `upstream`:

```bash
git clone https://github.com/<your-username>/soroban-upgrade-safeguard.git
cd soroban-upgrade-safeguard
git remote add upstream https://github.com/ShippedLabs/soroban-upgrade-safeguard.git
```

Create a branch for this issue:

```bash
git checkout -b fix/batch-duplicate-contract-names
```

Suggested commit message:

```
fix: detect duplicate contract names in batch mode
```

Run `cargo fmt --check`, `cargo clippy`, and `cargo test` before pushing, then
open a pull request from your fork against `main` and link this issue. See
[docs/contributing.md](docs/contributing.md) for the full contribution guide.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
