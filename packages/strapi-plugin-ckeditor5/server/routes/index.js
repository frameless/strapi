'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/config/:configKey',
    handler: 'config.getConfig',
    config: { policies: [] },
  },
];
