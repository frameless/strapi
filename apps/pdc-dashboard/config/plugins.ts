const { apolloPrometheusPlugin } = require('strapi-prometheus');

export default ({ env }) => ({
  'strapi-tiptap-editor': {
    enabled: true,
  },
  'strapi-prometheus': {
    enabled: true,
    graphql: {
      enabled: true,
      config: {
        apolloServer: {
          plugins: [apolloPrometheusPlugin], // add the plugin to get apollo metrics
          tracing: true, // this must be true to get some of the data needed to create the metrics
        },
      },
    },
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
    config: {
      contentTypes: [
        {
          uid: 'api::product.product',
          query: {
            type: 'products',
          },
        },
      ],
      domain: env('FRONTEND_PUBLIC_URL'),
      token: env('PREVIEW_SECRET_TOKEN'),
    },
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
  'import-export-entries': {
    enabled: true,
  },
  publisher: {
    enabled: true,
  },
});
