Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
LoadTimeApp = require('models/loadTimeApp')
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
    loadTimeData = LoadTimeData.create(
      data: {textdirection: "ltr", title: "All"}
    )
    
    loadTimeData.loadTimeApps().create(
      data: {name: "One", title: "One", belongsTo: ["All"]}
    )

    loadTimeData.loadTimeApps().create(
      data: {name: "Two", title: "Two", belongsTo: ["All"]}
    )
        
    #@log('loadTimeData.loadTimeApps().model.all().length:')
    #@log(loadTimeData.loadTimeApps().model.all().length)
    
    loadTimeData = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Administration"}
    )
 
    loadTimeData.loadTimeApps().create(
      data: {name: "Persons", title: "Persons", belongsTo: ["All", "Administration"]}
    )


    loadTimeData = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Other"}
    )
 
    loadTimeData.loadTimeApps().create(
      data: {name: "Other", title: "Other", belongsTo: ["All", "Other"]}
    )


    LoadTimeData.fetch()

module.exports = Index