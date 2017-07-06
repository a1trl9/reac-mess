const path = require('path')
const webpack= require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const exclude = /node_modules\/*/

function config(isProd) {
  return {
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=//0.0.0.0:' +
        '3001/__webpack_hmr&overlay=false',
        path.resolve(__dirname, '../src/app/entry.js'),
      ],
    },
    output: {
      path: path.resolve(__dirname, '../static'),
      filename: isProd ? '[name].[chunkhash].js' : '[name].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: 2,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/app/entry.html'),
        filename: 'index.html',
        inject: 'body',
      }),
    ],
    module: {
      noParse: /\.min\.js/,
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude,
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!less-loader!postcss-loader',
          exclude,
        },
        {
          test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|image.svg)$/,
          loader: 'url-loader?limit=1&name=[name].[ext]',
        },
      ],
    }
  }
}

module.exports = config
