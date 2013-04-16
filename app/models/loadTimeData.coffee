Spine = require('spine')

class LoadTimeData extends Spine.Model
# Configure name & attributes
  @configure 'LoadTimeData', 'data'
  
  # Persist with Local Storage
  @extend Spine.Model.Local
  
  # LoadTimeData(data: {textdirection: "ltr", title: "skin"})
  # LoadTimeData.save()

module.exports = LoadTimeData