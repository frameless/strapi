import { LanguagesType } from './types';

export const sortLanguagesAlphabetically = (languages: LanguagesType[]) =>
  languages.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
