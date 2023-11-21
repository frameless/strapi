const { apolloPrometheusPlugin } = require('strapi-prometheus');

export default ({ env }) => ({
  'preview-button': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::homepage.homepage',
          query: {
            type: 'Homepage',
          },
        },
        {
          uid: 'api::hoofditem.hoofditem',
          query: {
            type: 'Hoofditem',
          },
        },
        {
          uid: 'api::thema-content.thema-content',
          query: {
            type: 'ThemaContent',
          },
        },
        {
          uid: 'api::thema.thema',
          query: {
            type: 'Thema',
          },
        },
      ],
      domain: env('FRONTEND_PUBLIC_URL'),
      token: env('PREVIEW_SECRET_TOKEN'),
    },
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
        hoofditem: {
          field: 'slug',
          references: 'title',
        },
        thema: {
          field: 'slug',
          references: 'title',
        },
        'thema-content': {
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
  'import-export-entries': {
    enabled: true,
  },
  publisher: {
    enabled: true,
  },
});
