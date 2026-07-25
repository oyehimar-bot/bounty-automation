# Add cross-platform witness determinism test

- Repo: collinsadi/opauque-stellar
- GitHub: https://github.com/collinsadi/opauque-stellar/issues/594
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c5550558-4bd2-47bc-9232-b4f3ca8fc953
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-19T23:30:19.000Z
- Labels: circuits, p2, tests

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Witness generation differing across platforms would make proofs irreproducible and debugging impossible.

Add a test that compares witness output hashes for fixed inputs across Linux and macOS builds.

Acceptance criteria:
- Fixed-input witness hashes are committed as fixtures.
- Test compares generated witnesses against fixtures byte-for-byte.
- Divergence reports the first differing signal index.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Likely root cause is platform-dependent witness serialization or signal ordering during witness generation.
2. Locate the current witness generation test path and fixture folder in this repo, then add fixed-input witness hash fixtures generated on Linux and macOS.
3. Add a determinism test that generates witnesses for the fixed inputs and compares output bytes against committed fixtures, byte-for-byte.
4. On mismatch, report the first differing signal index plus expected and actual values to make divergence actionable.
5. Document how fixtures are produced and refreshed across Linux and macOS in test comments or contributor docs.

I'll wait for assignment before opening a PR.
