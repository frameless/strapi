'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('preview-button')
      .service('myService')
      .getWelcomeMessage();
  },
});
