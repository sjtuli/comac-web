import path, { resolve } from 'node:path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import UnoCSS from '@unocss/svelte-scoped/preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      configOrPath: 'uno.config.ts',
    }),
    preprocess({
      typescript: {
        // 额外的 TypeScript 选项
      },
      scss: {
        // prependData: `@import "./src/styles/globals.scss";`,
      },
    }),
  ],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    adapter: adapter(),
  },
  vitePlugin: {
    inspector: {
      showToggleButton: 'always',
    },
  },
};
