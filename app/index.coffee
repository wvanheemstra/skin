require('lib/setup')

Spine = require('spine')
Index = require('controllers/index')
Slider = require('controllers/slider')
Tabs = require('controllers/tabs')

# app/index.coffee
class App extends Spine.Controller
  constructor: ->
    super
    @log("App Initialized")
    @index = new Index
    @slider = new Slider
    @tabs = new Tabs
    @append @index.active(), @slider, @tabs

    Spine.Route.setup()

module.exports = App
    