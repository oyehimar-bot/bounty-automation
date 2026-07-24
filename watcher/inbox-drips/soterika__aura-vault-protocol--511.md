# Configure network policies to restrict pod-to-pod communication

- Repo: soterika/aura-vault-protocol
- GitHub: https://github.com/soterika/aura-vault-protocol/issues/511
- APPLY HERE: https://www.drips.network/wave/stellar/issues/fc648fce-fec7-4f4f-93bd-93e6ca10c52f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T13:19:09.000Z
- Labels: security, devops, kubernetes

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

## Summary
Apply Kubernetes NetworkPolicies to implement zero-trust networking between pods.

## Acceptance Criteria
- [ ] Default deny-all ingress and egress policy in namespace
- [ ] Backend can reach PostgreSQL and Redis only
- [ ] Frontend can reach only the backend
- [ ] Backend can reach Horizon API (external)
- [ ] Monitoring namespace can scrape all pods on /metrics
- [ ] Network policies tested with `kubectl exec` from wrong pod

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
