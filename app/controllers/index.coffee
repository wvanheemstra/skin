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
      data: {name: "App1_Name", title: "App1_Title"}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "App2_Name", title: "App2_Title"}
    )

    @log('loadTimeData1:')
    @log(loadTimeData1)

    @log('loadTimeData1.loadTimeApps():')
    @log(loadTimeData1.loadTimeApps())
    
    @log('loadTimeData1.loadTimeApps().model.all():')
    @log(loadTimeData1.loadTimeApps().model.all())
    
    @log('loadTimeData1.loadTimeApps().model.all().length:')
    @log(loadTimeData1.loadTimeApps().model.all().length)
    
    #loadTimeData1.loadTimeApps[0] = LoadTimeApp.create(data: {name: "App1", title: "App1_Title"})
    
    #LoadTimeApp.create(data: {name: "App1", title: "App1_Title"})
    
    #loadTimeData1.loadTimeApps().create(data: {name: "App1", title: "App1_Title"})
    
    #loadTimeData1.loadTimeApps().create(data: {name: "App1_2", title: "App1_2_Title"})
    
    #LoadTimeData.create(data: {textdirection: "ltr", title: "Administration"})
    #loadTimeData1.loadTimeApps().create(data: {name: "App2", title: "App2Title"})

    LoadTimeApp.fetch()   

    LoadTimeData.fetch()

module.exports = Index