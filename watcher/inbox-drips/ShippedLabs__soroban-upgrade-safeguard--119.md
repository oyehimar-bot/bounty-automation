# Add issue and pull request templates so reports arrive with the information needed to act

- Repo: ShippedLabs/soroban-upgrade-safeguard
- GitHub: https://github.com/ShippedLabs/soroban-upgrade-safeguard/issues/119
- APPLY HERE: https://www.drips.network/wave/stellar/issues/6791e2d3-100d-489f-b49a-ac7388262296
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-22T20:08:22.000Z
- Labels: documentation

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Description

`.github/` contains only `workflows/ci.yml`. There are no issue templates and no
pull request template, so every report arrives in whatever shape the reporter
chose.

The project already knows what it wants. The "Reporting Bugs" section of
`docs/contributing.md` lists exactly what a good bug report contains: the exact
command, the expected result, the actual output, and ideally the two WASM files or
contract sources that reproduce it. That guidance is buried in a document most
reporters will not have read.

The same applies to pull requests. The contribution guide asks for a description
of the change, the motivation, how it was verified, and a link to the related
issue, none of which is prompted for.

## Suggested approach

Add issue templates for a bug report and a feature request, with the bug template
prompting for the fields the contributing guide already asks for. Add a pull
request template covering description, motivation, verification, and the linked
issue, along with a checklist for the local checks CI will run anyway. Keep the
templates short: a long form deters reports more than it improves them.

## Acceptance criteria

- [ ] A bug report template prompts for the exact fields listed in the Reporting
      Bugs section of the contributing guide.
- [ ] A feature request template exists and is distinct from the bug template.
- [ ] A pull request template prompts for description, motivation, verification,
      and the linked issue.
- [ ] Templates render correctly in the GitHub UI when opening a new issue or
      pull request.

## Getting started

Fork this repository, clone your fork, and add this repo as `upstream`:

```bash
git clone https://github.com/<your-username>/soroban-upgrade-safeguard.git
cd soroban-upgrade-safeguard
git remote add upstream https://github.com/ShippedLabs/soroban-upgrade-safeguard.git
```

Create a branch for this issue:

```bash
git checkout -b chore/add-issue-and-pr-templates
```

Suggested commit message:

```
chore: add issue and pull request templates
```

Run `cargo fmt --check`, `cargo clippy`, and `cargo test` before pushing, then
open a pull request from your fork against `main` and link this issue. See
[docs/contributing.md](docs/contributing.md) for the full contribution guide.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
