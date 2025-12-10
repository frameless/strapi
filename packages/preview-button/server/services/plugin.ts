import type { Strapi } from '@strapi/strapi';
import config from '../config';
import { PLUGIN_ID } from '../util';

 const plugin = ({ strapi }: {strapi: Strapi}) => ({
  async getConfig() {
    const data = await strapi.config.get(`plugin.${PLUGIN_ID}`, config.default);
    return data;
  },
});
export default plugin;