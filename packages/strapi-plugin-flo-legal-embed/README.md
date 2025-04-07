# Strapi Plugin: strapi-plugin-flo-legal-embed

This custom field serves as a dropdown representation of available Flo Legal Embed within the Strapi dashboard. It retrieves the `identifier` through a fetch function that calls the Flo Legal API.

## Installation

```shell

yarn install @frameless/strapi-plugin-flo-legal-embed

```

## Usage

Navigate to the Strapi dashboard's `config/plugins.ts`.

```ts
export default ({ env }) => ({
  "flo-legal-embed": {
    enabled: true,
    config: {
      api_url: env("FLO_LEGAL_API_URL"),
      token: env("FLO_LEGAL_API_TOKEN"),
    },
  },
});
```

**Build the dashboard**:

```shell
yarn build

```
