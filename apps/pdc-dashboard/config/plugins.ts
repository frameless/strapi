export default ({ env }) => {
  const isProd = env('NODE_ENV') === 'production';
  return {
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
    prometheus: {
      enabled: true,
      config: {
        collectDefaultMetrics: false,

        server: {
          port: parseInt(env('METRICS_PORT', '9001'), 10),
          host: '0.0.0.0',
          path: '/metrics',
        },

        normalize: [
          [/\/(?:[a-z0-9]{24,25}|\d+)(?=\/|$)/, '/:id'],
          [/\/uploads\/[^\\/]+\.[a-zA-Z0-9]+/, '/uploads/:file'],
        ],
      },
    },
    'preview-button': {
      enabled: true,
      config: {
        domain: env('KISS_PREVIEW_URL'),
        preview_secret_token: env('KISS_PREVIEW_TOKEN'),
        contentTypes: [
          {
            uid: 'api::product.product',
            query: {
              type: 'kennisartikelen',
            },
          },
          {
            uid: 'api::vac.vac',
            query: {
              type: 'vac',
            },
          },
        ],
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
    graphql: {
      config: {
        // Only enable in development; disable in production for security
        playgroundAlways: !isProd,
        apolloServer: {
          // Enables or disables schema introspection
          // In production, disabling prevents exposing schema structure
          introspection: !isProd,
          // Enables Apollo tracing (performance analysis)
          // Only useful during development
          tracing: !isProd,
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
  };
};
