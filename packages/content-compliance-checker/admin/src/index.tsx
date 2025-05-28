import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { TbFilterCheck } from 'react-icons/tb';
import Initializer from './components/Initializer';
import pluginId from './pluginId';
import pluginPkg from '../../package.json';
import './styles.css';
import '@frameless/ui/dist/bundle.css';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: TbFilterCheck,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Content compliance checker',
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
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
