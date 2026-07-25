# [Frontend] Add Abort Controller Cleanup in useDelegations on Unmount

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/409
- APPLY HERE: https://www.drips.network/wave/stellar/issues/74bb95d7-307b-43c1-b478-b59d7d67cd1e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T06:08:34.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / Reliability

**Complexity**
Trivial

**Problem**
The `useDelegations` hook at `apps/frontend/hooks/useDelegations.ts:12-17` fetches data in a `useEffect` but does not return a cleanup function. If the component unmounts while the fetch is in flight, `setDelegations` and `setLoading` are called on an unmounted component, producing a React warning and potential memory leak.

**Implementation Scope**
- `apps/frontend/hooks/useDelegations.ts`

**Functions to Implement**
1. Create an `AbortController` at the start of the effect.
2. Pass `controller.signal` to the `fetch` call.
3. Return `() => controller.abort()` from the effect.
4. Handle `AbortError` gracefully (do not set error state on abort).

**Tests**
- Unit test: unmounting during fetch does not cause state update warning.
- Unit test: abort error is silently caught, not set as error state.
- Unit test: successful fetch still sets data correctly.

**Acceptance Criteria**
- No "Can't perform a React state update on an unmounted component" warning.
- AbortError does not set the error state.
- Successful fetches are unaffected by the cleanup logic.

**Verification**
- `pnpm dev:web` starts without errors.
- No React warnings in browser console.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
