# @frameless/strapi-plugin-env-label

A Strapi plugin designed to visually represent the current environment.

## Installation

To install the plugin, navigate to your Strapi dashboard and execute the following command in your terminal:

```shell
yarn add @frameless/strapi-plugin-env-label
# or
npm install @frameless/strapi-plugin-env-label

```

## Configuration

Update the `your-strapi-directory/config/plugin.ts` file by adding the following code:

```ts

export default ({ env }) => ({
  'env-label': {
    enabled: true,
    config: {
      env_label: // use env('USE_ENV_VARIABLE') or put the value here, // accepted values: development|acceptance
    },
  },
});

```

After making these changes, rebuild your Strapi dashboard and start the dashboard server.
