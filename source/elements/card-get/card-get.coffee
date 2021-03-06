class GetCard
  constructor: ->
    @widget = $ '.card-get'
    if @widget.length == 0
      return

    @steps = $ '.card-get__step'
    @counter = 0

    @checkState()
    $(window).on 'scroll', @checkState

  checkState: =>
    scroll = $(window).scrollTop()
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    for step in @steps
      step = $ step
      if (step.offset().top + step.outerHeight(true) < scroll + vh) && (!step.hasClass('card-get__step_start'))
        step.addClass 'card-get__step_start'
        @counter++

    if @counter == @steps.length
      $(window).off 'scroll', @checkState

$(document).ready ->
  new GetCard
