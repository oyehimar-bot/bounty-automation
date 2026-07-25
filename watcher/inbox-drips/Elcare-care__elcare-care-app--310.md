# Issue 45: Improve checkout with an exact settlement preview

- Repo: Elcare-care/elcare-care-app
- GitHub: https://github.com/Elcare-care/elcare-care-app/issues/310
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c906f406-0590-4816-a984-97f5bedbbd8c
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T03:46:37.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


### Description
Checkout currently displays price and fees, but the final amount and recipient distribution should be transparent and consistent with the contract. Buyers need to understand protocol fees, royalties, payment token, rounding, and whether the listing can change before signing.

### Work To Be Done
Build a settlement preview that shows item price, protocol fee, royalty recipients or summarized royalty amount, buyer total, seller and creator proceeds where appropriate, and the authoritative listing version. Recalculate on asset or listing changes and require explicit confirmation for material changes.

### Implementation Procedure
1. Reuse the shared amount utility and contract settlement calculation semantics.
2. Add a typed preview model with raw base-unit values.
3. Fetch fresh listing state immediately before preview confirmation.
4. Display a compact recipient breakdown and link to provenance details.
5. Test rounding, token precision, changed price, unavailable listing, and wallet rejection.

### Acceptance Criteria
- Buyer total equals the transaction amount in base units.
- Fee and royalty values are labeled with the correct asset.
- A changed listing invalidates the old confirmation.
- Preview errors prevent signing and explain why.
- The component is usable on mobile without hiding required financial information.




## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: checkout is calculating and confirming from UI state that can diverge from contract settlement math and stale listing data.

Plan:
- Audit the current checkout settlement path, then switch calculations to the shared amount utility and contract settlement semantics so buyer total matches base-unit transaction amount.
- Add a typed settlement preview model with raw base-unit fields (price, protocol fee, royalties, buyer total, seller proceeds, creator proceeds, token metadata, listing version).
- Fetch fresh listing state immediately before confirmation, compare listing version and material values, and invalidate prior confirmation when anything changed or unavailable.
- Update the checkout UI with a compact recipient breakdown, correct asset labels, and a provenance/details link, keeping required financial info visible on mobile.
- Add tests for rounding, token precision, changed price, unavailable listing, and wallet rejection blocking signing with clear errors.

I'll wait for assignment before opening a PR.
