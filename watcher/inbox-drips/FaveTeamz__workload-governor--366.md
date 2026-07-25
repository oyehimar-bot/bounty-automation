# Write unit tests for Horizon service failover logic

- Repo: FaveTeamz/workload-governor
- GitHub: https://github.com/FaveTeamz/workload-governor/issues/366
- APPLY HERE: https://www.drips.network/wave/stellar/issues/28fbf526-1f72-4bc5-a1cd-53c166101976
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T11:16:50.000Z
- Labels: testing

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Add unit tests for the HorizonService failover and circuit breaker logic, verifying that requests route correctly to fallback nodes and that failed nodes are skipped for the correct duration.

## Background
tests/unit/horizon.test.ts exists with basic tests. The failover and circuit breaker paths are untested. These are critical infrastructure paths that must be verified.

## Requirements
- Test: primary node 5xx triggers failover to first fallback
- Test: first fallback 5xx triggers failover to second fallback
- Test: all nodes down returns error after exhausting fallbacks
- Test: circuit breaker opens after 3 consecutive failures on a node
- Test: circuit breaker closes after 60 seconds and retries the node
- Test: successful request on fallback resets failure counter for that node

## Acceptance Criteria
- [ ] All 6 test cases pass
- [ ] Circuit breaker timing uses fake timers (no real waits)
- [ ] Node health state is verified after each scenario
- [ ] Tests mock HTTP calls, no real Horizon calls
- [ ] Tests run in under 5 seconds

## References
- tests/unit/horizon.test.ts
- backend/src/HorizonService.ts

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Review `backend/src/HorizonService.ts` failover and circuit breaker paths, then map expected node health transitions for each required scenario.
2. Extend `tests/unit/horizon.test.ts` with unit tests where a primary 5xx fails over to fallback 1, and fallback 1 5xx fails over to fallback 2.
3. Add the all-nodes-down case, assert the final error after fallbacks are exhausted, and verify node health state after each scenario.
4. Add circuit breaker tests with fake timers: open after 3 consecutive failures, close after 60 seconds, then retry the node.
5. Add a test confirming a successful fallback request resets that fallback node failure counter, with mocked HTTP calls only and runtime kept under 5 seconds.

I'll wait for assignment before opening a PR.
