'use strict';

const { getService } = require('../util');

module.exports = {
  async config(ctx) {
    try {
      const config = await getService('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      ctx.badRequest('Something went wrong with the Preview button config');
    }
  },
};
