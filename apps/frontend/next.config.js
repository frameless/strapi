/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.STRAPI_UPLOAD_PROVIDER_HOSTNAME || ''],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
