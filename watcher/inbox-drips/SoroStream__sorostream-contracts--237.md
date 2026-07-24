# Add contract factory pattern for deterministic multi-stream batch deployments

- Repo: SoroStream/sorostream-contracts
- GitHub: https://github.com/SoroStream/sorostream-contracts/issues/237
- APPLY HERE: https://www.drips.network/wave/stellar/issues/5e8a5765-0fa3-44bb-b2ca-bd5a26b84ca7
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T14:14:06.000Z
- Labels: enhancement, complexity: high

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Overview
Deploying multiple independent stream contracts is wasteful. A contract factory pattern lets a single factory contract deploy and track child stream contracts deterministically, making multi-tenancy and permissioning simpler.

## Problem
There is no on-chain registry of deployed stream contracts. Each deployment is independent, making it hard to discover and manage multiple stream contract instances from a single address.

## Proposed Solution
- Implement a `StreamFactory` contract that deploys child `StreamContract` instances at deterministic addresses using `env.deployer().upload_contract_wasm()`
- Factory stores a registry of deployed instances with metadata (deployer, deploy time, version)
- Add `get_deployed_contracts() -> Vec<Address>` view function on the factory
- Add `deploy_stream_contract(admin, salt)` factory instruction

## Acceptance Criteria
- [ ] Factory deploys a child contract at a deterministic address based on salt
- [ ] Deployed contract is registered in the factory's storage
- [ ] `get_deployed_contracts` returns all registered addresses
- [ ] Only factory admin can call `deploy_stream_contract`
- [ ] Tests verify deterministic address, registry update, and unauthorized deploy rejection

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
