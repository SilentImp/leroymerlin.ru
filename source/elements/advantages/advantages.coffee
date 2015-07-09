class Advantages
  constructor: ->
    @widget = $ '.advantages'
    if @widget.length == 0
      return

    return

    @advantages = $ '.advantages__advantage, .advantages__title'

    @checkState()
    $(window).on 'scroll', @checkState

  checkState: =>
    scroll = $(window).scrollTop()
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0

    i = 2
    for advantage in @advantages
      i++
      advantage = $ advantage
      distance = (advantage.offset().top - (scroll+vh*0.5))
      percent = Math.max(Math.min(1-(distance/(vh*0.5)), 1), 0).toFixed(2)

      advantage.css
        '-webkit-transform': 'translateZ('+(1-i%2*2)*((1-percent)*200)+'px) rotateY('+(1-i%2*2)*(35*(1-percent))+'deg)'
        '-moz-transform': 'translateZ('+(1-i%2*2)*((1-percent)*200)+'px) rotateY('+(1-i%2*2)*(35*(1-percent))+'deg)'
        '-ms-transform': 'translateZ('+(1-i%2*2)*((1-percent)*200)+'px) rotateY('+(1-i%2*2)*(35*(1-percent))+'deg)'
        'transform': 'translateZ('+(1-i%2*2)*((1-percent)*200)+'px) rotateY('+(1-i%2*2)*(35*(1-percent))+'deg)'
        '-webkit-filter': 'blur('+(10*(1-percent))+'px)'
        '-moz-filter': 'blur('+(10*(1-percent))+'px)'
        'filter': 'blur('+(10*(1-percent))+'px)'
        'opacity': percent

$(document).ready ->
  new Advantages
