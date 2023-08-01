import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ComboboxIcon from './components/ComboboxIcon';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';

export default {
  register(app: any) {
    app.customFields.register({
      name: pluginId,
      pluginId,
      type: 'string',
      icon: ComboboxIcon,
      intlLabel: {
        id: getTrad('uniform-product-name.label'),
        defaultMessage: 'Select uniform product name',
      },
      intlDescription: {
        id: getTrad('uniform-product-name.description'),
        defaultMessage: 'Select uniform product name',
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
