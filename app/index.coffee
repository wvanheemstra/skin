require('lib/setup')

Spine = require('spine')

# app/index.coffee
class App extends Spine.Controller
  constructor: ->
    super
    @log("Initialized")

module.exports = App

require('lib/setup')

Spine    = require('spine')
Index = require('controllers/index')

class App extends Spine.Controller
  constructor: ->
    super
    @index = new Index
    @append @index

    Spine.Route.setup()

module.exports = App
    