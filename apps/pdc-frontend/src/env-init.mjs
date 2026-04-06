import { config } from 'dotenv';

import envrc from '../../../.envrc.json' with { type: 'json' };
import { initEnv, subsetConfig } from '../../../scripts/env-lib.mjs';

const variables = [
  'FLO_LEGAL_API_TOKEN',
  'FLO_LEGAL_API_URL',
  'FRONTEND_PUBLIC_URL',
  'KCM_SURVEY_API_KEY',
  'KCM_SURVEY_ID',
  'KCM_SURVEY_STYLESHEETS_LINK',
  'KCM_SURVEY_URL',
  'KCM_SURVEY_VERSION',
  'MATOMO_CONTAINER_ID',
  'MATOMO_HOST',
  'MATOMO_SITE_ID',
  'OGONE_PAYMENT_SERVICE_URL',
  'OPEN_FORMS_API_TOKEN',
  'OPEN_FORMS_API_URL',
  'OPEN_FORMS_CSS_URL',
  'OPEN_FORMS_SDK_URL',
  'PANDOSEARCH_API_URL',
  'PREVIEW_SECRET_TOKEN',
  'STRAPI_PRIVATE_URL',
  'STRAPI_PUBLIC_URL',
];

const init = () => {
  initEnv('./.env', subsetConfig(envrc, variables), config().parsed);
};

init();
