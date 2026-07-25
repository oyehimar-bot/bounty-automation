# Improve the resolver supervisor and command surface to make operational recovery deterministic

- Repo: Waffle-finance/waffle-finance-core
- GitHub: https://github.com/Waffle-finance/waffle-finance-core/issues/364
- APPLY HERE: https://www.drips.network/wave/stellar/issues/7874cf66-2791-4e48-9fe7-7d68ad5dbb26
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T14:31:03.000Z
- Labels: enhancement, Maybe Rewarded, GrantFox OSS, Official Campaign | FWC26

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Description

The resolver service includes a supervisor and command-level runtime surface that needs strong operational behavior to keep running under RPC instability, chain lag, and command-level exceptions. The current setup is a good base, but it is still not fully deterministic in how it reacts to a command failure or a chain-side signal. This issue is to turn the supervisor into a more reliable runtime control plane for the resolver workers.

Work to be done

Audit the resolver supervisor and command path to identify which workflows are best run under explicit restart, retry, or degraded semantics. Introduce a structured supervisor model that can recover from partial failures and report the current runtime condition clearly. Add logs and metrics around supervisor behavior and command handoff. Write tests that prove the supervisor stays stable under unstable inputs or command-level exceptions.

Implementation procedure

Identify the supervisor lifecycle in the resolver runtime and decide the minimum set of states for deterministic recovery. Then add a supervisor policy and connect it to command failure handling. Update the runtime with clear logging and metrics so one bad command does not become a completely opaque failure. Finally, add resolution tests that cover restart and command-failure scenarios.

Acceptance criteria

The resolver supervisor has a deterministic operational recovery model. The runtime can distinguish between a healthy command path, a degraded command path, and a supervisor restart case. The new behavior is covered by tests and visible through operator-facing logs and metrics.

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: supervisor and command failures are not mapped to explicit runtime states, so recovery behavior changes by failure type.

Plan:
- Locate the resolver supervisor lifecycle and command handoff path in the resolver runtime, then confirm the exact modules to change before coding.
- Define a minimal deterministic state model (healthy, degraded command path, restarting supervisor) and wire policy transitions for RPC instability, chain lag, and command exceptions.
- Update command failure handling so a single bad command is isolated, retried or degraded by policy, and cannot crash the whole worker flow.
- Add operator-facing logs and metrics at supervisor transitions and command handoff outcomes, so runtime condition is always visible.
- Add tests for unstable inputs, command exceptions, restart paths, and degraded mode behavior to match acceptance criteria.

I'll wait for assignment before opening a PR.
