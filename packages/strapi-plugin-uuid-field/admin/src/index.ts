import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Uid } from '@strapi/icons';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';
export default {
  register(app: any) {
    app.customFields.register({
      name: pluginId,
      pluginId,
      type: 'string',
      icon: Uid,
      intlLabel: {
        id: getTrad('uuid-field.label'),
        defaultMessage: 'UUID',
      },
      intlDescription: {
        id: getTrad('uuid-field.description'),
        defaultMessage: 'Generate UUID',
      },
      components: {
        Input: async () => import('./components/Input'),
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
