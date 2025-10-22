const { str, port, makeValidator } = require('envalid');
const validator = require('validator');

/**
 * Escapes a string for use in a .env comment, properly handling multiline inputs.
 */
const commentEscape = (str) =>
  str
    .split('\n')
    .map((line) => `# ${line}`)
    .join('\n');

/**
 * Validates environment variable names to ensure they follow the required naming convention.
 * Allowed: Uppercase letters, digits, and underscores (must start with a letter).
 */
const validateEnvName = (name) => {
  const isValid = /^[A-Z0-9_]+$/.test(name);
  if (!isValid) {
    throw new Error(
      `Invalid environment variable name: "${name}". Names must be uppercase and contain only letters, numbers, and underscores.`,
    );
  }
};

const requiredValidator = ({ name, required, value }) => {
  if (required && (value === undefined || value === null)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
};

const base64Csv = makeValidator((base64CsvInput) => {
  const parts = base64CsvInput.split(',');
  const invalid = parts.find((val) => !validator.isBase64(val));
  if (invalid) {
    throw new Error(`Invalid base64 value in list: "${invalid}"`);
  }
  return base64CsvInput;
});

const base64 = makeValidator((base64Input) => {
  if (!validator.isBase64(base64Input)) {
    throw new Error('Expected a valid base64 string');
  }
  return base64Input;
});

/**
 * Checks if a value is a valid "set" value (string, number, or boolean).
 */
const isValue = (arg) =>
  typeof arg === 'number' || typeof arg === 'boolean' || (typeof arg === 'string' && arg.trim().length > 0);

const hostname = makeValidator((hostnameInput) => {
  const fakeURL = `scheme://${hostnameInput}/`;
  try {
    const parsed = new URL(fakeURL);
    if (parsed.hostname !== hostnameInput) {
      throw new Error(`Hostname "${hostnameInput}" is not normalized. Did you mean "${parsed.hostname}"?`);
    }
  } catch {
    throw new Error(`Invalid hostname: ${hostnameInput}`);
  }
  return hostnameInput;
});

const number = makeValidator((x) => {
  if (isNaN(Number(x))) throw new Error('Expected a number');
  return Number(x);
});

const currentPassword = makeValidator((passwordInput) => {
  if (typeof passwordInput !== 'string' || passwordInput.length === 0) {
    throw new Error('Password must not be empty');
  }
  return passwordInput;
});

const newPassword = makeValidator((passwordInput) => {
  if (typeof passwordInput !== 'string' || passwordInput.length < 20) {
    throw new Error('Password must be at least 20 characters');
  }
  return passwordInput;
});

/**
 * Formats an environment object and spec into a nicely structured .env file.
 */
const formatEnvFile = (env, spec) => {
  const known = spec
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name, required, secret, description, example, examples }) => {
      validateEnvName(name);
      requiredValidator({ name, required, value: env[name] });
      const value = env[name] || '';

      const comments = [
        description ? commentEscape(description) : '',
        required ? commentEscape('Required.') : '',
        secret ? commentEscape('Secret.') : '',
        example && !value ? commentEscape(`Example: ${example}`) : '',
        examples && !value ? commentEscape(`Examples: ${examples.join(', ')}`) : '',
      ]
        .filter(Boolean)
        .join('\n');

      return `${comments ? `${comments}\n` : ''}${name}=${value}\n`;
    })
    .join('\n');

  const unknownVariables = Object.entries(env).filter(
    ([name]) => !spec.some(({ name: specName }) => specName === name),
  );

  const unknown = unknownVariables.length
    ? `\n# Unknown environment variables:\n${unknownVariables.map(([name, value]) => `${name}=${value}`).join('\n')}\n`
    : '';

  return `${known}${unknown}`;
};

const urlValidator = makeValidator((urlInput) => {
  if (urlInput === '') return '';

  // Must be a non-empty string
  if (typeof urlInput !== 'string' || urlInput.trim().length === 0) {
    throw new Error('Expected a non-empty string for URL');
  }

  const urlToValidate =
    urlInput.startsWith('http://') || urlInput.startsWith('https://') ? urlInput : `http://${urlInput}`;

  if (
    !validator.isURL(urlToValidate, {
      protocols: ['http', 'https'],
      require_protocol: true,
      require_host: true,
      host_whitelist: [
        'localhost',
        'example.com',
        'pdc_frontend',
        'pdc_strapi',
        'vth_frontend',
        'vth_strapi',
        'public.pandosearch.com',
        'flolegal.com',
        'viewer.kcmg.nl',
        'utrecht.nl',
        'www.utrecht.nl',
      ],
    })
  ) {
    throw new Error(`Invalid URL: ${urlInput}`);
  }

  return urlInput;
});

const validatorMap = {
  string: str,
  url: urlValidator,
  number,
  'port-number': port,
  base64,
  'base64-csv': base64Csv,
  'current-password': currentPassword,
  hostname,
  'new-password': newPassword,
};

/**
 * @typedef {Object} EnvVariableSpec
 * @property {string} name - The name of the environment variable.
 * @property {string} [valueType='string'] - The type of the variable (e.g., 'string', 'url').
 * @property {boolean} [required=false] - Whether the variable is required.
 * @property {string} [developmentDefault] - Default value for development.
 * @property {string} [description] - Description of the variable.
 */

/**
 * Creates a schema from the given specification.
 * @param {EnvVariableSpec[]} spec - The specification for environment variables.
 * @returns {Object} The schema object.
 */
const createSchemaFromSpec = (spec) => {
  if (!Array.isArray(spec)) {
    throw new Error('Specification must be an array');
  }

  return spec.reduce((acc, variable) => {
    const { name, valueType = 'string', developmentDefault, description } = variable;
    validateEnvName(name);

    const validatorFn = validatorMap[valueType];
    if (typeof validatorFn !== 'function') {
      throw new Error(`Unsupported valueType "${valueType}" for ${name}`);
    }

    const validatorOptions = {
      desc: description,
      ...(developmentDefault ? { devDefault: developmentDefault } : {}),
    };

    acc[name] = validatorFn(validatorOptions);

    return acc;
  }, {});
};

// eslint-disable-next-line no-undef
module.exports = { formatEnvFile, validatorMap, isValue, validateEnvName, requiredValidator, createSchemaFromSpec };
