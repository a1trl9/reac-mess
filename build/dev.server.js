const {createServer} = require('http')
const webpack = require('webpack');
const config = require('./dev.config')

const compiler = webpack(config)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    color: true,
    chunks: false,
    chunkModules: false,
  },
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const app = createServer((req, res) => {
  devMiddleware(req, res, () => {
    hotMiddleware(req, res, () => {
      res.statusCode = 404
      res.end('Not Found')
    })
  })
})

const port = 3001

app.listen(port, '0.0.0.0', () => {
  process.stdout.write(`The dev server is listening on port ${port}\n`)
})
