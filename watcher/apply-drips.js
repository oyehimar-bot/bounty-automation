#!/usr/bin/env node
/**
 * apply-drips.js - fast-track review for Drips Wave drafts.
 *
 * Why this isn't "auto-apply" like apply.js is for GrantFox: Drips has no
 * public API for submitting an application. Applying requires being signed
 * in through their web app AND having completed identity verification (KYC)
 * - see https://docs.drips.network/wave/contributors/solving-issues-and-earning-rewards/.
 * There's no documented endpoint here to call, and reverse-engineering the
 * private, session-authenticated API behind a KYC'd payout system isn't
 * something this tool will do. Drips' own guidance also says generic /
 * obvious-AI applications get passed over, so blind automation would work
 * against you here even if it were possible.
 *
 * What this script DOES automate: everything up to the click. For each
 * drafted Drips application it:
 *   1. copies the draft text to your clipboard
 *   2. opens the "APPLY HERE" page in your default browser
 *   3. waits for you to paste + hit submit, then marks it applied
 *
 * That's one Enter-press and one paste per issue, instead of opening the
 * file, copying by hand, and finding the right tab.
 *
 * Usage:
 *   node apply-drips.js              interactive, one issue at a time
 *   node apply-drips.js --inbox ./some/other/inbox-drips
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execFileSync } = require("child_process");
const applied = require("./applied");

/**
 * Re-check an issue's live GitHub status right before showing it. Drafts are
 * written once by drips.js and often reviewed later - during an active Wave,
 * popular issues get claimed within minutes, so what was open when drafted
 * may already be assigned or closed (resolved, points earned) by review time.
 * Returns { open, assigned } or null if the check itself failed (in which
 * case we show the item anyway rather than block on a flaky network call).
 */
function checkStillOpen(githubUrl) {
  try {
    const out = execFileSync(
      "gh",
      ["issue", "view", githubUrl, "--json", "state,assignees"],
      { encoding: "utf8", windowsHide: true }
    );
    const data = JSON.parse(out);
    return {
      open: (data.state || "").toUpperCase() === "OPEN",
      assigned: Array.isArray(data.assignees) && data.assignees.length > 0,
    };
  } catch {
    return null; // couldn't verify (network, gh not available, etc.) - don't block on it
  }
}

const args = process.argv.slice(2);
const argVal = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const INBOX = path.resolve(argVal("--inbox", path.join(__dirname, "inbox-drips")));
const ARCHIVE = path.join(path.dirname(INBOX), "posted-drips");
const STALE_ARCHIVE = path.join(path.dirname(INBOX), "stale-drips");
const STATE_PATH = path.join(__dirname, "drips-state.json");

function loadDripsState() {
  return fs.existsSync(STATE_PATH)
    ? JSON.parse(fs.readFileSync(STATE_PATH, "utf8"))
    : { seen: {}, applied: {} };
}
function saveDripsState(s) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2));
}

function parseDraftFile(text) {
  const title = (text.split("\n")[0] || "").replace(/^#\s*/, "");
  const repo = (text.match(/- Repo:\s*(\S+)/) || [])[1] || null;
  const githubUrl = (text.match(/- GitHub:\s*(\S+)/) || [])[1] || null;
  const applyUrl = (text.match(/- APPLY HERE:\s*(\S+)/) || [])[1] || null;
  const points = ((text.match(/- Points:\s*(.+)/) || [])[1] || "").trim();
  const pending = (text.match(/- Pending applications:\s*(\d+)/) || [])[1] || "?";
  const marker = "## Drafted application (paste into the Drips form after reviewing)";
  const idx = text.indexOf(marker);
  const draft = idx >= 0 ? text.slice(idx + marker.length).trim() : "";
  const issueNum = (githubUrl && githubUrl.match(/\/issues\/(\d+)/) || [])[1];
  const ref = repo && issueNum ? `${repo}#${issueNum}` : null;
  return { title, repo, githubUrl, applyUrl, points, pending, draft, ref };
}

/** Copy text to the system clipboard. Returns true on success. */
function copyToClipboard(text) {
  try {
    if (process.platform === "darwin") {
      execFileSync("pbcopy", { input: text });
      return true;
    }
    if (process.platform === "win32") {
      execFileSync("clip", { input: text, windowsHide: true });
      return true;
    }
    // Linux: try whichever clipboard tool is installed.
    for (const [bin, cliArgs] of [
      ["xclip", ["-selection", "clipboard"]],
      ["xsel", ["--clipboard", "--input"]],
      ["wl-copy", []],
    ]) {
      try {
        execFileSync(bin, cliArgs, { input: text });
        return true;
      } catch {
        /* try the next tool */
      }
    }
    return false;
  } catch {
    return false;
  }
}

/** Open a URL in the default browser. Returns true on success. */
function openUrl(url) {
  try {
    if (process.platform === "darwin") execFileSync("open", [url]);
    else if (process.platform === "win32")
      execFileSync("cmd", ["/c", "start", "", url], { windowsHide: true });
    else execFileSync("xdg-open", [url]);
    return true;
  } catch {
    return false;
  }
}

function archive(file) {
  fs.mkdirSync(ARCHIVE, { recursive: true });
  fs.renameSync(file, path.join(ARCHIVE, path.basename(file)));
}

function archiveStale(file) {
  fs.mkdirSync(STALE_ARCHIVE, { recursive: true });
  fs.renameSync(file, path.join(STALE_ARCHIVE, path.basename(file)));
}

function recordApplied(ref, dripsState) {
  if (!ref) return;
  dripsState.applied[ref] = new Date().toISOString();
  saveDripsState(dripsState);
  try {
    applied.addRefs([ref], "apply-drips.js");
  } catch (e) {
    console.error(`  (warning: could not update applied.json: ${e.message})`);
  }
}

async function main() {
  if (!fs.existsSync(INBOX)) {
    console.log(`No Drips inbox at ${INBOX}. Run: node drips.js`);
    return;
  }
  const files = fs
    .readdirSync(INBOX)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => path.join(INBOX, f));

  if (!files.length) {
    console.log(`Drips inbox is empty (${INBOX}). Run: node drips.js`);
    return;
  }

  const dripsState = loadDripsState();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log(`${files.length} drafted Drips application(s) to go through.\n`);
  console.log(
    "For each: [Enter] copies the draft to your clipboard and opens the Drips\n" +
      "page. [s] skip.  [d] discard.  [q] quit.\n"
  );

  let done = 0;
  let skipped = 0;
  let stale = 0;
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    const { title, points, pending, applyUrl, githubUrl, draft, ref } = parseDraftFile(text);

    if (githubUrl) {
      const status = checkStillOpen(githubUrl);
      if (status && (!status.open || status.assigned)) {
        const reason = !status.open ? "closed (resolved/points already earned)" : "already assigned to someone else";
        console.log(`SKIPPING (${reason} since this was drafted): ${title}`);
        archiveStale(f);
        stale++;
        continue;
      }
    }

    console.log("=".repeat(78));
    console.log(title);
    console.log(`${points}   |   ${pending} pending applicant(s)`);
    console.log("");
    console.log(draft || "(empty draft - open the file and write one by hand)");
    console.log("");

    const answer = (await ask("[Enter=open+copy] [s]kip [d]iscard [q]uit: ")).trim().toLowerCase();
    if (answer === "q") break;
    if (answer === "s") { skipped++; continue; }
    if (answer === "d") { fs.unlinkSync(f); console.log("  discarded"); continue; }

    if (!draft) { console.log("  empty draft, nothing to copy - skipping"); skipped++; continue; }
    if (!applyUrl) { console.log("  no APPLY HERE link found, skipping"); skipped++; continue; }

    const copied = copyToClipboard(draft);
    const opened = openUrl(applyUrl);
    if (!copied) console.log(`  (couldn't copy automatically - draft is above, copy it by hand)`);
    if (!opened) console.log(`  (couldn't open a browser automatically - go to: ${applyUrl})`);
    if (copied && opened) console.log("  opened in browser, draft copied to clipboard - paste and submit");

    await ask("Press Enter once you've submitted it on Drips (this marks it applied): ");
    archive(f);
    recordApplied(ref, dripsState);
    done++;
    console.log("  marked applied");
  }

  rl.close();
  console.log(`\nDone. Went through ${done}, skipped ${skipped}, stale ${stale}.`);
}

main().catch((e) => {
  console.error("apply-drips.js failed:", e.message);
  process.exit(1);
});
