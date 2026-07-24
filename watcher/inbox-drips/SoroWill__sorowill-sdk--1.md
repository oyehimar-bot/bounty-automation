# No event subscription API

- Repo: SoroWill/sorowill-sdk
- GitHub: https://github.com/SoroWill/sorowill-sdk/issues/1
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f91465e7-c3e0-460d-9aa9-b64b5f0e83ba
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T12:59:56.000Z
- Labels: High, feature

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
The contract emits real events (`will_created`, `check_in`, `will_triggered`, `emergency_checkin`, `will_cancelled`, `beneficiaries_updated`, `guardian_voted`, `inheritance_released`), but the SDK has no way to subscribe to them. Consumers (like the app's dashboard) currently have to manually re-poll `getWill()` / `getWillsByOwner()` to notice any state change, which is wasteful and laggy.

## Acceptance criteria
- Add a method (e.g. `SoroWillClient.subscribeToWillEvents(willId, callback)` or a more general `subscribeToEvents(filter, callback)`) built on Soroban RPC's `getEvents`.
- Support at minimum polling-based subscription (interval-based `getEvents` calls) with a documented way to stop the subscription (returned `unsubscribe()` function).
- Decode raw events back into typed payloads (reusing `mapWill`-style mapping where relevant).
- vitest coverage for the subscribe/unsubscribe lifecycle (mocking the RPC server).
- `tsc --noEmit` strict clean, no `any`.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
