const { NormalModuleReplacementPlugin } = require('webpack');

// eslint-disable-next-line no-undef
module.exports = (config) => {
  config.plugins.push(new NormalModuleReplacementPlugin(/^tippy\.js$/, 'tippy.js/dist/tippy-bundle.umd.min.js'));
  // Allow scss modules
  config.resolve = {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.scss'],
  };

  // Configure a SASS loader
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      {
        loader: 'sass-loader',
      },
    ],
  });
  // Make it possible to configure the watch server, particularly when using `strapi develop --watch-admin`.
  // This is essential, especially considering that the openForms server is using port 8000.
  config.devServer = {
    ...config.devServer,
    port: process.env.WATCH_PORT || 4000,
  };

  return config;
};
