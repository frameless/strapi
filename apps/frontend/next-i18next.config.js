const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'nl',
    locales: ['en', 'nl', 'ar'],
    localePath: path.resolve('./public/locales'),
  },
  react: { useSuspense: false },
};
