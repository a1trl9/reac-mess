const config = require('./webpack.config')

module.exports = isServer => config(true, isServer)
