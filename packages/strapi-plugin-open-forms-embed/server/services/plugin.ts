import { Strapi } from '@strapi/strapi';
import config from '../config';
import { pluginId } from '../util';

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig() {
    const data = strapi.config.get(`plugin.${pluginId}`, config.default);
    return data;
  },
});
