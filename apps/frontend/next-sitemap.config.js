/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // todo Deprecate FRONTEND_SITE_URL env variable when we remove it from vercel 
    siteUrl: process.env.FRONTEND_SITE_URL || process.env.STRAPI_FRONTEND_URL,
    generateRobotsTxt: true,
}