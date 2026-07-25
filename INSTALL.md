# Install guide

Step-by-step setup for macOS, Windows, and Linux. Pick your OS below and
follow the numbered steps in order — each one builds on the last. This
covers everything up through your first successful run; day-to-day usage
lives in the main [README](README.md).

**Time:** about 10-15 minutes.

---

## Before you start (all platforms)

You'll need two things, so sort them out now:

1. **A GitHub personal access token** — go to
   [github.com/settings/tokens](https://github.com/settings/tokens) →
   *Generate new token (classic)* → tick the **`public_repo`** scope → copy
   the token (starts with `ghp_`). You can't view it again after this page,
   so paste it somewhere safe for a minute.
2. **One drafting CLI, logged in.** This tool doesn't talk to any AI model
   directly — it shells out to a CLI you already have (or install) and log
   into, and that CLI does the actual writing. Pick whichever you already
   have a subscription/account for:

   | CLI | You'll need | Cost model |
   |---|---|---|
   | **Claude Code** (default) | A Claude subscription (Free/Pro/Max) | Included in your Claude plan |
   | **Gemini CLI** | A personal Google account | Free tier (60 req/min, 1,000/day) |
   | **OpenCode** | Any supported provider's API key/login (Anthropic, Google, OpenAI, etc.) | Pay-as-you-go via whichever provider you connect |
   | **GitHub Copilot CLI** | An active GitHub Copilot subscription (Free/Pro/Pro+/Business/Enterprise) | Uses your plan's premium-request quota |

   You only need **one** to get started — this repo defaults to Claude Code.
   Full install steps for all four are in
   [Installing the drafting CLIs](#installing-the-drafting-clis) below;
   the OS sections below link straight to the one you pick.

---

## macOS

### 1. Install prerequisites

Open **Terminal**. If you don't have [Homebrew](https://brew.sh) yet:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install the required tools:

```bash
brew install node git gh
```

Restart Terminal (or run `source ~/.zshrc`) so your `PATH` picks up the new
binaries.

Now install your drafting CLI of choice — see
[Installing the drafting CLIs](#installing-the-drafting-clis) for the exact
command for macOS and how to log in. Come back here once it's installed and
logged in.

### 2. Clone the repo and place the pieces

```bash
git clone <YOUR_REPO_URL> ~/bounty-automation
cd ~/bounty-automation

cp watcher/config.example.json       watcher/config.json
cp watcher/drips-config.example.json watcher/drips-config.json

mkdir -p ~/.claude/skills/bounty-solver/references
cp skill/SKILL.md              ~/.claude/skills/bounty-solver/
cp skill/references/*.md       ~/.claude/skills/bounty-solver/references/
cp runner/settings.json        ~/.claude/settings.json

chmod +x runner/solve.sh
```

### 3. Set your GitHub token and log in

```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
echo 'export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE' >> ~/.zshrc

gh auth login          # follow the prompts
```

(Your drafting CLI login happened in step 1 above.)

### 4. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher/config.json` → set `"github_username"` to your GitHub login, and
  `"draft_provider"` to `"claude"`, `"gemini"`, `"opencode"`, or `"copilot"`
  (defaults to `"claude"`).
- `watcher/drips-config.json` → set `"waveProgramId"` (see
  [Finding your waveProgramId](#finding-your-waveprogramid) below).

### 5. Verify it works

```bash
cd ~/bounty-automation/watcher
node watch.js --dry
```

You should see it print candidate issues (or "0 new candidates" if nothing
currently matches — that's fine, it means the connection and search worked).
If you get an error, jump to [Troubleshooting](#troubleshooting) below.

---

## Windows

### 1. Install prerequisites

Open **PowerShell** (administrator not required) and run:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install GitHub.cli
```

Close and reopen PowerShell so `PATH` picks up the new binaries.

Now install your drafting CLI of choice — see
[Installing the drafting CLIs](#installing-the-drafting-clis) for the exact
command for Windows and how to log in. Come back here once it's installed
and logged in.

### 2. Clone the repo and place the pieces

```powershell
git clone <YOUR_REPO_URL> $HOME\bounty-automation
cd $HOME\bounty-automation

Copy-Item watcher\config.example.json       watcher\config.json
Copy-Item watcher\drips-config.example.json watcher\drips-config.json

New-Item -Type Directory -Force $HOME\.claude\skills\bounty-solver\references | Out-Null
Copy-Item skill\SKILL.md               $HOME\.claude\skills\bounty-solver\SKILL.md
Copy-Item skill\references\*.md        $HOME\.claude\skills\bounty-solver\references\
Copy-Item runner\settings.json         $HOME\.claude\settings.json
```

### 3. Set your GitHub token and log in

```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN","ghp_YOUR_TOKEN_HERE","User")

gh auth login          # follow the prompts
```

Close and reopen PowerShell so the `GITHUB_TOKEN` variable takes effect.
(Your drafting CLI login happened in step 1 above.)

### 4. Allow local scripts

Windows blocks locally-downloaded PowerShell scripts by default:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
Get-ChildItem $HOME\bounty-automation -Recurse -Filter *.ps1 | Unblock-File
```

### 5. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher\config.json` → set `"github_username"` to your GitHub login, and
  `"draft_provider"` to `"claude"`, `"gemini"`, `"opencode"`, or `"copilot"`
  (defaults to `"claude"`).
- `watcher\drips-config.json` → set `"waveProgramId"` (see
  [Finding your waveProgramId](#finding-your-waveprogramid) below).

### 6. Verify it works

```powershell
cd $HOME\bounty-automation\watcher
node watch.js --dry
```

You should see it print candidate issues (or "0 new candidates" if nothing
currently matches — that's fine, it means the connection and search worked).
If you get an error, jump to [Troubleshooting](#troubleshooting) below.

---

## Linux (Ubuntu/Debian and WSL)

### 1. Install prerequisites

```bash
sudo apt update && sudo apt install -y nodejs npm git

sudo apt install -y gh || (curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/etc/apt/keyrings/githubcli.gpg && \
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list && \
  sudo apt update && sudo apt install gh)
```

> Using a different distro? Substitute your package manager (`dnf`,
> `pacman`, etc.) for `apt` in the first line — the rest is the same.

Now install your drafting CLI of choice — see
[Installing the drafting CLIs](#installing-the-drafting-clis) for the exact
command for Linux and how to log in. Come back here once it's installed and
logged in.

### 2. Clone the repo and place the pieces

```bash
git clone <YOUR_REPO_URL> ~/bounty-automation
cd ~/bounty-automation

cp watcher/config.example.json       watcher/config.json
cp watcher/drips-config.example.json watcher/drips-config.json

mkdir -p ~/.claude/skills/bounty-solver/references
cp skill/SKILL.md              ~/.claude/skills/bounty-solver/
cp skill/references/*.md       ~/.claude/skills/bounty-solver/references/
cp runner/settings.json        ~/.claude/settings.json

chmod +x runner/solve.sh
```

### 3. Set your GitHub token and log in

```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
echo 'export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE' >> ~/.bashrc

gh auth login          # follow the prompts
```

(Your drafting CLI login happened in step 1 above.)

### 4. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher/config.json` → set `"github_username"` to your GitHub login, and
  `"draft_provider"` to `"claude"`, `"gemini"`, `"opencode"`, or `"copilot"`
  (defaults to `"claude"`).
- `watcher/drips-config.json` → set `"waveProgramId"` (see
  [Finding your waveProgramId](#finding-your-waveprogramid) below).

### 5. Verify it works

```bash
cd ~/bounty-automation/watcher
node watch.js --dry
```

You should see it print candidate issues (or "0 new candidates" if nothing
currently matches — that's fine, it means the connection and search worked).
If you get an error, jump to [Troubleshooting](#troubleshooting) below.

---

## Installing the drafting CLIs

You only need to install **one** of these — whichever you set as
`draft_provider`. Each subsection below covers all three OSes, logging in,
and how to confirm it actually works before you point the watcher at it.

### Claude Code (default)

**Needs:** a Claude subscription (Free, Pro, or Max) — no separate API key.

**Install:**

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex
```

Close and reopen your terminal afterward so `PATH` picks up the `claude`
command.

**Log in:**

```bash
claude          # opens the CLI; follow the browser login prompt, then Ctrl+C to exit
```

**Verify it works non-interactively** (this is exactly how the watcher calls it):

```bash
echo "say hello in one word" | claude -p
```

If that prints a short reply and exits, you're set. If it errors, check
that `ANTHROPIC_API_KEY` is *not* set in your shell (`echo $ANTHROPIC_API_KEY`
should print nothing) — having it set makes the CLI try to bill an API key
instead of using your subscription.

### Gemini CLI

**Needs:** a personal Google account. Free tier: 60 requests/minute, 1,000/day.

**Install:**

```bash
# macOS (Homebrew)
brew install gemini-cli

# macOS / Linux / Windows (npm, needs Node.js already installed)
npm install -g @google/gemini-cli
```

**Log in:**

```bash
gemini          # opens the CLI; choose "Login with Google", then /quit or Ctrl+C
```

**Verify it works non-interactively:**

```bash
echo "say hello in one word" | gemini
```

If that prints a short reply and exits, you're set.

**Use it for drafting:** set `"draft_provider": "gemini"` in
`watcher/config.json`. Optionally set `"draft_model"` to a specific model
name (e.g. `"gemini-2.5-flash"`); leave it unset to use Gemini CLI's default.

### OpenCode

**Needs:** your own API key/login for whichever provider you want OpenCode
to use underneath (Anthropic, Google, OpenAI, and 75+ others are supported).
OpenCode itself is free and open source; you pay that provider directly for
usage.

**Install:**

```bash
# macOS / Linux (official install script)
curl -fsSL https://opencode.ai/install | bash

# macOS / Linux (Homebrew)
brew install anomalyco/tap/opencode

# macOS / Linux / Windows (npm, needs Node.js already installed)
npm install -g opencode-ai
```

> Windows note: the npm install works natively in PowerShell. The install
> script and Homebrew options are macOS/Linux/WSL only.

**Log in / connect a provider:**

```bash
opencode auth login     # walks you through connecting a provider + API key
```

**Verify it works non-interactively:**

```bash
opencode run "say hello in one word"
```

If that prints a short reply and exits, you're set.

**Use it for drafting:** set `"draft_provider": "opencode"` in
`watcher/config.json`, and set `"draft_model"` to `"provider/model"` in the
format OpenCode expects — e.g. `"anthropic/claude-sonnet-4-20250514"` or
`"google/gemini-2.5-flash"` — matching whatever you connected in
`opencode auth login`. OpenCode has no useful default without this, so set
it explicitly.

### GitHub Copilot CLI

**Needs:** an active GitHub Copilot subscription (Free, Pro, Pro+, Business,
or Enterprise all include CLI access). If Copilot comes from an
organization, ask your admin to confirm the Copilot CLI policy is enabled.

**Install:**

```bash
# macOS / Linux (Homebrew)
brew install copilot-cli

# macOS / Linux (official install script)
curl -fsSL https://gh.io/copilot-install | bash

# macOS / Linux / Windows (npm, needs Node.js 22+ already installed)
npm install -g @github/copilot
```

```powershell
# Windows (WinGet)
winget install GitHub.Copilot
```

**Log in:**

```bash
copilot          # opens the CLI; run /login and follow the prompt, then Ctrl+C
```

**Verify it works non-interactively:**

```bash
copilot -p "say hello in one word" -s
```

If that prints a short reply and exits, you're set. (`-s` runs it "silent" —
just the final answer, without the tool-use trace — which is how the
watcher calls it.)

**Use it for drafting:** set `"draft_provider": "copilot"` in
`watcher/config.json`. Optionally set `"draft_model"` to a model name your
plan offers (run `/model` inside an interactive `copilot` session to see the
current list); leave it unset to use your account's default.

---

## Finding your `waveProgramId`

The Drips Wave is keyed by a UUID that isn't visible in the page URL.

1. Open `drips.network/wave/stellar/issues` in your browser.
2. Open DevTools (`F12` or right-click → Inspect) → **Network** tab → filter
   by `Fetch/XHR` → reload the page.
3. Find a request named something like `issues?limit=…&waveProgramId=…`.
4. Copy the `waveProgramId` value from it into `watcher/drips-config.json`.

If you don't care about Drips Wave (only GrantFox), you can skip this and
just set `"enabled": false` under `drips-stellar` in `watcher/config.json` —
Drips issues just won't be searched.

---

## First real run

Once `node watch.js --dry` works cleanly:

```bash
node watch.js          # writes real drafts to inbox/
node apply.js           # review them one at a time; Enter posts, s skips

node drips.js           # writes real drafts to inbox-drips/
node apply-drips.js     # opens each APPLY HERE page + copies the draft, one at a time
```

See the [README](README.md) for the full daily loop, the Drips workflow, and
the optional `apply.js --auto` unattended mode (off by default, and worth
reading the warnings on before you turn it on).

---

## Troubleshooting

- **`claude`/`gemini`/`opencode`/`copilot`/`gh`/`node` not recognized /
  command not found** — close and reopen your terminal so it picks up the
  updated `PATH`. On Linux, confirm the install script's `export PATH=...`
  line actually ran (check with `echo $PATH`).
- **`GITHUB_TOKEN not set`** — you set it in the same terminal session
  before adding it permanently, or forgot to reopen the terminal after
  adding it to your shell profile.
- **PowerShell says scripts are disabled** — re-run the
  `Set-ExecutionPolicy` command from the Windows section, step 4.
- **`draft failed` / empty drafts** — run `node watch.js --verbose` to see
  the real error. Usually either the drafting CLI isn't logged in yet, or
  it's not on `PATH` for the process running the watcher. Re-run the
  "verify it works non-interactively" command for your chosen CLI (above)
  by hand first — if that fails too, the problem is the CLI/login, not this
  repo. See the [README's troubleshooting section](README.md#troubleshooting)
  for the full list of causes and fixes.
- **Drips search errors** — double check `waveProgramId` in
  `drips-config.json`; it changes if the wave changes, so re-copy it from
  DevTools if searches suddenly stop returning anything.
