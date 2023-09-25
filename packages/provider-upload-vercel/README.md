# @frameless/provider-upload-vercel

## Description

This Strapi plugin provides a Vercel provider for file uploads, allowing you to easily upload files to Vercel's Blob storage. It integrates with Strapi's upload functionality to store and manage files on Vercel's infrastructure.

## Installation

To install this Strapi plugin, you can use npm or yarn:

```bash
yarn add @frameless/provider-upload-vercel
# or
npm install @frameless/provider-upload-vercel
```

## Configuration

### Strapi Configuration

To configure this plugin in your Strapi server, follow these steps:

1. Navigate to your Strapi project directory.

2. Locate the `/config/plugins.ts` file.

3. Open the `plugins.ts` file for editing.

4. Add the following configuration to set up the Vercel provider:

   ```ts
   export default ({ env }) => ({
     upload: {
       config: {
         provider: "@frameless/provider-upload-vercel",
       },
     },
     // ... other plugins and configurations
   });
   ```

### Configuring Security Middleware for Thumbnail Previews

To ensure that thumbnail previews in the Media Library function correctly, you need to make adjustments to the Strapi Security Middleware. Specifically, you should update the `contentSecurityPolicy` settings as outlined below, instead of using the default `strapi::security` string. Follow these steps to configure the middleware:

1. Locate the `./config/middlewares.ts` file in your Strapi project.

2. Open the `middlewares.ts` file for editing.

3. Look for the section related to `contentSecurityPolicy` settings.

4. Replace the default `strapi::security` string with the following object:

   ```ts
   name: 'strapi::security',
   config: {
       contentSecurityPolicy: {
       useDefaults: true,
       directives: {
           'connect-src': ["'self'", 'https:'],
           'img-src': ["'self'", 'data:', 'blob:', 'https://your-domain.com'],
           'media-src': ["'self'", 'data:', 'blob:', 'https://your-domain.com'],
           upgradeInsecureRequests: null,
       },
       },
   },
   ```

   Make sure to replace "<https://your-domain.com>" with the appropriate domains or sources you want to allow for image sources and connections. This configuration ensures that your Strapi application can display thumbnail previews as expected. Save the changes to the middlewares.ts file.

5. Ensure that you have set the `BLOB_READ_WRITE_TOKEN` environment variable for the [Vercel Blob](https://vercel.com/docs/storage/vercel-blob/quickstart#prepare-your-local-project).

6. build the strapi project by using `strapi build` or you can use `strapi develop --watch-admin`

## License

This plugin is released under the [MIT License](./LICENSE).

## Author

Created by [Frameless](https://github.com/frameless).

## Development

If you want to contribute to this plugin or build it locally, you can follow these development instructions:

1. Clone the repository from GitHub.
2. Install the necessary development dependencies using `yarn install`.
3. Build the plugin using `yarn build`.
