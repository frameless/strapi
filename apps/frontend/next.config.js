const { i18n } = require('./next-i18next.config');

delete i18n.localePath;
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: { ...i18n, localeDetection: false },
  images: {
    domains: [process.env.STRAPI_UPLOAD_PROVIDER_HOSTNAME || ''],
  },
};

module.exports = nextConfig;
