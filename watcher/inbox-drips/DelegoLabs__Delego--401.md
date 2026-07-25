# [Frontend] Enable React Strict Mode and Fix Double-Mount Side Effects

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/401
- APPLY HERE: https://www.drips.network/wave/stellar/issues/8e13b86c-c669-4451-9a30-07e2f90556f9
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T06:08:12.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / Quality

**Complexity**
Moderate

**Problem**
React Strict Mode is not enabled in `apps/frontend/app/layout.tsx`. Strict Mode double-invokes effects in development to surface bugs like missing cleanup functions, unsafe state updates, and side effects that run twice. Without it, these bugs silently accumulate and only manifest in production.

**Implementation Scope**
- `apps/frontend/app/layout.tsx`
- `apps/frontend/hooks/useDelegations.ts`

**Functions to Implement**
1. Wrap the root layout's children in `<React.StrictMode>`.
2. Audit `useDelegations` for double-mount issues: add `AbortController` cleanup in the useEffect return.
3. Verify no duplicate API calls in development mode.

**Tests**
- Manual: enable StrictMode, confirm useEffect runs twice in dev but API calls are deduplicated via AbortController.
- Automated: render hook with StrictMode, assert fetch is called exactly once after cleanup.

**Acceptance Criteria**
- `<React.StrictMode>` wraps the app in `layout.tsx`.
- `useDelegations` properly cleans up on unmount (no state updates on unmounted component).
- No duplicate API calls in development mode.
- Console shows no "Can't perform a React state update on an unmounted component" warnings.

**Verification**
- `pnpm dev:web` starts without errors.
- No React warnings in browser console.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
