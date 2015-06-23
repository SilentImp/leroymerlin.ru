class CardHeader
  constructor: ->
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
      'rotateX': 0,
      'rotateY': 0,
      'translateZ': '2px',
      'translateX': '20px',
      'translateY': '10px'

    props_back =
      'rotateX': 0,
      'rotateY': 0,
      'translateZ': '-2px',
      'translateX': '-20px',
      'translateY': '-10px'

    options =
      'easing': 'spring'
      'duration': 1000

    @card_front.css
      'z-index': 2
    @card_back.css
      'z-index': -2

    @card_front.velocity("stop").velocity(props_front, options)
    @card_back.velocity("stop").velocity(props_back, options)


  paralaxCards: (event)=>
    offset = @widget.offset()
    pointer =
        left: event.pageX - offset.left - @vw/2 + 100,
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
      'rotateX': (-7+vertcal*14)+'deg',
      'rotateY': (-10*percents)+'deg',
      'translateZ': (-60*percents)+'px',
      'translateX': (-80*percents)+'px',
      'translateY': '0'

    props_back =
      'rotateX': (-7+vertcal*14)+'deg',
      'rotateY': (-10*percents)+'deg',
      'translateZ': (60*percents)+'px',
      'translateX': (-80*percents)+'px',
      'translateY': '0'

    @card_front.css
      'z-index': 1-side
    @card_back.css
      'z-index': side-1

    options =
      'easing': 'linear'
      'duration': 50

    @card_front.velocity("stop").velocity(props_front, options)
    @card_back.velocity("stop").velocity(props_back, options)


$(document).ready ->
  new CardHeader
