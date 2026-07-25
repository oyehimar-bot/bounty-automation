# Remove or gate console.log statements in source code

- Repo: Invoice-Liquidity-Network/ILN-Frontend
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Frontend/issues/480
- APPLY HERE: https://www.drips.network/wave/stellar/issues/8ba9fb10-8cfc-482e-aa7a-c19866db930b
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T17:06:46.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description**
10 files under `src/` and `app/` currently contain `console.log` calls that will run in production builds, leaking internal state/debug info to the browser console and adding noise for anyone debugging real issues.

**Requirements and context**
- Grep for all `console.log` usages in `src/` and `app/` (excluding test files)
- Replace with a proper logger utility gated by `NODE_ENV`/a debug flag, or remove entirely if purely leftover debug output
- Add an ESLint rule (`no-console`, allowing `warn`/`error`) to prevent regressions, wired into the CI lint step

**Suggested execution**
```
git checkout -b fix/remove-stray-console-logs
```
- Audit and remove/replace all 10 instances
- Add `no-console` ESLint rule with appropriate exceptions
- Confirm CI lint step catches a reintroduced `console.log` on a test branch

**Example commit message**
`fix: remove stray console.log statements and add no-console lint rule`


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Likely root cause: leftover `console.log` calls in 10 non-test files under `src/` and `app/` are not gated, so they execute in production.
2. Run a grep audit for `console.log` across `src/` and `app/` (excluding test files), then review each occurrence.
3. Remove logs that are pure debug leftovers, and replace any needed runtime logging with a logger utility gated by `NODE_ENV` or a debug flag.
4. Add an ESLint `no-console` rule that allows only `console.warn` and `console.error`, and wire it into the existing CI lint step.
5. Confirm CI catches regressions by temporarily reintroducing one `console.log` on a test branch, then revert it.

I'll wait for assignment before opening a PR.
