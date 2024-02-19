import { getService } from '../util';

export default {
  async config(ctx) {
    try {
      const config = await getService('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      ctx.badRequest('Something went wrong with the open-forms-embed config');
    }
  },
};
