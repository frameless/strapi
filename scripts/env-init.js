const { randomBytes } = require('crypto');
const { config } = require('dotenv');
const { writeFile } = require('node:fs/promises');
const { formatEnvFile, isValue } = require('./env-lib');
const { spec } = require('../.envrc.json');

const createBase64Secret = () => randomBytes(48).toString('base64');

const init = async () => {
  const { parsed: env = {} } = config();

  const defaults = Object.fromEntries(
    spec
      .filter(({ required, developmentDefault }) => required || isValue(developmentDefault))
      .filter(({ name }) => !isValue(env[name]))
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

  await writeFile(
    './.env',
    formatEnvFile(
      {
        ...env,
        ...defaults,
      },
      spec,
    ),
  );
};

init();
