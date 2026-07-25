# [Frontend] Complete SDK CRUD Endpoints for Delegations and Orders

- Repo: DelegoLabs/Delego
- GitHub: https://github.com/DelegoLabs/Delego/issues/398
- APPLY HERE: https://www.drips.network/wave/stellar/issues/c019e6a0-6e41-469c-9078-ad2a501ed525
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T06:08:06.000Z
- Labels: frontend

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Type**
Task

**Area**
Frontend / SDK

**Complexity**
Moderate

**Problem**
The SDK at `packages/sdk/src/client.ts:51,56` has TODO comments for delegation and order endpoints. Only `getDelegations()` and `getOrders()` are implemented. There are no create, update, revoke, approve, cancel, or status-check methods, making the SDK incomplete for any real integration.

**Implementation Scope**
- `packages/sdk/src/client.ts`

**Functions to Implement**
Add the following methods to `DelegoClient`:
1. `createDelegation(params: CreateDelegationParams): Promise<Delegation>` — POST `/delegations`
2. `updateDelegation(id: string, params: UpdateDelegationParams): Promise<Delegation>` — PUT `/delegations/:id`
3. `revokeDelegation(id: string): Promise<void>` — DELETE `/delegations/:id`
4. `getOrder(id: string): Promise<Order>` — GET `/orders/:id`
5. `approveOrder(id: string): Promise<Order>` — POST `/orders/:id/approve`
6. `cancelOrder(id: string): Promise<Order>` — POST `/orders/:id/cancel`
7. `getOrderStatus(id: string): Promise<OrderStatus>` — GET `/orders/:id/status`

**Tests**
- Unit test for each method: correct HTTP method, path, and body serialization.
- Unit test: error responses throw typed errors.
- Unit test: request includes auth header when token is set.

**Acceptance Criteria**
- All 7 methods are exported from the SDK package.
- Each method validates required parameters before making the request.
- Methods use the existing `request()` helper with proper error handling.
- TypeScript types are exported for all request/response shapes.

**Verification**
- `pnpm test` in packages/sdk passes.
- `pnpm build` completes without errors.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Update `packages/sdk/src/client.ts` to implement `createDelegation`, `updateDelegation`, `revokeDelegation`, `getOrder`, `approveOrder`, `cancelOrder`, and `getOrderStatus` with the exact `/delegations` and `/orders` endpoints listed.
2. Add required parameter validation for `id` and payload inputs before each request, then use the existing `request()` helper and current typed error flow.
3. Export any missing SDK types for request and response shapes, including `CreateDelegationParams`, `UpdateDelegationParams`, `Delegation`, `Order`, and `OrderStatus`.
4. Add unit tests in `packages/sdk` for HTTP method, path, body serialization, typed error throwing, and auth header inclusion when a token is set.
5. Run `pnpm test` and `pnpm build` in `packages/sdk`, then fix any SDK-only issues needed for passing checks.

I'll wait for assignment before opening a PR.
