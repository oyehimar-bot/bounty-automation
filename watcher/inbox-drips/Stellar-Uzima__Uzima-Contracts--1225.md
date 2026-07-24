# Add support for multi-tenant configuration in shared infrastructure components

- Repo: Stellar-Uzima/Uzima-Contracts
- GitHub: https://github.com/Stellar-Uzima/Uzima-Contracts/issues/1225
- APPLY HERE: https://www.drips.network/wave/stellar/issues/f2f8454a-1da9-4c5a-a99b-0f31ad84700b
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T13:19:10.000Z
- Labels: architecture, configuration, contracts

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem Statement
The repository needs a focused, maintainers-grade improvement around add support for multi-tenant configuration in shared infrastructure components to reduce operational risk and improve long-term maintainability.

## Why it matters
This work would strengthen reliability, security, developer experience, or scalability across the contract portfolio and is important for sustainable growth of the project.

## Technical Context
The repository already contains extensive Soroban contract infrastructure, interface registries, deployment scripts, audit tooling, and a large set of healthcare-focused contracts. The requested work should fit within those existing patterns and avoid introducing duplicate abstractions.

## Expected Outcome
A clear implementation path should exist for add support for multi-tenant configuration in shared infrastructure components, with documented behavior, tests, and rollout guidance that fit the current architecture.

## Acceptance Criteria
- The change is implemented in a way that aligns with repository conventions.
- The relevant contracts, scripts, or docs are updated and validated.
- The solution is supported by meaningful tests or verification steps where appropriate.

## Implementation Notes
Review the existing contract patterns, interface registry, and deployment/tooling scripts before implementation. Keep the change modular, preserve compatibility where possible, and document any migration or rollout concerns. Focus areas: config/, contracts/common_auth.

## Files or modules likely to be affected
config/, contracts/common_auth

## Dependencies
Any related contract lifecycle, deployment, or SDK generation work should be coordinated with this change.

## Difficulty level
Medium

## Estimated effort
3-7 days

## Appropriate GitHub labels
architecture, configuration, contracts

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one.

Plan:
- Review config/ and contracts/common_auth to map how shared components read configuration today, and confirm whether any tenant scoping already exists.
- Add a tenant identifier to the config layer in config/ and thread it through the shared setup so components can be keyed per tenant.
- Update contracts/common_auth to scope authorization and stored state by tenant, keeping the single-tenant path working by default.
- Add tests covering isolation between tenants (no cross-tenant reads or auth) and update relevant deployment/tooling scripts.
- Document the tenant config format and a migration note for existing single-tenant deployments.

A few things I'd want to confirm before coding: the exact tenant boundary you have in mind (per-contract instance vs shared instance with internal keying) and whether backward compatibility for current deployments is required.

I'll wait for assignment before opening a PR.
