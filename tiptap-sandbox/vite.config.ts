import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  plugins: [vitePluginRequire.default(), react()],
  build: {
    commonjsOptions: {
      include: [/@strapi\/design-system/, /@frameless\/tiptap-editor/, /node_modules/],
    },
  },
});
