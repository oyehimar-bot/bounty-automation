# bug: MultiSigPaymentTool does not validate submit result — untyped cast

- Repo: Nodal-stellar/Nodal-AI
- GitHub: https://github.com/Nodal-stellar/Nodal-AI/issues/202
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6cdd8100-29de-4a94-8732-145c1ba4a697
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-20T17:28:31.000Z
- Labels: bug, good first issue

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
`MultiSigPaymentTool.execute()` casts the submit result with `as { hash: string; ledger: number }` bypassing runtime validation. This is inconsistent with `StellarPaymentTool` which uses `SubmitResultSchema.parse()`.

## File
`backend/tools/MultiSigPaymentTool.ts`

## Expected fix
Replace the cast with `SubmitResultSchema.parse(await submitTransaction(tx))`.

## Acceptance criteria
- [ ] Uses `SubmitResultSchema.parse()` for submit result validation
- [ ] `npm run build` passes

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
