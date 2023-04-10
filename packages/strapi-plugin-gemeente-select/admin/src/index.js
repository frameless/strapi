import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ComboboxIcon from './components/ComboboxIcon';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';

export default {
  register(app) {
    app.customFields.register({
      name: 'gemeente',
      pluginId: 'gemeente-select',
      type: 'string',
      icon: ComboboxIcon,
      intlLabel: {
        id: getTrad('gemeente-select.label'),
        defaultMessage: 'Gemeente',
      },
      intlDescription: {
        id: getTrad('gemeente-select.description'),
        defaultMessage: 'Select any gemeente',
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
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
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
