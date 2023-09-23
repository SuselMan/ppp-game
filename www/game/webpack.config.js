const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './app/index.js',

  mode: env,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        watch: true,
      }
    ],
    port: 3500,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'sass-loader',
      //   ]
      // }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin({template: './app/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ]
};
