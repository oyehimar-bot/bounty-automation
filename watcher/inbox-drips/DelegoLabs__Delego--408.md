# [Frontend] Add Skeleton Loading Placeholders for Delegation and Order Lists

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/408
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f7962645-8779-4c80-8ca1-74baff7e0c56
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T06:08:32.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / UX

**Complexity**
Moderate

**Problem**
When delegation or order data is loading, the user sees either a blank screen or a generic spinner. Skeleton placeholders that match the shape of the actual content provide a better perceived performance and reduce layout shift.

**Implementation Scope**
- `apps/frontend/components/DelegationSkeleton.tsx` (new)
- `apps/frontend/components/OrderSkeleton.tsx` (new)
- `apps/frontend/app/page.tsx` (use skeletons during loading)

**Functions to Implement**
1. Create `DelegationSkeleton` component with 3 skeleton rows matching the delegation card layout.
2. Create `OrderSkeleton` component with 3 skeleton rows matching the order card layout.
3. Use Tailwind `animate-pulse` and gray background for skeleton effect.
4. Integrate skeletons into `page.tsx` when `useDelegations().loading` is true.

**Tests**
- Manual: confirm skeletons render during loading and disappear when data arrives.
- Automated: render skeleton component and assert presence of `animate-pulse` elements.

**Acceptance Criteria**
- Skeletons match the visual dimensions of actual list items.
- No layout shift when real data replaces skeletons.
- Skeletons animate with a pulse effect.
- Skeletons are shown during loading, not during error states.

**Verification**
- `pnpm dev:web` starts without errors.
- Loading state shows skeletons.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Add `apps/frontend/components/DelegationSkeleton.tsx` with 3 placeholder rows shaped like delegation cards, using Tailwind gray blocks and `animate-pulse`.
2. Add `apps/frontend/components/OrderSkeleton.tsx` with 3 placeholder rows shaped like order cards, matching current card dimensions to avoid layout shift.
3. Update `apps/frontend/app/page.tsx` to render these skeletons when `useDelegations().loading` is true, and keep error states on their existing UI.
4. Add or update tests to render each skeleton component and assert `animate-pulse` elements are present.

I'll wait for assignment before opening a PR.
