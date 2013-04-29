Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
LoadTimeApp = require('models/loadTimeApp')
Manager = require('spine/lib/manager')
$       = Spine.$

Main    = require('controllers/index.main')
Sidebar = require('controllers/index.sidebar')

class Index extends Spine.Controller
  className: 'index'

  events:
    'click .vdivide a': 'resize'

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
        
    divide = $('<div><a /></div>').addClass('vdivide')
    
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
    
    loadTimeData1.loadTimeApps().create(
      data: {name: "Persons", title: "Persons", belongsTo: ["All", "Administration"], icon: "Profile"}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Four", title: "Four", belongsTo: ["All", "Documents"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Files", title: "Files", belongsTo: ["All", "Documents"], icon: "File"}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Other", title: "Other", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Seven", title: "Seven", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Eight", title: "Eight", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Nine", title: "Nine", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Ten", title: "Ten", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Eleven", title: "Eleven", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Twelve", title: "Twelve", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Thirteen", title: "Thirteen", belongsTo: ["All", "Other"]}
    )

    loadTimeData1.loadTimeApps().create(
      data: {name: "Fourteen", title: "Fourteen", belongsTo: ["All", "Other"]}
    )
    
    #@log('loadTimeData.loadTimeApps().model.all().length:')
    #@log(loadTimeData.loadTimeApps().model.all().length)
    
    loadTimeData2 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Administration"}
    )
 
#    loadTimeData2.loadTimeApps().create(
#      data: {name: "Persons", title: "Persons", belongsTo: ["All", "Administration"], icon: "Profile"}
#    )

    loadTimeData3 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Documents"}
    )

    loadTimeData5 = LoadTimeData.create(
      data: {textdirection: "ltr", title: "Other"}
    )
 
#    loadTimeData5.loadTimeApps().create(
#      data: {name: "Other", title: "Other", belongsTo: ["All", "Other"]}
#    )

    LoadTimeApp.fetch()
    LoadTimeData.fetch()
  
  resize: ->
    @sidebar.resize()

module.exports = Index