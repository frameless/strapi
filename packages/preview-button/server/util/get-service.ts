import { Strapi } from '@strapi/strapi';
import { pluginId } from './plugin-id';

// eslint-disable-next-line no-undef
export const getService = (name: string) => (strapi as Strapi).plugin(pluginId).service(name);
