declare module '@strapi/design-system/*';
declare module '@strapi/design-system';
declare module '@strapi/icons';
declare module '@strapi/icons/*';
declare module '@strapi/helper-plugin';
declare module '@strapi/design-system*';
declare module 'rollup-plugin-peer-deps-external';
declare module 'rollup-plugin-auto-external';
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
