# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project: [PROJECT_NAME]

[PROJECT_DESCRIPTION]

## Developer commands

[DEV_COMMANDS]

## Stack

[STACK]

## Architecture

[ARCHITECTURE_OVERVIEW]

### Data flow

[DATA_FLOW]

### File layout

[FILE_LAYOUT]

## Gotchas

[GOTCHAS]

## Conventions

[CONVENTIONS]

## Project Memory (`memory/`)

The `memory/` directory is the persistent memory of this project. It survives between sessions and is the single source of truth for what was done, what's pending, and why decisions were made. If any of the next files don't exist, create them.

### Structure

| Path                        | Purpose                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| `memory/tasks/todo/`        | Task backlog. One `.md` file per task with frontmatter (`date`, `priority`).   |
| `memory/tasks/in-progress/` | Active work. Max 1-2 tasks at a time.                                          |
| `memory/SESSION-LOG.md`     | Reverse-chronological log of work sessions. Updated by `/done`.                |
| `memory/BUGS.md`            | Centralized bug tracker with status (`open` / `fixed`) and file references.    |
| `memory/decisions/`         | Architecture Decision Records (ADRs). One file per decision, prefixed by date. |
| `memory/*.md`               | Topic docs: deployment guides, integration notes, audit findings, etc.         |

### Task board (`memory/tasks/`)

Tasks are `.md` files that move between two directories:

- **`todo/`** — Backlog. Each file has a `priority` in frontmatter (`high`, `medium`, `low`).
- **`in-progress/`** — Currently being worked on. Claude moves files here when work starts.

There is no `done/` directory. When a task is complete, `/done` deletes the file. The record survives in `SESSION-LOG.md` and git history.

**Automatic task movement:**

- When the user says "work on X" or starts a task, move the matching file from `todo/` to `in-progress/`.
- When `/done` runs, complete tasks are deleted from `in-progress/`. Partial tasks stay with updated contents.
- New tasks can be created directly in `todo/` when identified during work.

### Automatic behaviors (always active)

#### Bug tracking

When you encounter or fix a bug during work:

1. Check `memory/BUGS.md` to see if it's already tracked.
2. If new → append it under `## Open` with: ID (increment from last), severity, WCAG criterion (if applicable), **source file path**, description, and today's date.
3. If fixing an existing bug → move it from `## Open` to `## Fixed`, add the fix date and commit ref.
4. **Bugs can go stale.** Before reporting a bug as open (e.g. during `/brief`), always check the referenced source file in the codebase to verify the bug still exists. If the code has already been fixed, silently mark it as `fixed`.

#### Decision logging

When you make a non-trivial technical decision (choosing between alternatives, adopting a workaround, changing architecture):

1. Create `memory/decisions/YYYY-MM-DD-slug.md` with frontmatter (`date`, `tags`, `status: accepted`).
2. Include: Context, Options considered, Decision, Consequences, Files changed.
3. Keep it concise — 20-40 lines max.

Do NOT create decision records for routine coding choices (naming, formatting, simple refactors).

### Session commands

| Command  | When             | What it does                                                               |
| -------- | ---------------- | -------------------------------------------------------------------------- |
| `/brief` | Start of session | Reads session log, git status, open bugs — gives a 15-second briefing      |
| `/done`  | End of session   | Updates session log, marks fixed bugs, runs build, suggests commit, pushes |

These are the only two commands the user runs manually. Everything else is automatic.
