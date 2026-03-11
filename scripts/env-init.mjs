/* eslint-disable no-undef */
import { randomBytes } from 'crypto';
import { writeFile, unlink, readFile } from 'node:fs/promises';
import fs from 'node:fs';
import { config } from 'dotenv';

import { formatEnvFile, isValue, validateEnvName } from './env-lib.mjs';

const fileUrl = new URL('../.envrc.json', import.meta.url);
const envrc = JSON.parse(await readFile(fileUrl, 'utf8'));
const createBase64Secret = () => randomBytes(48).toString('base64');
const init = async () => {
  const { parsed: env = {} } = config();
  const filePath = './.env';
  const defaults = Object.fromEntries(
    envrc.spec
      .filter(({ required, developmentDefault }) => required || isValue(developmentDefault))
      .filter(({ name }) => {
        validateEnvName(name);
        return !env[name];
      })
      .map(({ name, secret, valueType, developmentDefault }) => {
        let value;
        if (developmentDefault) {
          value = developmentDefault;
        } else if (secret && (valueType === 'base64' || valueType === 'new-password')) {
          value = createBase64Secret();
        }
        return [name, value];
      })
      .filter(([, value]) => isValue(value)),
  );
  const content = formatEnvFile({ ...env, ...defaults }, envrc.spec);

  try {
    // Check if file exists before trying to delete
    if (fs.existsSync(filePath)) {
      try {
        await unlink(filePath);
        console.log(`🗑️ Removed existing ${filePath}`);
      } catch (err) {
        console.warn(`⚠️ Could not remove existing ${filePath}:`, err.message);
      }
    }

    await writeFile(filePath, content, { encoding: 'utf8' });
    console.log(`✅ Created new ${filePath} with fresh values.`);
  } catch (err) {
    console.error('❌ Failed to write .env file:', err);
  }
};

init();
