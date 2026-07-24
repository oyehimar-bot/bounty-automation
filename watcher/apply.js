#!/usr/bin/env node
/**
 * apply.js - review drafted applications and post them as GitHub comments.
 *
 * Cross-platform replacement/companion for review.ps1 (Node instead of
 * PowerShell, so it runs the same way on Windows, macOS, and Linux). Two
 * modes:
 *
 *   node apply.js              interactive: shows each draft, you decide
 *   node apply.js --auto       unattended: posts everything that passes the
 *                              quality gates, up to a daily cap, with a
 *                              delay between posts
 *
 * --auto only works from BOTH sides of an explicit opt-in:
 *   1. "auto_apply": true in watcher/config.json
 *   2. the --auto flag on the command line
 * That double opt-in is deliberate. This posts public GitHub comments under
 * your account with no human check. Read the warning it prints before you
 * turn it on, and keep max_auto_posts_per_day low until you trust the drafts.
 *
 * Only applies to GrantFox-style drafts (files with an "- Issue:" GitHub
 * URL). Drips Wave drafts are shown but never posted: Drips explicitly
 * states a GitHub comment does not register as an application, so posting
 * one there would waste the slot instead of using it. Apply to those
 * through the Drips web form as before, then run:
 *   node applied.js add "owner/repo#123"
 *
 * Usage:
 *   node apply.js                 interactive review of watcher/inbox
 *   node apply.js --auto          unattended posting (see gates above)
 *   node apply.js --auto --limit 3
 *   node apply.js --inbox ./some/other/inbox
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");
const { execFileSync } = require("child_process");
const applied = require("./applied");

const CONFIG_PATH = path.join(__dirname, "config.json");
const config = fs.existsSync(CONFIG_PATH) ? JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8")) : {};

const args = process.argv.slice(2);
const AUTO = args.includes("--auto");
const argVal = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const INBOX = path.resolve(argVal("--inbox", path.join(__dirname, "inbox")));
const ARCHIVE = path.join(path.dirname(INBOX), "posted");
const AUTO_STATE_PATH = path.join(__dirname, "apply-state.json");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadAutoState() {
  const today = new Date().toISOString().slice(0, 10);
  if (fs.existsSync(AUTO_STATE_PATH)) {
    const s = JSON.parse(fs.readFileSync(AUTO_STATE_PATH, "utf8"));
    if (s.date === today) return s;
  }
  return { date: today, postedToday: 0 };
}
function saveAutoState(s) {
  fs.writeFileSync(AUTO_STATE_PATH, JSON.stringify(s, null, 2));
}

function parseDraftFile(text) {
  const title = (text.split("\n")[0] || "").replace(/^#\s*/, "");
  const url = (text.match(/- Issue:\s*(\S+)/) || [])[1] || null;
  const points = ((text.match(/- Points:\s*(.+)/) || [])[1] || "").trim();
  const comments = (text.match(/- Comments so far:\s*(\d+)/) || [])[1] || "?";
  const marker = "## Drafted application (REVIEW AND EDIT BEFORE POSTING)";
  const idx = text.indexOf(marker);
  const draft = idx >= 0 ? text.slice(idx + marker.length).trim() : "";
  return { title, url, points, comments, draft };
}

function draftQualityIssue(draft, minWords) {
  if (!draft) return "empty draft";
  if (/DRAFT-FAILED|no ANTHROPIC_API_KEY set/.test(draft)) return "placeholder/failed draft";
  if (
    /^\s*(note for|i wasn't able|i couldn't|here's the draft|no problem,)/im.test(draft) ||
    /^\s*---\s*$/m.test(draft)
  ) {
    return "contains AI commentary";
  }
  const words = draft.split(/\s+/).filter(Boolean).length;
  if (minWords && words < minWords) return `too short (${words} words)`;
  return null;
}

function postComment(url, draft) {
  execFileSync("gh", ["issue", "comment", url, "--body-file", "-"], {
    input: draft,
    encoding: "utf8",
    windowsHide: true,
  });
}

function archive(file) {
  fs.mkdirSync(ARCHIVE, { recursive: true });
  fs.renameSync(file, path.join(ARCHIVE, path.basename(file)));
}

function recordApplied(url) {
  try {
    applied.addRefs([url], "apply.js" + (AUTO ? "-auto" : ""));
  } catch (e) {
    console.error(`  (warning: could not update applied.json: ${e.message})`);
  }
}

async function runAuto(files) {
  const cap = config.max_auto_posts_per_day ?? 8;
  const delayMs = config.post_delay_ms ?? 2000;
  const minWords = config.min_draft_words ?? 15;

  if (config.auto_apply !== true) {
    console.error(
      'Refusing to run --auto: set "auto_apply": true in watcher/config.json first.\n' +
        "This is a deliberate double opt-in because --auto posts public GitHub\n" +
        "comments under your account with no human review, run after run."
    );
    process.exit(1);
  }

  console.log(
    "AUTO MODE: posting drafted applications with no per-item review.\n" +
      `Daily cap: ${cap}  |  delay between posts: ${delayMs}ms  |  min words: ${minWords}\n` +
      "Reminder: this posts publicly, under your GitHub account, on repos you\n" +
      "don't maintain. A wave of near-identical AI-drafted comments across many\n" +
      "issues reads as spam to maintainers even when each one is individually\n" +
      "reasonable, and may violate a platform's terms on automated activity.\n" +
      "Keep the cap low and read a sample of what got posted afterward.\n"
  );

  const state = loadAutoState();
  const limit = Math.min(parseInt(argVal("--limit", cap), 10) || cap, cap - state.postedToday);
  if (limit <= 0) {
    console.log(`Daily cap of ${cap} already reached today (${state.postedToday} posted). Stopping.`);
    return;
  }

  let posted = 0;
  let skipped = 0;
  for (const f of files) {
    if (posted >= limit) break;
    const text = fs.readFileSync(f, "utf8");
    const { title, url, draft } = parseDraftFile(text);

    if (!url) {
      console.log(`  SKIP (no GitHub issue URL - likely a Drips draft): ${path.basename(f)}`);
      skipped++;
      continue;
    }
    const problem = draftQualityIssue(draft, minWords);
    if (problem) {
      console.log(`  SKIP (${problem}): ${title}`);
      skipped++;
      continue;
    }

    try {
      postComment(url, draft);
      archive(f);
      recordApplied(url);
      posted++;
      state.postedToday++;
      saveAutoState(state);
      console.log(`  POSTED (${posted}/${limit}): ${title}\n    ${url}`);
    } catch (e) {
      console.error(`  FAILED to post ${title}: ${(e.message || "").split("\n")[0]}`);
      skipped++;
    }
    await sleep(delayMs);
  }

  console.log(`\nDone. Posted ${posted}, skipped ${skipped}. Posted today (total): ${state.postedToday}/${cap}.`);
}

function openInEditor(initialText) {
  const tmp = path.join(os.tmpdir(), `bounty-draft-${Date.now()}.md`);
  fs.writeFileSync(tmp, initialText);
  const editor = process.env.EDITOR || (process.platform === "win32" ? "notepad" : "nano");
  try {
    execFileSync(editor, [tmp], { stdio: "inherit" });
    const edited = fs.readFileSync(tmp, "utf8").trim();
    return edited;
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

async function runInteractive(files) {
  if (!files.length) {
    console.log(`Inbox is empty (${INBOX}). Run: node watch.js`);
    return;
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log(`${files.length} drafted application(s) to review\n`);
  console.log("[Enter/p] post   [s] skip   [e] edit then post   [d] discard   [q] quit\n");

  let posted = 0;
  let skipped = 0;
  for (const f of files) {
    let text = fs.readFileSync(f, "utf8");
    let { title, url, points, comments, draft } = parseDraftFile(text);

    console.log("=".repeat(78));
    console.log(title);
    console.log(`${url || "(no GitHub issue URL - Drips draft, apply via their form)"}   |   ${points}   |   ${comments} comment(s)`);
    console.log("");
    console.log(draft || "(empty draft)");
    console.log("");

    const answer = (await ask("[Enter=post] [s]kip [e]dit [d]iscard [q]uit: ")).trim().toLowerCase();

    if (answer === "q") break;
    if (answer === "s") { skipped++; continue; }
    if (answer === "d") { fs.unlinkSync(f); console.log("  discarded"); continue; }
    if (answer === "e") {
      draft = openInEditor(draft);
    } else if (answer && answer !== "p") {
      console.log("  unrecognised input, skipping");
      skipped++;
      continue;
    }

    if (!url) { console.log("  no GitHub issue URL found (Drips draft) - not postable here, skipping"); skipped++; continue; }
    if (!draft) { console.log("  empty draft, skipping"); skipped++; continue; }
    const problem = draftQualityIssue(draft, 0);
    if (problem) { console.log(`  ${problem} - NOT posting. Use [e] to fix it.`); skipped++; continue; }

    try {
      postComment(url, draft);
      archive(f);
      recordApplied(url);
      posted++;
      console.log("  posted");
    } catch (e) {
      console.error(`  FAILED: ${(e.message || "").split("\n")[0]}`);
      skipped++;
    }
    await sleep(800); // be polite to the API
  }

  rl.close();
  console.log(`\nDone. Posted ${posted}, skipped ${skipped}.`);
}

async function main() {
  if (!fs.existsSync(INBOX)) {
    console.log(`No inbox at ${INBOX}. Run: node watch.js`);
    return;
  }
  const files = fs
    .readdirSync(INBOX)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => path.join(INBOX, f));

  if (AUTO) await runAuto(files);
  else await runInteractive(files);
}

main().catch((e) => {
  console.error("apply.js failed:", e.message);
  process.exit(1);
});
