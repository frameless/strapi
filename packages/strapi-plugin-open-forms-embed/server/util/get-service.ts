import { pluginId } from './plugin-id';

// eslint-disable-next-line no-undef
export const getService = (name: string) => strapi.plugin(pluginId).service(name);
