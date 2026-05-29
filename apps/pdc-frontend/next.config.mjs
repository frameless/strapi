import { URL } from 'node:url';

const { hostname, protocol, port } = new URL(process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337');

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
    // Allow localhost images in dev only (blocked in production for security)
    // https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    // In development localhost always resolves to a private IP, so allow it unconditionally.
    // In production this is only needed when Next.js and Strapi share the same Docker host
    // (i.e. STRAPI_PUBLIC_URL resolves to a private Docker bridge IP). Set
    // NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP=true in that environment. Safe because
    // remotePatterns already restricts the image optimizer to a single trusted hostname.
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === 'development' || process.env.NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP === 'true',
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
