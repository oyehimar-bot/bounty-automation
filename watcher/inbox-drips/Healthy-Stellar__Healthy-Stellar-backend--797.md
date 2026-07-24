# [Critical] `PaymentController` calls methods that don't exist on `PaymentService` — payments module won't build

- Repo: Healthy-Stellar/Healthy-Stellar-backend
- GitHub: https://github.com/Healthy-Stellar/Healthy-Stellar-backend/issues/797
- APPLY HERE: https://www.drips.network/wave/stellar/issues/0ad48ed6-ff42-49c3-9ad9-049c082a95a8
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T17:15:37.000Z
- Labels: bug

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

`src/billing/controllers/payment.controller.ts` calls `paymentService.processBatch()`, `findByBillingId()`, `void()`, `getDailyReport()`, `getReconciliationReport()`, and a two-argument `refund()` — none of which exist on `PaymentService` (`src/billing/services/payment.service.ts`), which only exposes `getPaymentsByBilling`, `getDailyPaymentSummary`, and a one-argument `refund()`. Every payment endpoint besides create/findById/search/findByPatientId is unreachable/non-functional.


## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one.

Plan:
- Root cause: the controller and service drifted out of sync, so `payment.controller.ts` calls methods that were never implemented (or were renamed) on `PaymentService`.
- Map each broken call to its intended behavior: `findByBillingId()` to the existing `getPaymentsByBilling`, `getDailyReport()` to `getDailyPaymentSummary`, and confirm what `processBatch()`, `void()`, and `getReconciliationReport()` should do.
- Implement the missing methods on `PaymentService` (`processBatch`, `void`, `getReconciliationReport`) and align `refund()` on the two-argument signature the controller expects.
- Update the controller to call the correct method names where a service method already exists.
- Verify the payments module builds and every endpoint (create, findById, search, findByPatientId, plus the previously broken ones) resolves.

I'll wait for assignment before opening a PR.
