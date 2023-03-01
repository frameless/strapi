'use strict';
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new webpack.DefinePlugin({
      STRAPI_FRONTEND_URL: JSON.stringify(process.env.STRAPI_FRONTEND_URL),
      STRAPI_FRONTEND_PREVIEW_SECRET: JSON.stringify(process.env.STRAPI_FRONTEND_PREVIEW_SECRET),
      STRAPI_FRONTEND_TYPE: JSON.stringify(process.env.STRAPI_FRONTEND_TYPE),
      STRAPI_BACKEND_URL: JSON.stringify(process.env.STRAPI_BACKEND_URL),
    }),
  );
  return config;
};
