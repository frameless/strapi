'use strict';

const defaultSettings = require('../../utils/defaults.js');

module.exports = ({ strapi }) => ({
  async index(ctx) {
    const savedSettings = await strapi.store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' }).get();
    if (savedSettings !== null) {
      ctx.send(savedSettings);
    } else {
      ctx.send(defaultSettings);
    }
  },
  async updateSettings(ctx) {
    const newSettings = ctx.request.body;
    await strapi.store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' }).set({ value: newSettings });
    ctx.send({ res: 'ok' });
  },
});
