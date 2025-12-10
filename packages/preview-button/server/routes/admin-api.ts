export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'preview-button.config',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/additional-information/:id',
      handler: 'preview-button.getAdditionalInformationData',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/internal-field/:id',
      handler: 'preview-button.getInternalFieldData',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/vac/:id',
      handler: 'preview-button.getVacData',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/product/:id',
      handler: 'preview-button.getProductData',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
