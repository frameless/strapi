import { Strapi } from '@strapi/strapi';
import plugin from '../admin/src/pluginId';

export const register = ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'language',
    plugin,
    type: 'string',
  });
};
