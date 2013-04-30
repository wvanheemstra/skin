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
    'click footer a': 'create'
    'keyup .vdivide span': 'resize'
    'click .item': 'activate'
  
  constructor: ->
    super
    @log("Index Sidebar Initialized")
    @html require('views/sidebar')()
    
    @list = new List
      el: @items, 
      template: require('views/item'),
      selectFirst: false # selectFirst later on!

    @list.bind 'change', @change
    
    @active (params) -> 
      @log('Sidebar - call received to active with params: '+JSON.stringify(params))
      @list.change(LoadTimeData.find(params.id))
    
    LoadTimeData.bind('refresh change', @render)
  
  filter: ->
    @query = @search.val()
    @render()
    
  selectFirst: ->
    @log('Sidebar - call received to selectFirst')
    @list.children(':first').click()
    
  render: =>
    @log('Sidebar - call received to render')
    index = LoadTimeData.filter(@query)
    @list.render(index)
    
  change: (item) =>
    @log('Sidebar - call received to change item.id: '+item.id)
    @navigate '/index', item.id

  create: ->
    @log('Sidebar - call received to create')
    item = LoadTimeData.create()
    @navigate('/index', item.id, 'edit')
    
  activate: (item) ->
    @log('Sidebar - call received to activate')
    $(item.currentTarget).addClass('active')
    $(item.currentTarget).siblings('div').removeClass('active')
    
  resize: ->
    @log('Sidebar - call received to resize')
    if(parseInt(this.el[0].style.width) == 0)
      this.el[0].style.width = '169px'
      this.el[0].style.visibility = 'visible'
    else
      this.el[0].style.width = '0px'
      this.el[0].style.visibility = 'hidden'
    
module.exports = Sidebar