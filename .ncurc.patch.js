module.exports = {
  dep: ['dev', 'prod'],
  install: 'always',
  reject: ['@strapi/admin'],
  root: true,
  target: 'patch',
  upgrade: true,
  workspaces: true,
};
