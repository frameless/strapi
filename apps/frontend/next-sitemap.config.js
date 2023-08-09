/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.FRONTEND_PUBLIC_URL,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.FRONTEND_PUBLIC_URL}/sitemap.xml`],
  },
};
