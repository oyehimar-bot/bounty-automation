# bug: Fix Broken PDF Report Generator Formatting on Mobile Viewports

- Repo: StellaBridge/Bridge-Watch
- GitHub: https://github.com/StellaBridge/Bridge-Watch/issues/819
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9e9b3e0d-c283-47a3-8f0c-bbfc67157a2b
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-17T09:13:40.000Z
- Labels: bug, Maybe Rewarded, GrantFox OSS, Official Campaign | FWC26

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Area
Frontend dashboard

### What happened?
When operators trigger PDF report exports from mobile viewports, the output layout breaks. Page elements are cut off on the right, charts overlap, and side margins are ignored. This is caused by viewport-dependent CSS units used in styling.

### What did you expect?
The PDF print generator layout should apply clean media-print rules, ensuring standard sizing regardless of viewport size at export.

### Steps to reproduce
1. Open the dashboard on a mobile browser.
2. Click 'Export PDF Report'.
3. Open the downloaded document. Notice overlapping text and cut-off charts.

### Environment
- OS: iOS, Android
- Browser: Safari Mobile, Chrome Mobile
- Commit / branch: main

## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
