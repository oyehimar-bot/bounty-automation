# Add visual regression Storybook stories for components lacking them

- Repo: Invoice-Liquidity-Network/ILN-Frontend
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Frontend/issues/483
- APPLY HERE: https://www.drips.network/wave/stellar/issues/ea29408f-080b-465d-a88b-8bdedd211380
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T17:08:01.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description**
`src/stories/` and per-component `*.stories.tsx` files exist (confirmed: `LPPortfolio.stories.tsx`, `LPEarningsHistory.stories.tsx`, `CancelInvoiceButton.stories.tsx`, among others), but coverage needs auditing against the full `src/components/` directory to find components with no story at all, meaning they get zero benefit from the Chromatic visual regression workflow.

**Requirements and context**
- List every component in `src/components/` lacking a corresponding `.stories.tsx`
- Prioritize high-traffic/high-risk components (anything rendering financial amounts, wallet state, or transaction status)
- Write stories covering default, loading, error, and empty states for each

**Suggested execution**
```
git checkout -b test/expand-storybook-coverage
```
- Audit component-to-story coverage
- Write missing stories for priority components
- Confirm Chromatic picks them up on next run

**Example commit message**
`test: add missing Storybook stories for visual regression coverage`


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
