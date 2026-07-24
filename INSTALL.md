# Install guide

Step-by-step setup for macOS, Windows, and Linux. Pick your OS below and
follow the numbered steps in order — each one builds on the last. This
covers everything up through your first successful run; day-to-day usage
lives in the main [README](README.md).

**Time:** about 10-15 minutes.

---

## Before you start (all platforms)

You'll need accounts/keys for two things, so grab them now:

1. **A GitHub personal access token** — go to
   [github.com/settings/tokens](https://github.com/settings/tokens) →
   *Generate new token (classic)* → tick the **`public_repo`** scope → copy
   the token (starts with `ghp_`). You can't view it again after this page,
   so paste it somewhere safe for a minute.
2. **A drafting CLI you can log into** — pick one:
   - **Claude Code** (default, recommended if you already have a Claude
     subscription) — no separate API key needed.
   - **Gemini CLI** — free tier available with a personal Google account.
   - **OpenCode** — bring your own provider/model.

   You only need one of these; you can add the others later. Installation
   for each is included in the steps below.

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
curl -fsSL https://claude.ai/install.sh | bash
```

Restart Terminal (or run `source ~/.zshrc`) so your `PATH` picks up the new
binaries.

Install whichever additional drafting CLI(s) you want:

```bash
# Gemini CLI (optional)
brew install gemini-cli

# OpenCode (optional)
brew install anomalyco/tap/opencode
```

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

### 3. Log in

```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
echo 'export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE' >> ~/.zshrc

gh auth login          # follow the prompts
claude                 # opens the CLI; log in through the browser, then Ctrl+C

# if you installed it:
gemini                 # log in, then Ctrl+C or /quit
```

### 4. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher/config.json` → set `"github_username"` to your GitHub login.
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

Open **PowerShell** (not as administrator needed) and run:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install GitHub.cli
irm https://claude.ai/install.ps1 | iex
```

Close and reopen PowerShell so `PATH` picks up the new binaries.

Install whichever additional drafting CLI(s) you want:

```powershell
# Gemini CLI (optional)
npm install -g @google/gemini-cli

# OpenCode (optional)
npm install -g opencode-ai
```

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

### 3. Log in

```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN","ghp_YOUR_TOKEN_HERE","User")

gh auth login          # follow the prompts
claude                 # opens the CLI; log in through the browser, then Ctrl+C

# if you installed it:
gemini                 # log in, then Ctrl+C or /quit
```

Close and reopen PowerShell so the `GITHUB_TOKEN` variable takes effect.

### 4. Allow local scripts

Windows blocks locally-downloaded PowerShell scripts by default:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
Get-ChildItem $HOME\bounty-automation -Recurse -Filter *.ps1 | Unblock-File
```

### 5. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher\config.json` → set `"github_username"` to your GitHub login.
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

curl -fsSL https://claude.ai/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

> Using a different distro? Substitute your package manager (`dnf`,
> `pacman`, etc.) for `apt` in the first line — the rest is the same.

Install whichever additional drafting CLI(s) you want:

```bash
# Gemini CLI (optional)
npm install -g @google/gemini-cli

# OpenCode (optional)
curl -fsSL https://opencode.ai/install | bash
```

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

### 3. Log in

```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
echo 'export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE' >> ~/.bashrc

gh auth login          # follow the prompts
claude                 # opens the CLI; log in through the browser, then Ctrl+C

# if you installed it:
gemini                 # log in, then Ctrl+C or /quit
```

### 4. Edit your configs

Open these two files in any editor and fill in the blanks:

- `watcher/config.json` → set `"github_username"` to your GitHub login.
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

## Choosing which CLI drafts your applications

By default this uses Claude. To switch, edit `draft_provider` in
`watcher/config.json` (and `watcher/drips-config.json` if you want a
different one there):

```json
"draft_provider": "claude",
```

Valid values: `"claude"`, `"gemini"`, `"opencode"`. Full details, model
names, and env-var overrides are in the [README](README.md#drafting-choosing-a-cli-provider).

---

## First real run

Once `node watch.js --dry` works cleanly:

```bash
node watch.js          # writes real drafts to inbox/
node apply.js           # review them one at a time; Enter posts, s skips
```

See the [README](README.md) for the full daily loop, the Drips workflow, and
the optional `apply.js --auto` unattended mode (off by default, and worth
reading the warnings on before you turn it on).

---

## Troubleshooting

- **`claude`/`gh`/`node` not recognized / command not found** — close and
  reopen your terminal so it picks up the updated `PATH`. On Linux, confirm
  `export PATH="$HOME/.local/bin:$PATH"` ran (check with `echo $PATH`).
- **`GITHUB_TOKEN not set`** — you set it in the same terminal session
  before adding it permanently, or forgot to reopen the terminal after
  adding it to your shell profile.
- **PowerShell says scripts are disabled** — re-run the
  `Set-ExecutionPolicy` command from Windows step 4.
- **`draft failed` / empty drafts** — run `node watch.js --verbose` to see
  the real error. Usually either the drafting CLI isn't logged in yet, or
  it's not on `PATH` for the process running the watcher. See the
  [README's troubleshooting section](README.md#troubleshooting) for the
  full list of causes and fixes.
- **Drips search errors** — double check `waveProgramId` in
  `drips-config.json`; it changes if the wave changes, so re-copy it from
  DevTools if searches suddenly stop returning anything.
