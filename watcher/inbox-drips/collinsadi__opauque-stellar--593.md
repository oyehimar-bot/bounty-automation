# Add Poseidon parameter provenance documentation

- Repo: collinsadi/opauque-stellar
- GitHub: https://github.com/collinsadi/opauque-stellar/issues/593
- APPLY HERE: https://www.drips.network/wave/stellar/issues/73d48b8f-c93f-4f40-86cb-f601069305f1
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-19T23:30:14.000Z
- Labels: circuits, docs, p3, docs specific

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

The Poseidon parameters in use have no documented provenance, leaving auditors to verify them from scratch.

Document parameter sources, generation method, and the security rationale for the chosen configuration.

Acceptance criteria:
- Parameters are traceable to a cited reference or generation script.
- Round numbers and field choice are justified against published analysis.
- Document lives alongside the circuit sources.


## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Locate where the Poseidon parameters are defined in the circuit sources, then confirm the exact file path where this documentation should live.
2. Add a provenance document alongside the circuit sources that cites the reference or generation script for each parameter set in use.
3. Document the generation method used (or how values were imported), including script path and invocation details where available, and clearly note anything that still needs confirmation.
4. Justify the selected field and round numbers against published Poseidon analysis, with explicit citations mapped to the current configuration.

I'll wait for assignment before opening a PR.
