const CracoAntDesignPlugin = require('craco-antd');
const { CracoAliasPlugin } = require('react-app-alias');
const webpack = require('webpack');

module.exports = {
  devServer: {
    port: 3333,
  },

  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
    plugins: {
      add: [new webpack.DefinePlugin({ 'process.env.config': JSON.stringify(require('config')) })],
    },
  },

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
