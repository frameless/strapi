export const getDirectionFromLanguageCode = (languageCode) => {
  // List of language codes that are written right-to-left
  const rtlLanguages = [
    'ar',
    'he',
    'fa',
    'ur',
    'yi',
    'dv',
    'ps',
    'ku',
    'ug',
    'arc',
    'azb',
    'mzn',
    'pnb',
    'sd',
    'ckb',
    'lrc',
    'glk',
    'nv',
    'prs',
    'tmr',
    'uga',
  ];
  // Check if the language code is in the list of RTL languages
  if (rtlLanguages.includes(languageCode.toLowerCase())) {
    return 'rtl';
  }

  // Default to left-to-right if not in the list of RTL languages
  return 'ltr';
};
