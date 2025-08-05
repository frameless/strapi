/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:locale/producten/alfabet/:q*',
        destination: '/:locale/products/alphabet/:q*',
        locale: false,
      },
      {
        source: '/:locale/producten/:slug*',
        destination: '/:locale/products/:slug*',
        locale: false,
      },
      {
        source: '/:locale/zoeken/:query*',
        destination: '/:locale/search/:query*',
        locale: false,
      },
      {
        source: '/:locale/formulier/fout/:errorKey*',
        destination: '/:locale/form/error/:errorKey*',
        locale: false,
      },
      {
        source: '/:locale/formulier/:slug*',
        destination: '/:locale/form/:slug*',
        locale: false,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });
    return config;
  },

  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
