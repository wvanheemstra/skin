Spine = require('spine')
LoadTimeData = require('models/loadTimeData')

class LoadTimeApp extends Spine.Model
# Configure name & attributes
  @configure 'LoadTimeApp', 'data'
  @belongsTo 'LoadTimeData', 'models/loadTimeData'
  
  # Persist with Local Storage
  @extend Spine.Model.Local

  # Persist with AJAX
  # @extend Spine.Model.Ajax
  # @url '/loadTimeApps' is the default

  @filter: (query) ->
    return @all() unless query
    query = query.toLowerCase()
    @select (item) ->
      item.data.title?.toLowerCase().indexOf(query) isnt -1

  # LoadTimeApp(data: {textdirection: "ltr", title: "skinapp"})
  # LoadTimeApp.save()

module.exports = LoadTimeApp