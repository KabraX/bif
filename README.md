# BIF — Before I Forget

> Drop-in persistent memory for AI coding agents.

`bif` is a tiny zero-dependency CLI that installs a battle-tested memory layout into your project so your AI coding assistant **remembers what was done, what's pending, and why decisions were made** between sessions.

The name is a wink at Slipknot's _Before I Forget_. The system is designed to be agent-agnostic; the first supported agent is **Claude Code**.

---

## Why

LLM coding assistants forget everything between sessions. You waste the first ten minutes of every chat re-explaining the project, what you were doing, and which bugs are still open. Having an organized way to burn those tokens and reopen sessions is a great help for users who do not have paid plans. BIF flips that:

- A `memory/` directory becomes the single source of truth for tasks, bugs, decisions, and session logs.
- Two slash commands — `/brief` and `/done` — bookend each session: catch-up at the start, commit + log at the end.
- One slash command — `/init-bif` — interviews the agent about your project the first time and fills in `CLAUDE.md`.
- Bug tracking and architectural decisions are recorded automatically as you work, no extra friction.

---

## Quick start

In your project's root:

```bash
npx bif-cli init
```

> The package is published as **`bif-cli`** on npm; the installed command is **`bif`**. If you'd rather install it once, run `npm i -g bif-cli` and from then on just use `bif init`.

That copies the memory scaffold into `./.claude/` and `./memory/`. Then open the project with Claude Code and run:

```text
/init-bif  # one-time: fills CLAUDE.md by exploring your repo and asking targeted questions
/brief     # at the start of every session
/done      # at the end of every session
```

That's it.

---

## What gets installed

```text
.claude/
├── CLAUDE.md              # project context for the agent (filled in by /init-bif)
└── commands/
    ├── init-bif.md        # /init-bif — interview + repo scan to fill CLAUDE.md
    ├── brief.md           # /brief — 15-second session catch-up
    └── done.md            # /done — close session, log, commit, push
memory/
├── SESSION-LOG.md         # reverse-chronological session history
├── BUGS.md                # open + fixed bug tracker, with file references
├── decisions/             # ADRs (architecture decision records)
└── tasks/
    ├── todo/              # backlog (one .md per task)
    └── in-progress/       # active work (max 1-2)
```

You commit all of this to git. The whole point is that it survives the agent's session.

---

## CLI reference

```text
bif init                Install the memory system into the current project
  --target <dir>          Target directory (default: cwd)
  --force                 Overwrite without prompting
  --yes, -y               Answer yes to all prompts (keeps existing files)
  --dry-run               Print what would be written without touching disk

bif add <system>        Install an optional system from systems/ (WIP - You can help by contributing)
bif help                Show help
bif version             Show version
```

---

## How the loop works

1. **Start of session** → run `/brief`. Claude reads the task board, the last entry of `SESSION-LOG.md`, open bugs, and recent git activity. You get a 15-second briefing of where you left off.
2. **During work** → as Claude finds or fixes bugs it updates `memory/BUGS.md`. As Claude makes non-trivial technical decisions it writes an ADR in `memory/decisions/`. Tasks move automatically between `todo/` and `in-progress/`.
3. **End of session** → run `/done`. Claude closes finished tasks, appends a session log entry, runs the project's pre-push checks, and offers a conventional commit.

There is no `done/` task directory on purpose. Completed tasks are deleted; their record lives in `SESSION-LOG.md` and git history (if you want the memory system to be versioned). Less clutter, single source of truth.

---

## `systems/` — optional integrations (WIP)

The `systems/` directory is reserved for opt-in integrations that plug into the BIF memory. The idea: shipped, ready-to-use bundles for things like:

- **Obsidian** — a simple vault creator with memory capabilities around notes and tasks

Add one with `bif add <name>` (placeholder; first systems land soon).

Want to contribute one? See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Design principles

- **Zero dependencies, zero magic.** The CLI is plain Node ≥ 18, no transpiler, no runtime deps. Easy to audit, easy to fork.
- **Plain markdown.** The memory is just `.md` files. No databases, no proprietary formats. Git is the backing store.
- **Agent-agnostic by design.** Today only Claude Code is wired up. The `memory/` schema doesn't care which agent reads it.
- **Two commands, not twenty.** `/brief` and `/done` are the only ones the user runs manually. Everything else is automatic. Unless explicitly configured otherwise.
- **Stale-bug hygiene.** `/brief` re-checks open bugs against the codebase before reporting them, so the tracker can't lie to you.

---

## A note on `/init-bif`

Claude Code ships a built-in `/init` that also generates a `CLAUDE.md`. Rather than risk a collision (or relying on undocumented precedence rules between built-in and custom slash commands), BIF ships its bootstrapper as `/init-bif`. It is intentionally narrower than Claude's built-in: it only fills the placeholder sections of `CLAUDE.md` and never touches the `## Project Memory` contract.

---

## Roadmap

- [ ] First `systems/`: Obsidian vault preset.
- [ ] `bif update` to upgrade an installed memory layout in place.
- [ ] Agent adapters beyond Claude Code (Cursor, Windsurf, Aider, ...).
- [ ] Optional global config at `~/.bif/` for cross-project preferences.

---

## License

[MIT](./LICENSE) © contributors.
