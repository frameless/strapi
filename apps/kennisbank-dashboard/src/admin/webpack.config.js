'use strict';

module.exports = (config, webpack) => {
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/^tippy\.js$/, 'tippy.js/dist/tippy-bundle.umd.min.js'),
  );
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
