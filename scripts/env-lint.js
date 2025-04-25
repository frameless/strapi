const { cleanEnv } = require('envalid');
const fs = require('fs');
const path = require('path');
const { createSchemaFromSpec } = require('./env-lib');
require('dotenv').config();

// Skip validation if running in CI/CD environment
if (process.env.CI === 'true') {
  process.stderr.write('In CI the .env file must not be present.\n');
  process.exit(0);
}

// eslint-disable-next-line no-undef
const { spec } = JSON.parse(fs.readFileSync(path.join(__dirname, '../.envrc.json'), 'utf-8'));

const schema = createSchemaFromSpec(spec);

cleanEnv(process.env, schema);
