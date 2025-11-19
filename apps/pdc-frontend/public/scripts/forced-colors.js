/* eslint-disable no-undef */
(() => {
  const waitForPaq = () => {
    if (!window._paq || typeof window._paq.push !== 'function') {
      return setTimeout(waitForPaq, 100);
    }
    initForcedColorsTracking();
    return null;
  };

  const initForcedColorsTracking = () => {
    const KEY = 'track_forced_colors';
    if (sessionStorage.getItem(KEY)) return;

    try {
      const mediaQuery = window.matchMedia('(forced-colors: active)');

      const trackForcedColors = () => {
        if (sessionStorage.getItem(KEY)) return; // safety check

        if (mediaQuery.matches) {
          _paq.push(['trackEvent', 'Toegankelijkheid', 'Geforceerde kleurenmodus gedetecteerd', 'forced-colors', 1]);

          sessionStorage.setItem(KEY, 'true');
          mediaQuery.removeEventListener('change', trackForcedColors);
        }
      };

      // Run immediately
      trackForcedColors();

      // Also detect delayed activation
      setTimeout(trackForcedColors, 500);

      // React on user switching High Contrast on/off
      mediaQuery.addEventListener('change', trackForcedColors);
    } catch (e) {
      // Silent fail
    }
  };

  waitForPaq();
})();
