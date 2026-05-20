# /brief — Start of session briefing

Read the project memory and give me a concise briefing so I can resume work.

## Steps

1. **Task board** — List files in `memory/tasks/in-progress/` and `memory/tasks/todo/`. Read each `.md` file to get the title and priority. Show in-progress first, then todo sorted by priority.
2. **Last session** — Read `memory/SESSION-LOG.md`, find the last entry, summarize what was done and what was left pending.
3. **Git state** — Run `git log --oneline -5` and `git status`.
4. **Open bugs** — Read `memory/BUGS.md`, list any bugs with status `open`. For each open bug, check the referenced file in the codebase to verify if it's actually still present or has already been fixed. If fixed, silently update BUGS.md.
5. **Recent decisions** — Check if there are any `memory/decisions/` files from the last 7 days.
6. **Branches** — Run `git branch --sort=committerdate` and list all local branches ordered by oldest activity first (most stale first). Skip the current branch from the list.

## Output format

```
## Session Briefing — {date}

### Task Board
🔨 In Progress: {task name} (priority)
📋 Todo: {task name} (priority)
📋 Todo: {task name} (priority)

**Last session:** {date} — {summary}
**Open bugs:** {count} ({brief list with file references})
**Git:** {branch} · {uncommitted changes summary} · last commit: {hash} {msg}
**Branches (oldest activity first):** {branch1}, {branch2}, ...
```

Keep it short. I want to read this in 15 seconds and know where I am.
