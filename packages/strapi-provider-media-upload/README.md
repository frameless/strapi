# @frameless/strapi-provider-media-upload

## Description

A custom Strapi provider plugin for handling local media uploads with support for MIME type filtering via the `allowedMimeTypes` option.

This plugin is **based on Strapi's official [upload-local provider](https://github.com/strapi/strapi/tree/develop/packages/providers/upload-local)** and extends it with additional validation through the `allowedMimeTypes` option.

## Features

- Upload files to the local filesystem (public/uploads)
- Validate MIME types before uploading
- Reject unsupported file types with proper error messages
- Compatible with Strapi v4

## Installation

To install this Strapi plugin, you can use npm or yarn:

```bash
yarn add @frameless/strapi-provider-media-upload
# or
npm install @frameless/strapi-provider-media-upload
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
         provider: "@frameless/strapi-provider-media-upload",
         providerOptions: {
           allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"], // Adjust as needed
           sizeLimit: 1000000, // in bytes (optional)
           // uploadPath: 'uploads', // defaults to 'uploads' inside public dir (optional, if supported)
         },
       },
     },
     // ... other plugins and configurations
   });
   ```

5. Build the dashboard before you run the server by following the commands below

```bash
 yarn build && yarn dev
```

## Available Options

| Option             | Type       | Required | Default     | Description                                                                    |
| ------------------ | ---------- | -------- | ----------- | ------------------------------------------------------------------------------ |
| `allowedMimeTypes` | `string[]` | No       | `undefined` | List of allowed MIME types. If not set, all types are allowed.                 |
| `sizeLimit`        | `number`   | No       | `undefined` | Maximum allowed file size in **bytes**. Files exceeding this will be rejected. |
| `uploadPath`       | `string`   | No       | `uploads`   | Folder name inside `public/` where files are stored (if configurable).         |

> ⚠️ Ensure the public/uploads directory exists and is writable by the server.

## MIME Type Filtering

When `allowedMimeTypes` is defined, any file that does not match will be rejected with a 400 error:

```bash
somefile.exe has unsupported file type: application/x-msdownload. Only JPEG, PNG, PDF are allowed.

```

## Based On

This plugin is adapted from the official [`upload-local`](https://github.com/strapi/strapi/tree/develop/packages/providers/upload-local) provider, with minor enhancements to support file type filtering.

## License

This plugin is released under the [EUPL-1.2 License](./LICENSE).

## Author

Created by [Frameless](https://github.com/frameless).

## Development

If you want to contribute to this plugin or build it locally, you can follow these development instructions:

1. Clone the repository from GitHub.
2. Install the necessary development dependencies using `yarn install`.
3. Build the plugin using `yarn build`.
