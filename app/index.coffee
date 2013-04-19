require('lib/setup')

Spine = require('spine')
Index = require('controllers/index')
Slider = require('controllers/slider')

# app/index.coffee
class App extends Spine.Controller
  constructor: ->
    super
    @log("App Initialized")
    @index = new Index
    @slider = new Slider
    @append @index, @slider

    Spine.Route.setup()

module.exports = App
    