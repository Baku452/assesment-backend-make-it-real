const user = require('./api/user')
const fav = require('./api/fav')
const listFav = require('./api/listFavs')
const pkg = require('./package.json')
const auth = require('./api/auth')

function routes(app) {
  app.set('pkg', pkg)
  app.get('/', (req, res) => {
    res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  })

  app.use('/api/users', user)
  app.use('/api/items', fav)
  app.use('/api/favs', listFav)
  app.use('/auth', auth)
}

module.exports = routes




