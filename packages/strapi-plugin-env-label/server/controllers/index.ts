import { pluginId } from '../../admin/src/pluginId';

// eslint-disable-next-line no-undef
const getService = (name: string) => strapi.plugin(pluginId).service(name);
export default {
  'env-label': {
    async config(ctx: any) {
      try {
        const config = await getService('plugin').getConfig();
        ctx.body = config;
      } catch (error) {
        ctx.badRequest(`Something went wrong with the ${pluginId} config`);
      }
    },
  },
};
