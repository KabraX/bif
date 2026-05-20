import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { copyDir } from '../utils/copy.js';
import { templateRoot } from '../utils/paths.js';
import { c } from '../utils/colors.js';

export async function init(opts) {
  const target = resolve(opts.target ?? process.cwd());

  if (!existsSync(templateRoot)) {
    throw new Error(`template directory not found at ${templateRoot}`);
  }

  process.stdout.write(
    `${c.bold('bif init')} → ${c.cyan(target)}${opts.dryRun ? c.dim(' (dry run)') : ''}\n\n`,
  );

  const stats = { create: 0, overwrite: 0, skip: 0 };

  await copyDir(templateRoot, target, {
    ...opts,
    relRoot: target,
    onFile: (rel, action) => {
      stats[action]++;
      const tag =
        action === 'create'
          ? c.green('+ create   ')
          : action === 'overwrite'
            ? c.yellow('~ overwrite')
            : c.gray('· skip     ');
      process.stdout.write(`  ${tag} ${rel}\n`);
    },
  });

  process.stdout.write(
    `\n${c.bold('Done.')} ${stats.create} created, ${stats.overwrite} overwritten, ${stats.skip} skipped.\n`,
  );

  if (!opts.dryRun) {
    process.stdout.write(
      `\n${c.bold('Next steps')}\n` +
        `  1. Open the project in Claude Code.\n` +
        `  2. Run ${c.cyan('/init-bif')} to fill ${c.cyan('.claude/CLAUDE.md')} with your project context.\n` +
        `  3. Use ${c.cyan('/brief')} at the start of each session and ${c.cyan('/done')} at the end.\n`,
    );
  }
}
