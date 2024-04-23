import { pluginId } from '../../admin/src/pluginId';

export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: `${pluginId}.config`,
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
