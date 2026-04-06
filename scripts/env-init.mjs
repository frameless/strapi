import { config } from 'dotenv';
import envrc from '../.envrc.json' with { type: 'json' };
import { initEnv } from './env-lib.mjs';

const init = () => {
  initEnv('./.env', envrc, config());
};

init();
