class CardNavigation
  constructor: ->
    @widget = $ '.card-navigation'
    @chapters = $ '.chapter'
    @links = $ '.card-navigation__link'

    @checkFixed()
    $(window).on 'scroll', @checkFixed
    @links.on 'click', @scrollToChapter

  checkFixed: =>
    if $(window).scrollTop() >= @widget.offset().top
      @widget.toggleClass 'card-navigation_fixed', true
    else
      @widget.toggleClass 'card-navigation_fixed', false
    @checkCurrent()

  checkCurrent: =>
    for chapter in @chapters
      chapter = $(chapter)
      if chapter.offset().top+chapter.outerHeight()/2 > $(window).scrollTop()
        current = chapter.attr 'id'
        if @current
          @current.removeClass 'card-navigation__link_current'
        @current = @widget.find('[data-target="'+current+'"]')
        @current.toggleClass 'card-navigation__link_current', true
        break

  scrollToChapter: (event)=>
    event.preventDefault()
    link = $ event.currentTarget

    $('#'+link.attr('data-target')).velocity "scroll",
      duration: 500
      , offset: -100
      , begin:  =>
        document.body.style.willChange = 'scroll-position'
      , complete: =>
        document.body.style.willChange = 'auto'


$(document).ready ->
  new CardNavigation
