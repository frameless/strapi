import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error
  plugins: [vitePluginRequire.default(), react()],
  build: {
    commonjsOptions: {
      include: [/@strapi\/design-system/, /@frameless\/tiptap-editor/, /node_modules/],
    },
  },
});
