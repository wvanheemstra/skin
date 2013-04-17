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
      data: {name: "App1_Name", title: "App1_Title", belongsTo: ["All"]}
    )

    loadTimeData.loadTimeApps().create(
      data: {name: "App2_Name", title: "App2_Title", belongsTo: ["All"]}
    )
        
    #@log('loadTimeData.loadTimeApps().model.all().length:')
    #@log(loadTimeData.loadTimeApps().model.all().length)
    
    loadTimeData = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Administration"}
    )
 
    loadTimeData.loadTimeApps().create(
      data: {name: "Persons", title: "Persons", belongsTo: ["All", "Administration"]}
    )

    LoadTimeData.fetch()

module.exports = Index