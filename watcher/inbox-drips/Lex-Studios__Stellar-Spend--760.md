# [Frontend] Standardize design-system component exports in `src/components/design-system`

- Repo: Lex-Studios/Stellar-Spend
- GitHub: https://github.com/Lex-Studios/Stellar-Spend/issues/760
- APPLY HERE: https://www.drips.network/wave/stellar/issues/ffe66af7-efcd-4914-b253-f62411bcb545
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T08:55:15.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**
Inconsistent export patterns (default vs. named) across design-system components make tree-shaking and imports unpredictable.

**Tasks:**
- Convert all design-system components to named exports
- Add a single barrel `index.ts` with explicit exports (no `export *`)
- Update all consuming imports across `src/app` and `src/components`

**Acceptance Criteria:**
- [ ] Consistent named exports across design-system
- [ ] Barrel file has explicit exports only
- [ ] Tested: unit
- [ ] Code review passed

**Type**: Refactor
**Priority**: P2-Medium
**Estimated Effort**: 3-5 hours
---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
