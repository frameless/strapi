import { Strapi } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig() {
    const data = strapi.config.get(`plugin.${pluginId}`);
    return data;
  },
});
