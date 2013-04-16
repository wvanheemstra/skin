Spine = require('spine')

class LoadTimeData extends Spine.Model
# Configure name & attributes
  @configure 'LoadTimeData', 'data'
  
  # Persist with Local Storage
  @extend Spine.Model.Local

  @filter: (query) ->
    return @all() unless query
    query = query.toLowerCase()
    @select (item) ->
      item.data?.toLowerCase().indexOf(query) isnt -1

  # LoadTimeData(data: {textdirection: "ltr", title: "skin"})
  # LoadTimeData.save()

module.exports = LoadTimeData