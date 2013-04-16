Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
Manager = require('spine/lib/manager')
$       = Spine.$

Main    = require('controllers/index.main')

class Index extends Spine.Controller
  className: 'index'

  constructor: ->
    super

    @main    = new Main

    @routes
      '/index/:id': (params) ->
        @main.show.active(params)

    @append @main

    # Create an instance at the start
    item = LoadTimeData.create(data: {textdirection: "ltr", title: "skin"})

    LoadTimeData.fetch()

module.exports = Index