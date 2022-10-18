/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
delete i18n.localePath
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: [process.env.STRAPI_HOSTNAME],
  },
}

module.exports = nextConfig
