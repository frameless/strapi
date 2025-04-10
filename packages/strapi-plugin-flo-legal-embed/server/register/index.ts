import { Strapi } from '@strapi/strapi';
import { pluginConfig } from '../../admin/src/utils/pluginConfig';

export const register = ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: pluginConfig.pluginId,
    plugin: pluginConfig.pluginId,
    type: 'string',
  });
};
