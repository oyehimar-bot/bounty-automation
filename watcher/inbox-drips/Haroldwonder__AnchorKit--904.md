# RateLimitConfig has no bounds validation — window_length=0 permanently disables limiting, max_submissions=0 permanently locks out submissions

- Repo: Haroldwonder/AnchorKit
- GitHub: https://github.com/Haroldwonder/AnchorKit/issues/904
- APPLY HERE: https://www.drips.network/wave/stellar/issues/011e4aed-152d-4de5-816f-bd0a7c7c7761
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T22:35:29.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem
Unlike `SdkConfig`, which has a `validate()` method enforcing bounds on its fields, `RateLimitConfig` (src/rate_limiter.rs:14-22) has no validation at all. `update_config` and `set_attestor_config` accept and store any values verbatim.

Two concrete failure modes:
1. **`window_length: 0`**: `is_window_expired` (line 278-280) computes `current_ledger.saturating_sub(window_start_ledger) >= window_length`. With `window_length = 0`, this is `>= 0`, which is always `true` — every single call to `check_and_increment` resets the window and `submission_count` back to 0 *before* the limit check runs (lines 106-117), so the caller can never be rejected. Rate limiting is silently and permanently a no-op for that attestor/global config.
2. **`max_submissions: 0, burst: 0`**: `effective_limit` becomes `0`, so `state.submission_count >= effective_limit` (`0 >= 0`) is true on the very first call — the attestor is permanently rejected with `RateLimitExceeded` and can never submit again until config is changed.

## Location
- src/rate_limiter.rs:14-22 (`RateLimitConfig` struct — no `validate()` method exists in this file)
- src/rate_limiter.rs:106-117 (window-expiry reset logic affected by `window_length: 0`)
- src/rate_limiter.rs:278-280 (`is_window_expired`)
- src/rate_limiter.rs:119-129 (`effective_limit` check affected by `max_submissions: 0`)

## Why it matters
A single admin config mistake (e.g., a typo passing `0` for either field, or a script that fails to set a field and lets it default to `0`) silently produces either "rate limiting is completely off" or "this attestor is permanently and irreversibly blocked" with no error raised at config-set time — the bug only manifests later, at submission time, and would likely be diagnosed as a mysterious contract behavior rather than traced back to the config call.

## Suggested fix
Add a `validate()` method to `RateLimitConfig` (mirroring `SdkConfig::validate()`) that rejects `window_length == 0` and, if `max_submissions == 0` is not an intentional "fully blocked" state, rejects that too or requires an explicit different API for blocking. Call `validate()` from `update_config` and `set_attestor_config` before persisting.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
