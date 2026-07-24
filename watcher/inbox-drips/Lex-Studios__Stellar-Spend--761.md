# [Frontend] Consolidate duplicate button/input variants in `src/components/ui`

- Repo: Lex-Studios/Stellar-Spend
- GitHub: https://github.com/Lex-Studios/Stellar-Spend/issues/761
- APPLY HERE: https://www.drips.network/wave/stellar/issues/fe429d9f-52eb-4804-a084-204ce6becfc0
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T08:55:16.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**
UI primitives likely have near-duplicate variants for buttons and inputs added ad hoc per feature; consolidate into a single variant-driven API (e.g. `cva`).

**Tasks:**
- Audit all Button/Input variants currently in use
- Consolidate into a single component using a variant utility (class-variance-authority)
- Update call sites to use the unified variant prop

**Acceptance Criteria:**
- [ ] Single Button and Input component with variant props
- [ ] All call sites migrated
- [ ] Tested: unit + visual regression
- [ ] Code review passed

**Type**: Refactor
**Priority**: P1-High
**Estimated Effort**: 1-2 days
---

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
