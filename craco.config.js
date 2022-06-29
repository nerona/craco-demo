const CracoAntDesignPlugin = require('craco-antd');
const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
  devServer: {
    port: 3333,
  },

  webpack: {},

  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1DA57A',
          '@link-color': '#1DA57A',
        },
      },
    },

    {
      plugin: CracoAliasPlugin,
      options: {
        baseUrl: '.',
        tsconfig: './tsconfig.paths.json',
      },
    },
  ],
};
