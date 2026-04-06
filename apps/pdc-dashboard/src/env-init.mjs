import { config } from 'dotenv';

import envrc from '../../../.envrc.json' with { type: 'json' };
import { initEnv, subsetConfig } from '../../../scripts/env-lib.mjs';

const variables = [
  'ADMIN_JWT_SECRET',
  'API_TOKEN_SALT',
  'APP_KEYS',
  'FLO_LEGAL_API_TOKEN',
  'FLO_LEGAL_API_URL',
  'FRONTEND_PUBLIC_URL',
  'HOST',
  'JWT_SECRET',
  'NODE_ENV',
  'OPEN_FORMS_API_TOKEN',
  'OPEN_FORMS_API_URL',
  'PGADMIN_DEFAULT_EMAIL',
  'PGADMIN_DEFAULT_PASSWORD',
  'PORT',
  'PREVIEW_SECRET_TOKEN',
  'STRAPI_ENV_LABEL',
  'STRAPI_PRIVATE_URL',
  'STRAPI_PUBLIC_URL',
  'TRANSFER_TOKEN_SALT',
];

const init = () => {
  initEnv('./.env', subsetConfig(envrc, variables), config().parsed);
};

init();
