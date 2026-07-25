# contract: validate_bet_limits never persists daily/weekly loss tracking state — loss limits are non-functional

- Repo: chunks-labz/predinex-stellar
- GitHub: https://github.com/chunks-labz/predinex-stellar/issues/797
- APPLY HERE: https://www.drips.network/wave/stellar/issues/452321c8-c278-42da-8d06-4cb0c1464227
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T18:28:42.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description

`validate_bet_limits` reads `UserDailyLossState` and `UserWeeklyLossState` from storage on every `place_bet` call, computes `potential_loss`, and checks it against configured limits. However, there is **no corresponding `.set()` call** for either key anywhere in the contract. The updated state (accumulated loss and window_start) is never persisted.

Consequences:
- Daily loss limit always compares against `loss: 0` — only rejects a single bet exceeding the limit by itself. Cumulative losses across multiple bets are never tracked.
- Weekly loss limit has the same issue.
- Large bet cooldown reads `UserDailyLossState.window_start` as a proxy — since it's never written, the cooldown never activates.

## Proposed Fix

After computing `potential_loss` and passing the checks, persist the updated state:

```rust
env.storage().instance().set(
    &DataKey::UserDailyLossState(bettor.clone()),
    &UserLossTrackingState { window_start: daily_window_start, loss: updated_daily_loss },
);
// Same for weekly
```

## Acceptance Criteria

- [ ] Daily loss state persisted after each bet
- [ ] Weekly loss state persisted after each bet
- [ ] Cumulative losses tracked across multiple bets
- [ ] Large bet cooldown activates correctly
- [ ] Tests for cumulative loss tracking

## Affected Files

- `contracts/predinex/src/lib.rs` (validate_bet_limits, ~lines 2095-2249)

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
