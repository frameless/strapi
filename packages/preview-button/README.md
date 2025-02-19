# Strapi Plugin Preview-Button

## Integrate the Plugin into Strapi Dashboard

Create or update the `./config/plugins.ts` or `.js` file:

### **TypeScript:**

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
          preview: {
            type: "page", // Preview by navigating to a page
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
          preview: {
            type: "both", // Supports both page navigation and dialog preview
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
          preview: {
            type: "dialog", // Preview in a modal dialog
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
          preview: {
            type: "page",
          },
        },
        {
          uid: "api::product.product",
          query: {
            type: "products",
          },
          preview: {
            type: "both",
          },
        },
        {
          uid: "api::vac.vac",
          query: {
            type: "vac",
          },
          preview: {
            type: "dialog",
          },
        },
      ],
    },
  },
});
```

After the plugin integration, you have to build the Strapi dashboard by using `strapi build && strapi develop` or you can use the `strapi develop --watch-admin`

### Preview Modes

The preview.type key allows you to configure how content types should be previewed.

| Value  | Behavior                                        |
| ------ | ----------------------------------------------- |
| page   | Navigates to the preview page                   |
| dialog | Opens a preview in a modal dialog               |
| both   | Enables both page navigation and dialog preview |

#### Preview a Content Type by Navigating to the Preview Page

To enable preview via page navigation, set `preview.type` to `"page"`:

**Example**:

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
          preview: {
            type: "page",
          },
        },
      ],
    },
  },
});
```

#### Preview a Content Type in a Dialog

To preview a content type in a dialog, you need to add the dialog key to the content type configuration as well as you need to update the plugin implementation to support the dialog preview. Currently, the plugin implementation only supports the preview of the VAC, product and internal content types.

To enable preview in a dialog, set preview.type to "dialog":

**Example**:

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
          preview: {
            type: "dialog",
          },
        },
      ],
    },
  },
});
```

#### Enable Both Page Navigation and Dialog Preview

If you want to support both preview options, set `preview.type` to `"both"`:

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
          preview: {
            type: "both",
          },
        },
      ],
    },
  },
});
```

This will display two preview buttons:
✅ One for dialog preview
✅ One for navigating to the preview page

## The preview button configuration

| Property     | Type                                  | Description                                 | Required |
| ------------ | ------------------------------------- | ------------------------------------------- | -------- |
| enabled      | boolean                               | Enable or disable the preview button        | Yes      |
| config       | object                                | Configuration object                        | Yes      |
| domain       | string (env("FRONTEND_PUBLIC_URL"))   | URL of the frontend application             | Yes      |
| token        | string (env("PREVIEW_SECRET_TOKEN"))  | Secret token for preview authentication     | Yes      |
| contentTypes | array                                 | List of content types                       | Yes      |
| uid          | string                                | Unique identifier (UID) of the content type | Yes      |
| query.type   | string                                | Type of the content                         | Yes      |
| preview.type | string "`page` \| `dialog` \| `both`" | Type of preview behavior                    | Yes      |
