import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import config from 'config';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
    eslintPlugin(),
  ],
  resolve: {
    alias: [
      { find: '~/', replacement: '/src/' },
      { find: '~bootstrap/', replacement: '/src/bootstrap/' },
      { find: '~components/', replacement: '/src/components/' },
      { find: '~hooks/', replacement: '/src/hooks/' },
      { find: '~model/', replacement: '/src/model/' },
      { find: '~pages/', replacement: '/src/pages/' },
      { find: '~utils/', replacement: '/src/utils/' },
    ],
  },
  define: {
    process: {
      env: {
        config,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A',
          '@link-color': '#1DA57A',
        },
      },
    },
  },
  server: {
    open: true,
    host: true,
    port: 3333,
  },
});
