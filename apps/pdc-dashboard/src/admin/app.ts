const UtrechtFavicon = require('./extensions/favicon.ico');
const UtrechtLogo = require('./extensions/logo.svg');

const config = {
  locales: ['nl'],
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
      logoButton: 'Logo Button',
      primary: 'Primary',
      secondary: 'Secondary',
      magenta: 'Magenta',
      without_logo: 'Without logo',
      digid: 'DigiD',
      eidas: 'eIDAS',
      eherkenning: 'eHerkenning',
      Product: 'Products',
      info: 'Blue',
      warning: 'Yellow',
      gray: 'Gray',
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
      without_logo: 'Zonder logo',
      primary: 'Primaire',
      secondary: 'Secundaire',
      magenta: 'Magenta',
      digid: 'DigiD',
      eidas: 'eIDAS',
      eherkenning: 'eHerkenning',
      Category: 'Categorie',
      Subcategory: 'Subcategorie',
      Product: 'Producten',
      FAQ: 'FAQ',
      info: 'Blauw',
      warning: 'Geel',
      gray: 'Grijs',
    },
  },
};

const bootstrap = () => {};

export default {
  config,
  bootstrap,
};
