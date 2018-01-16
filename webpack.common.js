const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const appDirectory = fs.realpathSync(process.cwd());
module.exports = {
  entry: {
    index: require.resolve('./src/index.js'),
    vendor: ['amfe-flexible', 'react', 'react-dom']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: path.resolve(appDirectory, 'src'),
        loader: require.resolve('babel-loader')
      }, {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [// require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: require.resolve('./src/index.html'),
      chunks: ['vendor', 'runtime', 'index']
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
    new webpack.optimize.CommonsChunkPlugin({name: 'runtime'})
  ]
};
