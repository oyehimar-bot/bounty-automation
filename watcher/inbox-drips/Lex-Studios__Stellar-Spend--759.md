# [Frontend] Audit and remove dead code in `src/components/hoc`

- Repo: Lex-Studios/Stellar-Spend
- GitHub: https://github.com/Lex-Studios/Stellar-Spend/issues/759
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9c574074-9c91-4935-bd37-18f02c17b355
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T08:55:13.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**
Higher-order component patterns are frequently superseded by hooks; verify each HOC in `src/components/hoc` still has active call sites before keeping it.

**Tasks:**
- Grep all HOC usages across `src/app` and `src/components`
- Remove any HOC with zero remaining call sites
- Migrate remaining HOC consumers to equivalent hooks where feasible

**Acceptance Criteria:**
- [ ] Unused HOCs deleted
- [ ] Remaining usages documented with justification
- [ ] Tested: unit
- [ ] Code review passed

**Type**: Cleanup
**Priority**: P2-Medium
**Estimated Effort**: 3-5 hours
---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
