'use strict';

const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  default: {},
  validator: (config) => {
    if (!config) {
      return;
    }
    if (!config?.domain) {
      throw new ValidationError('Missing domain prop.');
    }
    if (!config?.token) {
      throw new ValidationError('Missing token prop.');
    }
    if (!config?.slug) {
      throw new ValidationError('Missing slug prop.');
    }
  },
};
