# Comprehensive reentrancy analysis for cross-contract calls

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/535
- APPLY HERE: https://www.drips.network/wave/stellar/issues/d495eeb8-85a9-4908-becd-fdb338246335
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T09:19:35.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

Cross-contract calls in Soroban can potentially be reentrant. We need to analyze all cross-contract call sites for reentrancy vulnerabilities:

1. `fund_invoice` → `token.transfer`, `oracle.get_payer_data`, `distribution.accrue_lp`
2. `claim_default` → `insurance_pool.claim`
3. `execute_proposal` → `iln_contract.update_fee_rate`, etc.

Each call site needs to be analyzed for:
- Is state updated before or after the call?
- Could the callee call back into the contract?
- Are there any shared storage keys that could be exploited?

**Why it matters:** Reentrancy is one of the most dangerous smart contract vulnerabilities.

**Acceptance Criteria:**
- [ ] Map all cross-contract call sites
- [ ] Analyze each for reentrancy risk
- [ ] Add reentrancy guards where needed
- [ ] Document findings in `docs/security.md`

**Relevant Files:** All contract files

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Likely root cause: cross-contract calls may run before critical state is finalized, which can allow callback paths to re-enter functions that share storage keys.

Plan:
1. Map every cross-contract call in ILN-Smart-Contract, starting with fund_invoice (token.transfer, oracle.get_payer_data, distribution.accrue_lp), claim_default (insurance_pool.claim), and execute_proposal (iln_contract.update_fee_rate and related calls).
2. For each call site, trace state writes vs call order, and identify storage keys read or mutated before and after the external call.
3. Check whether any callee can call back into this contract path, and whether that reaches shared keys or repeatable actions.
4. Add reentrancy guards where needed, and align ordering with checks-effects-interactions.
5. Document findings and mitigations in docs/security.md.

I'll wait for assignment before opening a PR.
