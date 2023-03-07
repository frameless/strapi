export default ({ env }) => ({
  ckeditor5: {
    enabled: true,
  },
  slugify: {
    enabled: true,
    config: {
      shouldUpdateSlug: true,
      contentTypes: {
        product: {
          field: 'slug',
          references: 'title',
        },
      },
    },
  },
  'preview-button': {
    enabled: true,
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
    },
  },
});
