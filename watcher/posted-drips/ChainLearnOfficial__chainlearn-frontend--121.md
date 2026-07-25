# No

- Repo: ChainLearnOfficial/chainlearn-frontend
- GitHub: https://github.com/ChainLearnOfficial/chainlearn-frontend/issues/121
- APPLY HERE: https://www.drips.network/wave/stellar/issues/27c0f439-d5be-413c-b2e2-378bcd012311
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T23:31:52.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Open Graph images for dynamic pages|Individual pages dont set OG images. Shared links show generic preview.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: dynamic pages are not setting page-level Open Graph image metadata, so link scrapers fall back to a generic preview.

Plan:
1. Identify which dynamic routes are missing OG image tags and confirm current shared-link output.
2. Trace where page metadata is generated for those routes and add per-page og:image values.
3. Ensure each page resolves to the correct image URL instead of the global default.
4. Re-test affected links with Open Graph and Twitter validators to confirm page-specific previews.

I'll wait for assignment before opening a PR.
