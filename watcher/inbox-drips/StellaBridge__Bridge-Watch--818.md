# feat: Implement On-Chain Slashing and Stake Delegation Mechanism in Soroban Contracts

- Repo: StellaBridge/Bridge-Watch
- GitHub: https://github.com/StellaBridge/Bridge-Watch/issues/818
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f627d35b-0af4-4380-bfd9-5579bedc1a32
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-17T09:13:37.000Z
- Labels: enhancement, Maybe Rewarded, GrantFox OSS, Official Campaign | FWC26

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Area
Soroban contracts

### What problem does this solve?
Currently, if a supply mismatch is proven, our database flags it and a circuit breaker is triggered. However, the offending operator's locked on-chain stake is not slashed automatically on the Soroban ledger, requiring manual admin intervention.

### Proposed solution
1. Add a `slash_operator(bridge_id, proof)` method in the Soroban operators contract.
2. Implement proof checking (evaluating verified reconciliation mismatches or missing commitments).
3. If valid, burn or transfer a percentage of the operator's locked stake to the insurance pool.
4. Emit a `slashed` contract event.

### Alternatives considered
Keeping slashing operations entirely manual, but automated slashing provides maximum economic guarantees.

### Estimated complexity
Large (> 3 days — new subsystem, breaking change, or significant design work)

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
