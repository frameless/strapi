import { Strapi } from '@strapi/strapi';
import { pluginId } from '../util/plugin-id';

export const register = ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: pluginId,
    plugin: pluginId,
    type: 'string',
  });
};
