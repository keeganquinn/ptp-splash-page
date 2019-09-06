const fs = require('fs');
const path = require('path');

const CssNano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({ extractComments: false })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'splash.min.css',
      path: path.resolve(__dirname, 'htdocs'),
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: CssNano,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new WebpackOnBuildPlugin(() => {
      fs.unlinkSync(path.resolve(__dirname, 'htdocs', 'style.min.js'));
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  entry: {
    splash: './src/splash.js',
    style: './src/style.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'htdocs'),
  },
};
