# /done — Close session, commit, and push

Wrap up the current work session. This is the last thing I run before stepping away.

## Steps

### 1. Close tasks

Check `memory/tasks/in-progress/` for the task(s) worked on this session:

- If the task is **fully complete** → delete the file from `in-progress/`. The record lives in SESSION-LOG.md and git history.
- If the task is **partially done** → keep it in `in-progress/`, update its contents with what's left.

### 2. Update session log

Append a new entry to `memory/SESSION-LOG.md` with:

- Date and time
- Summary of what was done (read `git diff --stat` and recent conversation)
- Tasks completed (removed from in-progress)
- What's left pending (if anything)

### 3. Update bugs

If any bugs in `memory/BUGS.md` were fixed during this session, mark them as `fixed` with the date and the commit that fixed them.

### 4. Pre-push checks

Run these in order. Stop and report if any fail:

- Run the project's build / typecheck / lint command(s) as documented under **Developer commands** in `CLAUDE.md`. Must complete without errors.
- If any check is missing or undefined in `CLAUDE.md`, skip it silently — do not invent commands.

### 5. Commit

- Stage all relevant changes: `git add -A`
- Show me the list of staged files
- Suggest a commit message following conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- Ask for my approval before committing
- After I approve, run `git commit` and `git push`

### 6. Summary

Print a one-liner: what was shipped, which branch, how many files changed.
