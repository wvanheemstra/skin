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
      data: {name: "App1_Name", title: "App1_Title", belongsTo: ["All"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "App2_Name", title: "App2_Title", belongsTo: ["All"]}
    )
        
    #@log('loadTimeData1.loadTimeApps().model.all().length:')
    #@log(loadTimeData1.loadTimeApps().model.all().length)
    
    loadTimeData2 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Administration"}
    )
 
    loadTimeData2.loadTimeApps().create(
      data: {name: "App3_Name", title: "App3_Title", belongsTo: ["All", "Administration"]}
    )

    LoadTimeApp.fetch()

    LoadTimeData.fetch()

module.exports = Index