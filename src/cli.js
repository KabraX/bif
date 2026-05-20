import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { c } from './utils/colors.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const HELP = `${c.bold('bif')} — Before I Forget · persistent memory for AI coding agents

${c.bold('Usage')}
  bif <command> [options]

${c.bold('Commands')}
  init                Install the BIF memory system into the current project
  add <system>        Install an optional system from systems/ (placeholder)
  help                Show this help
  version             Show the installed version

${c.bold('Options for `init`')}
  --force             Overwrite existing files without prompting
  --yes, -y           Answer yes to all prompts (skip overwrite confirmation)
  --dry-run           Print what would be written without touching the disk
  --target <dir>      Target directory (defaults to current working directory)

${c.bold('Examples')}
  npx bif-cli init
  npx bif-cli init --target ./my-project
  npx bif-cli init --dry-run
`;

export async function run(argv) {
  const [cmd, ...rest] = argv;

  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
    process.stdout.write(HELP);
    return;
  }

  if (cmd === 'version' || cmd === '--version' || cmd === '-v') {
    process.stdout.write(`${pkg.version}\n`);
    return;
  }

  const opts = parseFlags(rest);

  switch (cmd) {
    case 'init':
      return init(opts);
    case 'add':
      return add(opts);
    default:
      process.stderr.write(`bif: unknown command "${cmd}"\n\n${HELP}`);
      process.exit(1);
  }
}

function parseFlags(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') opts.force = true;
    else if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--target') opts.target = argv[++i];
    else if (a.startsWith('--target=')) opts.target = a.slice('--target='.length);
    else opts._.push(a);
  }
  return opts;
}
