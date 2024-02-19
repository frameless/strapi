# Strapi Plugin: strapi-plugin-open-forms-embed

This custom field serves as a dropdown representation of available OpenForms within the Strapi dashboard. It retrieves the `name` and `uuid` through a fetch function that calls the OpenForms API.

## Installation

```shell

yarn install @frameless/strapi-plugin-open-forms-embed

```

## Usage

Navigate to the Strapi dashboard's `config/plugins.ts`.

```ts
export default ({ env }) => ({
  "open-forms-embed": {
    enabled: true,
    config: {
      api_url: env("OPEN_FORMS_API_URL"),
      token: env("OPEN_FORMS_API_TOKEN"),
    },
  },
});
```

**Build the dashboard**:

```shell
yarn build

```
