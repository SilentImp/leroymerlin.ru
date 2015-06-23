class CardHeader
  constructor: ->
    @widget = $ '.card-header'
    @card_front = @widget.find '.card-header__card-front'
    @card_back = @widget.find '.card-header__card-back'

    @recountValues()

    $('body').on 'mousemove', @paralaxCards
    $(window).on 'resize', @recountValues

  recountValues: =>
    @widget_height = @widget.height()
    @widget_top = @widget.offset().top
    @vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    @vw = Math.max document.documentElement.clientWidth, window.innerWidth || 0

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


    @card_front.css
      'z-index': 1-side
      'transform': 'rotateX('+(-7+vertcal*14)+'deg) rotateY('+(-10*percents)+'deg) translateZ('+(-60*percents)+'px) translateX('+(-80*percents)+'px)'
    @card_back.css
      'z-index': side-1
      'transform': 'rotateX('+(-7+vertcal*14)+'deg) rotateY('+(-10*percents)+'deg) translateZ('+(60*percents)+'px) translateX('+(-80*percents)+'px)'

$(document).ready ->
  new CardHeader
