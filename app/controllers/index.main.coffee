Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
LoadTimeApp = require('models/loadTimeApp')
$ = Spine.$

class Show extends Spine.Controller
  # Set the HTML class
  className: 'show'

  events:
    'click .edit': 'edit'

  constructor: ->
    super
    @log("Index Main Initialized")
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
    
  edit: ->
    @navigate('/index', @item.id, 'edit') 
    
class Edit extends Spine.Controller
  className: 'edit'
  
  events:
    'submit form': 'submit'
    'click .save': 'submit'
    'click .delete': 'delete'
    
  elements: 
    'form': 'form'
    
  constructor: ->
    super
    @active @change
  
  render: ->
    @html require('views/form')(@item)
    
  change: (params) =>
    @item = LoadTimeData.find(params.id)
    @render()
    
  submit: (e) ->
    e.preventDefault()
    @item.fromForm(@form).save()
    @navigate('/index', @item.id)
    
  delete: ->
    @item.destroy() if confirm('Are you sure?')

class Main extends Spine.Stack
  className: 'main stack'
  controllers:
    show: Show
    edit: Edit

module.exports = Main