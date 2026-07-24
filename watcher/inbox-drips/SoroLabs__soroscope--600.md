# [Frontend] Create Global Error Boundary Component for Graceful RPC Failure Recovery

- Repo: SoroLabs/soroscope
- GitHub: https://github.com/SoroLabs/soroscope/issues/600
- APPLY HERE: https://www.drips.network/wave/stellar/issues/90cb1eaa-d1b6-4d53-b352-d061cdda743f
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T12:58:17.000Z
- Labels: Frontend, Easy/Trivial, reliability

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### Overview
Uncaught network errors during RPC fetch crash the React component tree into a blank white screen.

### Proposed Solution & Implementation Details
Wrap app with React Error Boundary rendering user-friendly retry controls and error stack toggle.

### Contributor Guidelines

#### 1. Branch Naming
- Create a new branch from `main`:
  `git checkout -b feature/issue-42-error-boundary`

#### 2. Commit Message Convention
- Follow Conventional Commits specification:
  `feature(error-boundary): brief description of changes`

#### 3. Pull Request Standards
- **PR Title Format**: `[Frontend] <Brief Summary>`
- Ensure all tests pass: `cargo test` (for Rust/Contracts) or `npm test` (for Web Frontend).
- Update relevant documentation and add unit tests for new functionality.

#### 4. Acceptance Criteria
- [ ] Implementation completed according to specification.
- [ ] Code passes all linting and formatting checks.
- [ ] Unit and/or Integration tests added and passing.


## Drafted application (paste into the Drips form after reviewing)

DRAFT-FAILED: write this one yourself.
