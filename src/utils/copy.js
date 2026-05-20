import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { confirm } from './prompt.js';
import { c } from './colors.js';

/**
 * Recursively copy `src` directory into `dest`.
 *
 * @param {string} src                 source directory (must exist)
 * @param {string} dest                destination directory (created if missing)
 * @param {object} opts
 * @param {boolean} [opts.force]       overwrite without asking
 * @param {boolean} [opts.yes]         answer yes to overwrite prompts
 * @param {boolean} [opts.dryRun]      do not write to disk
 * @param {(rel: string, action: 'create'|'overwrite'|'skip') => void} [opts.onFile]
 *                                     called for every file processed
 * @param {string} [opts.relRoot]      root used to compute relative paths in messages
 */
export async function copyDir(src, dest, opts = {}) {
  const relRoot = opts.relRoot ?? dest;
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const from = join(src, entry.name);
    const to = join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!opts.dryRun) await mkdir(to, { recursive: true });
      await copyDir(from, to, opts);
      continue;
    }

    if (!entry.isFile()) continue;

    const exists = existsSync(to);
    const rel = relative(relRoot, to) || entry.name;

    if (exists) {
      const overwrite = await shouldOverwrite(rel, opts);
      if (!overwrite) {
        opts.onFile?.(rel, 'skip');
        continue;
      }
      opts.onFile?.(rel, 'overwrite');
    } else {
      opts.onFile?.(rel, 'create');
    }

    if (!opts.dryRun) {
      await mkdir(dirnameOf(to), { recursive: true });
      await copyFile(from, to);
    }
  }
}

async function shouldOverwrite(rel, opts) {
  if (opts.force) return true;
  if (opts.yes) return false; // --yes accepts the safe default (no overwrite)
  if (opts.dryRun) return false;
  return confirm(`${c.yellow('?')} ${rel} already exists. Overwrite?`, false);
}

function dirnameOf(p) {
  const i = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
  return i === -1 ? '.' : p.slice(0, i);
}

export async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}
