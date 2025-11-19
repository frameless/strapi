/* eslint-disable no-undef */
(() => {
  if (!window._paq || typeof window._paq.push !== 'function') return;

  const KEY = 'track_google_translate';
  if (sessionStorage.getItem(KEY)) return;

  try {
    let detected = false;

    const detectGoogleTranslate = () => {
      // 1. Google Translate injected elements
      const selectors = [
        "meta[name='google']",
        '.goog-te-banner-frame',
        '.goog-te-gadget',
        "[class*='goog-te']",
        "[id*='google_translate']",
        '.skiptranslate',
        // More specific indicator for translated text
        "font[style*='vertical-align:']",
      ];

      for (const s of selectors) {
        if (document.querySelector(s)) {
          detected = true;
          break;
        }
      }

      // HTML language attribute manipulation
      const htmlLang = document.documentElement.getAttribute('lang');
      if (htmlLang && (htmlLang.includes('translated') || htmlLang.includes('x-mtfrom'))) {
        detected = true;
      }

      // Google Translate sometimes injects "notranslate"
      if (document.querySelector("[class*='notranslate']")) {
        detected = true;
      }
    };

    const runDetection = () => {
      detectGoogleTranslate(); // initial check
      setTimeout(detectGoogleTranslate, 800); // after DOM settles
      setTimeout(detectGoogleTranslate, 1500); // after possible frame load

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
    // Silent fail
  }
})();
