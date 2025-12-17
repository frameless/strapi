import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Initializer } from './components/Initializer';
import PreviewLink from './components/PreviewLink';
import { pluginId } from './pluginId';
import reducers from './reducers';
import pluginPkg from '../../package.json';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addReducers(reducers);
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'preview-link',
      Component: PreviewLink,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
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
