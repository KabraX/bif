import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Project root of the bif package (one level up from src/utils → src → root).
export const packageRoot = resolve(__dirname, '..', '..');
export const templateRoot = join(packageRoot, 'template');
export const systemsRoot = join(packageRoot, 'systems');
