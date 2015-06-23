var CardHeader,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardHeader = (function() {
  function CardHeader() {
    this.paralaxCards = bind(this.paralaxCards, this);
    this.recountValues = bind(this.recountValues, this);
    this.widget = $('.card-header');
    this.card_front = this.widget.find('.card-header__card-front');
    this.card_back = this.widget.find('.card-header__card-back');
    this.recountValues();
    this.widget.on('mousemove', this.paralaxCards);
    $(window).on('resize', this.recountValues);
  }

  CardHeader.prototype.recountValues = function() {
    this.widget_height = this.widget.height();
    this.widget_top = this.widget.offset().top;
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };

  CardHeader.prototype.paralaxCards = function(event) {
    var offset, percents, pointer, side;
    offset = this.widget.offset();
    pointer = {
      left: event.pageX - offset.left - this.vw / 2 + 100,
      top: event.pageY - offset.top
    };
    if (pointer.left < -400) {
      pointer.left = -400;
    }
    if (pointer.left > 400) {
      pointer.left = 400;
    }
    percents = pointer.left / 400;
    if (percents < 0) {
      side = -1;
    }
    if (percents >= 0) {
      side = 1;
    }
    this.card_front.css({
      'z-index': 1 - side,
      'transform': 'rotateY(' + (-10 * percents) + 'deg) translateZ(' + (-60 * percents) + 'px) translateX(' + (-80 * percents) + 'px)'
    });
    return this.card_back.css({
      'z-index': side - 1,
      'transform': 'rotateY(' + (-10 * percents) + 'deg) translateZ(' + (60 * percents) + 'px) translateX(' + (-80 * percents) + 'px)'
    });
  };

  return CardHeader;

})();

$(document).ready(function() {
  return new CardHeader;
});
