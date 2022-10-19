import { defineConfig } from 'vite';
import { resolve } from 'path';
import { compilerOptions } from './tsconfig.json';

import vue from '@vitejs/plugin-vue';
import tsConfigPaths from 'vite-tsconfig-paths';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import legacy from '@vitejs/plugin-legacy';

import postcssConfig from './postcss.config.js';

const { baseUrl, paths: aliases } = compilerOptions;

const alias = Object.entries(aliases).reduce((acc, [key, [value]]) => {
  const [aliasKey, path] = [key, value].map(v => v.substring(0, v.length - 2));

  const aliasPath = resolve(__dirname, baseUrl, path);

  return {
    ...acc,
    [aliasKey]: aliasPath
  };
}, {});

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    vue(),
    vueI18n({
      include: resolve(__dirname, 'src/items/**')
    }),
    legacy(),
  ],
  resolve: {
    alias
  },
  css: {
    postcss: postcssConfig,
  },
  server: {
    open: true,
    host: true,
  },
});
