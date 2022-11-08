module.exports = ({ env }) => ({
  ckeditor5: {
    enabled: true,
  },
  slugify: {
    enabled: true,
    config: {
      shouldUpdateSlug: true,
      contentTypes: {
        product: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  'preview-button': {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  publisher: {
    enabled: true,
  },
  'import-export-entries': {
    enabled: true
  },
});
