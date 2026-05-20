import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { copyDir } from '../utils/copy.js';
import { systemsRoot } from '../utils/paths.js';
import { c } from '../utils/colors.js';

export async function add(opts) {
  const [name] = opts._;
  const target = resolve(opts.target ?? process.cwd());

  if (!existsSync(systemsRoot)) {
    throw new Error(`systems directory not found at ${systemsRoot}`);
  }

  if (!name) {
    const available = await listSystems();
    if (available.length === 0) {
      process.stdout.write(
        `${c.dim('No systems available yet.')}\n` +
          `${c.dim('Systems are optional integrations (e.g. Obsidian) that plug into the BIF memory.')}\n`,
      );
      return;
    }
    process.stdout.write(`${c.bold('Available systems')}\n`);
    for (const s of available) process.stdout.write(`  - ${s}\n`);
    process.stdout.write(`\nUsage: ${c.cyan('bif add <name>')}\n`);
    return;
  }

  const src = join(systemsRoot, name);
  if (!existsSync(src)) {
    throw new Error(`system "${name}" not found in ${systemsRoot}`);
  }

  process.stdout.write(
    `${c.bold(`bif add ${name}`)} → ${c.cyan(target)}${opts.dryRun ? c.dim(' (dry run)') : ''}\n\n`,
  );

  await copyDir(src, target, {
    ...opts,
    relRoot: target,
    onFile: (rel, action) => {
      const tag =
        action === 'create'
          ? c.green('+ create   ')
          : action === 'overwrite'
            ? c.yellow('~ overwrite')
            : c.gray('· skip     ');
      process.stdout.write(`  ${tag} ${rel}\n`);
    },
  });

  process.stdout.write(`\n${c.bold('Done.')}\n`);
}

async function listSystems() {
  try {
    const entries = await readdir(systemsRoot, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}
