# [High] Field-level PHI encryption generates and discards a new DEK on every cache miss

- Repo: Healthy-Stellar/Healthy-Stellar-backend
- GitHub: https://github.com/Healthy-Stellar/Healthy-Stellar-backend/issues/795
- APPLY HERE: https://www.drips.network/wave/stellar/issues/e40dfbcf-270d-4174-835a-a56dc9a39a02
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T17:15:31.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

`src/encryption/services/phi-column-encryption.service.ts` `getDek()` generates a fresh DEK, wraps it, then explicitly discards the wrapped output — caching only the plaintext DEK in an in-process `Map`. The code's own comment admits the wrapped DEK should be persisted for later decryption, but nothing does this. Any process restart or a second instance in a scaled deployment generates a different DEK for the same patient, permanently breaking decryption of previously-encrypted PHI fields.


## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one.

Plan:
- Root cause: `getDek()` in `src/encryption/services/phi-column-encryption.service.ts` treats the DEK as ephemeral, generating and wrapping a fresh key on each cache miss but persisting neither, so the plaintext-only `Map` cache is the sole source of truth.
- Add persistent storage for the wrapped DEK (keyed by patient), so a wrapped key is written on first generation.
- Change `getDek()` to look up and unwrap the stored DEK before falling back to generating a new one, populating the in-process cache from it.
- Keep generation as a one-time path only when no wrapped DEK exists yet.
- Add tests covering restart and multi-instance cases to confirm the same patient resolves to the same DEK, and confirm migration handling for any fields already encrypted under a lost key.

I'll wait for assignment before opening a PR.
