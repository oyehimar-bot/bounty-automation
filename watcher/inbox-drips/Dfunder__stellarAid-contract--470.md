# Implement `auto_resolve` function

- Repo: Dfunder/stellarAid-contract
- GitHub: https://github.com/Dfunder/stellarAid-contract/issues/470
- APPLY HERE: https://www.drips.network/wave/stellar/issues/e85c0e59-cb8a-44e1-ad19-6158c7255069
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:10:30.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Description:**
```rust
pub fn auto_resolve(env: Env, commission_id: Bytes)
```
- Anyone can call
- Validate: dispute exists, status is `Open`
- Validate: `env.ledger().sequence() >= auto_resolve_ledger`
- Default resolution: refund to client (platform protects client by default)
- Update dispute status to `AutoResolved`
- Emit `AutoResolved { commission_id }` event

---

## Drafted application (paste into the Drips form after reviewing)

I'll take this one.

Plan:
- Add `auto_resolve(env: Env, commission_id: Bytes)` to the disputes module as a public entry point anyone can call.
- Load the dispute for `commission_id`, and validate it exists and its status is `Open`, returning an error otherwise.
- Check `env.ledger().sequence() >= auto_resolve_ledger` and reject the call if the deadline has not passed.
- Apply the default resolution by refunding the client, then set the dispute status to `AutoResolved`.
- Emit the `AutoResolved { commission_id }` event, and add tests covering the not-found, wrong-status, and too-early cases.

One thing to confirm: the exact refund path and storage key for the client balance, so I match the existing dispute handling.

I'll wait for assignment before opening a PR.
