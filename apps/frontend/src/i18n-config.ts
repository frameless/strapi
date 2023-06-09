export const i18n = {
  defaultLocale: 'nl',
  locales: ['en', 'nl'],
} as const;

export type Locale = (typeof i18n)['locales'][number];