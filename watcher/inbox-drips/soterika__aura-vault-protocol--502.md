# Set up Terraform remote state with S3 and DynamoDB locking

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/502
- APPLY HERE: https://www.drips.network/wave/stellar/issues/304fff19-0e48-4332-a70c-2d7151c319a3
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T13:18:57.000Z
- Labels: infrastructure, devops

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Migrate Terraform state to S3 with DynamoDB locking to enable safe team collaboration on infrastructure changes.

## Acceptance Criteria
- [ ] S3 bucket for state with versioning and encryption enabled
- [ ] DynamoDB table for state locking
- [ ] `backend.tf` configured for all Terraform modules
- [ ] State migration script for existing local state
- [ ] CI uses OIDC authentication to assume IAM role (no long-lived keys)
- [ ] State bucket access restricted to CI and admin roles

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
