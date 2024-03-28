// import { errors } from '@strapi/utils';

// const { ValidationError } = errors;
export type Config = {
  api_url: string;
  token: string;
};

export default {
  default: {},
  // TODO Activate this validation once Gemeente Utrecht is prepared to enable openForms in the production environment.
  // validator: (config: Config) => {
  //   if (!config) {
  //     return;
  //   }
  //   if (!config?.api_url) {
  //     throw new ValidationError('Missing api_url prop.');
  //   }
  //   if (!config?.token) {
  //     throw new ValidationError('Missing token prop.');
  //   }
  // },
};
