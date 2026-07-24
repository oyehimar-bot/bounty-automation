# Set up automated security scanning in CI pipeline

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/513
- APPLY HERE: https://www.drips.network/wave/stellar/issues/7b201fba-aee5-47b9-9534-e2c62df22f1d
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T13:19:12.000Z
- Labels: security, devops, ci-cd

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Integrate security scanning tools into the CI pipeline to catch vulnerabilities before they reach production.

## Acceptance Criteria
- [ ] `npm audit` and `cargo audit` on every PR
- [ ] Snyk or Trivy container image scanning on every Docker build
- [ ] SAST: Semgrep or CodeQL on every PR
- [ ] Secrets scanning: `git-secrets` or truffleHog on every commit
- [ ] Critical vulnerabilities block PR merge
- [ ] Scan results summarised in PR comment

## Drafted application (paste into the Drips form after reviewing)

I'd like to take this one if it's available.

Plan:
- Add a CI job that runs `npm audit` and `cargo audit` on every PR, failing the job on critical findings so merges are blocked.
- Add container scanning (Trivy) as a step on every Docker build, scanning the built image before push.
- Add a SAST step (Semgrep or CodeQL) on PRs, and a secrets scan (truffleHog or git-secrets) on commits.
- Collect each tool's output and post a single summary as a PR comment.

A few things worth confirming: which CI system is in use (GitHub Actions or other), the preferred SAST and secrets tools from the pairs listed, and whether "critical" should be the exact severity threshold that blocks merges.

I'll wait for assignment before opening a PR.
