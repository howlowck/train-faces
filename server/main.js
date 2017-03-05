const express = require('express')
const debug = require('debug')('app:server')
// const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const { Client } = require('project-oxford')
const compress = require('compression')
const bodyParser = require('body-parser')
const Container = require('./Container')

const app = express()
const container = new Container()

container.register('faceClient', (apiKey) => {
  return new Client(apiKey)
}, true)

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: project.paths.client(),
    hot: true,
    quiet: project.compiler_quiet,
    noInfo: project.compiler_quiet,
    lazy: false,
    stats: project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  // app.use('*', function (req, res, next) {
  //   const filename = path.join(compiler.outputPath, 'index.html')
  //   compiler.outputFileSystem.readFile(filename, (err, result) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     res.set('content-type', 'text/html')
  //     res.send(result)
  //     res.end()
  //   })
  // })
} else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

app.get('/person-groups', (req, res) => {
  const faceKey = req.get('COG-FACE-KEY')
  const client = container.get('faceClient', [faceKey])
  client.face.personGroup.list()
    .then((response) => {
      res.json(response)
    })
})

app.post('/person-groups', (req, res) => {

})

module.exports = app
