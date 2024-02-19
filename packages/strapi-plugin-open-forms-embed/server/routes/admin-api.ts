export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'open-forms-embed.config',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
