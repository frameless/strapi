export interface Config {
  api_url: string;
  token: string;
}

export default {
  default: {},
  validator: (config: Config) => {
    if (!config) {
      return;
    }
    if (!config?.api_url) {
      // eslint-disable-next-line no-console
      console.warn('strapi-plugin-flo-legal-embed: Warning: Missing api_url prop.');
    }
    if (!config?.token) {
      // eslint-disable-next-line no-console
      console.warn('strapi-plugin-flo-legal-embed: Warning: Missing token prop.');
    }
  },
};
