# Bounty automation

Watches GrantFox and Drips Wave for bounty issues, drafts applications, and
(soon) drives Claude Code through a gated recon → design → build workflow on
assigned issues. **You always press the last button** — nothing is committed,
pushed, or posted without your explicit action.

## What is inside

```
watcher/    Poll GitHub + Drips for open bounty issues, draft applications
            (via Claude, Gemini, OpenCode, or GitHub Copilot - see
            providers.js), and review or post them with apply.js
runner/     Take an assigned issue through recon → design → build (uncommitted)
skill/      The workflow Claude Code follows (install to ~/.claude/skills)
```

## What you need

- **Node.js 18+** and **git**
- **A drafting CLI**: Claude Code (default, uses your existing subscription;
  no API key), Gemini CLI, OpenCode, or GitHub Copilot CLI — see
  [choosing a CLI provider](#drafting-choosing-a-cli-provider) below
- **GitHub CLI** (`gh`) — for reading and posting comments
- A **GitHub personal access token** with `public_repo` scope

## Install

**→ See [INSTALL.md](INSTALL.md) for full step-by-step setup on macOS,
Windows, and Linux.**

Once installed, edit both configs before your first run:
- `watcher/config.json` — set `github_username` to your GitHub login.
- `watcher/drips-config.json` — set `waveProgramId` (see
  [INSTALL.md](INSTALL.md#finding-your-waveprogramid)).

## Daily loop

```bash
cd ~/bounty-automation/watcher     # (or $HOME\bounty-automation\watcher on Windows)

node watch.js --dry                # preview GrantFox candidates
node watch.js                      # write drafts to inbox/
node apply.js                      # review and post, Enter/skip/edit/discard per item
                                    # (or ./review.ps1 on Windows, same behaviour)

node drips.js --dry                # preview Drips Wave shortlist
node drips.js                      # write to inbox-drips/
node apply-drips.js                 # opens each APPLY HERE page + copies the draft, one at a time
node applied.js add "owner/repo#123" "owner/repo#456"  # record what you applied to
```

`applied.json` is shared: once an issue is in it, neither watcher will surface
it again.

## Drafting: choosing a CLI provider

Drafting goes through `watcher/providers.js`, which shells out to whichever
CLI you point it at. Set `draft_provider` in `config.json` (and, separately,
in `drips-config.json` if you want a different one there):

```json
"draft_provider": "claude",   // or "gemini", "opencode", or "copilot"
"draft_model": "haiku",
```

| Provider   | CLI it calls        | Needs                                  |
|------------|----------------------|-----------------------------------------|
| `claude`   | `claude -p`          | Claude Code CLI, logged in (default)   |
| `gemini`   | `gemini`              | Gemini CLI, logged in / API key set    |
| `opencode` | `opencode run`        | OpenCode CLI, with a provider/model configured inside it (set `draft_model` to `"provider/model"`, e.g. `"google/gemini-2.5-flash"`) |
| `copilot`  | `copilot -p -s`       | GitHub Copilot CLI, logged in, active Copilot subscription |

Override the binary path with `CLAUDE_BIN`, `GEMINI_BIN`, `OPENCODE_BIN`,
`COPILOT_BIN`, or generically `DRAFT_BIN`, if the CLI isn't on `PATH` for the
process running the watcher. Add `--verbose` to `node watch.js` / `node
drips.js` to see the underlying CLI's stderr when a draft fails, instead of
just the one-line summary.

Full install instructions for all four CLIs (macOS/Windows/Linux) are in
[INSTALL.md](INSTALL.md#installing-the-drafting-clis).

If drafts keep failing: run the same command by hand first (e.g.
`echo hi | claude -p`) to confirm that CLI is installed, logged in, and
usable non-interactively from this shell — that's almost always the actual
problem, and `--verbose` will show you which.

## Applying automatically

`node apply.js --auto` posts every drafted GrantFox application that passes
the built-in quality checks, with no per-item review, up to a daily cap.
Read this before turning it on:

- **It requires two explicit opt-ins**: `"auto_apply": true` in
  `config.json`, *and* the `--auto` flag. Either alone does nothing. This is
  intentional — the rest of this tool is built around "you press the last
  button," and unattended posting is a real change to that.
- **Comments post publicly, under your GitHub account, with no human in the
  loop.** A wave of near-identical AI-drafted comments across many repos
  reads as spam to maintainers even when each individual one is reasonable,
  and may run afoul of a platform's rules on automated activity. Start with
  `max_auto_posts_per_day` low (default 8) and read a sample of what actually
  got posted afterward.
- It still runs the same quality gates as interactive review (rejects empty,
  placeholder/failed, too-short, or AI-commentary-laced drafts), waits
  `post_delay_ms` between posts (default 2000ms), and records everything it
  posts in `applied.json` so it's never re-applied to.
- **Only covers GrantFox-style drafts** (the ones with a `- Issue:` GitHub
  URL). Drips Wave drafts are skipped automatically: Drips explicitly says a
  GitHub comment does not register as an application, so `apply.js` won't
  post one there — you'd lose nothing but the correct application slot.
  Apply to those through the Drips web form as before.

```json
"auto_apply": true,
"max_auto_posts_per_day": 8,
"post_delay_ms": 2000,
"min_draft_words": 15
```

```bash
node apply.js --auto                # up to max_auto_posts_per_day
node apply.js --auto --limit 3      # cap this run to 3, regardless of config
```

## Applying on Drips

Drips doesn't work like GrantFox here, and can't be made to: applying
requires being signed in through Drips' web app **and** having completed
identity verification (KYC) first, since Points convert to a real payout.
There's no public API to submit an application against, and Drips'
[own guidance](https://www.drips.network/blog/posts/your-guide-to-contributing-well-in-wave)
says generic or obvious-AI applications get passed over by maintainers
anyway — so a blind auto-submit bot would work against you even if one
existed.

What `node apply-drips.js` gives you instead is everything short of the
click: for each drafted Drips application it copies the draft to your
clipboard and opens the issue's Drips page in your browser, so you just
paste and hit submit, then press Enter to mark it applied. One Enter-press
and one paste per issue, instead of hunting down the file, copying by hand,
and finding the right tab.

```bash
node apply-drips.js                  # interactive, one issue at a time
```

Applied issues are recorded in both `drips-state.json` and the shared
`applied.json`, same as `apply.js`, so they won't resurface.

## Useful commands

```
node applied.js list                    show everything recorded
node applied.js add <ref>...            record applications (owner/repo#N or URL)
node applied.js import-posted           import from the review.ps1 posted/ folder
node applied.js import-assigned         import your open GitHub assignments
node applied.js prune 90                drop entries older than N days

node drips.js --waves                   list Drips wave IDs (to switch waves)
node drips.js --dry                     shortlist without writing
```

## What is (and isn't) automated on purpose

- **Applying.** Manual by default: comments post publicly under your name, and
  `apply.js` / `review.ps1` need you to press Enter for each item so quality
  stays in your hands. `apply.js --auto` can post unattended if you explicitly
  opt in (see "Applying automatically" above) — read that section's warnings
  first, since it's a real departure from the "you press the last button"
  design this tool otherwise follows.
- **Applying on Drips is never unattended**, by necessity rather than choice:
  Drips has no public submission API and requires a KYC-verified, signed-in
  browser session. `apply-drips.js` automates everything up to that click —
  see "Applying on Drips" above.
- **The recon verdict.** Templated issues sometimes describe code that does not
  exist. Reading the recon before letting the solver design a fix is the gate
  that keeps PRs mergeable.
- **Committing.** The solver stops with everything uncommitted. You review the
  diff, commit and push by hand.

## Directory layout after setup

```
~/bounty-automation/
├── watcher/
│   ├── watch.js, drips.js, applied.js       run these
│   ├── apply.js                              review / --auto post drafts (cross-platform)
│   ├── apply-drips.js                        quick-apply assist for Drips (opens browser + copies draft)
│   ├── providers.js                          drafting backend: claude / gemini / opencode / copilot
│   ├── review.ps1, cleanup.ps1              Windows-only equivalent of apply.js
│   ├── application-prompt.md                how drafts are written
│   ├── config.json, drips-config.json       your local configs (gitignored)
│   ├── applied.json, state.json, drips-state.json, apply-state.json   local state (gitignored)
│   └── inbox/, inbox-drips/, posted/, posted-drips/   working folders (gitignored)
├── runner/
│   ├── assigned.ps1, solve.ps1, solve.sh    solve-side (in progress)
│   ├── settings.json                        Claude Code permission allowlist
│   └── repos.json                           you map assigned repos → clones
└── skill/                                   installed to ~/.claude/skills/bounty-solver
```

## Troubleshooting

- **`claude: command not found`** — Windows: check `C:\Users\<you>\.local\bin` is
  on PATH. Ubuntu: run `export PATH="$HOME/.local/bin:$PATH"`.
- **`draft failed` / drafts empty** — run `node watch.js --verbose` (or
  `drips.js --verbose`) to see the underlying CLI's stderr. Common causes:
  - Claude: you have `ANTHROPIC_API_KEY` set; unset it so the CLI falls back
    to your subscription.
  - Any provider: the CLI isn't on `PATH` for the process running the
    watcher (error mentions `ENOENT`) — set `CLAUDE_BIN` / `GEMINI_BIN` /
    `OPENCODE_BIN` / `COPILOT_BIN` / `DRAFT_BIN` to its full path, or confirm
    it works when you run it by hand first, e.g. `echo hi | claude -p`.
  - Gemini/OpenCode/Copilot: not logged in, or (OpenCode) no default model
    configured — run `gemini`, `opencode`, or `copilot` interactively once
    to finish login/setup before using them headlessly here.
- **`GITHUB_TOKEN not set`** — reopen the terminal after setting the env var.
- **Drips search errors** — verify `waveProgramId` in `drips-config.json`;
  re-copy it from DevTools if the wave changed.
