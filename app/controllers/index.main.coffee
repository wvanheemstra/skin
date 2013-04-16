Spine = require('spine')

LoadTimeData = require('models/loadTimeData')
$       = Spine.$

class Show extends Spine.Controller
  # Set the HTML class
  className: 'show'

  constructor: ->
    super

    # Bind the change() callback
    # to the *active* event
    @active @change

  render: ->
    # Render a template, replacing the 
    # controller's HTML
    @html require('views/show')(@item)

  change: (params) =>
    @item = LoadTimeData.find(params.id)
    @render()
       
class Main extends Spine.Stack
  className: 'main stack'
  controllers:
    show: Show

module.exports = Main