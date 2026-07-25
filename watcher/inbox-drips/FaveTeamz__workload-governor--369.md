# Implement contract test for already_assigned edge case

- Repo: FaveTeamz/workload-governor
- GitHub: https://github.com/FaveTeamz/workload-governor/issues/369
- APPLY HERE: https://www.drips.network/wave/stellar/issues/262f88c4-9829-4bd6-90e6-6aee77b0f176
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T11:17:18.000Z
- Labels: testing

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Expand tests/test_already_assigned.rs to cover all variants of the AlreadyAssigned error (code 11), including concurrent assignment attempts and the interaction with revoke and re-assign sequences.

## Background
tests/test_already_assigned.rs has an initial test but does not cover the case where two maintainers race to assign the same issue, or where a revoked issue is re-assigned correctly after the error.

## Requirements
- Test: assigning an already-assigned issue returns AlreadyAssigned (code 11)
- Test: after revoke, the same issue can be re-assigned to a different contributor
- Test: after revoke, the same issue can be re-assigned to the same contributor
- Test: two sequential assign calls for same issue, second returns AlreadyAssigned
- Test: assignment entry removed from storage after revoke, allowing re-assignment
- Test: has_applied returns true even after issue is assigned

## Acceptance Criteria
- [ ] All 5 test cases pass
- [ ] Storage state verified after each transition
- [ ] Tests use cargo test --features testutils
- [ ] Test names follow unit_already_assigned_ prefix

## References
- tests/test_already_assigned.rs
- src/lib.rs

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: tests/test_already_assigned.rs only covers the first AlreadyAssigned path, and misses revoke transition checks plus repeated assign flow assertions.

Plan:
1. Extend tests/test_already_assigned.rs with unit_already_assigned_ tests for code 11 on already-assigned issues and two sequential assign calls (second must return AlreadyAssigned).
2. Add revoke and re-assign coverage for both cases in src/lib.rs behavior: re-assign to a different contributor, and re-assign to the same contributor after revoke.
3. Verify storage state after each transition, including assignment entry removal on revoke and successful re-assignment after cleanup.
4. Add a test that has_applied remains true after assignment.
5. Run cargo test --features testutils and adjust assertions until all required cases pass.

I'll wait for assignment before opening a PR.
