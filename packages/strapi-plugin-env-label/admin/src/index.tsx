import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Initializer } from './components/Initializer';
import { StatusBadge } from './components/StatusBadge';
import { pluginId } from './pluginId';
import reducers from './reducers';
import pluginPkg from '../../package.json';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addReducers(reducers);
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
    });
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('listView', 'actions', {
      name: 'env-label',
      Component: () => <StatusBadge />,
    });
    app.injectContentManagerComponent('editView', 'informations', {
      name: 'env-label',
      Component: () => <StatusBadge gap />,
    });
    app.injectContentManagerComponent('listView', 'deleteModalAdditionalInfos', {
      name: 'env-label',
      Component: () => <StatusBadge gap />,
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
