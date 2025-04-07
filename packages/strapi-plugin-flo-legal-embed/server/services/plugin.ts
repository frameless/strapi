import { Strapi } from '@strapi/strapi';
import { pluginConfig } from '../../admin/src/utils/pluginConfig';
import config from '../config';

export default ({ strapi }: { strapi: Strapi }) => ({
  getConfig() {
    const data = strapi.config.get(`plugin.${pluginConfig.pluginId}`, config.default);
    return data;
  },
});
