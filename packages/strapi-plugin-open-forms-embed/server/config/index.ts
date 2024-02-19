import { errors } from '@strapi/utils';

const { ValidationError } = errors;
export type Config = {
  api_url: string;
  token: string;
};

export default {
  default: {},
  validator: (config: Config) => {
    if (!config) {
      return;
    }
    if (!config?.api_url) {
      throw new ValidationError('Missing api_url prop.');
    }
    if (!config?.token) {
      throw new ValidationError('Missing token prop.');
    }
  },
};
