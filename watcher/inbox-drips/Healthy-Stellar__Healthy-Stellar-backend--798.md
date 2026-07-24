# [Critical] `PaymentService.processPayment` mutates billing/line-item/payment state with no DB transaction

- Repo: Healthy-Stellar/Healthy-Stellar-backend
- GitHub: https://github.com/Healthy-Stellar/Healthy-Stellar-backend/issues/798
- APPLY HERE: https://www.drips.network/wave/stellar/issues/1778a367-5079-4d4c-8afd-b1807a9db445
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-23T17:15:39.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

`src/billing/services/payment.service.ts` (lines ~78-154) saves line items, then the billing row, then the payment row as three separate unwrapped calls. A crash between steps leaves line items marked paid while `billing.balance` never reflects it — a permanent partial write with no rollback.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
