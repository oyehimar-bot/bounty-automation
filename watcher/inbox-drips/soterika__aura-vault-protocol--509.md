# Implement infrastructure cost tagging strategy

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/509
- APPLY HERE: https://www.drips.network/wave/stellar/issues/90b2c897-e18c-4ea2-8328-c9aa7b0cf34e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T13:19:07.000Z
- Labels: infrastructure, devops

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Tag all AWS resources with consistent tags for cost allocation, environment identification, and ownership.

## Acceptance Criteria
- [ ] Required tags: Environment, Project, Team, CostCenter, ManagedBy(terraform)
- [ ] Tags applied to all Terraform resources
- [ ] AWS Config rule enforces required tags
- [ ] Monthly cost report by Environment tag in AWS Cost Explorer
- [ ] Untagged resources alert in CloudWatch

## Drafted application (paste into the Drips form after reviewing)

Here's a draft you can review, edit, and post:

I'd like to take this issue if it's open.

Plan:
- Add a shared `default_tags` block in the Terraform provider config (Environment, Project, Team, CostCenter, ManagedBy=terraform) so it applies across resources, and confirm which module or root config holds the provider setup.
- Audit resources that can't inherit provider tags (some resource types need explicit `tags`) and set them directly.
- Add an AWS Config managed rule (`required-tags`) to enforce the five required tags.
- Set up a monthly Cost Explorer report grouped by the Environment tag, and a CloudWatch alarm to flag untagged resources.

One thing to confirm: the exact allowed values for Environment, Team, and CostCenter, and whether you want the Config rule to alert only or block.

I'll wait for assignment before opening a PR.
