# [Frontend] Set Up Vitest and React Testing Library with First Hook Tests

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/399
- APPLY HERE: https://www.drips.network/wave/stellar/issues/302fe7c7-fb7e-4ca9-86e9-7a55df6d61bd
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-25T06:08:08.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / Testing

**Complexity**
Moderate

**Problem**
The frontend has zero test files, no testing framework configured, and the lint script is `echo 'TODO: add eslint'`. There is no way to verify component behavior, hook logic, or regression safety. This blocks any confident iteration.

**Implementation Scope**
- `apps/frontend/package.json` (add vitest, @testing-library/react, @testing-library/jest-dom)
- `apps/frontend/vitest.config.ts` (new)
- `apps/frontend/hooks/useDelegations.test.ts` (new)
- `apps/frontend/lib/api.test.ts` (new)

**Functions to Implement**
1. Install vitest, @testing-library/react, @testing-library/jest-dom, jsdom.
2. Create `vitest.config.ts` with jsdom environment and React plugin.
3. Add `"test": "vitest run"` script to `apps/frontend/package.json`.
4. Write first test for `useDelegations`: renders with loading state, handles successful fetch, handles error.
5. Write first test for `api.ts`: DelegoClient instantiation with default and custom base URL.

**Tests**
- `useDelegations.test.ts`: loading state, success state, error state.
- `api.test.ts`: client instantiation, base URL configuration.

**Acceptance Criteria**
- `vitest` and `@testing-library/react` are in devDependencies.
- `pnpm test` in apps/frontend runs and passes.
- At least 2 test files with passing tests exist.
- Test configuration uses jsdom for DOM simulation.

**Verification**
- `pnpm test` in apps/frontend passes.
- `pnpm build` completes without errors.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
