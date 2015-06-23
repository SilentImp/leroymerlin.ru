class Layout
  constructor: ->
    @basket = $ '#small-basket .e-commerce'
    @footer = $ '#footer-place'

    $(window).on 'scroll resize', @recountBasketPosition
    @recountBasketPosition()

  recountBasketPosition: =>
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    top = window.pageYOffset || document.documentElement.scrollTop
    footer_top = @footer.offset().top

    if top+vh>footer_top
      @basket.css
        bottom: (top+vh-footer_top)+'px'
    else
      @basket.css
        bottom: 0

$(document).ready ->
  new Layout
