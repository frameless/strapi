const { URL } = require('url');
const { hostname, protocol, port } = new URL(process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337');
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
