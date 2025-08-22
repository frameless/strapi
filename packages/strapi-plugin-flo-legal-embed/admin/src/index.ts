import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ComboboxIcon from './components/ComboboxIcon';
import reducers from './reducers';
import getTrad from './utils/getTrad';
import { pluginConfig } from './utils/pluginConfig';

const pluginId = pluginConfig.pluginId;

export default {
  register(app: any) {
    app.addReducers(reducers);
    app.customFields.register({
      name: pluginId,
      pluginId,
      type: 'string',
      icon: ComboboxIcon,
      intlLabel: {
        id: getTrad('flo-legal-embed.label'),
        defaultMessage: 'Choose an Embedded Flo Legal Form',
      },
      intlDescription: {
        id: getTrad('flo-legal-embed.description'),
        defaultMessage: 'Saves the unique identifier of the selected decision tree in the database.',
      },
      components: {
        Input: async () => import('./components/CustomCombobox'),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale: any) => {
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
