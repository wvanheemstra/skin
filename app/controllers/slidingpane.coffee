###
Copyright (c) 2012 http://www.dforge.net

More information can be found at:
http://www.dforge.net/2012/11/19/slidingpane-slide-page-to-reveal-content-underneath-using-html5javascript

This software is released under MIT license:
http://www.dforge.net/mit-license.txt

Version 0.8 - Last updated: 2012.11.17
Version 0.8.1 - Last updated: 2012.12.11 - Fixed bug with complex SlidingPanes embedded in table cells where the
hidden div was not positioned correctly. Component wrapper needed to be
set to relative positioning.
###

Spine = require('spine')
$ = Spine.$

class SlidingPane extends Spine.Controller
  # Set the HTML class
  className: 'slidingPane'
  domElement: new Array()
  
  constructor: ->
    super 
    @log("SlidingPane Initialized")

  slidingpane: (config) ->
    console.log("SlidingPane - inside slidingpane: config: "+config)

    # Internal use, but exposed in case you want to query it 
    @targetElement = null
    @hiddenPaneElement = null
    @isOpen = false
    @pre = "dforge-"

    # Options 
    @targetId = null
    @id = @pre + "hidden-pane"
    @side = "left"
    @width = 200
    @duration = 1
    @timingFunction = "ease-out"
    @shadowStyle = "0px 0px 30px #000"

    # Private variables 
    $ = (selector) ->
      document.querySelector selector

    parentElement = null
    transitionStyle = ""
    boxShadowStyle = ""
    dimensionStyle = ""
    wrapperOrigPos = 0
    visiblePaneWrapper = null
    
    @setSide = (s) ->
      console.log("SlidingPane - inside setSide: s: "+s)
      me = this
      if ["top", "right", "bottom", "left"].indexOf(s) > -1
        me.side = s
        wrapperOrigPos = visiblePaneWrapper.getBoundingClientRect()[me.side]
      me

    @getTranslate = (s, w) ->
      console.log("SlidingPane - inside getTranslate")     
      t = ""
      switch s
        when "top"
          t = "translateY(" + w.toString() + "px)"
        when "bottom"
          t = "translateY(-" + w.toString() + "px)"
        when "right"
          t = "translateX(-" + w.toString() + "px)"
        when "left"
        else
          t = "translateX(" + w.toString() + "px)"
      t

    @open = ->
      console.log("SlidingPane - inside open")    
      me = this
      s = boxShadowStyle + ";" + transitionStyle + ";" + dimensionStyle
      t = me.getTranslate(me.side, me.width)
      visiblePaneWrapper.setAttribute "style", s + "-webkit-transform: " + t + "; -moz-transform: " + t + "; -o-transform: " + t + "; transform: " + t + ";"
      me.isOpen = true
      me

    @close = ->
      console.log("SlidingPane - inside close")     
      me = this
      s = boxShadowStyle + ";" + transitionStyle + ";" + dimensionStyle
      t = me.getTranslate(me.side, 0)
      visiblePaneWrapper.setAttribute "style", s + "-webkit-transform: " + t + "; -moz-transform: " + t + "; -o-transform: " + t + "; transform: " + t + ";"
      me.isOpen = false
      me

    @toggle = ->
      console.log("SlidingPane - inside toggle")    
      me = this
      if me.isOpen
        me.close()
      else
        me.open()
      me

    @init = ->
      console.log("SlidingPane - inside init: this: "+this)
      me = this
      me.hiddenPaneElement = $("#" + me.id) or document.createElement("div")
      me.targetElement = $("#" + me.targetId)
      console.log("SlidingPane - inside init: me.targetId: "+me.targetId)
      console.log("SlidingPane - inside init: me.targetElement: "+me.targetElement)
      if(!me.targetElement)
        return; # elements have not been rendered yet
      componentWrapper = document.createElement("div")
      hiddenPaneWrapper = document.createElement("div")
      visiblePaneWrapper = document.createElement("div")
      componentWrapper.id = me.targetId + "-component"
      hiddenPaneWrapper.id = me.id + "-wrapper"
      visiblePaneWrapper.id = me.targetId + "-wrapper"
      me.hiddenPaneElement.id = me.id

      # Before we start, get parent node of target element 
      parentElement = me.targetElement.parentNode

      # Set perspective style to enable 3d animation 
      parentElement.setAttribute "style", ((if parentElement.getAttribute("style") then parentElement.getAttribute("style") + ";" else "")) + "-webkit-perspective: 0px; -moz-perspective: 0px; -o-perspective: 0px; perspective: 0px;"

      # Set styles 
      boxShadowStyle = "box-shadow: " + me.shadowStyle
      transitionStyle = "transition: transform " + me.duration.toString() + "s " + me.timingFunction + "; -moz-transition: -moz-transform " + me.duration.toString() + "s " + me.timingFunction + "; -webkit-transition: -webkit-transform " + me.duration.toString() + "s " + me.timingFunction + "; -o-transition: -o-transform " + me.duration.toString() + "s " + me.timingFunction
      dimensionStyle = "width: " + me.targetElement.getBoundingClientRect().width + "px; height: " + me.targetElement.getBoundingClientRect().height + "px;"

      # Wrap target element so we don't mess around with the contents of the target element 
      visiblePaneWrapper.appendChild me.targetElement
      visiblePaneWrapper.setAttribute "style", boxShadowStyle + ";" + transitionStyle + ";" + dimensionStyle

      # Wrap hidden element to set absolute positioning and ensure the contents clips 
      hiddenPaneWrapper.setAttribute "style", "position: absolute; overflow: hidden; " + dimensionStyle + ((if me.hiddenPaneElement.getAttribute("style") then me.hiddenPaneElement.getAttribute("style") else ""))
      hiddenPaneWrapper.appendChild me.hiddenPaneElement

      # Wrap the whole thing up to set preserve-3d 
      componentWrapper.setAttribute "style", "position: relative; overflow: hidden; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; " + dimensionStyle
      componentWrapper.appendChild hiddenPaneWrapper
      componentWrapper.appendChild visiblePaneWrapper

      # Finally, attach the component wrapper to the parent 
      parentElement.appendChild componentWrapper

      # Determine original position of wrapper for toggle function 
      me.setSide me.side
      me.close()

    @constructor = (c) ->
      console.log("SlidingPane - inside constructor: c: "+c)
      c = c or {}
      for p of c
        this[p] = c[p]
        @log("SlidingPane - inside constructor: this[p]: "+this[p])
      @init()

    @constructor config

module.exports = SlidingPane   