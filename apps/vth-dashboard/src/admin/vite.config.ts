import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        'tippy.js': 'tippy.js/dist/tippy-bundle.umd.min.js',
      },
    },

    server: {
      port: process.env.WATCH_PORT ? parseInt(process.env.WATCH_PORT, 10) : 4001,
    },
  });
};
