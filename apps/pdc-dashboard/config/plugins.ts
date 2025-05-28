const { apolloPrometheusPlugin } = require('strapi-prometheus');

export default ({ env }) => ({
  'content-compliance-checker': {
    enabled: true,
  },
  'env-label': {
    enabled: true,
    config: {
      env_label: env('STRAPI_ENV_LABEL'),
    },
  },
  'entity-notes': {
    enabled: true,
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
  'preview-button': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::product.product',
          query: {
            type: 'products',
          },
          preview: {
            type: 'both',
          },
        },
        {
          uid: 'api::vac.vac',
          query: {
            type: 'vac',
          },
          preview: {
            type: 'dialog',
          },
        },
        {
          uid: 'api::internal-field.internal-field',
          query: {
            type: 'internal-field',
          },
          preview: {
            type: 'dialog',
          },
        },
        {
          uid: 'api::additional-information.additional-information',
          query: {
            type: 'additional-information',
          },
          preview: {
            type: 'dialog',
          },
        },
        {
          uid: 'api::additional-information.additional-information',
          query: {
            type: 'additional-information',
          },
          dialog: {
            enabled: true,
          },
        },
      ],
      domain: env('FRONTEND_PUBLIC_URL'),
      token: env('PREVIEW_SECRET_TOKEN'),
    },
  },
  'open-forms-embed': {
    enabled: true,
    config: {
      api_url: env('OPEN_FORMS_API_URL'),
      token: env('OPEN_FORMS_API_TOKEN'),
      embed_url: env('FRONTEND_PUBLIC_URL'),
    },
  },
  'flo-legal-embed': {
    enabled: true,
    config: {
      api_url: env('FLO_LEGAL_API_URL'),
      token: env('FLO_LEGAL_API_TOKEN'),
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
  'entity-relationship-chart': {
    enabled: true,
    config: {
      exclude: [
        'admin::api-token-permission',
        'admin::api-token',
        'admin::permission',
        'admin::role',
        'admin::transfer-token-permission',
        'admin::transfer-token',
        'admin::user',
        'plugin::entity-notes.note',
        'plugin::i18n.locale',
        'plugin::publisher.action',
        'plugin::slugify.slug',
        'plugin::upload.file',
        'plugin::upload.folder',
        'plugin::users-permissions.permission',
        'plugin::users-permissions.role',
        'plugin::users-permissions.user',
        'strapi::core-store',
        'webhook',
      ],
    },
  },
  graphql: {
    config: {
      apolloServer: {
        bodyParserConfig: {
          limit: '128mb',
          jsonLimit: '128mb',
          textLimit: '128mb',
          xmlLimit: '128mb',
        },
      },
    },
  },
  'old-slugs': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::product.product',
        },
      ],
    },
  },
});
