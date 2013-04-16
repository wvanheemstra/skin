Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
Manager = require('spine/lib/manager')
$       = Spine.$

Main    = require('controllers/index.main')
Sidebar = require('controllers/index.sidebar')

class Index extends Spine.Controller
  className: 'index'

  constructor: ->
    super

    @sidebar = new Sidebar
    @main    = new Main
    
    @routes
      '/index/:id/edit': (params) -> 
        @sidebar.active(params)
        @main.edit.active(params)
      '/index/:id': (params) ->
        @sidebar.active(params)
        @main.show.active(params)
    
    divide = $('<div />').addClass('vdivide')
    
    @append @sidebar, divide, @main

    # Create instances at the start, will come from the database in the future
    
    item = LoadTimeData.create(data: {textdirection: "ltr", title: "Administration"})
    item = LoadTimeData.create(data: {textdirection: "ltr", title: "All"})

    LoadTimeData.fetch()

module.exports = Index