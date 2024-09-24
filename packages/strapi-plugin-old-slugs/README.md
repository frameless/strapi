# Strapi Plugin: strapi-plugin-old-slugs

**⚠️ This plugin is compatible with Strapi v4 only.**

A Strapi plugin that keeps track of previous slugs when they change in the CMS. It stores them in a JSON field called `oldSlugs` within the content type.

## ✨ Features

- Automatically saves previous slugs when a slug field is updated.
- Helps maintain URL history for redirects or SEO purposes.
- Configurable to work with specific content types.

## 🚀 Installation

You can install the plugin using **yarn** or **npm**:

```sh
# Using yarn
yarn add @frameless/strapi-plugin-old-slugs

# Using npm
npm install @frameless/strapi-plugin-old-slugs

```

## 🔧 Configuration

1. **Add the `oldSlugs` Field**

   To store the previous slugs, you need to add a field of type **JSON** with the name **oldSlugs** in the content types where you want to track slug changes.

   **Option 1: Using Strapi Content-Type Builder**
   You can add the oldSlugs field using the Strapi Content-Type Builder in the Strapi Admin panel:

   1. Open your Strapi Dashboard.

   2. Navigate to Content-Type Builder.

   3. Select the content type you want to modify (e.g., Product).

   4. Add a new field with the following settings:

      - Field Name: oldSlugs

      - Type: JSON

   5. Save the changes and restart the server.

   For more details, refer to the [Strapi Content-Type Builder documentation](https://docs-v4.strapi.io/user-docs/content-type-builder/creating-new-content-type).

   **Option 2: Editing the Model File Manually**
   If you prefer, you can manually modify the model file.

   **Path**: `src/api/product/content-types/product/schema.json`

   ```json
   {
     "kind": "collectionType",
     "collectionName": "products",
     "info": {
       "singularName": "product",
       "pluralName": "products",
       "displayName": "Product"
     },
     "options": {
       "draftAndPublish": true
     },
     "attributes": {
       "title": {
         "type": "string",
         "required": true
       },
       "slug": {
         "type": "string",
         "required": true,
         "unique": true
       },
       "oldSlugs": {
         "type": "json",
         "default": []
       }
     }
   }
   ```

2. **Enable and Configure the Plugin**

   After installing the plugin, enable and configure it in your **Strapi dashboard**.

   1. Navigate to the configuration file:
      `/config/plugins.ts` (or `/config/plugins.js` if using JavaScript).
   2. Add the following configuration:

   ```ts
   export default ({ env }) => ({
     "old-slugs": {
       enabled: true,
       config: {
         contentTypes: [
           {
             uid: "api::product.product",
           },
         ],
       },
     },
   });
   ```

## Configuration Options

| Option         | Type  | Description                                                 |
| -------------- | ----- | ----------------------------------------------------------- |
| `contentTypes` | Array | List of content types where slug history should be tracked. |

## 📌 Usage

Once enabled, the plugin will automatically store previous slugs in the oldSlugs JSON field of the specified content types whenever the slug changes.

Example of a product entry with old slugs:

```json
{
  "id": 1,
  "title": "New Product Name",
  "slug": "new-product-name",
  "oldSlugs": ["old-product-name", "very-old-product-name"]
}
```

## 🛠️ Build the Strapi Dashboard

After configuring the plugin and updating the content type, you need to **rebuild the Strapi dashboard** for the changes to take effect.

Run the following command:

```shell
yarn build && yarn develop

```

Or if you're using npm:

```shell
npm run build && npm run develop
```

## 💡 Why Use This Plugin?

- Ensures old slugs are not lost when URLs change.
- Useful for setting up redirects or tracking changes.
- Helps maintain SEO rankings by preserving URL history.

## 🔥 Contributing

Feel free to submit issues or pull requests to improve this plugin!

## 📜 License

This plugin is licensed under the EUPL License.
