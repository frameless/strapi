import { Strapi } from '@strapi/strapi';
import pluginId from '../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'strapi-uuid-field',
    plugin: pluginId,
    type: 'uid',
  });
};
