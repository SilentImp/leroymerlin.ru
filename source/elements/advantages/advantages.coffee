class Advantages
  constructor: ->
    @widget = $ '.advantages'
    if @widget.length == 0
      return

    @advs = $ '.advantages__advantage'
    @counter = 0
    @checkState()
    $(window).on 'scroll', @checkState

  checkState: =>
    scroll = $(window).scrollTop()
    vh = Math.max document.documentElement.clientHeight, window.innerHeight || 0
    for adv in @advs
      adv = $ adv
      if (adv.offset().top + adv.outerHeight(true) < scroll + vh) && (!adv.hasClass('advantages__advantage_start'))
        adv.addClass 'advantages__advantage_start'
        @counter++

    if @counter == @advs.length
      $(window).off 'scroll', @checkState

$(document).ready ->
  new Advantages
