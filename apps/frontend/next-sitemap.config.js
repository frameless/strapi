
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:1234',
    generateRobotsTxt: true,
}