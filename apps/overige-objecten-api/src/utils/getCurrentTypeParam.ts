export const getCurrentTypeParam = (url?: string) => {
  try {
    if (!url) return { isVac: false, isKennisartikel: false };
    const typeUrl = new URL(url);
    const isURL = typeof typeUrl === 'object';
    const isVac = isURL && typeUrl.pathname.split('/').includes('vac');
    const isKennisartikel = isURL && typeUrl.pathname.split('/').includes('kennisartikel');
    return { isVac, isKennisartikel };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { isVac: false, isKennisartikel: false };
  }
};
