# The lib field on user-defined types is never compared, so a type changing origin is invisible

- Repo: ShippedLabs/soroban-upgrade-safeguard
- GitHub: https://github.com/ShippedLabs/soroban-upgrade-safeguard/issues/117
- APPLY HERE: https://www.drips.network/wave/stellar/issues/45100833-cea1-492e-8fc5-c64bd37d306a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-22T20:08:18.000Z
- Labels: enhancement

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem

`ScSpecUdtStructV0`, `ScSpecUdtEnumV0`, `ScSpecUdtUnionV0`, and
`ScSpecUdtErrorEnumV0` each carry a `lib` field recording the library the type was
declared in. Searching `src/` for uses of that field returns nothing. It is
decoded and then ignored by every comparison.

That hides a real change. A type that moves from being defined locally to being
imported from a shared crate, or that switches which crate it comes from, keeps
its name and may keep its shape, so the tool reports nothing. But the definition
is now controlled by a different dependency and can drift independently in a
future release without any local change to review.

## Expected behaviour

A change to the declaring library of a user-defined type should be reported, so a
reviewer knows the definition changed hands even when the layout did not.

## Suggested approach

Compare `lib` alongside the existing doc comparison for each of the four
user-defined type kinds. Treat it as informational rather than breaking, since
moving a type between crates does not itself change the serialized layout. Set
`type_name` and `target` to the type name so it groups and suppresses like the
other type-level findings. Add remediation guidance for the new category.

## Acceptance criteria

- [ ] A change to `lib` on any of the four user-defined type kinds produces a
      finding naming the old and new value.
- [ ] The finding is informational and does not affect `is_safe`.
- [ ] The new category has remediation guidance so the coverage test passes.
- [ ] Unit tests in `src/diff.rs` cover a changed, added, and removed `lib` value.

## Getting started

Fork this repository, clone your fork, and add this repo as `upstream`:

```bash
git clone https://github.com/<your-username>/soroban-upgrade-safeguard.git
cd soroban-upgrade-safeguard
git remote add upstream https://github.com/ShippedLabs/soroban-upgrade-safeguard.git
```

Create a branch for this issue:

```bash
git checkout -b feat/compare-udt-lib-field
```

Suggested commit message:

```
feat: report changes to the declaring library of a type
```

Run `cargo fmt --check`, `cargo clippy`, and `cargo test` before pushing, then
open a pull request from your fork against `main` and link this issue. See
[docs/contributing.md](docs/contributing.md) for the full contribution guide.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
