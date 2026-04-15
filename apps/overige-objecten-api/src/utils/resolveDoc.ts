import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const resolveDoc = (fileName: string) => {
  const candidates = [
    path.join(__dirname, './docs', fileName), // current folder (dist / server)
    path.join(__dirname, '../../docs', fileName), // dev / source
    path.join(__dirname, '../docs', fileName), // maybe tests folder
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }

  throw new Error(`Cannot find doc file: ${fileName}`);
};
