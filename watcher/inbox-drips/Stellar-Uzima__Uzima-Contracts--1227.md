# Publish a known-good deployment artifact bundle for each release

- Repo: Stellar-Uzima/Uzima-Contracts
- GitHub: https://github.com/Stellar-Uzima/Uzima-Contracts/issues/1227
- APPLY HERE: https://www.drips.network/wave/stellar/issues/497fa261-b5af-4001-952f-571503e5a5b6
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-23T13:19:12.000Z
- Labels: documentation, deployment, contracts

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Problem Statement
The repository needs a focused, maintainers-grade improvement around publish a known-good deployment artifact bundle for each release to reduce operational risk and improve long-term maintainability.

## Why it matters
This work would strengthen reliability, security, developer experience, or scalability across the contract portfolio and is important for sustainable growth of the project.

## Technical Context
The repository already contains extensive Soroban contract infrastructure, interface registries, deployment scripts, audit tooling, and a large set of healthcare-focused contracts. The requested work should fit within those existing patterns and avoid introducing duplicate abstractions.

## Expected Outcome
A clear implementation path should exist for publish a known-good deployment artifact bundle for each release, with documented behavior, tests, and rollout guidance that fit the current architecture.

## Acceptance Criteria
- The change is implemented in a way that aligns with repository conventions.
- The relevant contracts, scripts, or docs are updated and validated.
- The solution is supported by meaningful tests or verification steps where appropriate.

## Implementation Notes
Review the existing contract patterns, interface registry, and deployment/tooling scripts before implementation. Keep the change modular, preserve compatibility where possible, and document any migration or rollout concerns. Focus areas: deployments/, scripts/, docs/.

## Files or modules likely to be affected
deployments/, scripts/, docs/

## Dependencies
Any related contract lifecycle, deployment, or SDK generation work should be coordinated with this change.

## Difficulty level
Medium

## Estimated effort
3-7 days

## Appropriate GitHub labels
deployment, documentation, contracts

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one.

Plan:
- Confirm what counts as a "deployment artifact bundle" for this repo: I'm assuming compiled Wasm files, their hashes, contract IDs, and the deployment config per network. I'd like to verify that scope before starting.
- Add a script under scripts/ that collects build outputs and writes a manifest (file names, sha256 hashes, network, git commit) into deployments/ per release tag.
- Store each release bundle in deployments/ under a versioned folder, with the manifest checked in so a known-good set is reproducible.
- Document the bundle format and how to verify a release in docs/, including how to regenerate and cross-check hashes.
- Add a verification step (a check that recomputes hashes against the manifest) so bundles can be validated in CI.

Happy to adjust the layout to match existing conventions once I look closer.

I'll wait for assignment before opening a PR.
