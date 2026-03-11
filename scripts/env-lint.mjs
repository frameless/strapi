import fs from 'node:fs';
import path from 'node:path';
import { cleanEnv } from 'envalid';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createSchemaFromSpec } from './env-lib.mjs';

const result = config();

if (result.error) {
  throw result.error;
}

// Skip validation if running in CI/CD environment
if (process.env.CI === 'true') {
  process.stderr.write('In CI the .env file must not be present.\n');
  process.exit(0);
}

const { spec } = JSON.parse(fs.readFileSync(path.join(__dirname, '../.envrc.json'), 'utf-8'));

const schema = createSchemaFromSpec(spec);

cleanEnv(process.env, schema);
