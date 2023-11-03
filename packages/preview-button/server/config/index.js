'use strict';

const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  default: {},
  validator: (config) => {
    const uid = config.contentTypes.every((contentType) => Object.prototype.hasOwnProperty.call(contentType, 'uid'));
    const query = config.contentTypes.every((contentType) =>
      Object.prototype.hasOwnProperty.call(contentType, 'query'),
    );
    const type = config.contentTypes.every((contentType) =>
      Object.prototype.hasOwnProperty.call(contentType.query, 'type'),
    );
    if (!config) {
      return;
    }
    if (!config?.domain) {
      throw new ValidationError('Missing domain prop.');
    }
    if (!config?.token) {
      throw new ValidationError('Missing token prop.');
    }
    if (!uid) {
      throw new ValidationError('Missing uid prop.');
    }
    if (!query) {
      throw new ValidationError('Missing query prop.');
    }
    if (!type) {
      throw new ValidationError('Missing type prop.');
    }
  },
};
