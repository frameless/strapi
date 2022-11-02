const path = require("path");
module.exports = {
    i18n: {
        defaultLocale: 'nl',
        locales: ['en', 'nl', "ar"],
        // https://github.com/i18next/next-i18next/issues/1552#issuecomment-981156476
        // https://github.com/i18next/next-i18next#vercel-and-netlify
        localePath: path.resolve('./public/locales')
    },
    react: { useSuspense: false },
};