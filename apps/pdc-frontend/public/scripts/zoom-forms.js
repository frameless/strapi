/* eslint-disable no-undef */
(() => {
  const waitForPaq = () => {
    if (!window._paq || typeof window._paq.push !== 'function') {
      return setTimeout(waitForPaq, 100);
    }
    initZoomTracking();
    return null;
  };

  const initZoomTracking = () => {
    const KEY = 'track_zoom_forms';
    if (sessionStorage.getItem(KEY)) return;

    const getZoomLevel = () => {
      const innerWidth = window.innerWidth;
      return innerWidth > 0 ? Math.round((window.outerWidth / innerWidth) * 100) : 100;
    };

    const handler = (e) => {
      try {
        if (!e.target?.closest?.('input, textarea, select, form')) return;

        const zoom = getZoomLevel();
        if (zoom > 130) {
          _paq.push(['trackEvent', 'Gedrag', 'Formulier Interactie Zoomniveau', `${zoom}%`, 1]);
          sessionStorage.setItem(KEY, 'true');
          document.removeEventListener('focusin', handler);
        }
      } catch (e) {
        // Silently fail if tracking unavailable
      }
    };

    document.addEventListener('focusin', handler);
  };

  waitForPaq();
})();
