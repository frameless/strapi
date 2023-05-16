const config = {
  locales: ['nl', 'en'],
  notifications: {
    releases: false,
  },
  translations: {
    en: {
      'app.components.HomePage.welcome': 'Welcome to the Utrecht PDC dashboard 👋',
    },
    nl: {
      'app.components.HomePage.welcome': 'Welkom bij het Utrecht PDC dashboard 👋',
    },
  },
};

const bootstrap = () => {};

export default {
  config,
  bootstrap,
};
