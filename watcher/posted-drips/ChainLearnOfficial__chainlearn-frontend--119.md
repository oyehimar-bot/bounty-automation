# No

- Repo: ChainLearnOfficial/chainlearn-frontend
- GitHub: https://github.com/ChainLearnOfficial/chainlearn-frontend/issues/119
- APPLY HERE: https://www.drips.network/wave/stellar/issues/3632ba66-e197-40c5-b627-8f448ded6a97
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T23:31:49.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

robots.txt|No robots.txt file for search engine crawlers.

## Drafted application (paste into the Drips form after reviewing)

I’d like to take this issue.

Plan:
1. Likely cause: the repo is missing a deployed static robots.txt file, so crawlers have no directives.
2. Confirm where static files are served in this frontend (for example, a public/ path) and verify the current /robots.txt response.
3. Add robots.txt in the correct static location with clear baseline rules (User-agent: * plus allowed/disallowed paths based on project needs).
4. Check that robots.txt is included in the build output and reachable at /robots.txt after deployment.
5. Include the exact robots.txt content in the PR so it can be reviewed quickly.

I'll wait for assignment before opening a PR.
