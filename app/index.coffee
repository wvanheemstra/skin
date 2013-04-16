require('lib/setup')

Spine = require('spine')
Index = require('controllers/index')

# app/index.coffee
class App extends Spine.Controller
  constructor: ->
    super
    @log("Initialized")
    @index = new Index
    @append @index

    Spine.Route.setup()

module.exports = App
    