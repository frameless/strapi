import type { Context } from 'koa';
import { pluginConfig } from '../../admin/src/utils/pluginConfig';
import { getService } from '../util';

export default {
  async config(ctx: Context) {
    try {
      const config = await getService('plugin').getConfig();

      if (!config?.api_url || !config?.token) {
        ctx.body = { config };
        return;
      }

      const response = await fetch(`${config.api_url}/block-publications?type=CHECK`, {
        headers: {
          'x-api-key': config.token,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const checks = await response.json();
      ctx.body = { config, checks };
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
      ctx.badRequest(`Failed to load ${pluginConfig.pluginId} config: ${error.message}`);
    }
  },
};
