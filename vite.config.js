import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig(({ command }) => {
  const htmlFiles = glob.sync('./src/*.html');
  const inputFiles = htmlFiles.reduce((acc, file) => {
    const name = path.basename(file, '.html');
    acc[name] = file;
    return acc;
  }, {});

  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: inputFiles,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: ({ name }) => {
            return name === 'index' ? 'js/[name].js' : 'js/[name]/[name].js';
          },
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
