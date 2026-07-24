# Guardian voting has no UI

- Repo: SoroWill/sorowill-app
- GitHub: https://github.com/SoroWill/sorowill-app/issues/2
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c16a854b-a3e2-48bc-a508-7ef83989b36e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T13:00:17.000Z
- Labels: bug, High

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
`GuardianPanel` (`src/components/GuardianPanel.tsx`) only *displays* guardian addresses and vote count — it's read-only. The SDK already supports `guardianTrigger()` (`@sorowill/sdk`), but nothing in the app ever calls it. A connected guardian has no way to actually cast their vote to force an early release, even though the contract and SDK both fully support it.

## Acceptance criteria
- Add a "Cast guardian vote" action, visible only when the connected wallet's address is one of the will's `guardians` and the will is `Active`.
- Wire it to `SoroWillClient.guardianTrigger(willId)`.
- Show loading/error state consistent with the existing check-in flow pattern (`checkingInId` in `dashboard/page.tsx`) and reflect the updated vote count / released status after a successful call.
- Handle the "already voted" and "not a guardian" contract errors with a clear message.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
