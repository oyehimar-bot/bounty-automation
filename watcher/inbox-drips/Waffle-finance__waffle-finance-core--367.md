# Introduce a typed build and release contract for the frontend, coordinator, relayer, and resolver packages

- Repo: Waffle-finance/waffle-finance-core
- GitHub: https://github.com/Waffle-finance/waffle-finance-core/issues/367
- APPLY HERE: https://www.drips.network/wave/stellar/issues/d64c6705-e402-4fd8-a02a-b92434ca8513
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T14:31:07.000Z
- Labels: enhancement, Maybe Rewarded, GrantFox OSS, Official Campaign | FWC26

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Description

The repository is multi-package and multi-runtime enough that maintainers need a stronger release contract. Right now the build process is spread across package manifests, runtime scripts, and local conventions. This issue is to formalize a typed release contract so that release alignment is easier to reason about and less dependent on individual developers remembering the right command sequence.

Work to be done

Define a shared build and release contract for the main packages in the repo, including the frontend, coordinator, resolver, relayer, and Soroban contracts. Make the contract explicit about the build target, environment assumptions, release artifact names, and any required migration steps. Add a CI-safe validation path so releases do not proceed without the relevant package being built correctly. Document all of the major build assumptions in the repository.

Implementation procedure

Audit the package manifests and build profiles across the repo. Then define the agreed release contract and centralize the common expectations. Add a validation path that checks key package outputs and any environment assumptions. Finally, integrate the release contract into the documentation and maintainers’ workflow so it remains durable over time.

Acceptance criteria

The repo has a clear multi-package release contract with predictable build expectations. Each supported package has an agreed build surface and a repeatable release path. The release contract is documented and paired with a validation step that can be used by maintainers during release preparation.

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Audit the current package manifests and build profiles for frontend, coordinator, resolver, relayer, and Soroban contracts, then map build targets, environment assumptions, and artifact outputs.
2. Define a typed release contract that makes each package’s build target, required environment, artifact naming, and migration steps explicit, and flag any assumptions that need maintainer confirmation.
3. Add a CI-safe validation path that checks required package outputs and environment assumptions, so release preparation fails when contract requirements are not met.
4. Document the release contract and maintainer release workflow in repository docs, so the path is repeatable and durable.

I'll wait for assignment before opening a PR.
