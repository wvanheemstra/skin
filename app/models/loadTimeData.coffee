Spine = require('spine')
LoadTimeApp = require('models/loadTimeApp')

class LoadTimeData extends Spine.Model
# Configure name & attributes
  @configure 'LoadTimeData', 'data'
  @hasMany 'loadTimeApps', 'models/loadTimeApp'
  
  # Persist with Local Storage
  @extend Spine.Model.Local
  
  # Persist with AJAX
  # @extend Spine.Model.Ajax
  # @url '/loadTimeDatas' is the default

  @filter: (query) ->
    return @all() unless query
    query = query.toLowerCase()
    @select (item) ->
      item.data.title?.toLowerCase().indexOf(query) isnt -1

  # LoadTimeData(data: {textdirection: "ltr", title: "skin"})
  # LoadTimeData.save()

module.exports = LoadTimeData