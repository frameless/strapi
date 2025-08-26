import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "editoria11y",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
        type: 'docs-readme'
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
};