Spine = require('spine')
$ = Spine.$

class Tabs extends Spine.Controller
  # Set the HTML class
  className: 'tabs'
  domElement: new Array()
  
  constructor: ->
    super 
    @log("Tabs Initialized")
    
  tabs: () ->  
    
    $("#content div").hide() # Initially hide all content
    $("#tabs li:first").attr "id", "current" # Activate first tab
    $("#content div:first").fadeIn() # Show first tab content
    $("#tabs a").click (e) ->
      e.preventDefault()
      if $(this).closest("li").attr("id") is "current" #detection for current tab
        return
      else
        $("#content div").hide() #Hide all content
        $("#tabs li").attr "id", "" #Reset id's
        $(this).parent().attr "id", "current" # Activate this
        $("#" + $(this).attr("name")).fadeIn() # Show content for current tab
      
module.exports = Tabs      