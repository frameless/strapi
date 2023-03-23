/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.STRAPI_FRONTEND_URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.STRAPI_FRONTEND_URL}/server-sitemap.xml`],
  },
};
