const path = require('path')
const webpack= require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const exclude = /node_modules/

function config(isProd) {
  return {
    entry: {
      app: [
        !isProd ? 'react-hot-loader/patch' : false,
        !isProd ? 'webpack-hot-middleware/client?path=//0.0.0.0:' +
        '3001/__webpack_hmr&overlay=false' : false,
        path.resolve(__dirname, '../src/app/entry.js'),
      ].filter(Boolean)
    },
    output: {
      path: path.resolve(__dirname, '../static'),
      filename: isProd ? '[name].[chunkhash].js' : '[name].js',
      publicPath: '/'
    },
    plugins: [
      isProd ? false : new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: 2
      }),
      isProd ? new webpack.DefinePlugin({
         'process.env.NODE_ENV': '"production"'
      }) : false,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/app/entry.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      isProd ? new UglifyJSPlugin({
        uglifyOptions: {
          output: {comments: false},
          sourceMap: true
        }
      }) : false,
    ].filter(Boolean),
    module: {
      loaders: [
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
          loader: 'style-loader!css-loader!less-loader!postcss-loader',
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
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    target: 'web'
  }
}

module.exports = config
