# Strapi plugin preview-button

## Usage

Create plugins file or update the existing file `./config/plugins.ts` or `.js`

**Typescript**:

```ts
export default ({ env }) => ({
  'preview-button': {
    enabled: true,
    config: {
      domain: env('STRAPI_FRONTEND_URL'),
      token: env('PREVIEW_SECRET_TOKEN'),
      slug: 'products',
    },
  },
});
```

**Javascript**:

```js
module.exports = ({ env }) => ({
  'preview-button': {
    enabled: true,
    config: {
      domain: env('STRAPI_FRONTEND_URL'),
      token: env('PREVIEW_SECRET_TOKEN'),
      slug: 'products',
    },
  },
});
```

After the plugin integration, you have to build the Strapi dashboard by using `strapi build && strapi develop` or you can use the `strapi develop --watch-admin`
