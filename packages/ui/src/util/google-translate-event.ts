export interface TranslateDetail {
  dir: string;
  lang: string;
  translated: boolean;
}

export const isElement = (node?: Node | null): node is Element => node?.nodeType === 1;

export const isHTMLElement = (node?: Node | null): node is HTMLElement =>
  isElement(node) && node.namespaceURI === 'http://www.w3.org/1999/xhtml';

export const initGoogleTranslateEvent = (doc: Document | null) => {
  if (
    typeof MutationObserver !== 'undefined' &&
    typeof CustomEvent !== 'undefined' &&
    doc &&
    isHTMLElement(doc?.documentElement)
  ) {
    const root = doc.documentElement;
    const initial = {
      lang: root.lang,
      dir: root.dir,
      translated: root.classList.contains('translated-rtl') || root.classList.contains('translated-ltr'),
    };
    const current = {
      ...initial,
    };

    var mutationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(({ target }) => {
        if (!isHTMLElement(target)) {
          return;
        }
        const lang = target.lang;
        const translatedRtl = target.classList.contains('translated-rtl');
        const translatedLtr = target.classList.contains('translated-ltr');
        const translated = translatedLtr || translatedRtl;
        const dir = translatedRtl ? 'rtl' : translatedLtr ? 'ltr' : target.dir;

        if (lang !== current.lang || dir !== current.dir) {
          current.lang = lang;
          current.dir = dir;
          const translateEvent = new CustomEvent<TranslateDetail>('utrechtTranslate', {
            detail: {
              lang,
              dir,
              translated,
            },
          });
          target.dispatchEvent(translateEvent);

          // Restore original `dir`
          if (!translated) {
            root.dir = initial.dir;
          }
        }
      });
    });

    mutationObserver.observe(root, {
      attributeFilter: ['class', 'lang'],
      attributes: true,
      characterData: false,
    });

    return () => mutationObserver.disconnect();
  }

  return () => {};
};
