const { config } = require('dotenv');
const { validateEnv } = require('./env-lib');
const { spec } = require('../.envrc.json');

const { parsed: env = {} } = config();

const allErrors = validateEnv(env, spec);

allErrors.forEach((msg) => process.stderr.write(`${msg}\n`));

if (allErrors.length > 0) {
  process.exit(1);
}
