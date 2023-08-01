const { URL } = require('url');
const { hostname, protocol, port } = new URL(process.env.STRAPI_IMAGE_URL || 'http://localhost:1337');
/** @type {import('next').NextConfig} */
const nextConfig = {
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
