import { prefixPluginTranslations } from '@strapi/helper-plugin';
import React from 'react';
import Wysiwyg from './components/Wysiwyg';
import GetProductPriceState from './context/productPrice/state';
import pluginId from './pluginId';
import pluginPkg from '../../package.json';

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
          const { default: data } = await import(
            /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
          );
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale,
          };
        } catch {
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
