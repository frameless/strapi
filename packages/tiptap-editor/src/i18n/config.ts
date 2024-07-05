import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect } from 'react';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { getOptions } from './settings';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((lng: string, ns: string) => import(`./locales/${lng}/${ns}.ts`)))
  .init({
    ...getOptions(),
    lng: undefined, // Let it detect the language on the client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  });

const runsOnServerSide = typeof window === 'undefined';

export function useTranslation(lng?: string, ns?: string | string[], options?: any) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    useEffect(() => {
      if (i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }
  return ret;
}
