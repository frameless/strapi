/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.STRAPI_FRONTEND_URL,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.STRAPI_FRONTEND_URL}/sitemap.xml`],
  },
};
