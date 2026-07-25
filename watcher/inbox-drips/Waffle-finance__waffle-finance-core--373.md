# Build a repo-wide contract smoke test that validates all primary entry points against the supported environment setup

- Repo: Waffle-finance/waffle-finance-core
- GitHub: https://github.com/Waffle-finance/waffle-finance-core/issues/373
- APPLY HERE: https://www.drips.network/wave/stellar/issues/d1955081-d216-44e4-9f09-24a601f8faaa
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-23T14:31:16.000Z
- Labels: enhancement, Maybe Rewarded, GrantFox OSS, Official Campaign | FWC26

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Description

This repository spans a lot of packages and runtime entry points, and a simple unit test run does not necessarily prove that the whole system is wired together correctly. This issue is to add a project-level smoke test that validates the critical entry points and their top-level wiring under the supported environment configuration.

Work to be done

Implement a repo-level smoke test that starts the key pieces of the system in a supported configuration and validates the main top-level interfaces. The smoke test should exercise the coordinator readiness route, the backend order announcement path, the SDK initialization path, and a representative frontend route or export path. Keep the smoke test deterministic and bounded enough to run in CI without a large external dependency footprint. Use it as a guardrail for repo-wide regressions that can happen when one package’s contract silently changes.

Implementation procedure

Identify the high-value entry points that should be validated at the repo level. Then build a deterministic test environment that can bring those entry points together using the repository’s existing configuration conventions. Assert on a small but meaningful set of route and contract outputs and use that as the smoke test signal. Finally, ensure the config assumptions are documented and that the smoke test remains maintainable across package changes.

Acceptance criteria

The repo has a smoke test for the main runtime surfaces. The smoke test validates the project’s major wiring and confirms that the entry points still behave as expected in a supported environment. It is deterministic, documented, and practical for regular CI or pre-release validation.

---

## Drafted application (paste into the Drips form after reviewing)

Happy to take this issue.

Plan:
1. Confirm the exact repo entry points and files for the coordinator readiness route, backend order announcement path, SDK initialization path, and one representative frontend route or export path.
2. Add a repo-level smoke test harness that boots these pieces together using the supported environment configuration already used by the repo.
3. Add deterministic assertions for readiness response, order announcement flow signal, SDK init success, and frontend surface availability.
4. Keep runtime bounded for CI, avoid heavy external dependencies, and document the required config assumptions and test scope.

I'll wait for assignment before opening a PR.
