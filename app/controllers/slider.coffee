Spine = require('spine')
$ = Spine.$

class Slider extends Spine.Controller
  # Set the HTML class
  className: 'slider'

  constructor: ->
    super 
    @log("Slider Initialized")
    
  slider: (method) ->  
    if methods[method]
      console.log('slider method:' + method)
      methods[method].apply this, Array::slice.call(arguments, 1)
    else if typeof method is "object" or not method
      console.log('slider without method')
      console.log('slider without method: this ' + this)      
      console.log('slider without method: arguments ' + JSON.stringify(arguments))        
      methods.init.apply this, arguments  
    else console.log('invalid method call!')
    console.log('end of slider')
  # used by slider  
  # sof global variables
  scrollbarNumber = 0
  xScrollDistance = 0
  yScrollDistance = 0
  scrollIntervalTime = 10
  scrollbarDistance = 0
  isTouch = "ontouchstart" of window
  supportsOrientationChange = "onorientationchange" of window
  isWebkit = false
  has3DTransform = false
  isIe7 = false
  isIe8 = false
  isIe9 = false
  isIe = false
  isGecko = false
  grabOutCursor = "pointer"
  grabInCursor = "pointer"
  onChangeEventLastFired = new Array()
  autoSlideTimeouts = new Array()
  iosSliders = new Array()
  iosSliderSettings = new Array()
  isEventCleared = new Array()
  slideTimeouts = new Array()
  activeChildOffsets = new Array()
  activeChildInfOffsets = new Array()
  infiniteSliderOffset = new Array()
  sliderMin = new Array()
  sliderMax = new Array()
  sliderAbsMax = new Array()
  touchLocks = new Array()
  # eof global variables  
  
  # used by slider 
  # private functions
  helpers =
    showScrollbar: (settings, scrollbarClass) ->
      if settings.scrollbarHide
        $("." + scrollbarClass).css
          opacity: settings.scrollbarOpacity
          filter: "alpha(opacity:" + (settings.scrollbarOpacity * 100) + ")"

    hideScrollbar: (settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber) ->
      if settings.scrollbar and settings.scrollbarHide
        i = j

        while i < j + 25
          scrollTimeouts[scrollTimeouts.length] = helpers.hideScrollbarIntervalTimer(scrollIntervalTime * i, distanceOffsetArray[j], ((j + 24) - i) / 24, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings)
          i++

    hideScrollbarInterval: (newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) ->
      scrollbarDistance = (newOffset * -1) / (sliderMax[sliderNumber]) * (stageWidth - scrollMargin - scrollBorder - scrollbarWidth)
      helpers.setSliderOffset "." + scrollbarClass, scrollbarDistance
      $("." + scrollbarClass).css
        opacity: settings.scrollbarOpacity * opacity
        filter: "alpha(opacity:" + (settings.scrollbarOpacity * opacity * 100) + ")"

    slowScrollHorizontalInterval: (node, slideNodes, newOffset, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, activeChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings) ->
      if settings.infiniteSlider
        if newOffset <= (sliderMax[sliderNumber] * -1)
          scrollerWidth = $(node).width()
          if newOffset <= (sliderAbsMax[sliderNumber] * -1)
            sum = originalOffsets[0] * -1
            $(slideNodes).each (i) ->
              helpers.setSliderOffset $(slideNodes)[i], sum + centeredSlideOffset
              childrenOffsets[i] = sum * -1  if i < childrenOffsets.length
              sum = sum + slideNodeOuterWidths[i]

            newOffset = newOffset + childrenOffsets[0] * -1
            sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            infiniteSliderOffset[sliderNumber] = 0
          else
            lowSlideNumber = 0
            lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
            $(slideNodes).each (i) ->
              if helpers.getSliderOffset(this, "x") < lowSlideOffset
                lowSlideOffset = helpers.getSliderOffset(this, "x")
                lowSlideNumber = i

            tempOffset = sliderMin[sliderNumber] + scrollerWidth
            helpers.setSliderOffset $(slideNodes)[lowSlideNumber], tempOffset
            sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            childrenOffsets.splice 0, 1
            childrenOffsets.splice childrenOffsets.length, 0, tempOffset * -1 + centeredSlideOffset
            infiniteSliderOffset[sliderNumber]++
        if (newOffset >= (sliderMin[sliderNumber] * -1)) or (newOffset >= 0)
          scrollerWidth = $(node).width()
          if newOffset >= 0
            sum = originalOffsets[0] * -1
            $(slideNodes).each (i) ->
              helpers.setSliderOffset $(slideNodes)[i], sum + centeredSlideOffset
              childrenOffsets[i] = sum * -1  if i < childrenOffsets.length
              sum = sum + slideNodeOuterWidths[i]

            newOffset = newOffset - childrenOffsets[0] * -1
            sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            infiniteSliderOffset[sliderNumber] = numberOfSlides
            while ((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0)
              highSlideNumber = 0
              highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
              $(slideNodes).each (i) ->
                if helpers.getSliderOffset(this, "x") > highSlideOffset
                  highSlideOffset = helpers.getSliderOffset(this, "x")
                  highSlideNumber = i

              tempOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber]
              helpers.setSliderOffset $(slideNodes)[highSlideNumber], tempOffset
              childrenOffsets.splice 0, 0, tempOffset * -1 + centeredSlideOffset
              childrenOffsets.splice childrenOffsets.length - 1, 1
              sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
              sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
              infiniteSliderOffset[sliderNumber]--
              activeChildOffsets[sliderNumber]++
          if newOffset < 0
            highSlideNumber = 0
            highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
            $(slideNodes).each (i) ->
              if helpers.getSliderOffset(this, "x") > highSlideOffset
                highSlideOffset = helpers.getSliderOffset(this, "x")
                highSlideNumber = i

            tempOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber]
            helpers.setSliderOffset $(slideNodes)[highSlideNumber], tempOffset
            childrenOffsets.splice 0, 0, tempOffset * -1 + centeredSlideOffset
            childrenOffsets.splice childrenOffsets.length - 1, 1
            sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            infiniteSliderOffset[sliderNumber]--
      slideChanged = false
      newChildOffset = helpers.calcActiveOffset(settings, newOffset, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, activeChildOffset, sliderNumber)
      tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
      if settings.infiniteSlider
        slideChanged = true  unless tempOffset is activeChildInfOffsets[sliderNumber]
      else
        slideChanged = true  unless newChildOffset is activeChildOffsets[sliderNumber]
      if slideChanged
        args = new helpers.args("change", settings, node, $(node).children(":eq(" + tempOffset + ")"), tempOffset, endOffset)
        $(node).parent().data "args", args
        settings.onSlideChange args  unless settings.onSlideChange is ""
      activeChildOffsets[sliderNumber] = newChildOffset
      activeChildInfOffsets[sliderNumber] = tempOffset
      newOffset = Math.floor(newOffset)
      helpers.setSliderOffset node, newOffset
      if settings.scrollbar
        scrollbarDistance = Math.floor((newOffset * -1 - sliderMin[sliderNumber] + centeredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth))
        width = scrollbarWidth - scrollBorder
        if newOffset >= (sliderMin[sliderNumber] * -1 + centeredSlideOffset)
          width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1)
          helpers.setSliderOffset $("." + scrollbarClass), 0
          $("." + scrollbarClass).css width: width + "px"
        else if newOffset <= ((sliderMax[sliderNumber] * -1) + 1)
          width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance
          helpers.setSliderOffset $("." + scrollbarClass), scrollbarDistance
          $("." + scrollbarClass).css width: width + "px"
        else
          helpers.setSliderOffset $("." + scrollbarClass), scrollbarDistance
          $("." + scrollbarClass).css width: width + "px"

    slowScrollHorizontal: (node, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings) ->
      distanceOffsetArray = new Array()
      xScrollDistanceArray = new Array()
      nodeOffset = helpers.getSliderOffset(node, "x")
      snapDirection = 0
      maxSlideVelocity = 25 / 1024 * stageWidth
      changeSlideFired = false
      frictionCoefficient = settings.frictionCoefficient
      elasticFrictionCoefficient = settings.elasticFrictionCoefficient
      snapFrictionCoefficient = settings.snapFrictionCoefficient
      if (xScrollDistance > settings.snapVelocityThreshold) and settings.snapToChildren and not snapOverride
        snapDirection = 1
      else snapDirection = -1  if (xScrollDistance < (settings.snapVelocityThreshold * -1)) and settings.snapToChildren and not snapOverride
      if xScrollDistance < (maxSlideVelocity * -1)
        xScrollDistance = maxSlideVelocity * -1
      else xScrollDistance = maxSlideVelocity  if xScrollDistance > maxSlideVelocity
      unless $(node)[0] is $(currentEventNode)[0]
        snapDirection = snapDirection * -1
        xScrollDistance = xScrollDistance * -2
      tempInfiniteSliderOffset = infiniteSliderOffset[sliderNumber]
      if settings.infiniteSlider
        tempSliderMin = sliderMin[sliderNumber]
        tempSliderMax = sliderMax[sliderNumber]
      tempChildrenOffsets = new Array()
      tempSlideNodeOffsets = new Array()
      i = 0

      while i < childrenOffsets.length
        tempChildrenOffsets[i] = childrenOffsets[i]
        tempSlideNodeOffsets[i] = helpers.getSliderOffset($(slideNodes[i]), "x")  if i < slideNodes.length
        i++
      while (xScrollDistance > 1) or (xScrollDistance < -1)
        xScrollDistance = xScrollDistance * frictionCoefficient
        nodeOffset = nodeOffset + xScrollDistance
        if ((nodeOffset > (sliderMin[sliderNumber] * -1)) or (nodeOffset < (sliderMax[sliderNumber] * -1))) and not settings.infiniteSlider
          xScrollDistance = xScrollDistance * elasticFrictionCoefficient
          nodeOffset = nodeOffset + xScrollDistance
        if settings.infiniteSlider
          if nodeOffset <= (tempSliderMax * -1)
            scrollerWidth = $(node).width()
            lowSlideNumber = 0
            lowSlideOffset = tempSlideNodeOffsets[0]
            i = 0

            while i < tempSlideNodeOffsets.length
              if tempSlideNodeOffsets[i] < lowSlideOffset
                lowSlideOffset = tempSlideNodeOffsets[i]
                lowSlideNumber = i
              i++
            newOffset = tempSliderMin + scrollerWidth
            tempSlideNodeOffsets[lowSlideNumber] = newOffset
            tempSliderMin = tempChildrenOffsets[1] * -1 + centeredSlideOffset
            tempSliderMax = tempSliderMin + scrollerWidth - stageWidth
            tempChildrenOffsets.splice 0, 1
            tempChildrenOffsets.splice tempChildrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset
            tempInfiniteSliderOffset++
          if nodeOffset >= (tempSliderMin * -1)
            scrollerWidth = $(node).width()
            highSlideNumber = 0
            highSlideOffset = tempSlideNodeOffsets[0]
            i = 0

            while i < tempSlideNodeOffsets.length
              if tempSlideNodeOffsets[i] > highSlideOffset
                highSlideOffset = tempSlideNodeOffsets[i]
                highSlideNumber = i
              i++
            newOffset = tempSliderMin - slideNodeOuterWidths[highSlideNumber]
            tempSlideNodeOffsets[highSlideNumber] = newOffset
            tempChildrenOffsets.splice 0, 0, newOffset * -1 + centeredSlideOffset
            tempChildrenOffsets.splice tempChildrenOffsets.length - 1, 1
            tempSliderMin = tempChildrenOffsets[0] * -1 + centeredSlideOffset
            tempSliderMax = tempSliderMin + scrollerWidth - stageWidth
            tempInfiniteSliderOffset--
        distanceOffsetArray[distanceOffsetArray.length] = nodeOffset
        xScrollDistanceArray[xScrollDistanceArray.length] = xScrollDistance
      slideChanged = false
      newChildOffset = helpers.calcActiveOffset(settings, nodeOffset, tempChildrenOffsets, stageWidth, tempInfiniteSliderOffset, numberOfSlides, activeChildOffsets[sliderNumber], sliderNumber)
      tempOffset = (newChildOffset + tempInfiniteSliderOffset + numberOfSlides) % numberOfSlides
      if settings.snapToChildren
        if settings.infiniteSlider
          slideChanged = true  unless tempOffset is activeChildInfOffsets[sliderNumber]
        else
          slideChanged = true  unless newChildOffset is activeChildOffsets[sliderNumber]
        if (snapDirection < 0) and not slideChanged
          newChildOffset++
          newChildOffset = childrenOffsets.length - 1  if (newChildOffset >= childrenOffsets.length) and not settings.infinteSlider
        else if (snapDirection > 0) and not slideChanged
          newChildOffset--
          newChildOffset = 0  if (newChildOffset < 0) and not settings.infinteSlider
      if settings.snapToChildren or (((nodeOffset > (sliderMin[sliderNumber] * -1)) or (nodeOffset < (sliderMax[sliderNumber] * -1))) and not settings.infiniteSlider)
        distanceOffsetArray.splice 0, distanceOffsetArray.length
        while (nodeOffset < (tempChildrenOffsets[newChildOffset] - 0.5)) or (nodeOffset > (tempChildrenOffsets[newChildOffset] + 0.5))
          nodeOffset = ((nodeOffset - (tempChildrenOffsets[newChildOffset])) * snapFrictionCoefficient) + (tempChildrenOffsets[newChildOffset])
          distanceOffsetArray[distanceOffsetArray.length] = nodeOffset
        distanceOffsetArray[distanceOffsetArray.length] = tempChildrenOffsets[newChildOffset]
      jStart = 1
      jStart = 0  unless (distanceOffsetArray.length % 2) is 0
      lastTimeoutRegistered = 0
      count = 0
      j = 0

      while j < scrollTimeouts.length
        clearTimeout scrollTimeouts[j]
        j++
      endOffset = (newChildOffset + tempInfiniteSliderOffset + numberOfSlides) % numberOfSlides
      lastCheckOffset = 0
      j = jStart

      while j < distanceOffsetArray.length
        if (j is jStart) or (Math.abs(distanceOffsetArray[j] - lastCheckOffset) > 1) or (j >= (distanceOffsetArray.length - 2))
          lastCheckOffset = distanceOffsetArray[j]
          scrollTimeouts[scrollTimeouts.length] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * j, node, slideNodes, distanceOffsetArray[j], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, newChildOffset, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings)
        j = j + 2
      slideChanged = false
      tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
      if settings.infiniteSlider
        slideChanged = true  unless tempOffset is activeChildInfOffsets[sliderNumber]
      else
        slideChanged = true  unless newChildOffset is activeChildOffsets[sliderNumber]
      scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (j + 1), settings, node, $(node).children(":eq(" + tempOffset + ")"), tempOffset, sliderNumber)  unless settings.onSlideComplete is ""
      slideTimeouts[sliderNumber] = scrollTimeouts
      helpers.hideScrollbar settings, scrollTimeouts, j, distanceOffsetArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber

    onSlideComplete: (settings, node, slideNode, newChildOffset, sliderNumber) ->
      isChanged = (if (onChangeEventLastFired[sliderNumber] isnt newChildOffset) then true else false)
      args = new helpers.args("complete", settings, $(node), slideNode, newChildOffset, newChildOffset)
      $(node).parent().data "args", args
      settings.onSlideComplete args  unless settings.onSlideComplete is ""
      onChangeEventLastFired[sliderNumber] = newChildOffset

    getSliderOffset: (node, xy) ->
    
      console.log('inside getSliderOffset')
      console.log('inside getSliderOffset: node ' + JSON.stringify(node))
      console.log('inside getSliderOffset: xy ' + xy)  # WE HAVE COME THIS FAR !!    
      
      sliderOffset = 0
      if xy is "x"
        xy = 4
      else
        xy = 5
      if has3DTransform and not isIe7 and not isIe8
        transforms = new Array("-webkit-transform", "-moz-transform", "transform")
        i = 0

        console.log('transforms.length: ' + transforms.length)

        while i < transforms.length
          unless $(node).css(transforms[i]) is `undefined`
            if $(node).css(transforms[i]).length > 0
              transformArray = $(node).css(transforms[i]).split(",")
              break
          console.log('i: '+ i)   
          
          
          
          
          
          
          
          i++  # HERE IS WHERE IT GOES WRONG, THE i GOES ROUND ONE TIME TOO MANY
          
          
          
          
          
          
        sliderOffset = parseInt(transformArray[xy], 10)
      else
        sliderOffset = parseInt($(node).css("left"), 10)
      sliderOffset
      console.log('end of getSliderOffset')

    setSliderOffset: (node, sliderOffset) ->
      if has3DTransform and not isIe7 and not isIe8
        $(node).css
          webkitTransform: "matrix(1,0,0,1," + sliderOffset + ",0)"
          MozTransform: "matrix(1,0,0,1," + sliderOffset + ",0)"
          transform: "matrix(1,0,0,1," + sliderOffset + ",0)"

      else
        $(node).css left: sliderOffset + "px"

    setBrowserInfo: ->
      if navigator.userAgent.match("WebKit")?
        isWebkit = true
        grabOutCursor = "-webkit-grab"
        grabInCursor = "-webkit-grabbing"
      else if navigator.userAgent.match("Gecko")?
        isGecko = true
        grabOutCursor = "move"
        grabInCursor = "-moz-grabbing"
      else if navigator.userAgent.match("MSIE 7")?
        isIe7 = true
        isIe = true
      else if navigator.userAgent.match("MSIE 8")?
        isIe8 = true
        isIe = true
      else if navigator.userAgent.match("MSIE 9")?
        isIe9 = true
        isIe = true

    has3DTransform: ->
      has3D = false
      testElement = $("<div />").css(
        webkitTransform: "matrix(1,1,1,1,1,1)"
        MozTransform: "matrix(1,1,1,1,1,1)"
        transform: "matrix(1,1,1,1,1,1)"
      )
      if testElement.attr("style") is ""
        has3D = false
      else has3D = true  unless testElement.attr("style") is `undefined`
      has3D

    getSlideNumber: (slide, sliderNumber, numberOfSlides) ->
      (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides

    calcActiveOffset: (settings, offset, childrenOffsets, stageWidth, infiniteSliderOffset, numberOfSlides, activeChildOffset, sliderNumber) ->
      isFirst = false
      arrayOfOffsets = new Array()
      newChildOffset = undefined
      newChildOffset = 0  if offset > childrenOffsets[0]
      newChildOffset = numberOfSlides - 1  if offset < (childrenOffsets[childrenOffsets.length - 1])
      i = 0

      while i < childrenOffsets.length
        if (childrenOffsets[i] <= offset) and (childrenOffsets[i] > (offset - stageWidth))
          arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i - 1]  if not isFirst and (childrenOffsets[i] isnt offset)
          arrayOfOffsets[arrayOfOffsets.length] = childrenOffsets[i]
          isFirst = true
        i++
      arrayOfOffsets[0] = childrenOffsets[childrenOffsets.length - 1]  if arrayOfOffsets.length is 0
      distance = stageWidth
      closestChildOffset = 0
      i = 0

      while i < arrayOfOffsets.length
        newDistance = Math.abs(offset - arrayOfOffsets[i])
        if newDistance < distance
          closestChildOffset = arrayOfOffsets[i]
          distance = newDistance
        i++
      i = 0

      while i < childrenOffsets.length
        newChildOffset = i  if closestChildOffset is childrenOffsets[i]
        i++
      newChildOffset

    changeSlide: (slide, node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings) ->
      helpers.autoSlidePause sliderNumber
      j = 0

      while j < scrollTimeouts.length
        clearTimeout scrollTimeouts[j]
        j++
      steps = Math.ceil(settings.autoSlideTransTimer / 10) + 1
      startOffset = helpers.getSliderOffset(node, "x")
      endOffset = childrenOffsets[slide]
      offsetDiff = endOffset - startOffset
      if settings.infiniteSlider
        slide = (slide - infiniteSliderOffset[sliderNumber] + numberOfSlides * 2) % numberOfSlides
        appendArray = false
        if (slide is 0) and (numberOfSlides is 2)
          slide = numberOfSlides
          childrenOffsets[slide] = childrenOffsets[slide - 1] - $(slideNodes).eq(0).outerWidth(true)
          appendArray = true
        endOffset = childrenOffsets[slide]
        offsetDiff = endOffset - startOffset
        offsets = new Array(childrenOffsets[slide] - $(node).width(), childrenOffsets[slide] + $(node).width())
        childrenOffsets.splice childrenOffsets.length - 1, 1  if appendArray
        i = 0

        while i < offsets.length
          offsetDiff = (offsets[i] - startOffset)  if Math.abs(offsets[i] - startOffset) < Math.abs(offsetDiff)
          i++
      stepArray = new Array()
      t = undefined
      nextStep = undefined
      helpers.showScrollbar settings, scrollbarClass
      i = 0

      while i <= steps
        t = i
        t /= steps
        t--
        nextStep = startOffset + offsetDiff * (Math.pow(t, 5) + 1)
        stepArray[stepArray.length] = nextStep
        i++
      lastCheckOffset = 0
      i = 0

      while i < stepArray.length
        if (i is 0) or (Math.abs(stepArray[i] - lastCheckOffset) > 1) or (i >= (stepArray.length - 2))
          lastCheckOffset = stepArray[i]
          scrollTimeouts[i] = helpers.slowScrollHorizontalIntervalTimer(scrollIntervalTime * (i + 1), node, slideNodes, stepArray[i], scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, slide, settings)
        if (i is 0) and (settings.onSlideStart isnt "")
          tempOffset = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
          settings.onSlideStart new helpers.args("start", settings, node, $(node).children(":eq(" + tempOffset + ")"), tempOffset, slide)
        i++
      slideChanged = false
      tempOffset = (slide + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
      if settings.infiniteSlider
        slideChanged = true  unless tempOffset is activeChildInfOffsets[sliderNumber]
      else
        slideChanged = true  unless slide is activeChildOffsets[sliderNumber]
      scrollTimeouts[scrollTimeouts.length] = helpers.onSlideCompleteTimer(scrollIntervalTime * (i + 1), settings, node, $(node).children(":eq(" + tempOffset + ")"), tempOffset, sliderNumber)  if slideChanged and (settings.onSlideComplete isnt "")
      slideTimeouts[sliderNumber] = scrollTimeouts
      helpers.hideScrollbar settings, scrollTimeouts, i, stepArray, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber
      helpers.autoSlide node, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings

    autoSlide: (scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings) ->
      return false  unless iosSliderSettings[sliderNumber].autoSlide
      helpers.autoSlidePause sliderNumber
      autoSlideTimeouts[sliderNumber] = setTimeout(->
        activeChildOffsets[sliderNumber] = activeChildOffsets[sliderNumber] - numberOfSlides  if not settings.infiniteSlider and (activeChildOffsets[sliderNumber] > childrenOffsets.length - 1)
        nextSlide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides + 1) % numberOfSlides
        helpers.changeSlide nextSlide, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings
        helpers.autoSlide scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings
      , settings.autoSlideTimer + settings.autoSlideTransTimer)

    autoSlidePause: (sliderNumber) ->
      clearTimeout autoSlideTimeouts[sliderNumber]

    isUnselectable: (node, settings) ->
      return true  if $(node).closest(settings.unselectableSelector).size() is 1  unless settings.unselectableSelector is ""
      false

    # timers 
    slowScrollHorizontalIntervalTimer: (scrollIntervalTime, node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings) ->
      scrollTimeout = setTimeout(->
        helpers.slowScrollHorizontalInterval node, slideNodes, step, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, slide, originalOffsets, childrenOffsets, infiniteSliderWidth, numberOfSlides, slideNodeOuterWidths, sliderNumber, centeredSlideOffset, endOffset, settings
      , scrollIntervalTime)
      scrollTimeout

    onSlideCompleteTimer: (scrollIntervalTime, settings, node, slideNode, slide, scrollbarNumber) ->
      scrollTimeout = setTimeout(->
        helpers.onSlideComplete settings, node, slideNode, slide, scrollbarNumber
      , scrollIntervalTime)
      scrollTimeout

    hideScrollbarIntervalTimer: (scrollIntervalTime, newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings) ->
      scrollTimeout = setTimeout(->
        helpers.hideScrollbarInterval newOffset, opacity, scrollbarClass, scrollbarWidth, stageWidth, scrollMargin, scrollBorder, sliderNumber, settings
      , scrollIntervalTime)
      scrollTimeout

    args: (func, settings, node, activeSlideNode, newChildOffset, targetSlideOffset) ->
      @prevSlideNumber = (if ($(node).parent().data("args") is `undefined`) then `undefined` else $(node).parent().data("args").prevSlideNumber)
      @prevSlideObject = (if ($(node).parent().data("args") is `undefined`) then `undefined` else $(node).parent().data("args").prevSlideObject)
      @targetSlideNumber = `undefined`
      @targetSlideObject = `undefined`
      @slideChanged = false
      if func is "load"

      else if func is "start"

      else if func is "change"
        @slideChanged = true
        @prevSlideNumber = (if ($(node).parent().data("args") is `undefined`) then settings.startAtSlide else $(node).parent().data("args").currentSlideNumber)
        @prevSlideObject = $(node).children(":eq(" + @prevSlideNumber + ")")
      else @slideChanged = $(node).parent().data("args").slideChanged  if func is "complete"
      @settings = settings
      @data = $(node).parent().data("iosslider")
      @sliderObject = node
      @sliderContainerObject = $(node).parent()
      @currentSlideObject = activeSlideNode
      @currentSlideNumber = newChildOffset + 1
      @currentSliderOffset = helpers.getSliderOffset(node, "x") * -1

    preventDrag: (event) ->
      event.preventDefault()

    preventClick: (event) ->
      event.stopImmediatePropagation()
      false

    enableClick: ->
      true  
 
  # eof private functions
  # used by slider
  helpers.setBrowserInfo()
  # used by slider
  methods = init: (options, node) -> #sof init
    console.log('inside slider init')
    console.log('inside slider init: options ' + options)
    console.log('inside slider init: node ' + node) #node is currently undefined   
    has3DTransform = helpers.has3DTransform()
    console.log('inside slider init: has3DTransform ' + has3DTransform)
    settings = $.extend(true,
      elasticPullResistance: 0.6
      frictionCoefficient: 0.92
      elasticFrictionCoefficient: 0.6
      snapFrictionCoefficient: 0.92
      snapToChildren: false
      snapSlideCenter: false
      startAtSlide: 1
      scrollbar: false
      scrollbarDrag: false
      scrollbarHide: true
      scrollbarLocation: "top"
      scrollbarContainer: ""
      scrollbarOpacity: 0.4
      scrollbarHeight: "4px"
      scrollbarBorder: "0"
      scrollbarMargin: "5px"
      scrollbarBackground: "#000"
      scrollbarBorderRadius: "100px"
      scrollbarShadow: "0 0 0 #000"
      scrollbarElasticPullResistance: 0.9
      desktopClickDrag: false
      keyboardControls: false
      tabToAdvance: false
      responsiveSlideContainer: true
      responsiveSlides: true
      navSlideSelector: ""
      navPrevSelector: ""
      navNextSelector: ""
      autoSlideToggleSelector: ""
      autoSlide: false
      autoSlideTimer: 5000
      autoSlideTransTimer: 750
      infiniteSlider: false
      snapVelocityThreshold: 5
      slideStartVelocityThreshold: 0
      horizontalSlideLockThreshold: 5
      verticalSlideLockThreshold: 3
      stageCSS:
        position: "relative"
        top: "0"
        left: "0"
        overflow: "hidden"
        zIndex: 1
      unselectableSelector: ""
      onSliderLoaded: ""
      onSliderUpdate: ""
      onSliderResize: ""
      onSlideStart: ""
      onSlideChange: ""
      onSlideComplete: ""
    , options)#eof settings
    console.log('inside slider init: settings ' + settings)
    node = this if node is `undefined`
    console.log('inside slider init: node ' + node)
    #sof return
    $(node).each (i) ->
      console.log('inside slider init: node ' + node)    
      init = ->
        console.log('inside slider init -> init')
        helpers.autoSlidePause sliderNumber
        anchorEvents = $(scrollerNode).find("a")
        onclickEvents = $(scrollerNode).find("[onclick]")
        allScrollerNodeChildren = $(scrollerNode).find("*")
        $(stageNode).css "width", ""
        $(stageNode).css "height", ""
        $(scrollerNode).css "width", ""
        slideNodes = $(scrollerNode).children().not("script").get()
        slideNodeWidths = new Array()
        slideNodeOuterWidths = new Array()
        $(slideNodes).css "width", ""
        sliderMax[sliderNumber] = 0
        childrenOffsets = new Array()
        console.log('inside slider stageNode:' + stageNode)
        containerWidth = $(stageNode).parent().width()
        console.log('inside slider containerWidth:' + containerWidth)
        
        document = this # added this because it is required next
        console.log('inside slider document:' + document)
        
        elem = node # added this because it is required next
        console.log('inside slider elem:' + elem)
        
        if(typeof node.style == 'undefined')
          elem.style = ''
        else
          elem.style = node.style
        elem.style = node.style # added this because it is required next
        console.log('inside slider elem.style:' + elem.style)        
        
        elem.ownerDocument = document # added this because it is required next
        console.log('inside slider elem.ownerDocument:' + elem.ownerDocument)        
        
        stageWidth = $(stageNode).outerWidth(true)
        console.log('inside slider stageWidth:' + stageWidth)
        stageWidth = (if ($(stageNode).outerWidth(true) > containerWidth) then containerWidth else $(stageNode).outerWidth(true))  if settings.responsiveSlideContainer
        $(stageNode).css
          position: settings.stageCSS.position
          top: settings.stageCSS.top
          left: settings.stageCSS.left
          overflow: settings.stageCSS.overflow
          zIndex: settings.stageCSS.zIndex
          webkitPerspective: 1000
          webkitBackfaceVisibility: "hidden"
          "-ms-touch-action": "pan-y"
          width: stageWidth

        $(settings.unselectableSelector).css cursor: "default"
        j = 0
        console.log('inside slider j:' + j) # so far so good
        while j < slideNodes.length
          slideNodeWidths[j] = $(slideNodes[j]).width()
          slideNodeOuterWidths[j] = $(slideNodes[j]).outerWidth(true)
          newWidth = slideNodeOuterWidths[j]
          if settings.responsiveSlides
            if slideNodeOuterWidths[j] > stageWidth
              newWidth = stageWidth + (slideNodeOuterWidths[j] - slideNodeWidths[j]) * -1
            else
              newWidth = slideNodeWidths[j]
            $(slideNodes[j]).css width: newWidth
          $(slideNodes[j]).css
            webkitBackfaceVisibility: "hidden"
            position: "absolute"
            top: 0

          childrenOffsets[j] = sliderMax[sliderNumber] * -1
          sliderMax[sliderNumber] = sliderMax[sliderNumber] + newWidth + (slideNodeOuterWidths[j] - slideNodeWidths[j])
          j++
        if settings.snapSlideCenter
          centeredSlideOffset = (stageWidth - slideNodeOuterWidths[0]) * 0.5
          centeredSlideOffset = 0  if settings.responsiveSlides and (slideNodeOuterWidths[0] > stageWidth)
        sliderAbsMax[sliderNumber] = sliderMax[sliderNumber] * 2
        j = 0

        while j < slideNodes.length
          helpers.setSliderOffset $(slideNodes[j]), childrenOffsets[j] * -1 + sliderMax[sliderNumber] + centeredSlideOffset
          childrenOffsets[j] = childrenOffsets[j] - sliderMax[sliderNumber]
          j++
        if not settings.infiniteSlider and not settings.snapSlideCenter
          i = 0

          while i < childrenOffsets.length
            break  if childrenOffsets[i] <= ((sliderMax[sliderNumber] * 2 - stageWidth) * -1)
            lastChildOffset = i
            i++
          childrenOffsets.splice lastChildOffset + 1, childrenOffsets.length
          childrenOffsets[childrenOffsets.length] = (sliderMax[sliderNumber] * 2 - stageWidth) * -1
        i = 0

        while i < childrenOffsets.length
          originalOffsets[i] = childrenOffsets[i]
          i++
        if isFirstInit
          settings.startAtSlide = (if (iosSliderSettings[sliderNumber].startAtSlide > childrenOffsets.length) then childrenOffsets.length else iosSliderSettings[sliderNumber].startAtSlide)
          if settings.infiniteSlider
            settings.startAtSlide = (iosSliderSettings[sliderNumber].startAtSlide - 1 + numberOfSlides) % numberOfSlides
            activeChildOffsets[sliderNumber] = (iosSliderSettings[sliderNumber].startAtSlide)
          else
            settings.startAtSlide = (if ((iosSliderSettings[sliderNumber].startAtSlide - 1) < 0) then childrenOffsets.length - 1 else iosSliderSettings[sliderNumber].startAtSlide)
            activeChildOffsets[sliderNumber] = (iosSliderSettings[sliderNumber].startAtSlide - 1)
          activeChildInfOffsets[sliderNumber] = activeChildOffsets[sliderNumber]
        sliderMin[sliderNumber] = sliderMax[sliderNumber] + centeredSlideOffset
        
        console.log('inside slider sliderMin[sliderNumber]:' + sliderMin[sliderNumber]) #so far so good
        
        $(scrollerNode).css
          position: "relative"
          cursor: grabOutCursor
          webkitPerspective: "0"
          webkitBackfaceVisibility: "hidden"
          width: sliderMax[sliderNumber] + "px"

        scrollerWidth = sliderMax[sliderNumber]
        sliderMax[sliderNumber] = sliderMax[sliderNumber] * 2 - stageWidth + centeredSlideOffset * 2
        shortContent = (if (scrollerWidth < stageWidth) then true else false)
        $(scrollerNode).css cursor: "default"  if shortContent
        containerHeight = $(stageNode).parent().outerHeight(true)
        stageHeight = $(stageNode).height()
        stageHeight = (if (stageHeight > containerHeight) then containerHeight else stageHeight)  if settings.responsiveSlideContainer
        $(stageNode).css height: stageHeight
        helpers.setSliderOffset scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]
        
        console.log('inside slider : around line 733') #so far so good
        
        if settings.infiniteSlider and not shortContent
          currentScrollOffset = helpers.getSliderOffset($(scrollerNode), "x")
          count = (infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides * -1
          while count < 0
            lowSlideNumber = 0
            lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
            $(slideNodes).each (i) ->
              if helpers.getSliderOffset(this, "x") < lowSlideOffset
                lowSlideOffset = helpers.getSliderOffset(this, "x")
                lowSlideNumber = i

            newOffset = sliderMin[sliderNumber] + scrollerWidth
            helpers.setSliderOffset $(slideNodes)[lowSlideNumber], newOffset
            sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            childrenOffsets.splice 0, 1
            childrenOffsets.splice childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset
            count++
          while ((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0) and settings.snapSlideCenter and isFirstInit
            highSlideNumber = 0
            highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
            $(slideNodes).each (i) ->
              if helpers.getSliderOffset(this, "x") > highSlideOffset
                highSlideOffset = helpers.getSliderOffset(this, "x")
                highSlideNumber = i

            newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber]
            helpers.setSliderOffset $(slideNodes)[highSlideNumber], newOffset
            childrenOffsets.splice 0, 0, newOffset * -1 + centeredSlideOffset
            childrenOffsets.splice childrenOffsets.length - 1, 1
            sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            infiniteSliderOffset[sliderNumber]--
            activeChildOffsets[sliderNumber]++
          while currentScrollOffset <= (sliderMax[sliderNumber] * -1)
            lowSlideNumber = 0
            lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
            $(slideNodes).each (i) ->
              if helpers.getSliderOffset(this, "x") < lowSlideOffset
                lowSlideOffset = helpers.getSliderOffset(this, "x")
                lowSlideNumber = i

            newOffset = sliderMin[sliderNumber] + scrollerWidth
            helpers.setSliderOffset $(slideNodes)[lowSlideNumber], newOffset
            sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset
            sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
            childrenOffsets.splice 0, 1
            childrenOffsets.splice childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset
            infiniteSliderOffset[sliderNumber]++
            activeChildOffsets[sliderNumber]--
        helpers.setSliderOffset scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]
        $(scrollerNode).css cursor: "default"  unless settings.desktopClickDrag
        
        console.log('inside slider : around line 788') # so far so good
        
        if settings.scrollbar
          $("." + scrollbarBlockClass).css
            margin: settings.scrollbarMargin
            overflow: "hidden"
            display: "none"

          $("." + scrollbarBlockClass + " ." + scrollbarClass).css border: settings.scrollbarBorder
          scrollMargin = parseInt($("." + scrollbarBlockClass).css("marginLeft")) + parseInt($("." + scrollbarBlockClass).css("marginRight"))
          scrollBorder = parseInt($("." + scrollbarBlockClass + " ." + scrollbarClass).css("borderLeftWidth"), 10) + parseInt($("." + scrollbarBlockClass + " ." + scrollbarClass).css("borderRightWidth"), 10)
          scrollbarStageWidth = (if (settings.scrollbarContainer isnt "") then $(settings.scrollbarContainer).width() else stageWidth)
          scrollbarWidth = (scrollbarStageWidth - scrollMargin) / numberOfSlides
          scrollbarStartOpacity = settings.scrollbarOpacity  unless settings.scrollbarHide
          $("." + scrollbarBlockClass).css
            position: "absolute"
            left: 0
            width: scrollbarStageWidth - scrollMargin + "px"
            margin: settings.scrollbarMargin

          if settings.scrollbarLocation is "top"
            $("." + scrollbarBlockClass).css "top", "0"
          else
            $("." + scrollbarBlockClass).css "bottom", "0"
          $("." + scrollbarBlockClass + " ." + scrollbarClass).css
            borderRadius: settings.scrollbarBorderRadius
            background: settings.scrollbarBackground
            height: settings.scrollbarHeight
            width: scrollbarWidth - scrollBorder + "px"
            minWidth: settings.scrollbarHeight
            border: settings.scrollbarBorder
            webkitPerspective: 1000
            webkitBackfaceVisibility: "hidden"
            position: "relative"
            opacity: scrollbarStartOpacity
            filter: "alpha(opacity:" + (scrollbarStartOpacity * 100) + ")"
            boxShadow: settings.scrollbarShadow

          helpers.setSliderOffset $("." + scrollbarBlockClass + " ." + scrollbarClass), Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1 - sliderMin[sliderNumber] + centeredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth))
          $("." + scrollbarBlockClass).css display: "block"
          scrollbarNode = $("." + scrollbarBlockClass + " ." + scrollbarClass)
          scrollbarBlockNode = $("." + scrollbarBlockClass)
        $("." + scrollbarBlockClass + " ." + scrollbarClass).css cursor: grabOutCursor  if settings.scrollbarDrag and not shortContent
        infiniteSliderWidth = (sliderMax[sliderNumber] + stageWidth) / 3  if settings.infiniteSlider
        unless settings.navSlideSelector is ""
          $(settings.navSlideSelector).each (j) ->
            $(this).css cursor: "pointer"
            $(this).unbind(clickEvent).bind clickEvent, (e) ->
              if e.type is "touchstart"
                $(this).unbind "click.iosSliderEvent"
              else
                $(this).unbind "touchstart.iosSliderEvent"
              clickEvent = e.type + ".iosSliderEvent"
              helpers.changeSlide j, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings

        unless settings.navPrevSelector is ""
          $(settings.navPrevSelector).css cursor: "pointer"
          $(settings.navPrevSelector).unbind(clickEvent).bind clickEvent, (e) ->
            if e.type is "touchstart"
              $(this).unbind "click.iosSliderEvent"
            else
              $(this).unbind "touchstart.iosSliderEvent"
            clickEvent = e.type + ".iosSliderEvent"
            slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            helpers.changeSlide slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if (slide > 0) or settings.infiniteSlider

        unless settings.navNextSelector is ""
          $(settings.navNextSelector).css cursor: "pointer"
          $(settings.navNextSelector).unbind(clickEvent).bind clickEvent, (e) ->
            if e.type is "touchstart"
              $(this).unbind "click.iosSliderEvent"
            else
              $(this).unbind "touchstart.iosSliderEvent"
            clickEvent = e.type + ".iosSliderEvent"
            slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            helpers.changeSlide slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if (slide < childrenOffsets.length - 1) or settings.infiniteSlider

        if settings.autoSlide and not shortContent
          unless settings.autoSlideToggleSelector is ""
            $(settings.autoSlideToggleSelector).css cursor: "pointer"
            $(settings.autoSlideToggleSelector).unbind(clickEvent).bind clickEvent, ->
              if e.type is "touchstart"
                $(this).unbind "click.iosSliderEvent"
              else
                $(this).unbind "touchstart.iosSliderEvent"
              clickEvent = e.type + ".iosSliderEvent"
              unless isAutoSlideToggleOn
                helpers.autoSlidePause sliderNumber
                isAutoSlideToggleOn = true
                $(settings.autoSlideToggleSelector).addClass "on"
              else
                helpers.autoSlide scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings
                isAutoSlideToggleOn = false
                $(settings.autoSlideToggleSelector).removeClass "on"

          helpers.autoSlide scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if not isAutoSlideToggleOn and not shortContent
          $(stageNode).bind "mouseenter.iosSliderEvent", ->
            helpers.autoSlidePause sliderNumber

          $(stageNode).bind "mouseleave.iosSliderEvent", ->
            helpers.autoSlide scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if not isAutoSlideToggleOn and not shortContent

          $(stageNode).bind "touchend.iosSliderEvent", ->
            helpers.autoSlide scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if not isAutoSlideToggleOn and not shortContent

        console.log('inside slider : around line 893') # so far so good

        $(stageNode).data "iosslider",
          obj: $this
          settings: settings
          scrollerNode: scrollerNode
          slideNodes: slideNodes
          numberOfSlides: numberOfSlides
          centeredSlideOffset: centeredSlideOffset
          sliderNumber: sliderNumber
          originalOffsets: originalOffsets
          childrenOffsets: childrenOffsets
          sliderMax: sliderMax[sliderNumber]
          scrollbarClass: scrollbarClass
          scrollbarWidth: scrollbarWidth
          scrollbarStageWidth: scrollbarStageWidth
          stageWidth: stageWidth
          scrollMargin: scrollMargin
          scrollBorder: scrollBorder
          
          console.log('inside slider : sliderNumber' + sliderNumber)
          
          infiniteSliderOffset: infiniteSliderOffset[sliderNumber]
          
          console.log('inside slider : infiniteSliderOffset' + infiniteSliderOffset)
          
          infiniteSliderWidth: infiniteSliderWidth
          slideNodeOuterWidths: slideNodeOuterWidths

        isFirstInit = false
        
        console.log('inside slider : isFirstInit' + isFirstInit)
        
        true # something goes wrong at this point
        
      console.log('inside slider : around line 928')  
        
      scrollbarNumber++
      sliderNumber = scrollbarNumber
      scrollTimeouts = new Array()
      iosSliderSettings[sliderNumber] = settings
      sliderMin[sliderNumber] = 0
      sliderMax[sliderNumber] = 0
      minTouchpoints = 0
      xCurrentScrollRate = new Array(0, 0)
      yCurrentScrollRate = new Array(0, 0)
      scrollbarBlockClass = "scrollbarBlock" + scrollbarNumber
      scrollbarClass = "scrollbar" + scrollbarNumber
      scrollbarNode = undefined
      scrollbarBlockNode = undefined
      scrollbarStageWidth = undefined
      scrollbarWidth = undefined
      containerWidth = undefined
      containerHeight = undefined
      centeredSlideOffset = 0
      stageNode = $(this)
      stageWidth = undefined
      stageHeight = undefined
      slideWidth = undefined
      scrollMargin = undefined
      scrollBorder = undefined
      lastTouch = undefined
      isFirstInit = true
      newChildOffset = -1
      webkitTransformArray = new Array()
      childrenOffsets = undefined
      originalOffsets = new Array()
      scrollbarStartOpacity = 0
      xScrollStartPosition = 0
      yScrollStartPosition = 0
      currentTouches = 0
      scrollerNode = $(this).children(":first-child")
      slideNodes = undefined
      slideNodeWidths = undefined
      slideNodeOuterWidths = undefined
      numberOfSlides = $(scrollerNode).children().not("script").size()
      xScrollStarted = false
      lastChildOffset = 0
      isMouseDown = false
      currentSlider = `undefined`
      sliderStopLocation = 0
      infiniteSliderWidth = undefined
      infiniteSliderOffset[sliderNumber] = 0
      shortContent = false
      onChangeEventLastFired[sliderNumber] = -1
      isAutoSlideToggleOn = false
      iosSliders[sliderNumber] = stageNode
      isEventCleared[sliderNumber] = false
      currentEventNode = undefined
      intermediateChildOffset = 0
      tempInfiniteSliderOffset = 0
      preventXScroll = false
      snapOverride = false
      clickEvent = "touchstart.iosSliderEvent click.iosSliderEvent"
      scrollerWidth = undefined
      anchorEvents = undefined
      onclickEvents = undefined
      allScrollerNodeChildren = undefined
      touchLocks[sliderNumber] = false
      slideTimeouts[sliderNumber] = new Array()
      if settings.scrollbarDrag
        settings.scrollbar = true
        settings.scrollbarHide = false
      $this = $(this)
      data = $this.data("iosslider")
      return true  unless data is `undefined`
      $(this).find("img").bind "dragstart.iosSliderEvent", (event) ->
        event.preventDefault()

      console.log('inside slider : around line 1002')# something went wrong before we reached this

      settings.scrollbar = false  if settings.infiniteSlider
      if settings.scrollbar
        unless settings.scrollbarContainer is ""
          $(settings.scrollbarContainer).append "<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>"
        else
          $(scrollerNode).parent().append "<div class = '" + scrollbarBlockClass + "'><div class = '" + scrollbarClass + "'></div></div>"
      return true  unless init()
      $(this).find("a").bind "mousedown", helpers.preventDrag
      $(this).find("[onclick]").bind("click", helpers.preventDrag).each ->
        $(this).data "onclick", @onclick

      newChildOffset = helpers.calcActiveOffset(settings, helpers.getSliderOffset($(scrollerNode), "x"), childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, `undefined`, sliderNumber)
      tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
      args = new helpers.args("load", settings, scrollerNode, $(scrollerNode).children(":eq(" + tempOffset + ")"), tempOffset, tempOffset)
      $(stageNode).data "args", args
      settings.onSliderLoaded args  unless settings.onSliderLoaded is ""
      onChangeEventLastFired[sliderNumber] = tempOffset
      if iosSliderSettings[sliderNumber].responsiveSlides or iosSliderSettings[sliderNumber].responsiveSlideContainer
        orientationEvent = (if supportsOrientationChange then "orientationchange" else "resize")
        $(window).bind orientationEvent + ".iosSliderEvent", ->
          return true  unless init()
          args = $(stageNode).data("args")
          settings.onSliderResize args  unless settings.onSliderResize is ""

      if (settings.keyboardControls or settings.tabToAdvance) and not shortContent
        $(document).bind "keydown.iosSliderEvent", (e) ->
          e = e.originalEvent  if (not isIe7) and (not isIe8)
          if (e.keyCode is 37) and settings.keyboardControls
            e.preventDefault()
            slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            helpers.changeSlide slide - 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if (slide > 0) or settings.infiniteSlider
          else if ((e.keyCode is 39) and settings.keyboardControls) or ((e.keyCode is 9) and settings.tabToAdvance)
            e.preventDefault()
            slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            helpers.changeSlide slide + 1, scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, centeredSlideOffset, settings  if (slide < childrenOffsets.length - 1) or settings.infiniteSlider

      if isTouch or settings.desktopClickDrag
        touchStartFlag = false
        touchSelection = $(scrollerNode)
        touchSelectionMove = $(scrollerNode)
        preventDefault = null
        isUnselectable = false
        if settings.scrollbarDrag
          touchSelection = touchSelection.add(scrollbarNode)
          touchSelectionMove = touchSelectionMove.add(scrollbarBlockNode)
        $(touchSelection).bind "mousedown.iosSliderEvent touchstart.iosSliderEvent", (e) ->
          return true  if touchStartFlag
          touchStartFlag = true
          if e.type is "touchstart"
            $(touchSelectionMove).unbind "mousedown.iosSliderEvent"
          else
            $(touchSelectionMove).unbind "touchstart.iosSliderEvent"
          return true  if touchLocks[sliderNumber] or shortContent
          isUnselectable = helpers.isUnselectable(e.target, settings)
          if isUnselectable
            touchStartFlag = false
            xScrollStarted = false
            return true
          currentEventNode = (if ($(this)[0] is $(scrollbarNode)[0]) then scrollbarNode else scrollerNode)
          e = e.originalEvent  if (not isIe7) and (not isIe8)
          helpers.autoSlidePause sliderNumber
          allScrollerNodeChildren.unbind ".disableClick"
          if e.type is "touchstart"
            eventX = e.touches[0].pageX
            eventY = e.touches[0].pageY
          else
            if window.getSelection
              if window.getSelection().empty
                window.getSelection().empty()
              else window.getSelection().removeAllRanges()  if window.getSelection().removeAllRanges
            else if document.selection
              if isIe8
                try # absorb ie8 bug
                  document.selection.empty()
              else
                document.selection.empty()
            eventX = e.pageX
            eventY = e.pageY
            isMouseDown = true
            currentSlider = scrollerNode
            $(this).css cursor: grabInCursor
          xCurrentScrollRate = new Array(0, 0)
          yCurrentScrollRate = new Array(0, 0)
          xScrollDistance = 0
          xScrollStarted = false
          j = 0

          while j < scrollTimeouts.length
            clearTimeout scrollTimeouts[j]
            j++
          scrollPosition = helpers.getSliderOffset(scrollerNode, "x")
          if scrollPosition > (sliderMin[sliderNumber] * -1 + centeredSlideOffset + scrollerWidth)
            scrollPosition = sliderMin[sliderNumber] * -1 + centeredSlideOffset + scrollerWidth
            helpers.setSliderOffset $("." + scrollbarClass), scrollPosition
            $("." + scrollbarClass).css width: (scrollbarWidth - scrollBorder) + "px"
          else if scrollPosition < (sliderMax[sliderNumber] * -1)
            scrollPosition = sliderMax[sliderNumber] * -1
            helpers.setSliderOffset $("." + scrollbarClass), (scrollbarStageWidth - scrollMargin - scrollbarWidth)
            $("." + scrollbarClass).css width: (scrollbarWidth - scrollBorder) + "px"
          scrollbarSubtractor = (if ($(this)[0] is $(scrollbarNode)[0]) then (sliderMin[sliderNumber]) else 0)
          xScrollStartPosition = (helpers.getSliderOffset(this, "x") - eventX - scrollbarSubtractor) * -1
          yScrollStartPosition = (helpers.getSliderOffset(this, "y") - eventY) * -1
          xCurrentScrollRate[1] = eventX
          yCurrentScrollRate[1] = eventY
          snapOverride = false

        $(touchSelectionMove).bind "touchmove.iosSliderEvent mousemove.iosSliderEvent", (e) ->
          e = e.originalEvent  if (not isIe7) and (not isIe8)
          return true  if touchLocks[sliderNumber] or shortContent
          return true  if isUnselectable
          edgeDegradation = 0
          if e.type is "touchmove"
            eventX = e.touches[0].pageX
            eventY = e.touches[0].pageY
          else
            if window.getSelection
              if window.getSelection().empty

              #window.getSelection().empty(); /* removed to enable input fields within the slider */
              else window.getSelection().removeAllRanges()  if window.getSelection().removeAllRanges
            else if document.selection
              if isIe8
                try # absorb ie8 bug
                  document.selection.empty()
              else
                document.selection.empty()
            eventX = e.pageX
            eventY = e.pageY
            return true  unless isMouseDown
            return true  if (typeof e.webkitMovementX isnt "undefined" or typeof e.webkitMovementY isnt "undefined") and e.webkitMovementY is 0 and e.webkitMovementX is 0  unless isIe
          xCurrentScrollRate[0] = xCurrentScrollRate[1]
          xCurrentScrollRate[1] = eventX
          xScrollDistance = (xCurrentScrollRate[1] - xCurrentScrollRate[0]) / 2
          yCurrentScrollRate[0] = yCurrentScrollRate[1]
          yCurrentScrollRate[1] = eventY
          yScrollDistance = (yCurrentScrollRate[1] - yCurrentScrollRate[0]) / 2
          unless xScrollStarted
            slide = (activeChildOffsets[sliderNumber] + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            args = new helpers.args("start", settings, scrollerNode, $(scrollerNode).children(":eq(" + slide + ")"), slide, slide)
            $(stageNode).data "args", args
            settings.onSlideStart args  unless settings.onSlideStart is ""

          #if(((yScrollDistance > 3) || (yScrollDistance < -3)) && ((xScrollDistance < 3) && (xScrollDistance > -3)) && (e.type == 'touchmove') && (!xScrollStarted)) {
          preventXScroll = true  if ((yScrollDistance > settings.verticalSlideLockThreshold) or (yScrollDistance < (settings.verticalSlideLockThreshold * -1))) and (e.type is "touchmove") and (not xScrollStarted)
          e.preventDefault()  if ((xScrollDistance > settings.horizontalSlideLockThreshold) or (xScrollDistance < (settings.horizontalSlideLockThreshold * -1))) and (e.type is "touchmove")
          xScrollStarted = true  if (xScrollDistance > settings.slideStartVelocityThreshold) or (xScrollDistance < (settings.slideStartVelocityThreshold * -1))
          if xScrollStarted and not preventXScroll
            scrollPosition = helpers.getSliderOffset(scrollerNode, "x")
            scrollbarSubtractor = (if ($(this)[0] is $(scrollbarBlockNode)[0]) then (sliderMin[sliderNumber]) else centeredSlideOffset)
            scrollbarMultiplier = (if ($(this)[0] is $(scrollbarBlockNode)[0]) then ((sliderMin[sliderNumber] - sliderMax[sliderNumber] - centeredSlideOffset) / (scrollbarStageWidth - scrollMargin - scrollbarWidth)) else 1)
            elasticPullResistance = (if ($(this)[0] is $(scrollbarBlockNode)[0]) then settings.scrollbarElasticPullResistance else settings.elasticPullResistance)
            snapCenteredSlideOffset = (if (settings.snapSlideCenter and ($(this)[0] is $(scrollbarBlockNode)[0])) then 0 else centeredSlideOffset)
            snapCenteredSlideOffsetScrollbar = (if (settings.snapSlideCenter and ($(this)[0] is $(scrollbarBlockNode)[0])) then centeredSlideOffset else 0)
            if e.type is "touchmove"
              xScrollStartPosition = (scrollPosition * -1) + eventX  unless currentTouches is e.touches.length
              currentTouches = e.touches.length
            if settings.infiniteSlider
              if scrollPosition <= (sliderMax[sliderNumber] * -1)
                scrollerWidth = $(scrollerNode).width()
                if scrollPosition <= (sliderAbsMax[sliderNumber] * -1)
                  sum = originalOffsets[0] * -1
                  $(slideNodes).each (i) ->
                    helpers.setSliderOffset $(slideNodes)[i], sum + centeredSlideOffset
                    childrenOffsets[i] = sum * -1  if i < childrenOffsets.length
                    sum = sum + slideNodeOuterWidths[i]

                  xScrollStartPosition = xScrollStartPosition - childrenOffsets[0] * -1
                  sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
                  sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
                  infiniteSliderOffset[sliderNumber] = 0
                else
                  lowSlideNumber = 0
                  lowSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
                  $(slideNodes).each (i) ->
                    if helpers.getSliderOffset(this, "x") < lowSlideOffset
                      lowSlideOffset = helpers.getSliderOffset(this, "x")
                      lowSlideNumber = i

                  newOffset = sliderMin[sliderNumber] + scrollerWidth
                  helpers.setSliderOffset $(slideNodes)[lowSlideNumber], newOffset
                  sliderMin[sliderNumber] = childrenOffsets[1] * -1 + centeredSlideOffset
                  sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
                  childrenOffsets.splice 0, 1
                  childrenOffsets.splice childrenOffsets.length, 0, newOffset * -1 + centeredSlideOffset
                  infiniteSliderOffset[sliderNumber]++
              if (scrollPosition >= (sliderMin[sliderNumber] * -1)) or (scrollPosition >= 0)
                scrollerWidth = $(scrollerNode).width()
                if scrollPosition >= 0
                  sum = originalOffsets[0] * -1
                  $(slideNodes).each (i) ->
                    helpers.setSliderOffset $(slideNodes)[i], sum + centeredSlideOffset
                    childrenOffsets[i] = sum * -1  if i < childrenOffsets.length
                    sum = sum + slideNodeOuterWidths[i]

                  xScrollStartPosition = xScrollStartPosition + childrenOffsets[0] * -1
                  sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
                  sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
                  infiniteSliderOffset[sliderNumber] = numberOfSlides
                  while ((childrenOffsets[0] * -1 - scrollerWidth + centeredSlideOffset) > 0)
                    highSlideNumber = 0
                    highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
                    $(slideNodes).each (i) ->
                      if helpers.getSliderOffset(this, "x") > highSlideOffset
                        highSlideOffset = helpers.getSliderOffset(this, "x")
                        highSlideNumber = i

                    newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber]
                    helpers.setSliderOffset $(slideNodes)[highSlideNumber], newOffset
                    childrenOffsets.splice 0, 0, newOffset * -1 + centeredSlideOffset
                    childrenOffsets.splice childrenOffsets.length - 1, 1
                    sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
                    sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
                    infiniteSliderOffset[sliderNumber]--
                    activeChildOffsets[sliderNumber]++
                else
                  highSlideNumber = 0
                  highSlideOffset = helpers.getSliderOffset($(slideNodes[0]), "x")
                  $(slideNodes).each (i) ->
                    if helpers.getSliderOffset(this, "x") > highSlideOffset
                      highSlideOffset = helpers.getSliderOffset(this, "x")
                      highSlideNumber = i

                  newOffset = sliderMin[sliderNumber] - slideNodeOuterWidths[highSlideNumber]
                  helpers.setSliderOffset $(slideNodes)[highSlideNumber], newOffset
                  childrenOffsets.splice 0, 0, newOffset * -1 + centeredSlideOffset
                  childrenOffsets.splice childrenOffsets.length - 1, 1
                  sliderMin[sliderNumber] = childrenOffsets[0] * -1 + centeredSlideOffset
                  sliderMax[sliderNumber] = sliderMin[sliderNumber] + scrollerWidth - stageWidth
                  infiniteSliderOffset[sliderNumber]--
            else
              scrollerWidth = $(scrollerNode).width()
              edgeDegradation = (sliderMin[sliderNumber] + ((xScrollStartPosition - scrollbarSubtractor - eventX + snapCenteredSlideOffset) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier  if scrollPosition > (sliderMin[sliderNumber] * -1 + centeredSlideOffset)
              edgeDegradation = (sliderMax[sliderNumber] + snapCenteredSlideOffsetScrollbar + ((xScrollStartPosition - scrollbarSubtractor - eventX) * -1 * scrollbarMultiplier) - scrollbarSubtractor) * elasticPullResistance * -1 / scrollbarMultiplier  if scrollPosition < (sliderMax[sliderNumber] * -1)
            helpers.setSliderOffset scrollerNode, ((xScrollStartPosition - scrollbarSubtractor - eventX - edgeDegradation) * -1 * scrollbarMultiplier) - scrollbarSubtractor + snapCenteredSlideOffsetScrollbar
            if settings.scrollbar
              helpers.showScrollbar settings, scrollbarClass
              scrollbarDistance = Math.floor((xScrollStartPosition - eventX - edgeDegradation - sliderMin[sliderNumber] + snapCenteredSlideOffset) / (sliderMax[sliderNumber] - sliderMin[sliderNumber] + centeredSlideOffset) * (scrollbarStageWidth - scrollMargin - scrollbarWidth) * scrollbarMultiplier)
              width = scrollbarWidth
              if scrollPosition >= (sliderMin[sliderNumber] * -1 + snapCenteredSlideOffset + scrollerWidth)
                width = scrollbarWidth - scrollBorder - (scrollbarDistance * -1)
                helpers.setSliderOffset $("." + scrollbarClass), 0
                $("." + scrollbarClass).css width: width + "px"
              else if scrollPosition <= ((sliderMax[sliderNumber] * -1) + 1)
                width = scrollbarStageWidth - scrollMargin - scrollBorder - scrollbarDistance
                helpers.setSliderOffset $("." + scrollbarClass), scrollbarDistance
                $("." + scrollbarClass).css width: width + "px"
              else
                helpers.setSliderOffset $("." + scrollbarClass), scrollbarDistance
            lastTouch = e.touches[0].pageX  if e.type is "touchmove"
            slideChanged = false
            newChildOffset = helpers.calcActiveOffset(settings, (xScrollStartPosition - eventX - edgeDegradation) * -1, childrenOffsets, stageWidth, infiniteSliderOffset[sliderNumber], numberOfSlides, `undefined`, sliderNumber)
            tempOffset = (newChildOffset + infiniteSliderOffset[sliderNumber] + numberOfSlides) % numberOfSlides
            if settings.infiniteSlider
              slideChanged = true  unless tempOffset is activeChildInfOffsets[sliderNumber]
            else
              slideChanged = true  unless newChildOffset is activeChildOffsets[sliderNumber]
            if slideChanged
              activeChildOffsets[sliderNumber] = newChildOffset
              activeChildInfOffsets[sliderNumber] = tempOffset
              snapOverride = true
              args = new helpers.args("change", settings, scrollerNode, $(scrollerNode).children(":eq(" + tempOffset + ")"), tempOffset, tempOffset)
              $(stageNode).data "args", args
              settings.onSlideChange args  unless settings.onSlideChange is ""
          touchStartFlag = false

        eventObject = $(window)
        eventObject = $(document)  if isIe8 or isIe7
        $(touchSelection).bind "touchend.iosSliderEvent", (e) ->
          e = e.originalEvent
          return true  if touchLocks[sliderNumber] or shortContent
          return true  if isUnselectable
          unless e.touches.length is 0
            j = 0

            while j < e.touches.length
              helpers.slowScrollHorizontal scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings  if e.touches[j].pageX is lastTouch
              j++
          else
            helpers.slowScrollHorizontal scrollerNode, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings
          preventXScroll = false
          touchStartFlag = false

        $(eventObject).bind "mouseup.iosSliderEvent" + sliderNumber, (e) ->
          if xScrollStarted
            anchorEvents.unbind("click.disableClick").bind "click.disableClick", helpers.preventClick
          else
            anchorEvents.unbind("click.disableClick").bind "click.disableClick", helpers.enableClick
          onclickEvents.each ->
            @onclick = (event) ->
              return false  if xScrollStarted
              $(this).data("onclick").call this, event or window.event

          if parseFloat($().jquery) >= 1.8
            allScrollerNodeChildren.each ->
              clickObject = $._data(this, "events")
              unless clickObject is `undefined`
                unless clickObject.click is `undefined`
                  unless clickObject.click[0].namespace is "iosSliderEvent"
                    return false  unless xScrollStarted
                    $(this).one "click.disableClick", helpers.preventClick
                    handlers = $._data(this, "events").click
                    handler = handlers.pop()
                    handlers.splice 0, 0, handler

          else if parseFloat($().jquery) >= 1.6
            allScrollerNodeChildren.each ->
              clickObject = $(this).data("events")
              unless clickObject is `undefined`
                unless clickObject.click is `undefined`
                  unless clickObject.click[0].namespace is "iosSliderEvent"
                    return false  unless xScrollStarted
                    $(this).one "click.disableClick", helpers.preventClick
                    handlers = $(this).data("events").click
                    handler = handlers.pop()
                    handlers.splice 0, 0, handler

          else

          unless isEventCleared[sliderNumber]
            return true  if shortContent
            $(touchSelection).css cursor: grabOutCursor
            isMouseDown = false
            return true  if currentSlider is `undefined`
            helpers.slowScrollHorizontal currentSlider, slideNodes, scrollTimeouts, scrollbarClass, xScrollDistance, yScrollDistance, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, originalOffsets, childrenOffsets, slideNodeOuterWidths, sliderNumber, infiniteSliderWidth, numberOfSlides, currentEventNode, snapOverride, centeredSlideOffset, settings
            currentSlider = `undefined`
          preventXScroll = false
          touchStartFlag = false
      #eof return
    #eof init
    #sof destroy
    destroy: (clearStyle, node) ->
      console.log('inside slider destroy')
      node = this  if node is `undefined`
      $(node).each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        clearStyle = true  if clearStyle is `undefined`
        helpers.autoSlidePause data.sliderNumber
        isEventCleared[data.sliderNumber] = true
        $(window).unbind ".iosSliderEvent-" + data.sliderNumber
        $(window).unbind ".iosSliderEvent"
        $(document).unbind ".iosSliderEvent-" + data.sliderNumber
        $(document).unbind "keydown.iosSliderEvent"
        $(this).unbind ".iosSliderEvent"
        $(this).children(":first-child").unbind ".iosSliderEvent"
        $(this).children(":first-child").children().unbind ".iosSliderEvent"
        if clearStyle
          $(this).attr "style", ""
          $(this).children(":first-child").attr "style", ""
          $(this).children(":first-child").children().attr "style", ""
          $(data.settings.navSlideSelector).attr "style", ""
          $(data.settings.navPrevSelector).attr "style", ""
          $(data.settings.navNextSelector).attr "style", ""
          $(data.settings.autoSlideToggleSelector).attr "style", ""
          $(data.settings.unselectableSelector).attr "style", ""
        $(".scrollbarBlock" + data.sliderNumber).remove()  if data.settings.scrollbar
        scrollTimeouts = slideTimeouts[data.sliderNumber]
        i = 0

        while i < scrollTimeouts.length
          clearTimeout scrollTimeouts[i]
          i++
        $this.removeData "iosslider"
        $this.removeData "args"
    #eof destroy
    #sof update
    update: (node) ->
      node = this  if node is `undefined`
      $(node).each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        data.settings.startAtSlide = $this.data("args").currentSlideNumber
        methods.destroy false, this
        data.settings.startAtSlide = (activeChildOffsets[data.sliderNumber] + 1 + infiniteSliderOffset[data.sliderNumber] + data.numberOfSlides) % data.numberOfSlides  if (data.numberOfSlides isnt 1) and data.settings.infiniteSlider
        methods.init data.settings, this
        args = new helpers.args("update", data.settings, data.scrollerNode, $(data.scrollerNode).children(":eq(" + (data.settings.startAtSlide - 1) + ")"), data.settings.startAtSlide - 1, data.settings.startAtSlide - 1)
        $(data.stageNode).data "args", args
        data.settings.onSliderUpdate args  unless data.settings.onSliderUpdate is ""
    #eof update
    #sof addSlide
    addSlide: (slideNode, slidePosition) ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        if $(data.scrollerNode).children().size() is 0
          $(data.scrollerNode).append slideNode
          $this.data("args").currentSlideNumber = 1
        else unless data.settings.infiniteSlider
          if slidePosition <= data.numberOfSlides
            $(data.scrollerNode).children(":eq(" + (slidePosition - 1) + ")").before slideNode
          else
            $(data.scrollerNode).children(":eq(" + (slidePosition - 2) + ")").after slideNode
          $this.data("args").currentSlideNumber++  if $this.data("args").currentSlideNumber >= slidePosition
        else
          if slidePosition is 1
            $(data.scrollerNode).children(":eq(0)").before slideNode
          else
            $(data.scrollerNode).children(":eq(" + (slidePosition - 2) + ")").after slideNode
          activeChildOffsets[data.sliderNumber]--  if (infiniteSliderOffset[data.sliderNumber] < -1) and (true)
          activeChildOffsets[data.sliderNumber]++  if $this.data("args").currentSlideNumber >= slidePosition
        $this.data("iosslider").numberOfSlides++
        methods.update this
    #eof addSlide
    #sof removeSlide
    removeSlide: (slideNumber) ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        $(data.scrollerNode).children(":eq(" + (slideNumber - 1) + ")").remove()
        activeChildOffsets[data.sliderNumber]--  if activeChildOffsets[data.sliderNumber] > (slideNumber - 1)
        methods.update this
    #eof removeSlide
    #sof goToSlide
    goToSlide: (slide, node) ->
      node = this  if node is `undefined`
      $(node).each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        slide = (if (slide > data.childrenOffsets.length) then data.childrenOffsets.length - 1 else slide - 1)
        helpers.changeSlide slide, $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings
        activeChildOffsets[data.sliderNumber] = slide
    #eof goToSlide
    #sof lock
    lock: ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        touchLocks[data.sliderNumber] = true
    #eof lock
    #sof unlock
    unlock: ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        touchLocks[data.sliderNumber] = false
    #eof unlock
    #sof getData
    getData: ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        data
    #eof getData
    #sof autoSlidePause
    autoSlidePause: ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        helpers.autoSlidePause data.sliderNumber
        data
    #eof autoSlidePause
    #sof autoSlidePlay
    autoSlidePlay: ->
      @each ->
        $this = $(this)
        data = $this.data("iosslider")
        return false  if data is `undefined`
        iosSliderSettings[data.sliderNumber].autoSlide = true
        helpers.autoSlide $(data.scrollerNode), $(data.slideNodes), slideTimeouts[data.sliderNumber], data.scrollbarClass, data.scrollbarWidth, data.stageWidth, data.scrollbarStageWidth, data.scrollMargin, data.scrollBorder, data.originalOffsets, data.childrenOffsets, data.slideNodeOuterWidths, data.sliderNumber, data.infiniteSliderWidth, data.numberOfSlides, data.centeredSlideOffset, data.settings
        data
    #eof autoSlidePlay
  #eof methods

module.exports = Slider