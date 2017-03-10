const express = require('express')
const debug = require('debug')('app:server')
// const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const bodyParser = require('body-parser')
const Container = require('./Container')
const FakeRepo = require('./repositories/FakeRepo')
const _ = require('lodash')

const app = express()
const container = new Container()

const parseBase64 = (base64) => {
  var match = /data:([^;]+);base64,(.*)/.exec(base64)
  if (!match) {
    return null
  }

  return {
    contentType: match[1],
    data: new Buffer(match[2], 'base64')
  }
}
// container.register('faceApiRepo', (apiKey) => new FaceApiRepo(apiKey), true)
container.register('faceApi', () => new FakeRepo(), true)

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json({ limit: '5mb' }))

const getKeys = (req) => {
  const faceApiKey = req.get('COG-SERVICES-FACEAPI-KEY')
  return {
    faceApiKey
  }
}

const faceApiMiddleware = (req, res, next) => {
  const { faceApiKey } = getKeys(req)
  req.faceApi = container.get('faceApi', faceApiKey)
  next()
}

app.use(faceApiMiddleware)

app.get('/person-groups', (req, res) => {
  const api = req.faceApi
  api.getPersonGroups().then((data) => {
    console.log(data)
    res.json(data)
  })
})

app.post('/person-groups', (req, res) => {
  console.log('in the post method', req.body.name)
  const api = req.faceApi
  const { name, userData = '' } = req.body
  const groupId = _.snakeCase(name)
  api.createPersonGroup(groupId, { name, userData })
    .then((data) => {
      res.json(data)
    })
})

app.delete('/person-groups', (req, res) => {
  const api = req.faceApi
  const { groupId } = req.body
  api.deletePersonGroup(groupId)
    .then((data) => {
      res.json(data)
    })
})

app.get('/persons', (req, res) => {
  console.log('in the get method all persons')
  const api = req.faceApi
  const groupId = req.query['group_id']
  api.getPersons(groupId).then((data) => {
    res.json(data)
  })
})

app.post('/persons', (req, res) => {
  const api = req.faceApi
  const { groupId, name, userData = '' } = req.body
  api.createPerson(groupId, { name, userData })
    .then(data => {
      res.json(data)
    })
})

app.delete('/persons', (req, res) => {
  const api = req.faceApi
  const { groupId, personId } = req.body
  api.deletePerson(groupId, personId)
    .then((data) => {
      res.json(data)
    })
})

app.post('/face', (req, res) => {
  const api = req.faceApi
  const { groupId, personId, userData = '', base64, file } = req.body
  let data
  if (base64) {
    console.log('got base64 face')
    data = parseBase64(data)
  }

  if (file) {
    // TODO: process files to data
  }
  api.createFace(groupId, personId, { data, userData })
    .then(response => {
      res.json(response)
    })
})

app.get('/face', (req, res) => {
  const api = req.faceApi
  const { group_id: groupId, person_id: personId, face_id: faceId } = req.query
  api.getFace(groupId, personId, faceId).then(data => res.json(data))
})

app.delete('/face', (req, res) => {
  const api = req.faceApi
  const { groupId, personId, faceId } = req.body
  api.deleteFace(groupId, personId, faceId)
    .then((data) => {
      res.json(data)
    })
})

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

module.exports = app
