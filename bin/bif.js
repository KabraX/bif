#!/usr/bin/env node
import { run } from '../src/cli.js';

run(process.argv.slice(2)).catch((err) => {
  process.stderr.write(`bif: ${err.message}\n`);
  process.exit(1);
});
