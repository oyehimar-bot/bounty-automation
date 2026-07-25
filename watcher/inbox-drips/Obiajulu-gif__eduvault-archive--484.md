# {frontend} Add thumbnail preview to upload flow

- Repo: Obiajulu-gif/eduvault-archive
- GitHub: https://github.com/Obiajulu-gif/eduvault-archive/issues/484
- APPLY HERE: https://www.drips.network/wave/stellar/issues/cb718a3f-c5b0-4e42-b8b1-1c8e218e85ff
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T12:06:58.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Allow users to upload a cover image/thumbnail for their material and preview it before submission.

## Drafted application (paste into the Drips form after reviewing)

I can take this issue.

Plan:
1. Locate the frontend upload flow component and submit handler used for material creation, then confirm the exact file names in this repo.
2. Add a thumbnail input to that form (accept image/*) and keep the selected file in component state.
3. Render a local preview before submission (URL.createObjectURL), with replace and remove behavior.
4. Ensure the thumbnail is included in the existing material submission request payload and keep current validation and error handling consistent.
5. Test the flow for select, change, remove, and submit states.

I'll wait for assignment before opening a PR.
