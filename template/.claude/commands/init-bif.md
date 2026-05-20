# /init-bif — Bootstrap CLAUDE.md from this project

Fill in the placeholders in `CLAUDE.md` by combining what you can discover from the codebase with targeted questions to me. Do **not** modify the `## Project Memory` section — it is the contract for the BIF memory system and stays as-is.

## Goal

Turn the placeholder skeleton into a precise, useful CLAUDE.md that future sessions of Claude Code can rely on. Be concrete; avoid filler.

## Placeholders to resolve

| Placeholder | Section | Source |
| --- | --- | --- |
| `[PROJECT_NAME]` | `## Project` | package.json / pyproject / ask |
| `[PROJECT_DESCRIPTION]` | `## Project` | README + ask (1-2 sentences) |
| `[DEV_COMMANDS]` | `## Developer commands` | package.json scripts, Makefile, etc. |
| `[STACK]` | `## Stack` | manifests + lockfiles |
| `[ARCHITECTURE_OVERVIEW]` | `## Architecture` | folder layout + ask |
| `[DATA_FLOW]` | `### Data flow` | ask + code reading |
| `[FILE_LAYOUT]` | `### File layout` | top-level dirs |
| `[GOTCHAS]` | `## Gotchas` | ask (non-obvious traps) |
| `[CONVENTIONS]` | `## Conventions` | linter config + ask |

## Steps

### 1. Explore (no questions yet)

Read in this order, only what exists:

- Manifests: `package.json`, `pnpm-lock.yaml`, `pyproject.toml`, `requirements.txt`, `Cargo.toml`, `go.mod`, `Gemfile`, `composer.json`, `pom.xml`, `build.gradle`.
- `README.md`, `README.*`, top-level `*.md`.
- `Makefile`, `justfile`, `Taskfile.yml`, `scripts/` directory.
- Top-level directory listing (one level deep).
- Linter / formatter configs: `.eslintrc*`, `.prettierrc*`, `tsconfig.json`, `ruff.toml`, `.editorconfig`.

From this alone, draft your best guess for: project name, stack, dev commands, file layout.

### 2. Ask only what you cannot infer

Group questions into **one** message. Keep them short. Cover only the gaps:

1. One-line project description (and a 2-3 sentence elaboration).
2. Architecture overview: what are the main modules and how do they relate?
3. Data flow: trace a typical request / job / event end-to-end in 3-5 bullets.
4. Gotchas: any non-obvious traps that broke you in the past? (env vars, native builds, ordering, race conditions, platform-specific quirks).
5. Conventions not captured by linters: naming, commit style, branching, testing rules, anything you enforce by review.

If a question is already clearly answered by the files you read, skip it.

### 3. Write CLAUDE.md

- Replace every `[PLACEHOLDER]` token. Leave no placeholders behind.
- For `## Developer commands`, use a fenced shell block with one command per line and a trailing comment explaining each. Only list commands that actually exist in the project.
- Keep each section tight. If a section has nothing real to say, write `_None._` rather than padding.
- **Do not edit** the `## Project Memory` section or anything below it.

### 4. Verify

After writing:

- Re-read CLAUDE.md and confirm no `[PLACEHOLDER]` token remains.
- Confirm every command listed under `## Developer commands` corresponds to a real script / target in the project.
- Print a one-line summary: what was filled in, and which questions (if any) are still open.

### 5. Stop

Do not commit. Do not run `/done`. Hand control back to me so I can review.
