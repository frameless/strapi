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
          uid: 'api::navigation-page.navigation-page',
          query: {
            type: 'Hoofditem',
          },
        },
        {
          uid: 'api::article-page.article-page',
          query: {
            type: 'ThemaContent',
          },
        },
        {
          uid: 'api::theme-page.theme-page',
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
        'navigation-page': {
          field: 'slug',
          references: 'title',
        },
        'theme-page': {
          field: 'slug',
          references: 'title',
        },
        'article-page': {
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
    config: {
      components: {
        dateTimePicker: {
          step: 15,
        },
      },
    },
  },
});
