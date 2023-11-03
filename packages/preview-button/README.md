# Strapi plugin preview-button

## Usage

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
      ],
    },
  },
});
```

After the plugin integration, you have to build the Strapi dashboard by using `strapi build && strapi develop` or you can use the `strapi develop --watch-admin`
