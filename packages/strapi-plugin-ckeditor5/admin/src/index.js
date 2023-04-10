import { prefixPluginTranslations } from '@strapi/helper-plugin';
import Initializer from './components/Initializer';
import Wysiwyg from './components/Wysiwyg';
import pluginId from './pluginId';
import pluginPkg from '../../package.json';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({ type: 'wysiwyg', Component: Wysiwyg });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap() {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
