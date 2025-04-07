import { pluginConfig } from '../../admin/src/utils/pluginConfig';
export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: `${pluginConfig.pluginId}.config`,
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
