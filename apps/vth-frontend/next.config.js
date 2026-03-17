const { URL } = require('url');
const { hostname, protocol, port } = new URL(process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337');
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@frameless/ui', '@utrecht/component-library-react', '@utrecht/web-component-library-react'],
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(/:$/, ''),
        hostname: hostname,
        port: port,
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
