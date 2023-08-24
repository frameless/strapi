const { apolloPrometheusPlugin } = require('strapi-prometheus');

export default () => ({
  ckeditor5: {
    enabled: false,
  },
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
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
    },
  },
  publisher: {
    enabled: true,
  },
});
