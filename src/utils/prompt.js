import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function confirm(question, defaultValue = false) {
  if (!input.isTTY) return defaultValue;
  const rl = createInterface({ input, output });
  try {
    const suffix = defaultValue ? ' [Y/n] ' : ' [y/N] ';
    const answer = (await rl.question(question + suffix)).trim().toLowerCase();
    if (!answer) return defaultValue;
    return answer === 'y' || answer === 'yes';
  } finally {
    rl.close();
  }
}
