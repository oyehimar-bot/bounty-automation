# Formal verification specs for core invoice lifecycle

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/534
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f760482d-b0ab-4d72-8227-fd76e23eb8b2
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T09:19:04.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

Formal verification mathematically proves that the contract behaves correctly. For the invoice lifecycle, we need to specify:

1. State machine invariants (e.g., an invoice cannot go from Funded to Pending)
2. Valid state transitions (e.g., Pending → Funded → Paid)
3. Balance invariants (e.g., total funded never exceeds invoice amount)
4. Authorization invariants (e.g., only freelancer can cancel)

**Why it matters:** Formal verification provides the highest level of assurance that the contract is correct.

**Acceptance Criteria:**
- [ ] Define state machine invariants in a formal specification language
- [ ] Specify valid state transitions
- [ ] Verify no invalid state transitions are possible
- [ ] Document in `docs/formal-verification.md`

**Relevant Files:** `contracts/invoice_liquidity/src/invoice.rs`, `docs/formal-verification.md`

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Review `contracts/invoice_liquidity/src/invoice.rs` to map the current invoice lifecycle states and transition paths, then align them with the intended flow (Pending -> Funded -> Paid, plus allowed cancel paths).
2. Define formal state machine invariants for invoice status, including impossible transitions like Funded -> Pending.
3. Specify transition rules and authorization invariants, including cancel permissions (for example, only the freelancer can cancel where applicable in contract logic).
4. Add balance invariants that ensure funded totals never exceed the invoice amount.
5. Document the full specification and verification results in `docs/formal-verification.md`, including proof that invalid transitions are not possible.

I'll wait for assignment before opening a PR.
