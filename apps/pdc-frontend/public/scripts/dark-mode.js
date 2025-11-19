/* eslint-disable no-undef */
(() => {
  if (!window._paq || typeof window._paq.push !== 'function') return;

  const KEY = 'track_dark_mode';
  if (sessionStorage.getItem(KEY)) return;

  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const trackDarkMode = () => {
      if (sessionStorage.getItem(KEY)) return;

      if (mediaQuery.matches) {
        _paq.push(['trackEvent', 'Uiterlijk', 'Donkere modus gedetecteerd', 'dark-mode', 1]);

        sessionStorage.setItem(KEY, 'true');
        mediaQuery.removeEventListener('change', trackDarkMode);
      }
    };

    // Run immediately
    trackDarkMode();

    // Run when user changes system theme
    mediaQuery.addEventListener('change', trackDarkMode);
  } catch (e) {
    // Silent fail
  }
})();
