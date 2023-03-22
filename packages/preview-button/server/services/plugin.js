'use strict';

const config = require('../config');
const { pluginId } = require('../util');

module.exports = ({ strapi }) => ({
  async getConfig() {
    const data = await strapi.config.get(`plugin.${pluginId}`, config.default);
    return data;
  },
});
