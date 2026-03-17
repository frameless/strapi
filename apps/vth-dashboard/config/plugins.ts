export default ({ env }) => {
  const isProd = env('NODE_ENV') === 'production';
  return {
    'env-label': {
      enabled: true,
      config: {
        env_label: env('STRAPI_ENV_LABEL'),
      },
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
      config: {
        components: {
          dateTimePicker: {
            step: 15,
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
        },
      },
    },
  };
};
