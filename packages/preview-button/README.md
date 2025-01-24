# Strapi plugin preview-button

## Integrate the plugin into Strapi dashboard

Create plugins file or update the existing file `./config/plugins.ts` or `.js`

**Typescript**:

```ts
export default ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      token: env("PREVIEW_SECRET_TOKEN"),
      contentTypes: [
        {
          uid: "api::homepage.homepage",
          query: {
            type: "Homepage",
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
          dialog: {
            enabled: true,
          },
        },
      ],
    },
  },
});
```

**Javascript**:

```js
module.exports = ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      token: env("PREVIEW_SECRET_TOKEN"),
      contentTypes: [
        {
          uid: "api::homepage.homepage",
          query: {
            type: "Homepage",
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
          dialog: {
            enabled: true,
          },
        },
      ],
    },
  },
});
```

After the plugin integration, you have to build the Strapi dashboard by using `strapi build && strapi develop` or you can use the `strapi develop --watch-admin`

### Preview a content type by navigating to the preview page

By adding the required configuration, you can add a preview button to the content type. But you have to ensure that the frontend application is able to render the content type.
Example:

```ts
module.exports = ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      token: env("PREVIEW_SECRET_TOKEN"),
      contentTypes: [
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
        },
      ],
    },
  },
});
```

### Preview a content type in a dialog

To preview a content type in a dialog, you need to add the dialog key to the content type configuration as well as you need to update the plugin implementation to support the dialog preview. Currently, the plugin implementation only supports the preview of the VAC and internal content types.
Example:

```ts
module.exports = ({ env }) => ({
  "preview-button": {
    enabled: true,
    config: {
      domain: env("FRONTEND_PUBLIC_URL"),
      token: env("PREVIEW_SECRET_TOKEN"),
      contentTypes: [
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
          dialog: {
            enabled: true,
          },
        },
      ],
    },
  },
});
```

## The preview button configuration

| Property       | Type                                 | Description                                       | Required |
| -------------- | ------------------------------------ | ------------------------------------------------- | -------- |
| enabled        | boolean                              | Enable or disable the preview button              | Yes      |
| config         | object                               | Configuration object                              | Yes      |
| domain         | string (env("FRONTEND_PUBLIC_URL"))  | URL of the frontend application                   | Yes      |
| token          | string (env("PREVIEW_SECRET_TOKEN")) | Secret token for preview authentication           | Yes      |
| contentTypes   | array                                | List of content types                             | Yes      |
| uid            | string                               | Unique identifier (UID) of the content type       | Yes      |
| query.type     | string                               | Type of the content                               | Yes      |
| dialog.enabled | boolean                              | Enable or disable dialog preview for content type | Yes      |
