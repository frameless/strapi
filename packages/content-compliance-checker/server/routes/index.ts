export default [
  {
    method: 'GET',
    path: '/products',
    handler: 'plugin::content-compliance-checker.content-compliance-checker.getProducts',
    config: {
      policies: [],
      auth: {
        scope: ['authenticated'],
      },
    },
  },
  {
    method: 'GET',
    path: '/products/:id',
    handler: 'plugin::content-compliance-checker.content-compliance-checker.getProductBlocks',
    config: {
      policies: [],
      auth: {
        scope: ['authenticated'],
      },
    },
  },
  {
    method: 'GET',
    path: '/additional-information',
    handler: 'plugin::content-compliance-checker.content-compliance-checker.getAdditionalInformation',
    config: {
      policies: [],
      auth: {
        scope: ['authenticated'],
      },
    },
  },
  {
    method: 'GET',
    path: '/additional-information/:id',
    handler: 'plugin::content-compliance-checker.content-compliance-checker.getAdditionalInformationBlocks',
    config: {
      policies: [],
      auth: {
        scope: ['authenticated'],
      },
    },
  },
];
