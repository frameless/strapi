'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin('wysiwyg').service('myService').getWelcomeMessage();
  },
});
