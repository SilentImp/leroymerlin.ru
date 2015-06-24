class CardHeader2D
  constructor: ->

    if $('html').hasClass 'csstransforms3d'
      return

    @widget = $ '.card-header'
    @card_front = @widget.find '.card-header__card-front'
    @card_back = @widget.find '.card-header__card-back'

    @recountValues()

    @widget.on 'mousemove', @paralaxCards
    @widget.on 'mouseleave', @backToStart
    $(window).on 'resize', @recountValues

  recountValues: =>
    @widget_height = @widget.height()
    @widget_top = @widget.offset().top
    @vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    @vw = Math.max document.documentElement.clientWidth, window.innerWidth || 0

  backToStart: =>
    props_front =
      'margin-top': 0,
      'margin-left': -610

    props_back =
      'margin-top': 0,
      'margin-left': -230

    options =
      'easing': 'spring'
      'duration': 1000

    @card_front.velocity("stop").velocity(props_front, options)
    @card_back.velocity("stop").velocity(props_back, options)


  paralaxCards: (event)=>
    offset = @widget.offset()
    pointer =
        left: event.pageX - offset.left - @vw/2 + 200,
        top: event.pageY - offset.top


    vertcal =  Math.min(pointer.top, @widget_height)/@widget_height

    if pointer.left < -400
      pointer.left = -400

    if pointer.left > 400
      pointer.left = 400

    percents = pointer.left/400

    if percents < 0
      side = -1

    if percents >= 0
      side = 1

    props_front =
      'margin-top': -15*(percents+1),
      'margin-left': -610 + 20*(vertcal)

    props_back =
      'margin-top': 15*(percents+1),
      'margin-left': -230 - 20*(vertcal)

    options =
      'easing': 'linear'
      'duration': 0

    @card_front.velocity("stop").velocity(props_front, options)
    @card_back.velocity("stop").velocity(props_back, options)

$(document).ready ->
  new CardHeader2D
