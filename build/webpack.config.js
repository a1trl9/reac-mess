const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const exclude = /node_modules/

function config(isProd, isServer) {
  const config = {
    entry: isServer ? {
      server: [
        path.resolve(__dirname, '../src/server.js')
      ]
    } : {
      app: [
        !isProd ? 'react-hot-loader/patch' : false,
        !isProd ? 'webpack-hot-middleware/client?path=//0.0.0.0:' +
        '3001/__webpack_hmr&overlay=false' : false,
        path.resolve(__dirname, '../src/app/entry.js'),
      ].filter(Boolean),
    },
    output: {
      path: path.resolve(__dirname, '../static'),
      filename: isProd && !isServer ? '[name].[chunkhash].js' : '[name].js',
      publicPath: '/'
    },
    plugins: [
      isProd ? false : new webpack.HotModuleReplacementPlugin(),
      isServer ? false : new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: 2
      }),
      isProd ? new webpack.DefinePlugin({
         'process.env.NODE_ENV': '"production"'
      }) : false,
      isServer ? false : new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/app/entry.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      isProd && !isServer ? new UglifyJSPlugin({
        uglifyOptions: {
          output: {comments: false},
          sourceMap: true
        }
      }) : false,
      isProd ? new ExtractTextPlugin('app.[contenthash].css') : false
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude,
          enforce: 'pre',
          options: {
            fix: true,
            failOnError: false
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude
        },
        {
          test: /\.css$/,
          use: isProd ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!less-loader!postcss-loader'
          }) : [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ],
          exclude
        },
        {
          test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|image.svg)$/,
          loader: 'url-loader?limit=1&name=[name].[ext]'
        },
        {
          test: /\.svg$/,
          loader: 'svg-loader'
        },
        isServer ? false : {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ].filter(Boolean)
    },
    target: isServer ? 'node' : 'web',
    externals: isServer ? [nodeExternals()] : [],
  }
  if (isServer) {
    config.node = {
      __dirname: false,
      __filename: false
    }
  }
  return config
}

module.exports = config
