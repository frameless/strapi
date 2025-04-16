import { pluginConfig } from '../../admin/src/utils/pluginConfig';

// eslint-disable-next-line no-undef
export const getService = (name: string) => strapi.plugin(pluginConfig.pluginId).service(name);
