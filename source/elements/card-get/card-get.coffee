class GetCard
  constructor: ->
    @widget = $ '.card-get'
    if @widget.length == 0
      return

    @steps = $ '.card-get__step span'

    @checkState()
    $(window).on 'scroll', @checkState

  checkState: =>
    scroll = $(window).scrollTop()
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0

    i = 2
    for step in @steps
      i++
      step = $ step
      distance = (step.offset().top - (scroll+vh*0.5))
      percent = Math.max(Math.min(1-(distance/(vh*0.5)), 1), 0).toFixed(2)
      console.log 360*percent, 'rotateY('+(360*percent)+'deg)'
      step.css
        'transform': 'translateZ('+((1-percent)*250)+'px) rotateY('+(360*percent)+'deg)'
        'opacity': percent

$(document).ready ->
  new GetCard
