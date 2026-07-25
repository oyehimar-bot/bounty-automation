# Add CLI `batch` command for submitting multiple invoices

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/520
- APPLY HERE: https://www.drips.network/wave/stellar/issues/93d6041d-2196-4f97-8496-96f17973f7a7
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-25T09:10:31.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

The CLI has no command for batch invoice submission. High-volume users need to submit multiple invoices efficiently.

**Why it matters:** Batch submission is essential for platforms and marketplaces.

**Acceptance Criteria:**
- [ ] Create `cli/src/commands/batch.ts`
- [ ] Accept a JSON file path with invoice parameters
- [ ] Submit all invoices in a batch transaction
- [ ] Output invoice IDs

**Relevant Files:** `cli/src/index.ts`, `cli/src/commands/submit.ts`

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Add `cli/src/commands/batch.ts` with a `batch` command that accepts a JSON file path and parses invoice parameters.
2. Reuse the submission flow in `cli/src/commands/submit.ts` to build invoice calls for each item, with input validation and clear per-item errors.
3. Implement batch transaction submission in `batch.ts` so all invoices are sent together in one transaction.
4. Register the new command in `cli/src/index.ts` and wire its options and help text.
5. Print the resulting invoice IDs after confirmation, matching the current CLI output style.

I'll wait for assignment before opening a PR.
