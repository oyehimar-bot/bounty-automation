# docs/features/RETRY_BACKOFF.md describes additive jitter with concrete example values; the implementation uses full jitter (uniform random)

- Repo: Haroldwonder/AnchorKit
- GitHub: https://github.com/Haroldwonder/AnchorKit/issues/902
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c8ef00ab-2ee5-4a83-92c0-dbd8995e670a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T22:35:25.000Z
- Labels: documentation

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem
The "Backoff Timing" section of `RETRY_BACKOFF.md` (lines 278-332) describes delays as `base_delay_ms * multiplier^attempt + jitter` and gives concrete example tables like "Attempt 0: ~100ms (100 * 2^0 + jitter)", "Attempt 2: ~400ms (100 * 2^2 + jitter)". Line 291 further states: "The jitter is derived deterministically from the attempt number and adds randomness up to `base_delay_ms / 2`". This describes an *additive* jitter model with a fairly narrow, predictable range around the deterministic exponential value.

The actual implementation (`RetryConfig::delay_for_attempt`, src/retry.rs:82-88) uses **full jitter**: `jitter_seed % (capped + 1)`, i.e. a value uniformly distributed across the *entire* `[0, capped]` range — not a small perturbation around the exponential curve. For "Attempt 2" with `base=100, multiplier=2`, the actual delay can be anywhere from 0ms to 400ms, not "~400ms".

## Location
- docs/features/RETRY_BACKOFF.md:278-332 ("Backoff Timing" section and worked examples)
- docs/features/RETRY_BACKOFF.md:291 (explicit "adds randomness up to base_delay_ms / 2" claim)
- src/retry.rs:82-88 (`delay_for_attempt`, full-jitter implementation, correctly documented in the source doc comment at lines 61-81)

## Why it matters
Integrators reading only the public doc (not the source) will size timeouts, SLAs, or worst-case latency budgets based on the documented "~exponential value + small jitter" model, when actual behavior can be dramatically lower (down to 0ms) or exactly at the cap, at each attempt. This is especially confusing since `src/retry.rs`'s own doc comment (lines 66-81) correctly and thoroughly describes full jitter — the public markdown doc simply wasn't updated to match.

## Suggested fix
Rewrite the "Backoff Timing" section of RETRY_BACKOFF.md to describe full jitter accurately: `delay = uniform_random(0, min(base * multiplier^attempt, max_delay_ms))`, and replace the misleading `~Xms` example tables with ranges (e.g. "Attempt 2: 0–400ms, capped at 400ms").

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
