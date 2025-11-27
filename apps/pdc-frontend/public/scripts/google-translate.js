/* eslint-disable no-undef */
(() => {
  if (!window._paq || typeof window._paq.push !== 'function') return;

  const KEY = 'track_google_translate';
  if (sessionStorage.getItem(KEY)) return;

  try {
    let detected = false;

    const detectGoogleTranslate = () => {
      // Google Translate detection selectors
      const selectors = [
        // Meta tag added by Google Translate
        "meta[name='google']",
        // Google Translate widget elements
        '.goog-te-banner-frame',
        '.goog-te-gadget',
        "[class*='goog-te']",
        "[id*='google_translate']",
        "[id^='google_translate']",
        // Translation indicators
        '.skiptranslate',
        '.translated-ltr',
        '.translated-rtl',
        "[class*='translated-']",
        "[class*='notranslate']",
        '[data-google-translate]',
        // Translated text styling
        "font[style*='vertical-align:']",
      ];

      // Check for any Google Translate elements
      for (const selector of selectors) {
        if (document.querySelector(selector)) {
          detected = true;
          break;
        }
      }

      // Check HTML lang attribute for translation markers
      const htmlLang = document.documentElement?.getAttribute('lang');
      if (htmlLang?.includes('translated') || htmlLang?.includes('x-mtfrom')) {
        detected = true;
      }
    };

    const runDetection = () => {
      detectGoogleTranslate();
      setTimeout(detectGoogleTranslate, 800);
      setTimeout(detectGoogleTranslate, 1500);

      setTimeout(() => {
        if (detected) {
          _paq.push(['trackEvent', 'Toegankelijkheid', 'Google Translate-gebruik', 'google-translate', 1]);
          sessionStorage.setItem(KEY, 'true');
        }
      }, 1800);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runDetection);
    } else {
      runDetection();
    }
  } catch (e) {
    // Silently fail if tracking unavailable
  }
})();
