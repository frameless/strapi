export const fallbackLng = 'nl';
export const languages = ['nl', 'en']; // Ensure 'en' is included if you have 'en' locale
export const defaultNS = 'common';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: true, // Enable debug mode for more logs
    supportedLngs: languages,
    preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
