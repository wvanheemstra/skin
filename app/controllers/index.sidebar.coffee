Spine   = require('spine')
LoadTimeData = require('models/loadTimeData')
List    = require('spine/lib/list')
$       = Spine.$

class Sidebar extends Spine.Controller
  className: 'sidebar'
    
  elements:
    '.items': 'items'
    'input': 'search'
    
  events:
    'keyup input': 'filter'
    'click footer button': 'create'
  
  constructor: ->
    super
    @log("Index Sidebar Initialized")
    @html require('views/sidebar')()
    
    @list = new List
      el: @items, 
      template: require('views/item'), 
      selectFirst: true

    @list.bind 'change', @change

    @active (params) -> 
      @list.change(LoadTimeData.find(params.id))
    
    LoadTimeData.bind('refresh change', @render)
  
  filter: ->
    @query = @search.val()
    @render()
    
  render: =>
    index = LoadTimeData.filter(@query)
    @list.render(index)
    
  change: (item) =>
    @navigate '/index', item.id
    
  create: ->
    item = LoadTimeData.create()
    @navigate('/index', item.id, 'edit')
    
module.exports = Sidebar