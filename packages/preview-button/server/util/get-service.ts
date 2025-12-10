import { PLUGIN_ID } from './pluginId';

export const getService = (name: string) => (strapi as any).plugin(PLUGIN_ID).service(name);
