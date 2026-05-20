# Contributing to BIF

Thanks for your interest. BIF is intentionally tiny; contributions should keep it that way.

## Ground rules

- **Zero runtime dependencies.** The CLI must keep working with only Node ≥ 18 built-ins. Dev-only tooling is fine if it stays out of `dependencies`.
- **Plain markdown for memory artifacts.** Everything in `template/` and the user-facing `memory/` is markdown. No JSON/YAML state files, no databases.
- **Two user-facing commands.** `/brief` and `/done` are the only commands the user runs by hand on every session. Resist adding more.
- **Don't break the contract.** The `## Project Memory` section in `template/.claude/CLAUDE.md` is the public schema. Changing it is a breaking change.

## Repo layout

```text
bin/         CLI entry
src/         CLI source (ESM, Node ≥ 18)
template/    What `bif init` copies into a user's project
systems/     Optional integrations installed via `bif add <name>`
```

## Local development

```bash
node bin/bif.js help
node bin/bif.js init --target /tmp/bif-test --dry-run
```

To test the CLI against a real install:

```bash
node bin/bif.js init --target /tmp/bif-sandbox
```

## Adding a system

A "system" is an opt-in bundle of files that plugs into the BIF memory layout (Obsidian config, VS Code workspace, dashboards, ...). To add one:

1. Create `systems/<name>/` with the files you want copied into the user's project.
2. Mirror the user's expected directory layout exactly — `bif add <name>` does a recursive copy with prompts.
3. Add a short `systems/<name>/README.md` explaining what it does and any prerequisites.
4. Document the system in the main `README.md` under the `systems/` section.

## Pull requests

- One feature / fix per PR.
- Update `README.md` if you change user-visible behavior.
- Add or update tests under `test/` when changing CLI logic.
- Use Conventional Commits (`feat/`, `fix/`, `docs/`, `refactor/`, `chore/`).

## Code of conduct

Be excellent to each other.
