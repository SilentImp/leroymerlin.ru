class Details
  constructor: ->
    @widget = $ '.card-details'
    if @widget.length == 0
      return

    @steps = $ '.card-details__address-flag'
    @counter = 0

    @checkState()
    $(window).on 'scroll', @checkState

  checkState: =>
    scroll = $(window).scrollTop()
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    for step in @steps
      step = $ step
      if (step.offset().top + step.outerHeight(true)+40 < scroll + vh) && (!step.hasClass('card-details__address-flag_start'))
        step.addClass 'card-details__address-flag_start'
        @counter++

    if @counter == @steps.length
      $(window).off 'scroll', @checkState

$(document).ready ->
  new Details
