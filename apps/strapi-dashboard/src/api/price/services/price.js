'use strict';

/**
 * price service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::price.price');
