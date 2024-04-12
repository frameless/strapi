import pluginPkg from '../../package.json';

const pluginId = pluginPkg.strapi.name.replace(/^@strapi\/plugin-/i, '');

export default pluginId;
