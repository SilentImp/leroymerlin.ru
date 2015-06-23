class CardHeader
  constructor: ->
    @widget = $ '.card-header'
    @card_front = @widget.find '.card-header__card-front'
    @card_back = @widget.find '.card-header__card-back'

    @recountValues()

    $(window).on 'scroll', @paralaxCards
    $(window).on 'resize', @recountValues

  recountValues: =>
    @widget_height = @widget.height()
    @widget_top = @widget.offset().top
    @vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0

  paralaxCards: =>
    top = window.pageYOffset || document.documentElement.scrollTop
    percents = Math.min(top*100/((@widget_height+@widget_top)*.75),100)

    @card_front.css
      top: (40-(20*percents/100))+'px'

    @card_back.css
      top: (20+(20*percents/100))+'px'


$(document).ready ->
  new CardHeader
