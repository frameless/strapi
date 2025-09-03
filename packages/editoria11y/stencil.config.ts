import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'editoria11y',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'dist-collection',
      dir: 'dist',
      collectionDir: 'dist/collection',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
