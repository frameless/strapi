const pluginPkg = require('../../package.json')

const pluginId = pluginPkg.name.replace(/^@frameless\/(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = pluginId;
