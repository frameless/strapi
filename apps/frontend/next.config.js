const { i18n } = require('./next-i18next.config');
delete i18n.localePath;
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    domains: [process.env.STRAPI_HOSTNAME || 'utrecht-cms-c3nji.ondigitalocean'],
  },
};

module.exports = nextConfig;
