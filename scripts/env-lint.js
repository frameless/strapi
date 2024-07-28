const { config } = require('dotenv');
const { validateEnv } = require('./env-lib');
const { spec } = require('../.envrc.json');

const CI = process.env['CI'] === 'true';

const { parsed: env = {} } = config();

if (CI) {
  if (Object.keys(env).length > 0) {
    process.stderr.write('In CI the .env file must not be present.\n');
    process.exit(1);
  } else {
    process.exit(0);
  }
}

const allErrors = validateEnv(env, spec);

allErrors.forEach((msg) => process.stderr.write(`${msg}\n`));

if (allErrors.length > 0) {
  process.exit(1);
}
