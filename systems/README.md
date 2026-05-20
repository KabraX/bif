# systems/

Optional, opt-in integrations that plug into the BIF memory layout.

A **system** is a folder of files installed on top of an existing BIF project via:

```bash
bif add <name>
```

The contents of `systems/<name>/` are copied into the user's project root, mirroring the layout. Existing files are protected by an interactive prompt unless `--force` is passed.

## Planned systems

- **`obsidian/`** — turn `memory/` into an Obsidian vault memory handler: `.obsidian/` config, recommended plugins, dataview queries for tasks and bugs, templates for new ADRs.

None of these are shipped yet. Contributions welcome — see [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the conventions.
