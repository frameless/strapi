const UtrechtFavicon = require('./extensions/favicon.ico');
const UtrechtLogo = require('./extensions/logo.svg');

const config = {
  locales: ['nl', 'en'],
  notifications: {
    releases: false,
  },
  auth: {
    logo: UtrechtLogo,
  },
  head: {
    favicon: UtrechtFavicon,
  },
  menu: {
    logo: UtrechtLogo,
  },
  translations: {
    en: {
      'app.components.HomePage.welcome': 'Welcome to the Utrecht PDC dashboard 👋',
    },
    nl: {
      User: 'Gebruiker',
      Price: 'Prijs',
      'Not Found Page': 'Pagina niet gevonden',
      'Search tip': 'Zoektip',
      'app.components.HomePage.welcome': 'Welkom bij het Utrecht PDC dashboard 👋',
      'content-manager.popUpWarning.warning.has-draft-relations.title': 'Bevestiging',
      'content-manager.popUpWarning.warning.publish-question': 'Wil je nog steeds publiceren?',
      'content-manager.popUpWarning.warning.unpublish-question': 'Weet je zeker dat je het niet wilt publiceren?',
      'content-manager.popUpWarning.warning.unpublish':
        'Als je deze inhoud niet publiceert, wordt deze automatisch een concept.',
      'content-manager.popUpWarning.warning.updateAllSettings': 'Dit zal al je instellingen wijzigen.',
    },
  },
};

const bootstrap = () => {};

export default {
  config,
  bootstrap,
};
