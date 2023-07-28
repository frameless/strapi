/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.FRONTEND_DOMAIN,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.FRONTEND_DOMAIN}/sitemap.xml`],
  },
};
