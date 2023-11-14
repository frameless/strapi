const config = {
  locales: ['nl'],
  notifications: {
    releases: false,
  },
  translations: {
    nl: {
      'app.components.HomePage.welcome': 'Welkom 👋',
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
