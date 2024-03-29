import { Strapi } from '@strapi/strapi';
import defaultSettings from '../../utils/defaults';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    if (strapi.store) {
      const savedSettings = await strapi
        .store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' })
        .get({});
      if (savedSettings !== null) {
        ctx.send(savedSettings);
      } else {
        ctx.send(defaultSettings);
      }
    }
  },
  async updateSettings(ctx) {
    if (strapi.store) {
      const newSettings = ctx.request.body;
      await strapi.store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' }).set({ value: newSettings });
      ctx.send({ res: 'ok' });
    }
  },
});
