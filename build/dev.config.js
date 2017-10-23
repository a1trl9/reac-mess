const config = require('./webpack.config')

module.exports = isServer => config(false, isServer)
