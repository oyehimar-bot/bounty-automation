# Add benchmark baselines for insurance pool

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/521
- APPLY HERE: https://www.drips.network/wave/stellar/issues/fa86a967-4190-4952-908e-b0ddb330b48e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T09:12:05.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

The benchmark regression check script does not include insurance pool baselines.

**Why it matters:** Performance regressions need to be tracked.

**Acceptance Criteria:**
- [ ] Add insurance pool instruction count baselines
- [ ] Update benchmark regression check script

**Relevant Files:** `scripts/check_benchmark_regression.sh`, `docs/benchmarks.json`

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: `scripts/check_benchmark_regression.sh` is not checking insurance pool entries from `docs/benchmarks.json`, so regressions there are currently invisible.

Plan:
1. Review `docs/benchmarks.json` and add insurance pool instruction count baselines using the existing schema.
2. Update `scripts/check_benchmark_regression.sh` to include insurance pool baselines in the regression comparison flow.
3. Run the regression check script and confirm insurance pool counts are now validated.
4. Keep the change scoped to these two files and document the new baseline keys clearly in the PR.

I'll wait for assignment before opening a PR.
