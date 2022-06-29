import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

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
  ],
  resolve: {
    alias: [
      { find: '~/', replacement: '/src/' },
      { find: '~bootstrap/', replacement: '/src/bootstrap/' },
      { find: '~components/', replacement: '/src/components/' },
      { find: '~hooks/', replacement: '/src/hooks/' },
      { find: '~model/', replacement: '/src/model/' },
      { find: '~pages/', replacement: '/src/pages/' },
    ],
  },
  define: {
    process: {
      env: {},
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
  },
});
