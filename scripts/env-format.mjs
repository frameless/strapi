import { writeFile, readFile } from 'node:fs/promises';
import { config } from 'dotenv';

import { formatEnvFile } from './env-lib.mjs';

const fileUrl = new URL('../.envrc.json', import.meta.url);
const envrc = JSON.parse(await readFile(fileUrl, 'utf8'));
const init = async () => {
  const { parsed: env = {} } = config();

  await writeFile('./.env', formatEnvFile(env, envrc.spec));
};

init();
