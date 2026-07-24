/**
 * providers.js - pluggable CLI backends for drafting bounty applications.
 *
 * Both watch.js and drips.js used to shell out to the Claude Code CLI
 * directly (duplicated in each file). This centralizes that call and adds
 * two more backends, picked with `draft_provider` in config.json:
 *
 *   "claude"    claude -p           (default; uses your Claude subscription)
 *   "gemini"    gemini              (uses your Gemini CLI login/API key)
 *   "opencode"  opencode run        (routes to whatever provider/model you
 *                                    configured inside OpenCode itself)
 *
 * Override the binary path per-provider with CLAUDE_BIN / GEMINI_BIN /
 * OPENCODE_BIN, or generically with DRAFT_BIN. DRAFT_PROVIDER env var
 * overrides config.draft_provider.
 *
 * All three run fully on your machine against whatever you're already
 * logged into locally; nothing here talks to a network API directly.
 */

const { execFileSync } = require("child_process");

const DEFAULT_TIMEOUT_MS = 180000;
const MAX_BUFFER = 10 * 1024 * 1024;

const PROVIDERS = {
  claude: {
    envBin: "CLAUDE_BIN",
    defaultBin: "claude",
    // claude -p reads the prompt from stdin, which avoids any command-line
    // length limits on long issue bodies.
    build(prompt, model) {
      const args = ["-p"];
      if (model && model !== "default") args.push("--model", model);
      return { args, stdin: prompt };
    },
  },
  gemini: {
    envBin: "GEMINI_BIN",
    defaultBin: "gemini",
    // Gemini CLI drops into headless mode on its own whenever stdin isn't a
    // TTY, so piping the prompt in works the same way `echo x | gemini` does
    // and, like claude, sidesteps command-line length limits.
    build(prompt, model) {
      const args = [];
      if (model && model !== "default") args.push("-m", model);
      return { args, stdin: prompt };
    },
  },
  opencode: {
    envBin: "OPENCODE_BIN",
    defaultBin: "opencode",
    // OpenCode's `run` subcommand takes the prompt as a positional argument
    // and does not read stdin. Model must be "provider/model" (e.g.
    // "google/gemini-2.5-flash") in config.draft_model, or omit it to use
    // whatever default OpenCode has configured.
    build(prompt, model) {
      const args = ["run"];
      if (model && model !== "default") args.push("--model", model);
      args.push(prompt);
      return { args, stdin: undefined };
    },
  },
};

function resolveBin(name, provider) {
  return process.env[provider.envBin] || process.env.DRAFT_BIN || provider.defaultBin;
}

/**
 * Draft one application via whichever CLI provider is configured.
 * Returns the trimmed draft text, or null on failure (reason is logged).
 */
function draftApplication(prompt, config, opts = {}) {
  const name = (process.env.DRAFT_PROVIDER || config.draft_provider || "claude").toLowerCase();
  const provider = PROVIDERS[name];
  if (!provider) {
    console.error(
      `  unknown draft_provider "${name}" (expected one of: ${Object.keys(PROVIDERS).join(", ")})`
    );
    return null;
  }

  const bin = resolveBin(name, provider);
  // "haiku" is only a sensible default for Claude; other providers should
  // fall back to whatever they're configured with unless the user set
  // draft_model explicitly.
  const model = config.draft_model || (name === "claude" ? "haiku" : undefined);
  const { args, stdin } = provider.build(prompt, model);

  try {
    const out = execFileSync(bin, args, {
      input: stdin,
      encoding: "utf8",
      timeout: config.draft_timeout_ms || DEFAULT_TIMEOUT_MS,
      maxBuffer: MAX_BUFFER,
      windowsHide: true,
    });
    return out.trim() || null;
  } catch (e) {
    const msg = (e.message || "").split("\n")[0];
    console.error(`  draft failed via ${name} (${msg})`);
    if (e.code === "ENOENT") {
      console.error(
        `  "${bin}" was not found on PATH. Install the ${name} CLI, log it in, ` +
          `or set ${provider.envBin} (or DRAFT_BIN) to its full path.`
      );
    } else if (opts.verbose && e.stderr) {
      console.error(`    stderr: ${String(e.stderr).trim().slice(0, 2000)}`);
    }
    return null;
  }
}

module.exports = { draftApplication, PROVIDERS };
