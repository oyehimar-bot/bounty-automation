# Access control audit for all admin functions

- Repo: Invoice-Liquidity-Network/ILN-Smart-Contract
- GitHub: https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/issues/540
- APPLY HERE: https://www.drips.network/wave/stellar/issues/0da77395-8127-4a07-a328-81b7a0349972
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-25T09:21:43.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

**Description:**

All admin functions need to be verified for proper access control. This includes:
- `require_admin` is called correctly
- No bypass paths exist
- Admin transfer is properly authenticated

**Why it matters:** Unauthorized admin access can lead to fund loss or contract takeover.

**Acceptance Criteria:**
- [ ] Map all admin-restricted functions
- [ ] Verify `require_admin` is called correctly
- [ ] Test unauthorized access for each function
- [ ] Document in `docs/access-control.md`

**Relevant Files:** All contract files

---

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Map all admin-restricted functions across all contract files, then list each function, guard, and expected caller in `docs/access-control.md`.
2. Verify `require_admin` is enforced on every admin path, including direct calls, modifiers, and internal call chains.
3. Review admin transfer flows to confirm only the current admin can initiate transfer and that transfer authentication cannot be skipped.
4. Test unauthorized access for each mapped admin function and transfer path to check for bypass routes.
5. Document results, uncovered risks, and any needed code changes in `docs/access-control.md`.

I'll wait for assignment before opening a PR.
