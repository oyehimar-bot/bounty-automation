# No check-in reminder system

- Repo: SoroWill/sorowill-app
- GitHub: https://github.com/SoroWill/sorowill-app/issues/1
- APPLY HERE: https://www.drips.network/wave/stellar/issues/e0e7db3f-f16e-4ffa-ba71-4ad464b61026
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T13:00:14.000Z
- Labels: High, feature

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description
Missing a check-in deadline hands the will's funds to beneficiaries after the grace period. Right now there is zero warning mechanism as a deadline approaches — no email, no push notification, not even a persistent banner that survives across visits. An owner who is alive and well but simply doesn't open the site in time could lose their funds unintentionally, which undermines the whole point of the product.

## Acceptance criteria
- Design and implement a reminder mechanism for owners approaching their check-in deadline (e.g. email via a transactional email provider, using the contract's `lastCheckin` + `checkinPeriodDays` to compute when to send).
- At minimum, cover: a "well before deadline" reminder and a more urgent "deadline imminent" reminder.
- Since the app is a static Next.js frontend today, this will need some kind of backend/cron trigger (e.g. a scheduled serverless function) — document the approach in the PR.
- No secrets committed; any email provider API key goes through environment variables.

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
