# Add constraint count regression tracking

- Repo: collinsadi/opauque-stellar
- GitHub: https://github.com/collinsadi/opauque-stellar/issues/591
- APPLY HERE: https://www.drips.network/wave/stellar/issues/62643320-5630-4b9e-869b-3a56c9d3164a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-19T23:30:04.000Z
- Labels: circuits, p2, tests

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Circuit constraint counts can balloon from an innocent-looking change, degrading proving time for every user.

Record expected constraint counts per circuit and fail tests on unexplained growth.

Acceptance criteria:
- Baseline counts are committed per circuit version.
- Test fails when counts deviate from baseline.
- Intentional changes update the baseline in the same commit.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Locate the circuit test harness and identify where each circuit version is defined, then confirm how constraint counts are currently produced.
2. Add committed baseline data for expected constraint counts per circuit version.
3. Add a regression test that recomputes counts and fails when a count deviates from baseline.
4. Make test failures show the circuit name and count delta, so unexplained growth is clear.
5. Document the baseline update flow so intentional count changes are updated in the same commit.

I'll wait for assignment before opening a PR.
