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
  return config;
};
