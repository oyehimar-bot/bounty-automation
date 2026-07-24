# ## Issue #79: Add Docker Containerization for Keeper Service

- Repo: SiLioLabs/PayFlow
- GitHub: https://github.com/SiLioLabs/PayFlow/issues/585
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9cea0a74-b3d4-466c-9c50-a2dcc387753a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-23T10:24:15.000Z
- Labels: backend, script

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body


**Category:** Backend / Scripts
**Complexity:** High
**Points:** 200
**Branch:** `feat/keeper-docker`

### Background
The keeper is a TypeScript script that must be run continuously to process charges. Currently it must be run directly with Node.js, requiring manual environment setup. A Docker container would make keeper deployment reproducible and portable.

### Problem
There is no Docker setup for the keeper service. Deploying it to any environment requires manual Node.js installation, dependency installation, and environment configuration, creating deployment friction.

### Acceptance Criteria
- [ ] `scripts/Dockerfile` produces a minimal Node.js 20-alpine image running the keeper
- [ ] `scripts/docker-compose.yml` starts the keeper with all required env vars from a `.env` file
- [ ] Image uses a non-root user for security
- [ ] Entrypoint supports `CMD ["node", "dist/keeper.js"]` with pre-built TypeScript
- [ ] `README.md` in `scripts/` is updated with Docker usage instructions
- [ ] Image builds successfully with `docker build` and passes basic smoke test

### Implementation Guidelines
**Key files:** `scripts/Dockerfile` (new), `scripts/docker-compose.yml` (new), `scripts/README.md`
**Approach:** Multi-stage build: stage 1 installs deps and compiles TypeScript, stage 2 copies `dist/` into a slim runtime image. Set `USER node`. Pass all config via ENV vars.
**Edge cases:** `scripts/package.json` must have a `build` script producing `dist/`; `.env` file must not be baked into image (use compose `env_file`); container crash on startup (add `restart: unless-stopped` in compose).
**Validation:** `docker build -t payflow-keeper scripts/` succeeds; `docker run --env-file .env payflow-keeper` starts without error

### PR Requirements
- TypeScript with strict types
- Error handling and graceful failure
- README or inline JSDoc for usage
- Configuration via environment variables


## Drafted application (paste into the Drips form after reviewing)

Here's the draft comment for Emmanuel to review and post:

I'd like to take this issue.

Plan:
- Add `scripts/Dockerfile` as a multi-stage build: stage 1 runs `npm install` and the `build` script to compile TypeScript into `dist/`, stage 2 copies `dist/` into a node:20-alpine runtime with `USER node` and `CMD ["node", "dist/keeper.js"]`.
- Confirm `scripts/package.json` has a `build` script that outputs `dist/`, and add one if it is missing.
- Add `scripts/docker-compose.yml` that loads config via `env_file` (so the `.env` is not baked into the image) and sets `restart: unless-stopped`.
- Update `scripts/README.md` with build and run instructions, including the `docker build` and `docker run --env-file .env` commands.
- Smoke test: build the image and confirm the keeper starts without error.

I'll wait for assignment before opening a PR.
