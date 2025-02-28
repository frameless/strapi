import { prefixPluginTranslations } from '@strapi/helper-plugin';
import React from 'react';
import Wysiwyg from './components/Wysiwyg';
import GetProductPriceState from './context/productPrice/state';
import pluginId from './pluginId';
import pluginPkg from '../../package.json';
import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';

const name = pluginPkg.strapi.name;

const myComponent = async () => {
  const component = await import(/* webpackChunkName: "strapi-tiptip-editor-settings-page" */ './pages/App');

  return component;
};

export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: 'strapi-tiptap-editor',
        intlLabel: { id: 'my-plugin.plugin.name', defaultMessage: 'Strapi TipTap Editor' },
      }, // Section to create
      [
        // links
        {
          intlLabel: { id: 'my-plugin.plugin.name', defaultMessage: 'Settings' },
          id: 'Settings',
          to: '/settings/strapi-tiptap-editor',
          Component: myComponent,
          permissions: [],
        },
      ],
    );
    app.addFields({
      type: 'wysiwyg',
      Component: (props: any) => (
        <GetProductPriceState>
          <Wysiwyg {...props} />
        </GetProductPriceState>
      ),
    });
    app.customFields.register({
      name: 'richtext-preview',
      pluginId: pluginId,
      type: 'string', // Ensure Strapi recognizes it as a text field
      intlLabel: {
        id: `${pluginId}.richtext-preview.label`,
        defaultMessage: 'Richtext Preview',
      },
      intlDescription: {
        id: `${pluginId}.richtext-preview.description`,
        defaultMessage: 'Extracted text from the richtext field.',
      },
      components: {
        Input: async () => import('./components/RichtextPreviewInput'),
      },
    });
    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });
  },
  bootstrap() {},
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map(async (locale) => {
        try {
          const props = await import(/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`);
          return {
            data: prefixPluginTranslations(props.default, pluginId),
            locale,
          };
        } catch (e) {
          return {
            data: {},
            locale,
          };
        }
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
