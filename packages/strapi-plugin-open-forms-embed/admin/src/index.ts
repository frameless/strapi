import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ComboboxIcon from './components/ComboboxIcon';
import pluginId from './pluginId';
import reducers from './reducers';
import getTrad from './utils/getTrad';

export default {
  register(app: any) {
    app.addReducers(reducers);
    app.customFields.register({
      name: pluginId,
      pluginId,
      type: 'string',
      icon: ComboboxIcon,
      intlLabel: {
        id: getTrad('open-forms-embed.label'),
        defaultMessage: 'Choose an Embedded Open Form',
      },
      intlDescription: {
        id: getTrad('open-forms-embed.description'),
        defaultMessage:
          'Upon selecting a form, its unique identifier (UUID) will be stored in the database for future reference.',
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
  async registerTrads({ locales }: any) {
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
