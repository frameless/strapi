/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "nl",
    locales: ['nl', 'en', "ar"]
  },
  images: {
    domains: [process.env.HOSTNAME],
  },
}

module.exports = nextConfig
