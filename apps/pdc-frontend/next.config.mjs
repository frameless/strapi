import { URL } from 'node:url';

const { hostname, protocol, port } = new URL(process.env.STRAPI_PRIVATE_URL || 'http://localhost:1337');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@frameless/ui', '@utrecht/component-library-react', '@utrecht/web-component-library-react'],
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
  images: {
    // See: https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: protocol.replace(/:$/, ''),
        hostname: hostname,
        port: port,
      },
    ],
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
