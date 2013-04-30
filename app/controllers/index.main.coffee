Spine = require('spine')
LoadTimeData = require('models/loadTimeData')
LoadTimeApp = require('models/loadTimeApp')
$ = Spine.$

SlidingPane = require('controllers/slidingpane')

class Show extends Spine.Controller
  # Set the HTML class
  className: 'show'

  events:
    'click .edit': 'edit'
    'click .toggle': 'toggle'
    'click .ruler': 'ruler'  

  constructor: ->
    super
    @log("Index Main Show Initialized")
    # Bind the change() callback
    # to the *active* event
    @active @change
    
    @slidingPane = new SlidingPane
    
  render: ->
    @log('Main Show - call to render received')
    # Render a template, replacing the 
    # controller's HTML
    @html require('views/show')(@item)
    
#  slidingpane: (params) ->  
#    @log('Main - call to slidingpane received')
#    @slidingPane.slidingpane(params)
    
  change: (params) =>
    @log('Main Show  - call to change received')
    @item = LoadTimeData.find(params.id)
    @render()

  edit: ->
    @navigate('/index', @item.id, 'edit') 
    
  toggle: (a) ->
    @log('Main Show  - call to toggle received')
    if $(a.currentTarget).attr('sign') == '▲' 
      $(a.currentTarget).attr('sign', '▼')
    else
      $(a.currentTarget).attr('sign', '▲') 

  ruler: (a) ->
    @log('Main Show  - call to ruler received')
    if a.currentTarget.innerHTML == 'Show'
      a.currentTarget.innerHTML = 'Hide'
      $(document.getElementById('my-div').children[0]).addClass('ruler')
    else
      a.currentTarget.innerHTML = 'Show'
      $(document.getElementById('my-div').children[0]).removeClass('ruler')

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
    data = {}
    data['title'] = @item.fromForm(@form).title
    delete @item.fromForm(@form).title
    @item.fromForm(@form).data = data
    @item.fromForm(@form).save()
    @navigate('/index', @item.id)
    
  delete: ->
    @item.destroy() if confirm('Are you sure to delete ?')

class Main extends Spine.Stack
  className: 'main stack'
  controllers:
    show: Show
    edit: Edit

module.exports = Main