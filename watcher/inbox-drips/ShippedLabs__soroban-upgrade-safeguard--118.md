# Suppression config silently accepts unknown keys, so a typo disables a rule with no warning

- Repo: ShippedLabs/soroban-upgrade-safeguard
- GitHub: https://github.com/ShippedLabs/soroban-upgrade-safeguard/issues/118
- APPLY HERE: https://www.drips.network/wave/stellar/issues/ef94f0ea-9c08-4071-8b41-ae5b2537452f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-22T20:08:20.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem

`SuppressionConfig` and `SuppressionRule` in `src/suppression.rs` are plain
`Deserialize` derives. Serde ignores unknown fields by default, so any key that
is not `category`, `target`, or `reason` is discarded without comment.

A user who writes `targets = "Data.amount"` instead of `target`, or puts the rules
under `[[suppression]]` instead of `[[suppress]]`, gets no error. In the first
case the rule loads with `target` as `None`, which changes its meaning entirely:
it now matches only findings that have no target. In the second, the config parses
to zero rules and the run prints nothing about it.

This is the one config file in the project that can turn the safety gate off. It
is the last place where a silent misread is acceptable.

## Expected behaviour

An unrecognised key in the suppression config should be a parse error naming the
offending key, not a silent no-op.

## Suggested approach

Apply `#[serde(deny_unknown_fields)]` to both structs. Confirm the resulting error
message survives the `anyhow` context added in `load_from_path` in a readable
form, since that is what the user actually sees. Check `.safeguard.example.toml`
still parses under the stricter rules.

## Acceptance criteria

- [ ] An unknown key in a `[[suppress]]` entry produces an error naming the key.
- [ ] An unknown top-level key produces an error too.
- [ ] `.safeguard.example.toml` and all existing valid configs still parse.
- [ ] Tests in `src/suppression.rs` cover both rejection cases.

## Getting started

Fork this repository, clone your fork, and add this repo as `upstream`:

```bash
git clone https://github.com/<your-username>/soroban-upgrade-safeguard.git
cd soroban-upgrade-safeguard
git remote add upstream https://github.com/ShippedLabs/soroban-upgrade-safeguard.git
```

Create a branch for this issue:

```bash
git checkout -b fix/reject-unknown-suppression-keys
```

Suggested commit message:

```
fix: reject unknown keys in the suppression config
```

Run `cargo fmt --check`, `cargo clippy`, and `cargo test` before pushing, then
open a pull request from your fork against `main` and link this issue. See
[docs/contributing.md](docs/contributing.md) for the full contribution guide.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
