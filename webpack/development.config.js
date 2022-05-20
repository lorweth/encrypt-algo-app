const { resolve } = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DIST } = require('./constants');
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    path: resolve(DIST),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // Join publicPath to devServer
    static: {
      directory: path.join(__dirname, '../public'), // __dirname: /webpack
    },
    hot: true,
    port: 4200,
    open: false,

    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
};
