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
  flags: {
    nps: false,
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
      'primary-action-button': 'Primary',
      'secondary-action-button': 'Secondary',
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
      'content-manager.popUpWarning.warning.unpublish':
        'Als je deze inhoud niet publiceert, wordt deze automatisch een concept.',
      'app.components.HomePage.welcome': 'Welkom bij het Utrecht PDC dashboard 👋',
      'components.utrecht-spotlight': 'Spotlight',
      'content-manager.components.DynamicZone.add-item-above': 'Voeg hierboven een onderdeel toe',
      'content-manager.components.DynamicZone.add-item-below': 'Voeg hieronder een onderdeel toe',
      'content-manager.components.DynamicZone.ComponentPicker-label': 'Kies een onderdeel',
      'content-manager.components.DynamicZone.add-component': 'Voeg een onderdeel toe',
      'content-manager.components.DynamicZone.pick-compo': 'Voeg een onderdeel toe',
      'content-manager.containers.Edit.delete-entry': 'Verwijderen',
      'content-manager.containers.Edit.information.created': 'Aangemaakt',
      'content-manager.form.Input.hint.character.unit': '{maxValue, plural, one { teken} other { tekens}}',
      'content-manager.HeaderLayout.button.label-add-entry': 'Nieuw',
      'content-manager.popUpWarning.warning.has-draft-relations.title': 'Bevestiging',
      'content-manager.popUpWarning.warning.publish-question': 'Wil je nog steeds publiceren?',
      'content-manager.popUpWarning.warning.unpublish-question': 'Weet je zeker dat je het niet wilt publiceren?',
      'content-manager.popUpWarning.warning.updateAllSettings': 'Dit zal al je instellingen wijzigen.',
      'content-manager.components.empty-repeatable': 'Nog geen items. Klik op de + om iets toe te voegen.',
      'content-manager.relation.publicationState.published': 'Gepubliceerd',
      'content-manager.relation.publicationState.draft': 'Concept',
      'Not Found Page': 'Pagina niet gevonden',
      'primary-action-button': 'Inwoners (blauw)',
      'secondary-action-button': 'Aanvullende knop (wit)',
      'strapi-plugin-notes.note.modal.new.title': 'Opmerkingen',
      'content-manager.components.LeftMenu.collection-types': 'Type collectie',
      arrow: 'Pijl',
      Category: 'Categorie',
      digid: 'DigiD',
      eherkenning: 'eHerkenning',
      eidas: 'eIDAS',
      FAQ: 'FAQ',
      gray: 'Grijs',
      Href: 'URL  (internetadres)',
      info: 'Blauw',
      magenta: 'Organisaties (paars)',
      Price: 'Kosten',
      Product: 'Producten',
      Sections: 'Onderdelen',
      Subcategory: 'Subcategorie',
      Text: 'Tekst',
      Title: 'Titel',
      User: 'Gebruiker',
      warning: 'Geel',
      without_logo: 'Zonder logo',
    },
  },
};

const bootstrap = () => {};

export default {
  config,
  bootstrap,
};
