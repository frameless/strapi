const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

const commentEscape = (str) => `# ${str.replace(/\n/g, '')}`;

const formatEnvFile = (env, spec) => {
  const known = [...spec]
    .sort((a, b) => stringSort(a.name, b.name))
    .map(({ name, required, secret, description, example, examples }) => {
      const value = env[name];
      return `${description ? `${commentEscape(description)}\n` : ''}${
        required ? `${commentEscape('Required.')}\n` : ''
      }${secret ? `${commentEscape('Secret.')}\n` : ''}${
        example && !value ? `${commentEscape(`Example: ${example}`)}\n` : ''
      }${examples && !value ? `${commentEscape(`Examples: ${examples.join(', ')}`)}\n` : ''}${name}=${value || ''}\n`;
    })
    .join('\n');

  const unknownVariables = Object.entries(env).filter(([name]) => !spec.find((spec) => spec.name === name));

  const unknown =
    unknownVariables.length > 0
      ? `\n# Unknown environment variables:\n${unknownVariables
          .map(([name, value]) => `${name}=${value}`)
          .join('\n')}\n`
      : '';

  return `${known}${unknown}`;
};

const isValue = (arg) => typeof arg === 'number' || typeof arg === 'boolean' || (typeof arg === 'string' && !!arg);

const validateEnv = (env, spec) => {
  const nameErrors = Object.keys(env)
    .filter((name) => !/^[A-Z][A-Z0-9_]*$/.test(name))
    .map((name) => {
      return `Invalid environment variable name: ${name}.`;
    });

  const unknownErrors = Object.keys(env)
    .filter((name) => !spec.find((spec) => spec.name === name))
    .map((name) => {
      return `Unknown environment variable: ${name}.`;
    });

  const requiredErrors = [...spec]
    .sort((a, b) => stringSort(a.name, b.name))
    .filter(({ name, required }) => required && !isValue(env[name]))
    .map(({ name, description }) => {
      return `Missing required environment variable: ${name}.${description ? ` (${description})` : ''}`;
    });

  const validationErrors = [...spec]
    .sort((a, b) => stringSort(a.name, b.name))
    .filter(({ valueType }) => valueType)
    .filter(({ name }) => isValue(env[name]))
    .map(({ name, valueType }) => {
      const value = env[name];
      if (valueType === 'number') {
        //
      } else if (valueType === 'hostname') {
        const url = `example://${value}/`;
        if (!URL.canParse(url)) {
          return `Invalid value for: ${name}. Cannot parse hostname`;
        }
        const parsedURL = new URL(url);
        if (parsedURL.hostname !== value) {
          return `Invalid value for: ${name}. Use a normalized hostname: ${parsedURL.hostname}`;
        }
      } else if (valueType === 'url') {
        if (!URL.canParse(value)) {
          return `Invalid value for: ${name}. Cannot parse URL`;
        }
      } else if (valueType === 'base64') {
        try {
          atob(value);
        } catch (e) {
          return `Invalid base64 value for ${name}.`;
        }
      } else if (valueType === 'base64-csv') {
        try {
          value.split(',').map((value) => atob(value));
        } catch (e) {
          return `Invalid comma separated base64 value for ${name}.`;
        }
      } else if (valueType === 'port-number') {
        if (!/^[0-9]+$/.test(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 65535) {
          return `Invalid port number value for ${name}.`;
        }
      } else if (valueType === 'current-password') {
        if (typeof value === 'string' && value.length === 0) {
          return `Password for ${name} not be empty.`;
        }
      } else if (valueType === 'new-password') {
        if (typeof value !== 'string' || value.length < 20) {
          return `Password for ${name} must have at least 20 characters.`;
        }
      } else {
        return `Unknown value type: ${valueType}. Validation was skipped for: ${name}.`;
      }
    });

  const allErrors = [...nameErrors, ...unknownErrors, ...requiredErrors, ...validationErrors].filter(Boolean);

  return allErrors;
};

module.exports = { stringSort, isValue, validateEnv, formatEnvFile };
