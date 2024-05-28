import i18nLanguages from '@cospired/i18n-iso-languages';
import { LanguagesType } from './types';
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'));
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/nl.json'));

export const localizeLanguagesNames = (languages: LanguagesType[], locale: string = 'nl') =>
  languages?.map(({ code, name }) => ({
    code,
    name: code ? i18nLanguages.getName(code, locale) : name,
  }));
