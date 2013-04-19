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
    loadTimeData1 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "All"}
    )
    
    loadTimeData1.loadTimeApps().create(
      data: {name: "One", title: "One", belongsTo: ["All"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Two", title: "Two", belongsTo: ["All"]}
    )
        
    #@log('loadTimeData.loadTimeApps().model.all().length:')
    #@log(loadTimeData.loadTimeApps().model.all().length)
    
    loadTimeData2 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Administration"}
    )
 
    loadTimeData2.loadTimeApps().create(
      data: {name: "Persons", title: "Persons", belongsTo: ["All", "Administration"]}
    )

    loadTimeData3 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Other"}
    )
 
    loadTimeData3.loadTimeApps().create(
      data: {name: "Other", title: "Other", belongsTo: ["All", "Other"]}
    )

    LoadTimeApp.fetch()
    LoadTimeData.fetch()

module.exports = Index