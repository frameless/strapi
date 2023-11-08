import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ComboboxIcon from './components/ComboboxIcon';
import { schemeData } from './components/CustomCombobox';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';

const options = schemeData?.map(({ prefLabel, resourceIdentifier }) => ({
  key: resourceIdentifier,
  value: resourceIdentifier,
  metadatas: {
    intlLabel: {
      id: `components.InputSelect.option.${resourceIdentifier}`,
      defaultMessage: prefLabel,
    },
  },
}));

export default {
  register(app) {
    app.customFields.register({
      name: 'scheme',
      pluginId: 'scheme-select',
      type: 'string',
      icon: ComboboxIcon,
      intlLabel: {
        id: getTrad('scheme-select.label'),
        defaultMessage: 'Scheme',
      },
      intlDescription: {
        id: getTrad('scheme-select.description'),
        defaultMessage: 'Select any scheme',
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
              {
                name: 'default',
                type: 'select',
                intlLabel: {
                  id: 'form.attribute.item.defaultField',
                  defaultMessage: 'Default Value',
                },
                description: {
                  id: 'form.attribute.item.defaultField.description',
                  defaultMessage: 'A default value is a preset choice when no other is given',
                },
                options: [
                  {
                    key: '__null_reset_value__',
                    value: '',
                    metadatas: {
                      intlLabel: {
                        id: 'components.InputSelect.option.placeholder',
                        defaultMessage: 'Choose here',
                      },
                    },
                  },
                  ...options,
                ],
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
