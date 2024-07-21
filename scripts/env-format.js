const { config } = require('dotenv');
const { writeFile } = require('node:fs/promises');
const { formatEnvFile } = require('./env-lib');
const { spec } = require('../.envrc.json');

const init = async () => {
  const { parsed: env = {} } = config();

  await writeFile('./.env', formatEnvFile(env, spec));
};

init();
